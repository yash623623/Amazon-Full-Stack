import React, {useEffect, useState} from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import {useStateValue} from "./StateProvider";
import {Link, useNavigate} from "react-router-dom";
import { CardElement , useStripe ,useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from "./reducer";
import axios from "./axios";
import {db} from "./firebase";

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useNavigate();

    // line 12 and 13 has powerful hooks
    const stripe = useStripe(); 
    const elements = useElements();

    // below two line are for handling change on the CardElement
    const [error , setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);

    const [clientSecret, setClientSecret] = useState(true);

  // The below code from 26-37 is that whenever the baskey changes. It will make this (28-33) request and it will update the special stripe secret which allows us to charge the customer the correct amount
    useEffect(() => { // it runs when the basket changes
        // generate the special Stripe secret which allows us to charge a customer. But whenever the basket changes we need a new secret
            const getClientSecret = async () => {
                const response = await axios({ // axios is used for making requests like get, put,post. It allows you to fetch and interact with API's very easily
                    method: 'post',
                    // Stripe expects the total in a curriencie's subunits
                    url: `/payments/create?total=${getBasketTotal(basket) * 100}` // we will call it and we should get some response. In that response we should have the clients secret. 100  used here is for currency
                });
                setClientSecret(response.data.clientSecret)
            }
            getClientSecret()
    }, [basket])
    console.log("The secret is >>>> ",clientSecret)
    console.log("user>>>",user)
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true); // After clicking the "Buy Now button once it will disable"

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation

            db  // basically collection mein users mein jao then particular user mein fir uskay orders mein and so on 
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id) // we will create a doc with paymentIntent ID and then add below info in
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created // get the date
                })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history("/orders") // after payment user will be redirected to orders page
        })
    }

    const handleChange = event => {
        // Listen for changes in the CardElement.
        // and display and changes as the customer  types their card details
        setDisabled(event.empty); // if the event is empty then disable the button
        setError(event.error ? event.error.message : ""); // if there is an error then show the error, otherwise dont show anything
    }

  return (
    <div className='payment'>
        <div className='payment__container'>

            <h1>
                Checkout (<Link to="/checkout">{basket?.length} items</Link>)
            </h1>

            <div className='payment__section'> {/*Payment section delivery address */}
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>React Lane</p>
                    <p>Los Angeles, CA</p>
                </div>
            </div>

            <div className='payment__section'> {/*Payment section Review Items */}
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item => (
                        <CheckoutProduct  // Basically reusing the CheckoutProduct
                            id = {item.id}
                            title = {item.title}
                            image = {item.image}
                            price = {item.price}
                            rating = {item.rating}
                        />
                    ))}
                </div>
            </div>

            <div className='payment__section'>  {/*Payment section Payment Method */}
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/> {/*We are importing the CardElement from react-stripe */}

                        <div className='payment__priceContainer'>
                            <CurrencyFormat  // syod wolmut
                                renderText={(value) => ( // we are rendering a h3
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)} // all added price of items in stack
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}> {/*In these three cases the button will be disabled*/}
                                <span>{processing ? <p>Processing</p> : "Buy Now" }</span> {/*} if it is processing then it displays processing, else it displays "Buy Now"*/}
                            </button>
                        </div>
                            {/*Errors regarding the card */}
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Payment