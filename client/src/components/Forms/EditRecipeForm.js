import React, { useState } from 'react';
import axios from 'axios';
import '../Recipes/Recipes.css';

const EditRecipeForm = (props) => {
    const [formState, setFormState] = useState({
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

        const { title, duration, ingredients, description } = formState;

        axios
            .put(`http://localhost:5000/api/recipes/${props.recipe._id}`, {
                title, 
                duration, 
                ingredients,
                description,
            })
            .then(() => {
                props.getTheRecipe();
                props.history.push("/recipes");
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <hr />
            <h3>Edit the Recipe</h3>
            <form onSubmit={handleFormSubmit}  className="container" >
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
                <input
                    type="text"
                    name="ingredients"
                    value={formState.ingredients}
                    onChange={handleInputChange}
                />
                <label htmlFor="description">Description:</label>
                <textarea
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
