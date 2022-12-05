import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from "./firebase"

function Header() {
    const [{ basket, user }, dispatch] = useStateValue(); // we pull user and basket from the data layer  
    const handleAuthentication = () => {
        if(user){
            auth.signOut();
        }
    }
  return (
    <div className = 'header'>
        <Link to="/">  {/* If we click on this image then it will take us tohome route */}
            <img className="header__logo"
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            />
        </Link>
        

        <div className='header__search'>
            <input
            className='header__searchInput' type="text" />
            <SearchIcon className='header__searchIcon' /> {/**Material UI */}
        </div>

        <div className='header__nav'>
            <Link to={!user && '/login'}> {/*If there was no user signed in and person cliks then it takes to Sign in page  */}
                <div onClick={handleAuthentication} className='header__option'>
                    <span className='header__optionLineOne'>Hello {!user? 'Guest' : user.email}</span>
                    <span className='header__optionLineTwo'>{user ?  // if user is present then it will display Sign Out
                    'Sign Out' : 'Sign In'}</span>
                </div>
            </Link>
            <Link to='/orders'>
                <div className='header__option'>
                    <span className='header__optionLineOne'>Returns</span>
                    <span className='header__optionLineTwo'>& Orders</span>
                </div>
            </Link>

            <div className='header__option'>
                <span className='header__optionLineOne'>Your</span>
                <span className='header__optionLineTwo'>Prime</span>
            </div>
            <Link to="/checkout">
                <div className='header__optionBasket'>
                    <ShoppingBasketIcon/>
                    <span className='header__optionLineTwo header__basketCount'>{basket.length}</span> {/*?(optional chaining) means if somehow basket becomes undefined due to error then website wont freakout and would execute normally */}
                </div>
            </Link>
        </div>

    </div>
  )
}

export default Header