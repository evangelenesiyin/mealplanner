import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import IngredientCard from "./IngredientCard";
import "./Fridge.css"

export default function Fridge () {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const initialIngredient = { name: "", type: "", purchaseDate: "", expiryDate: ""};
    const [ingredientList, setIngredientList] = useState([]);
    const [formData, setFormData] = useState({ ...initialIngredient });
    const [loading, setLoading] = useState(true);

    const toggleFormOpen = () => {
        setIsFormOpen(true);
    };

    const toggleFormClose = () => {
        setIsFormOpen(false);
    }

    const fetchIngredients = async () => {
        const AIRTABLE_API_KEY = 'patHEpY0OX1f5m692.3c173ace26d4a13ae350424ea67f610df9c6c2aa6486fd9008060dbe191ed051';
        const BASE_ID = 'appNo7BJCMjuy3aw5';
        const TABLE_NAME = 'Ingredients%20List';

      const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const ingredientsData = data.records.map((record) => ({
          id: record.id,
          ...record.fields,
        }));
        setIngredientList(ingredientsData);
        setLoading(false);
      }
    };

    useEffect(() => {
    fetchIngredients();
  }, []);

    return (
        <>
        <div className="container">
        <h2>Track your ingredients!</h2>
        <button className="add-ingredient" onClick={toggleFormOpen}>Add New Ingredient</button>
        <Link to={"/recipes"}><button className="random-recipe">Recipe Randomizer</button></Link>
        <Form isFormOpen={isFormOpen} toggleFormClose={toggleFormClose} ingredientList={ingredientList} setIngredientList={setIngredientList} formData={formData} setFormData={setFormData} initialIngredient={initialIngredient}/>
        
        <div className="ingredients-list grid">
          {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <div className="loading-skeleton" key={index}>
                            <div className="skeleton" aria-hidden="true">
                            <div className="card-body">
                              <p className="card-text placeholder-glow ms-1 -mt-2">
                                <span className="placeholder col-6"></span>
                              </p>
                              <p className="card-text placeholder-glow ms-1">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                              </p>
                            </div>
                          </div>
                        </div>
                    ))
                ) : (
    ingredientList.map((ingredient) => (
        <IngredientCard
        key={ingredient.id}
        name={ingredient.name}
        type={ingredient.type}
        purchaseDate={ingredient.purchaseDate}
        expiryDate={ingredient.expiryDate} 
        id={ingredient.id}
        ingredientList={ingredientList}
        fetchIngredients={fetchIngredients}
         />
    ))
                )}
    </div>
    </div>
    </>
)
}