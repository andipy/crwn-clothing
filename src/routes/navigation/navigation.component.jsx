import React, { useContext } from "react";
// import './navigation.style.scss';
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.style";

import { Outlet, Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from "../../assets/logo/crown.svg";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutUser();
    }
    
    return (
      <>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo />
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop">
                    SHOP
                </NavLink>
                {currentUser ? (
                    <NavLink as="span" onClick={signOutHandler}>SIGN OUT</NavLink>
                ) : (
                    <NavLink to="/auth">
                        SIGN IN
                    </NavLink>
                )}
                <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}            
        </NavigationContainer>
        <Outlet />
      </>
    )
}

export default Navigation;