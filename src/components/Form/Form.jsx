import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function Form ({ ingredientList, setIngredientList, initialIngredient, formData, setFormData, isFormOpen, toggleFormClose }) {
    const [purchaseDate, setPurchaseDate] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);

    const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    const handlePurchaseDateChange = (date) => {
    setPurchaseDate(date);
    };

    const handleExpiryDateChange = (date) => {
    setExpiryDate(date);
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.name.trim() === '' || formData.selected === '' || !purchaseDate || !expiryDate) {
      return;
    }
    const newIngredient = {
      ...formData,
      purchaseDate: purchaseDate.toISOString(), // Convert to ISO string
      expiryDate: expiryDate.toISOString(), // Convert to ISO string
    };
    setIngredientList([...ingredientList, newIngredient]);
    setFormData({ ...initialIngredient });
    setPurchaseDate(null); // Reset date fields
    setExpiryDate(null);
  };
    console.log(ingredientList)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                <DatePicker
                value={purchaseDate}
                onChange={handlePurchaseDateChange}
                format="DD/MM/YYYY"
            />
                <label>Expires on</label>
                <DatePicker
                value={expiryDate}
                onChange={handleExpiryDateChange}
                format="DD/MM/YYYY"
            />
                <button>Submit</button>
                <button onClick={toggleFormClose}>Close</button>
            </form>
            </div>
            </LocalizationProvider>
    )
}