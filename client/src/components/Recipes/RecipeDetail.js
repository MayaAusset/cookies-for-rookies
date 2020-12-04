import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Recipes/Recipes.css';
import EditRecipeForm from '../Forms/EditRecipeForm';

const RecipeDetail = (props) => {
    const [details, setDetails] = useState({});

    const getSingleRecipe = () => {
        const { id } = props.match.params;

        axios   
            .get(`http://localhost:5000/api/recipes/${id}`)
            .then((responseFromApi) => {
                console.log(responseFromApi);
                setDetails(responseFromApi.data);
            })
            .catch((error) => console.error(error))
    };

    useEffect(getSingleRecipe, [props.match.params]);

    const renderEditForm = () => {
        if (!details.title) {
            getSingleRecipe();
        }else{
            return (
                <EditRecipeForm
                recipe={details}
                getTheRecipe={getSingleRecipe}
                {...props}
                />
            );
        }
    };

    return (
        <div className="container">
            <h1>Recipe Detail</h1>
                <p>{details.image}</p>
                <h3>{details.title}</h3>
                <p>{details.duration} </p>
                <p>{details.ingredients} </p>
                <p>{details.description} </p>
                <p>{details.fromUser} </p>
                <div>
                    {renderEditForm()}
                </div>
            <Link to={"/recipes"}>
            <button className="btn-grad">Back to the recipes</button>
            </Link>
        </div>
    )
}

export default RecipeDetail;
