import React, { useContext } from "react";
import './navigation.style.scss';

import { Outlet, Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from "../../assets/logo/crown.svg";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/card-dropdown/cart-dropdown.component";

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutUser();
    }
    
    return (
      <>
        <nav className="navigation">
            <Link className="logo-container" to="/">
                <CrwnLogo />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                {currentUser ? (
                    <span onClick={signOutHandler} className="nav-link">SIGN OUT</span>
                ) : (
                    <Link className="nav-link" to="/auth">
                        SIGN IN
                    </Link>
                )}
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}            
        </nav>
        <Outlet />
      </>
    )
}

export default Navigation;