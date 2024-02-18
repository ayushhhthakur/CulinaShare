import React, { useState, useRef } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

const AddRecipe = ({ onRecipeAdded }) => {
    const [newRecipe, setNewRecipe] = useState({
        name: '',
        description: '',
        image: ''
    });

    const formRef = useRef(null);
    const firebaseConfig = {
        apiKey: "AIzaSyAWLJ5dc8Gd_DSPTCHos_c_RLYjsFAKMW4",
        authDomain: "recipe-5b867.firebaseapp.com",
        projectId: "recipe-5b867",
        storageBucket: "recipe-5b867.appspot.com",
        messagingSenderId: "491498779130",
        appId: "1:491498779130:web:f0e57298369b5b7c0eb443",
        measurementId: "G-N6R72XKD0B"
    };

    // Initialize Firebase app
    const app = initializeApp(firebaseConfig);

    const handleChange = (e) => {
        setNewRecipe({
            ...newRecipe,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const db = getFirestore(app);
            const recipesCollection = collection(db, 'recipes');
            await addDoc(recipesCollection, newRecipe);
            onRecipeAdded();

            // Reset the form fields and reference
            setNewRecipe({
                name: '',
                description: '',
                image: ''
            });
            formRef.current.reset();
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const navigate = useNavigate();

    const handleClick = () => {
        alert('Recipe Added Successfully');
        navigate('/');
    };

    return (
        <div className="container-fluid" style={{ background: "#f0f0f0", padding: "20px" }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4">Add New Recipe</h2>
                    <form ref={formRef} onSubmit={(event) => { handleSubmit(event); handleClick(); }}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Dish Name:</label>
                            <input type="text" className="form-control" id="name" name="name" value={newRecipe.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Ingredients & Description:</label>
                            <textarea type="textarea" rows={5}  className="form-control" id="description" name="description" value={newRecipe.description} onChange={handleChange} required></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image URL:</label>
                            <input type="text" className="form-control" id="image" name="image" value={newRecipe.image} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRecipe;
