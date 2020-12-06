import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Root/App.css';
import RecipesList from "../Recipes/RecipesList";

import AuthService from '../../services/auth.service';


const Navbar = (props) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const service = new AuthService();

     // Mimic lifecycle method when a component updates
    useEffect(() => {
        setLoggedInUser(props.userInSession);
    }, [props.userInSession]);


     // function to log user out
    const logoutUser = () => {
        service.logout().then(() => {
        // reset state value
        setLoggedInUser(null);

        // reset getUser value
        props.getUser(null);
        });
    };

    if (loggedInUser) {
    return (
        <nav className="nav-style-loggedin">
            <h2><span>Welcome, {loggedInUser.username}</span></h2>
            <ul>
            <li>
      
                <Link to="/recipes" style={{ textDecoration: "none" }}>
                Check out the Recipes !
                </Link>
            </li>
            <li>
                <Link to="/">
                <button onClick={logoutUser}>Logout</button>
                </Link>
            </li>
            </ul>
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