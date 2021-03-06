import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../NavBar/Navbar.css';
import RandomQuote from '../Recipes/RandomQuote';

import AuthService from '../../services/auth.service';


const Navbar = (props) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const service = new AuthService();

    useEffect(() => {
        setLoggedInUser(props.userInSession);
    }, [props.userInSession]);

    const logoutUser = () => {
        service.logout().then(() => {
        setLoggedInUser(null);
        props.getUser(null);
        });
    };

    if (loggedInUser) {
    return (
        <nav className="nav-style-loggedin container-fluid">
            <h2 className="titleh2"><span>Welcome, {loggedInUser.username}</span></h2>
           
            <div className="redirection-container  align-items-center"> 

                <RandomQuote/>

                <Link className="titleh2 col-6" to="/recipes" style={{ textDecoration: "none" }}>
                    Check out the Recipes !
                </Link>
            
                <Link to="/">
                    <button className="btn-grad" onClick={logoutUser}>Logout</button>
                </Link>

            </div>
        </nav>
        );
    } else {
        return (
        <div>
            <nav className="nav-style">
            <ul>
                <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        Login
                    </Link>
                </li>
                <li>
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                        Signup
                    </Link>
                </li>
            </ul>
            </nav>
        </div>
    );
  }
};

export default Navbar;