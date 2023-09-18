import { useState } from "react"

export default function Form ({ ingredientList, setIngredientList, initialIngredient, formData, setFormData, isFormOpen, toggleFormClose }) {

    const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.name.trim() === "" || formData.selected === "") {
      return;
    }
    setIngredientList([...ingredientList, formData]);
    setFormData({ ...initialIngredient });
  };
  console.log(ingredientList)

    return (
        isFormOpen && (
            <div className="modal-overlay">
            <form className="modal-container" onSubmit={handleSubmit}>
                <label>Ingredient</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Type</label>
          <select
            name="selected"
            value={formData.selected}
            onChange={handleChange}
          >
            <option disabled value="">
              Please select
            </option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Meat">Meat</option>
            <option value="Seafood">Seafood</option>
            <option value="Dairy">Dairy</option>
            <option value="Others">Others</option>
          </select>
                <label>Purchased on</label>
                <label>Expires on</label>
                <button>Submit</button>
                <button onClick={toggleFormClose}>Close</button>
            </form>
            </div>
        )
        )
}