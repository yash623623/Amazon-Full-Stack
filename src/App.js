import './App.css';
import React, { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Payment from "./Payment"
import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import {auth} from "./firebase";
import { useStateValue } from './StateProvider';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe('pk_test_51LoRQWSDMz8C5nK1HTIENZpgxkgz8zEBNNAM5RixdfJigs.kjbskjbvksjbv,kvbk,vkvb1M1SoOHHxE8000MOjPEqhs')

function App() {
  const[{}, dispatch] = useStateValue();

  useEffect(() => { // It is a listener. Using this we keep track of who logged in
    auth.onAuthStateChanged(authUser => { // it runs when when user logs in and logs out
      console.log('THE USER IS >>>',authUser);

      if(authUser)
      {
        // the user just logged in/ was logged in and refreshed the page then it sets the user to authUser(who ever was the user)
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else
      {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
    // will only run once when the app component loads, that's why  [] is empty in below line
  }, [])

  return (
    <Router>
      <div className="app">
        
        <Routes>

          <Route path="/login" element={
            <Login />
            }
          />

          <Route path="/orders" element={
            <div>
              <Header />
              <Orders />
            </div>
            }
          />

          <Route path="/checkout" element={
            <div>
              <Header />
              <Checkout />
            </div>
            }
          />

          <Route path="/payment" element={
            <div>
              <Header />
              <Elements stripe={promise}>  {/*It wraps the payment elements */}
                <Payment />
              </Elements>
            </div>
            }
          />

          <Route path="/" element={  //Home page route
            <div>
              <Header />
              <Home />
            </div>
            } 
          />

        </Routes> 
          
      </div>
    </Router>
    
  );
}

export default App;
