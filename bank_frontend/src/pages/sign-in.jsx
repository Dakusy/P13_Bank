import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getToken from "../service/getToken";
import login from "../service/login";
import { authActions } from "../store/auth";
import { tokenActions } from "../store/token";
import { profileActions } from "../store/profile";

import circle from '../assets/circle-user-solid.svg';

import '../css/sign-in.css';

const SignIn = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // Get the token's state
    const token = useSelector((state) => state.token)
    // Get the profile's state
    const userProfile = useSelector((state) => state.profile)
    //States used to display error message in case of invalid values in the form
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    // Retrieves the input values via onChange listener
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //Function called when the form is submited
    /**
     * @returns {promise} token
     * @param {string} event
     */
    const handleSubmit = async (event) => {
        event.preventDefault()
        // getToken is the service in charge of fetching the token
        // Saves the response in const dataToken
        const dataToken = await getToken(email, password);
        // Status = 200, the token is saved in the state
        if (dataToken.status === 200) {
            dispatch(tokenActions.getToken(dataToken.body.token))
            // If the state in charge of the taken is true
            if (token) {
                ;
                // Update the auth state to true
                dispatch(authActions.login())
                // Calls and save the user datas in the const dataUser
                const dataUser = await login(dataToken.body.token);

                if (dataUser.status === 200) {
                    dispatch(profileActions.getNames({ firstName: dataUser.body.firstName, lastName: dataUser.body.lastName }))
                    if (userProfile) {
                        navigate(`/profile/${dataUser.body.id}`)
                    }
                    else {
                        navigate("/*")
                    }
                }
            }

        } else {
            if (dataToken.message === "Error: User not found!") {
                setIsInvalidEmail(true)
            }
            if (dataToken.message === "Error: Password is invalid") {
                setIsInvalidPassword(true)
            }
        }


    }
    return (
        <>
            <main className="main bg-dark">
                <section className="sign-in-content">
                <img className = "sign-in-icon" src={circle} alt="Icon User" />
                    <h1>Sign In</h1>
                    <form className="form-signIn" onSubmit={handleSubmit}  >
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type={"text"} id="username" onChange={(e) => setUsername(e.target.value)} />
                            {isInvalidEmail && <span className="error">Error: User not found!</span>}
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type={"password"} required id="password" onChange={(e) => setPassword(e.target.value)} />
                            {isInvalidPassword && <span className="error">Error: Password is invalid</span>}
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <div className="form-signIn-submit">
                        <input type={"submit"} value={"Sign In"} id="submitBtn"/>
                    </div>
                    </form>
                </section>
            </main>

        </>
    );
};

export default SignIn;
