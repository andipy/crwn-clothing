import React, { useState } from "react";
import "./sign-in-form.style.scss";

import { 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword }
from "../../utils/firebase/firebase.utils.js";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


const SignInForm = () => {

    const [formFields, setFormFields] = useState({
        email: '',
        password: ''
    });    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(formFields.email, formFields.password);

            setFormFields({
                email: '',
                password: ''
            })
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password or email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
            }
        }
    }

    const signInWithGoogle = async() => {
        await signInWithGooglePopup();
    }

    return (
        <div className="sign-up-container">
            <h1>Already have an account?</h1>
            <h2>Sign in with your email and password</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formFields.email}
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formFields.password}
                    required
                />
                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button type="button" buttonType='google-sign-in' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;