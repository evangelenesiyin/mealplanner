import { useState } from "react"

export default function Form ({ isFormOpen, toggleFormClose }) {
    const [selected, setSelected] = useState("");

    const handleChange = event => {
        setSelected(event.target.value);
    };

    return (
        isFormOpen && (
            <div className="modal-overlay">
            <form className="modal-container">
                <label>Ingredient</label>
                <input type="text" />
                <label>Type</label>
                <select value={selected} onChange={handleChange}>
                    <option disabled={true} value="">Please select</option>
                    <option>Fruit</option>
                    <option>Vegetable</option>
                    <option>Meat</option>
                    <option>Dairy</option>
                    <option>Others</option>
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