import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

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
        <div>
            <div className="recipe-list">
                {listOfRecipes.map((recipe) => {
                return (
                    <div key={recipe._id} className="recipe-list">
                        <p>{recipe.image}</p>
                        <Link to={`/recipes/${recipe._id}`}>
                            <h3>{recipe.title}</h3>
                        </Link>
                        <p>{recipe.duration} </p>
                        <p>{recipe.ingredients} </p>
                        <p>{recipe.description} </p>
                        <p>{recipe.fromUser} </p>
                    </div>
                );
                })}
            </div>
            <div>
                <AddRecipeForm getData={getAllRecipes} />
            </div>
         </div>
    )
}

export default RecipesList
