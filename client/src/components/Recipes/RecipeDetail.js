import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import '../Recipes/Recipes.css'

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

    return (
        <div className="container">
            <h1>Recipe Detail</h1>
                <p>{details.image}</p>
                <h3>{details.title}</h3>
                <p>{details.duration} </p>
                <p>{details.ingredients} </p>
                <p>{details.description} </p>
                <p>{details.fromUser} </p>
            <Link to={"recipes"}>
            <button className="btn-grad">Back to the recipes</button>
            </Link>
        </div>
    )
}

export default RecipeDetail;
