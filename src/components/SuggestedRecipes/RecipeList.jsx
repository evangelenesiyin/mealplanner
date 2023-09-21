import { Link } from "react-router-dom"
import RecipeCard from "./RecipeCard"
import "./Recipes.css"

export default function RecipeList() {

const handleReloadClick = () => {
    window.location.reload();
};

    return (
        <>
        <h2>What to cook...?</h2>
        <span className="searchStatement">Need ideas? Generate random recipes by clicking below!</span>

        <button className="randomBtn" onClick={handleReloadClick}>Generate</button>
        <Link to={"/fridge"}><button className="goBackBtn">Back</button></Link>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        </>
    )
}