import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import formatDate from './Date';
import "./Form.css"

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

    const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.name.trim() === '' || formData.type === '' || !purchaseDate || !expiryDate) {
    return;
    }
    const AIRTABLE_API_KEY = 'patHEpY0OX1f5m692.3c173ace26d4a13ae350424ea67f610df9c6c2aa6486fd9008060dbe191ed051';
    const BASE_ID = 'appNo7BJCMjuy3aw5';
    const TABLE_NAME = 'Ingredients%20List';

    const data = {
      "records": [
        {
          "fields": {
            "name": formData.name,
            "type": formData.type,
            "purchaseDate": purchaseDate,
            "expiryDate": expiryDate,
          },
        },
      ],
    };

    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const newIngredient = {
        ...formData,
        purchaseDate: formatDate(purchaseDate),
        expiryDate: formatDate(expiryDate),
    };
    console.log(newIngredient)
    setIngredientList([...ingredientList, newIngredient]);
    setFormData({ ...initialIngredient });
    setPurchaseDate(null);
    setExpiryDate(null);
    };
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        {isFormOpen && (
            <div>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-ingredient">
                  <span>
                    <label>Ingredient</label>
                    </span>
                    <span>
                    <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    </span>
                </div>

                <div className="form-type">
                    <label>Type</label>
                    <select
                        required
                        name="type"
                        value={formData.type}
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
                </div>

                <div className="form-purchase">
                    <label>Purchased on</label>
                    <DatePicker
                    value={purchaseDate}
                    onChange={handlePurchaseDateChange}
                    format="DD/MM/YYYY"
                    />
                </div>

                <div className='form-expiry'>
                    <label>Expires on</label>
                    <DatePicker
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    format="DD/MM/YYYY"
                    />
                </div>
                
                <div className='form-buttons'>
                  <button className="form-submit">Submit</button>
                  <button className="form-close" onClick={toggleFormClose}>Close</button>
                </div>
            </form>
            </div>
        )}
            </LocalizationProvider>
    )
        }