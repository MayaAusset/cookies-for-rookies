import React, { useState } from 'react';
import axios from 'axios';
import './AddRecipeForm.css';

const initialState = {
    image: '',
    title: '',
    duration: '',
    ingredients: '',
    description: '',
}

const AddRecipeForm = (props) => {
    const [formState, setFormState] = useState(initialState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const {  image, title, duration, ingredients, description } = formState;

        axios
            .post("http://localhost:5000/api/recipe", { 
                image,
                title, 
                duration, 
                ingredients, 
                description ,
            },
            {
                withCredentials: true,
            })
            .then(() => {
                props.getData();
                setFormState(initialState);
            })
            .catch((error) => console.error(error));
    };

    return (
        <div  className="App">
            <form onSubmit={handleFormSubmit} className="container">
                <label htmlFor="image">Image</label>
                <input
                    type="text"
                    name="image"
                    value={formState.image}
                    onChange={handleInputChange}
                />
                <label htmlFor="title">Title</label>
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
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    value={formState.description}
                    onChange={handleInputChange}
                />

                <button className="btn-grad" type="submit">Submit</button>

            </form>
        </div>

    );
};

export default AddRecipeForm;