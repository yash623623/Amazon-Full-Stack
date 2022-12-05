import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from "./StateProvider";
import { getBasketTotal } from './reducer';
import { useNavigate } from "react-router-dom";

function Subtotal() {
    const history = useNavigate(); // it gives us browser history
    const [{ basket }, dispatch] = useStateValue(); //we pull basket from the data layer using this
  return (                                      // yeti pytah bon chu sorey wolmut
    <div className='subtotal'>
        <CurrencyFormat // syod wolmut
            renderText={(value) => (
                <>
                    <p>
                        Subtotal ({basket.length} items): <strong>{value}</strong>
                    </p>
                    <small className='subtotal__gift'>
                        <input type="checkbox" /> This order contains a gift
                    </small>
                </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)} // all added price of items in stack
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
        />

        <button onClick = {e => history('/payment')}>Proceed to Checkout</button> {/* we use history to redirect the user and keep the styling of the button. If we don't have it then the button will look like a link and won't have styling  */}

    </div>
  )
}

export default Subtotal