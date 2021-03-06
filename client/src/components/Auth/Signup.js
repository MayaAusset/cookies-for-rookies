import React, { useState } from 'react';
import { Link } from "react-router-dom";

import AuthService from '../../services/auth.service'
;
const initialState = { username: "", password: "" , name: "" };

const Signup = (props) => {
    const [regForm, setRegForm] = useState(initialState);
    const [regErrorMsg, setRegErrorMsg] = useState('');

    const service = new AuthService();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const { username, password, name } = regForm;

        service
        .signup(username, password, name)
        .then((response) => {
            setRegForm(initialState);
            props.getUser(response);
        })
        .catch((error) => {
            console.log(error.response)
            const { message } = error.response.data;
            setRegErrorMsg(message);
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegForm({ ...regForm, [name]: value });
    };

    return (
        <div>
            <h2>Create an Account</h2>
            <form onSubmit={handleFormSubmit} className="container" >
                <label>Username:</label>
                <input
                type="text"
                name="username"
                value={regForm.username}
                onChange={handleChange}
                />

                <label>Name:</label>
                <input
                type="text"
                name="name"
                value={regForm.name}
                onChange={handleChange}
                />

                <label>Password:</label>
                <input
                type="password"
                name="password"
                value={regForm.password}
                onChange={handleChange}
                />

                <input className='btn-grad' type="submit" value="Signup" />
            </form>
            <br />

            {regErrorMsg && <span style={{ color: "pink" }}>{regErrorMsg}</span>}

            <p>
                Already have account?
                <Link to={"/"}> Login</Link>
            </p>
        </div>
    )
}

export default Signup;
