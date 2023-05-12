import React, { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import "./sign-up-form.style.scss";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const SignUpForm = () => {    

    const [formFields, setFormFields] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formFields.password !== formFields.confirmPassword) {
            alert("Password don't match!");
            return;
        }

        try {
            const response = await createAuthUserWithEmailAndPassword(formFields.email, formFields.password);
            await createUserDocumentFromAuth(response.user, {displayName: formFields.displayName});
            setFormFields({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.log("error on creation", error.code)
            if (error.code === "auth/email-already-in-use") {
                alert("This email is already taken")
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h1>Don't have an account?</h1>
            <h2>Sign up with your email and password</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display name"
                    type="text"
                    name="displayName"
                    onChange={handleChange}
                    value={formFields.displayName}
                    required
                />
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
                <FormInput
                    label="Confirm password"
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={formFields.confirmPassword}
                    required
                />
                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;