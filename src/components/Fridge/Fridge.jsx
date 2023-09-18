import { useState } from "react";
import Form from "../Form/Form";
import IngredientCard from "./IngredientCard";
import "./Fridge.css"

export default function Fridge () {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const initialIngredient = { name: "", selected: "" };
    const [ingredientList, setIngredientList] = useState([]);

    const [formData, setFormData] = useState({ ...initialIngredient });

    const toggleFormOpen = () => {
        setIsFormOpen(true);
    };

    const toggleFormClose = () => {
        setIsFormOpen(false);
    }

    return (
        <>
        <div className="container">
        <h2>Track your ingredients!</h2>
        <button className="add-ingredient" onClick={toggleFormOpen}>Add new</button>
        <Form isFormOpen={isFormOpen} toggleFormClose={toggleFormClose} ingredientList={ingredientList} setIngredientList={setIngredientList} formData={formData} setFormData={setFormData} initialIngredient={initialIngredient}/>
        <div className="ingredients-list grid">
    {ingredientList.map((ingredient) => (
        <IngredientCard
        key={ingredient.name}
        name={ingredient.name}
        selected={ingredient.selected} />
    ))}
    </div>
    </div>
    </>
)
}