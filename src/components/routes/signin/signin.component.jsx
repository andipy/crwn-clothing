import React from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../utils/firebase/firebase.utils.js";

const Signin = () => {

    const logGoogleUser = async() => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    }

    return (
        <div>
            <h1>sign in</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
    )
}

export default Signin;