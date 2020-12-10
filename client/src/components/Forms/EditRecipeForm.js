import React, { useState } from 'react';

import RecipeService from "../../services/recipe.service";

const EditRecipeForm = (props) => {
    const [formState, setFormState] = useState({
        rating: props.recipe.rating,
        title: props.recipe.title,
        duration: props.recipe.duration,
        ingredients: props.recipe.ingredients,
        description: props.recipe.description,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormState({...formState, [name]: value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const { rating, title, duration, ingredients, description } = formState;

        const service = new RecipeService();

        service
            .updateRecipe(props.recipe._id, {
                rating,
                title, 
                duration, 
                ingredients,
                description,
            }/* , 
            {
                withCredentials: true,
            } */)
            .then(() => {
                props.getTheRecipe();
                props.history.push("/recipes");
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <hr />
            <h3>Edit your Recipe</h3>
            <form onSubmit={handleFormSubmit}  className="container" >
                <label htmlFor="rating">Rating:</label>
                <input
                type="number"
                name="rating"
                value={formState.rating}
                onChange={handleInputChange}
                />
                <label htmlFor="title">Title:</label>
                <input
                type="text"
                name="title"
                value={formState.title}
                onChange={handleInputChange}
                />
                <label htmlFor="duration">Duration</label>
                <input
                    type="text"
                    name="duration"
                    value={formState.duration}
                    onChange={handleInputChange}
                />
                <label htmlFor="ingredients">Ingredients</label>
                <textarea
                    rows="5"
                    cols="30"
                    name="ingredients"
                    value={formState.ingredients}
                    onChange={handleInputChange}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                rows="10"
                cols="40"
                name="description"
                value={formState.description}
                onChange={handleInputChange}
                />

                <input className="btn-grad" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default EditRecipeForm;
