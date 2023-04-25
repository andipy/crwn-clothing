import React from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils.js";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";

const Signin = () => {

    const logGoogleUser = async() => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    }

    return (
        <div>
            <h1>sign in</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>

            <SignUpForm />
        </div>
    )
}

export default Signin;