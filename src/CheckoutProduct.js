import React from 'react'
import "./CheckoutProduct.css"
import {useStateValue} from './StateProvider' // basically StateProvider is where datalink layer is created

function CheckoutProduct({id, image, title, price, rating, hidebutton}) {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

  return (
    <div className='checkoutProduct'>
        <img className='checkoutProduct__image' src={image}  
        />

        <div className='checkoutProduct__info'> {/*This class is for the info of the product */}
            <p className='checkoutProduct__title'>{title}</p>
            <p className='checkoutProduct__price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className='checkoutProduct__rating'>
                {Array(rating)  // creates an Array of size rating.
                .fill() // we fill the array and then just map through it
                .map((_,i) => (
                    <p>⭐</p>
                ))
                }
            </div>
            {!hidebutton && ( // if button is not hidden then we will render the button
                <button onClick={removeFromBasket}>Remove from Basket</button>
            )}
        </div>
    </div>
  )
}

export default CheckoutProduct