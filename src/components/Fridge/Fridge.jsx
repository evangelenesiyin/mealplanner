import { useState } from "react"
import IngredientCard from "./IngredientCard"
import Form from "../Form/Form"
import "./Fridge.css"

export default function Fridge () {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const toggleFormOpen = () => {
        setIsFormOpen(true);
    };

    const toggleFormClose = () => {
        setIsFormOpen(false);
    }

    return (
        <div className="container">
        <h2>Track your ingredients!</h2>
        <button className="add-ingredient" onClick={toggleFormOpen}>Add new</button>
        <Form isFormOpen={isFormOpen} toggleFormClose={toggleFormClose} />
        <div className="ingredients-list grid">
    <IngredientCard />
    <IngredientCard />
    <IngredientCard />
    <IngredientCard />
    <IngredientCard />
</div>
        </div>
    )
};