import { Link } from "react-router-dom"
import RecipeCard from "./RecipeCard"
import "./Recipes.css"

export default function SuggestedRecipes() {
    
    return (
        <>
        <h2>Suggested recipes</h2>
        <span className="searchStatement">You have searched for <span className="searchName">"Almond milk"</span></span>
        <Link to={"/fridge"}><button className="goBackBtn">Go back</button></Link>
        <RecipeCard />
        </>
    )
}