import React, { useState } from 'react';
import axios from 'axios';
import './AddRecipeForm.css';
import UploadService from '../../services/upload.service';

const initialState = {
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


                {formState.image ? (
                <button className="btn-grad" type="submit">Add new Recipe</button>
                ) : (
                <button className="btn-grad" disabled type="submit">
                To Add a new Recipe, choose an Image
                </button>
                )}

            </form>
        </div>

    );
};

export default AddRecipeForm;