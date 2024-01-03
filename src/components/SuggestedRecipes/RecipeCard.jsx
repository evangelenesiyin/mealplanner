import { useState, useEffect } from "react"
import DOMPurify from 'dompurify';
import "./Recipes.css"

export default function RecipeCard() {
    const [recipeData, setRecipeData] = useState(null);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            const recipeLink = "https://www.themealdb.com/api/json/v1/1/random.php"
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
        return (
        <div class="parent-grid" aria-hidden="true">
  <img src="" class="placeholder image" alt="" />
  <div class="card-body">
    <p class="card-text placeholder-glow ms-4">
      <span class="placeholder col-6"></span>
    </p>
    <p class="card-text placeholder-glow ms-4">
      <span class="placeholder col-7"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-4"></span>
    </p>
  </div>
</div>
        );
    }

    // https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/
    function sanitize(html) {
    const sanitized = DOMPurify.sanitize(html);
    const replaceLineBreak = sanitized.split('. ').join('.<br />');
    return { __html: replaceLineBreak };
    }

    return (
    <div className="parent-grid">
        <div className="recipe-image">
        <img src={recipeData.strMealThumb} alt={recipeData.strMeal} />
        </div>
        <div className="recipe-name-cat">
        <span className="recipe-name">{recipeData.strMeal}</span>
        <span className="recipe-category">{recipeData.strCategory}</span>
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
            <p className="recipe-instructions-text"
              dangerouslySetInnerHTML={sanitize(recipeData.strInstructions)}
            />
        </div>
        </>
        )}
    </div>
);
}