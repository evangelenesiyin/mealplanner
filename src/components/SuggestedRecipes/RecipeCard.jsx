import { useState, useEffect } from "react"
import "./Recipes.css"

export default function RecipeCard() {
    const [recipeData, setRecipeData] = useState(null);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            // const ingredientLink = "https://www.themealdb.com/api/json/v1/1/filter.php?i=almond%20milk"
            const recipeLink = "https://www.themealdb.com/api/json/v1/1/search.php?s=Banana%20Pancakes"
            const recipeResponse = await fetch(recipeLink);
        
            if (!recipeResponse.ok) {
                return;
            }
            const recipeData = await recipeResponse.json();
            setRecipeData(recipeData.meals ? recipeData.meals[0] : null)
        };
        fetchRecipe();
    }, [])

    if (!recipeData) {
        return <div><em>Loading...</em></div>;
    }

    return (
    <div className="parent-grid">
        <div className="recipe-image">
        <img src={recipeData.strMealThumb} alt={recipeData.strMeal} />
        </div>
        <div className="recipe-name-cat">
        <span className="recipe-name">{recipeData.strMeal}</span>
        <span className="recipe-category">Category: {recipeData.strCategory}</span>
        <button className="show-more" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less" : "Show More"}
        </button>
        </div>
        {showMore && (
            <>
        <div className="recipe-ingredients">
            <p>Ingredients:</p>
            <ul>
            {/* ChatGPT - How to map through the ingredients and display them */}
            {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                const ingredient = recipeData[`strIngredient${i}`];
                const measurement = recipeData[`strMeasure${i}`];
                return (
                ingredient &&
                measurement && (
                    <li key={i}>
                    {measurement} {ingredient}
                    </li>
                )
                );
            })}
            </ul>
        </div>
        <div className="recipe-instructions">
            <p className="recipe-instructions-header">Instructions:</p>
            <p className="recipe-instructions-text">{recipeData.strInstructions}</p>
        </div>
        </>
        )}
    </div>
);
}