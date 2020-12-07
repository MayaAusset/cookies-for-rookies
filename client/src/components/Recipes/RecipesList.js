import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../Recipes/RecipesList.css';
import axios from 'axios';
import Rating from './Rating';
//import AuthService from '../../services/auth.service';

import AddRecipeForm from '../Forms/AddRecipeForm';

const RecipesList = () => {
    const [listOfRecipes, setListOfRecipes] = useState([]);

    const getAllRecipes = () => {
        axios
            .get('http://localhost:5000/api/recipes', {
                withCredentials: true,
            })
            .then((responseFromApi) => {
                console.log(responseFromApi.data);
                setListOfRecipes(responseFromApi.data);
            })
            .catch((error) => console.error(error));
    };

    useEffect(getAllRecipes, []);

    return (
        <div className="container">
        <div className="row main-recipelist">
                {listOfRecipes.map((recipe) => {
                return ( 
                    <div key={recipe._id} className="col-4 recipe-card" > 
                        <Link to={`/recipes/${recipe._id}`}>
                        <div className="hover01">
                            <figure> <img src={recipe.image} className="card-img-top" alt="recipe's" width="200px"/></figure>
                        </div>
                        </Link>
                        <Rating>{recipe.rating}</Rating>
                        <Link to={`/recipes/${recipe._id}`}> 
                            <h3 className="recipes-title">{recipe.title}</h3>
                        </Link>
                        <hr/> 
                        <img src="/stopwatch-logo.png" alt="ingrdients" width="20px"/>
                        <p>{recipe.duration} </p>
                    </div>
                );
                })}
                </div>

            <hr/>
            <div className="container-fluid align-items-center">
                <AddRecipeForm getData={getAllRecipes} />
            </div>

           
        </div>
        
    )
}

export default RecipesList;