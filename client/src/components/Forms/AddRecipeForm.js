import React, { useState } from 'react';
//import axios from 'axios';
import './AddRecipeForm.css';
import UploadService from '../../services/upload.service';
import RecipeService from "../../services/recipe.service";


const initialState = {
    rating: 0,
    image: '',
    title: '',
    duration: '',
    ingredients: '',
    description: '',
}

const AddRecipeForm = (props) => {
    const [formState, setFormState] = useState(initialState);

    const service = new UploadService();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleFileUpload = (event) => {
        console.log("the file to be uploaded is : ", event.target.files[0]);
        const uploadData = new FormData();
        uploadData.append('image', event.target.files[0]);

        // upload the data to cloudinary
        service
            .upload(uploadData)
            .then((response) => {
                console.log('response is: ', response);
                // The response from uploading to cloudinary is the url which will be saved in the database.
                setFormState({ ...formState, image: response.cloudinaryUrl });
            })
            .catch((err) => {
                console.log("Error while uploading the file: ", err);
            });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const service = new RecipeService();

        const {  rating, image, title, duration, ingredients, description } = formState;

        service
            .createRecipe({ 
                rating,
                image,
                title, 
                duration, 
                ingredients, 
                description ,
            }/* ,
            {
                withCredentials: true,
            } */)
            .then(() => {
                props.getData();
                setFormState(initialState);
            })
            .catch((error) => console.error(error));
    };

    return (
        <div  className="add-recipe align-items-center">
        <h1 className="text-justify-center form-title">Add a recipe !</h1>
            <form onSubmit={handleFormSubmit} className="container">
                <label htmlFor="rating">Rating</label>
                <input
                    type="number"
                    name="rating"
                    onChange={handleInputChange}
                />
                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileUpload}
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
                <textarea
                    rows="5"
                    cols="30"
                    name="ingredients"
                    placeholder=" 110g Butter, 220g Brown Sugar... "
                    value={formState.ingredients}
                    onChange={handleInputChange}
                />
                <label htmlFor="description">Description</label>
                <textarea
                    rows="10"
                    cols="30"
                    name="description"
                    placeholder=" Step 1 :   ..."
                    value={formState.description}
                    onChange={handleInputChange}
                />


                {formState.image ? (
                <button className="add-btn" type="submit">Add new Recipe</button>
                ) : (
                <button className="add-btn" disabled type="submit">
                To Add a new Recipe, choose an Image
                </button>
                )}

            </form>
        </div>
        

    );
};

export default AddRecipeForm;