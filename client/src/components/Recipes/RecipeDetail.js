import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Recipes/RecipeDetail.css';
import EditRecipeForm from '../Forms/EditRecipeForm';
import Rating from './Rating';
import MailForm from '../../Nodemailer/MailForm';

const RecipeDetail = (props) => {
    const [details, setDetails] = useState({});

    const [currentRecipe, setCurrentRecipe] = useState('');


    const getSingleRecipe = () => {
        const { id } = props.match.params;

        axios   
            .get(`http://localhost:5000/api/recipes/${id}`, {
                withCredentials: true,
            })
            .then((responseFromApi) => {
                console.log(responseFromApi.config.url);
                setCurrentRecipe(responseFromApi.config.url);
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
              <button className="btn btn-warning" onClick={() => deleteRecipe(details._id)}>
                Delete this recipe
              </button>
            </div>
          );
        }
      };

    return (
        <div className="container">
            <div className="rec-detail-div">
                <p className="stars">
                <h1>{details.title}</h1>
                <Rating>{details.rating}</Rating>
                </p>
                <img src={details.image} alt="recipe" width="1000px"/>

                
                <p className="stopwatch">
                <img src="/stopwatch-logo.png" alt="ingrdients" width="50px"/>
                {details.duration} </p>
                
             
               

                <div className="row instructions">
                <div className="col-4 text-justify ">
                    <img src="/Ingredients-logo.png" alt="ingrdients" width="50px"/>
                    <h2>Ingredients: </h2>
                    <p>{details.ingredients} </p>
                </div>
                <div className="col-8 text-justify ">
                    <img src="/favicon.ico" alt="ingrdients" width="50px"/>
                    <h2>Preparation: </h2>
                    <p>{details.description} </p>
                </div>
                   
                   
                </div>

                <hr/>
                <MailForm recipe={currentRecipe}/>
                
            </div>

                
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
