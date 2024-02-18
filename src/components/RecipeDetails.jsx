import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const db = getFirestore();
                const recipeDoc = doc(db, 'recipes', id);
                const snapshot = await getDoc(recipeDoc);
                if (snapshot.exists()) {
                    setRecipe({ id: snapshot.id, ...snapshot.data() });
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching recipe: ', error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2>{recipe.name}</h2>
                    <img src={recipe.image} alt={recipe.name} />
                    <p>{recipe.description}</p>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetails;
