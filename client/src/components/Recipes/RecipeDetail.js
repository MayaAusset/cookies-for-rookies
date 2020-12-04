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
            .get(`http://localhost:5000/api/recipes/${id}`, {
                withCredentials: true,
            })
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

    const deleteRecipe = () => {
        const { id } = props.match.params;

        axios
            .delete(`http://localhost:5000/api/recipes/${id}`, {
                withCredentials: true,
            })
            .then((results) => {
                props.history.push('/recipes')
            })
            .catch((error) => console.error(error))
    };

    const ownershipCheck = (recipe) => {
        if (props.loggedInUser && recipe.fromUser === props.loggedInUser._id) {
          return (
            <div>
              <div>{renderEditForm()} </div>
              <button onClick={() => deleteRecipe(details._id)}>
                Delete this recipe
              </button>
            </div>
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
                {ownershipCheck(details)}
                <br/>
                <hr/>
            <Link to={"/recipes"}>
            <button className="btn-grad">Back to the recipes</button>
            </Link>
        </div>
    )
}

export default RecipeDetail;
