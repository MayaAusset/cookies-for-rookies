import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthService from '../../services/auth.service';

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
        <div className="recipe-lis">
                {listOfRecipes.map((recipe) => {
                return ( 
                    <div key={recipe._id} className="recipe-card" >
                            <img src={recipe.image} className="card-img-top" alt="recipe's" width="200px"/>

                            <Link to={`/recipes/${recipe._id}`}>
                                <h3>{recipe.title}</h3>
                            </Link>
                            <p>{recipe.duration} </p>
                            <p>{recipe.ingredients} </p>
                            <p>{recipe.description} </p>
                    </div>
                );
                })}
            <div className=" container-fluid">
                <AddRecipeForm getData={getAllRecipes} />
            </div>
        </div>
        
    )
}

export default RecipesList;