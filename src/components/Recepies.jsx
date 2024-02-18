import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [newRecipe, setNewRecipe] = useState({
        name: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        // Initialize Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyAWLJ5dc8Gd_DSPTCHos_c_RLYjsFAKMW4",
            authDomain: "recipe-5b867.firebaseapp.com",
            projectId: "recipe-5b867",
            storageBucket: "recipe-5b867.appspot.com",
            messagingSenderId: "491498779130",
            appId: "1:491498779130:web:f0e57298369b5b7c0eb443",
            measurementId: "G-N6R72XKD0B"
        };
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);

        // Fetch recipes from Firestore
        const fetchRecipes = async () => {
            try {
                const db = getFirestore();
                const recipesCollection = collection(db, 'recipes');
                const snapshot = await getDocs(recipesCollection);
                const recipesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRecipes(recipesData);
            } catch (error) {
                console.error('Error fetching recipes: ', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleChange = (e) => {
        setNewRecipe({
            ...newRecipe,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const db = getFirestore();
            const recipesCollection = collection(db, 'recipes');
            await addDoc(recipesCollection, newRecipe);

            // Fetch updated recipes after adding the new one
            const updatedSnapshot = await getDocs(recipesCollection);
            const updatedRecipesData = updatedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRecipes(updatedRecipesData);

            // Clear the form fields
            setNewRecipe({
                name: '',
                description: '',
                image: ''
            });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (

            <div className="container">
                <div className="coloum">
                    <div className="col-md-6">
                        <h2 className="mb-4">Recipes</h2>
                        <div className="row">
                            {recipes.map(recipe => (
                                <div className="col-md-6 mb-4" key={recipe.id}>
                                    <div className="card">
                                        <img src={recipe.image} className="card-img-top" alt={recipe.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{recipe.name}</h5>
                                            <p className="card-text">{recipe.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Recipes;
