import "./Fridge.css"
import IngredientCard from "./IngredientCard"

export default function Fridge () {
    return (
        <div className="container">
        <h2>Track your Ingredients</h2>
        <div className="ingredients-fridge"></div>
        <button>Add new ingredients</button>
        <table className="ingredients-table table mt-5 ms-auto">
  <tbody>
    <IngredientCard />
    <IngredientCard />
    <IngredientCard />
    <IngredientCard />
  </tbody>
</table>
        </div>
    )
};