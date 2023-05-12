import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from "../../assets/logo/crown.svg";

import './navigation.style.scss';

import { UserContext } from "../../contexts/user.context";

const Navigation = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    console.log(currentUser, "current user from navigation");

    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null)
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
            </div>
        </nav>
        <Outlet />
      </>
    )
}

export default Navigation;