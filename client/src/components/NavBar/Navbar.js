import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to='/recipes'>
                            <h1 className="nav-title">Recipes</h1>
                        </Link>
                    </li>
                </ul>
            </nav>
            
        </div>
    );
};

export default Navbar;