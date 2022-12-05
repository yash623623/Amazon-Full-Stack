import React, { useState } from 'react';
import "./Login.css";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "./firebase";



function Login() {
    const history = useNavigate(); // it gives us browser history. We will use it to redirect the user
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {  // when user clicks on Sign in this function kicks in and using "auth"(firebase backend) we sign in
        e.preventDefault() // prevents from refreshing

        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                history("/")  // takes user to home page. In App.js the useEffect then kicks in
            })
            .catch(error => alert(error.message))
    }

    const register = e => {   // when user clicks on Register this function kicks in and using "auth"(firebase) we create a new account
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password) // it creates a user and comes back with an auth that is below
            .then((auth) => {
                // it successfully created a user with email and password
                console.log(auth);
                if(auth)
                {
                    history("/")
                }
            })
            .catch(error => alert(error.message)) // if for any reason there was an error
    }

  return (
    <div className='login'>

        <Link to="/">
            <img 
                className='login__logo' 
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
            />
        </Link>

        <div className='login__container'>
            <h1>Sign-in</h1>

            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange = {e => setEmail(e.target.value)}/> {/* e is an event. We wrote value={email} so as to map this input to const email of Line 6 */}

                <h5>Password</h5>
                <input type='password' value={password} onChange = {e => setPassword(e.target.value)}/>

                <button type='submit' onClick = {signIn} className='login__signInButton'>
                    Sign In
                </button>
            </form>

            <p>
                By signing-in you agree to the Amazon's Conditions of Use & Sale. Please
                see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>

            <button onClick={register} className='login__registerButton'>
                Create your amazon account
            </button>
        </div>

    </div>
  )
}

export default Login