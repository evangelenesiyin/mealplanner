import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import formatDate from './Date';
import "./EditForm.css"

export default function EditForm () {
    const initialIngredient = { name: "", type: "", purchaseDate: "", expiryDate: ""};
    const [ingredientList, setIngredientList] = useState([]);
    const [formData, setFormData] = useState({ ...initialIngredient });
    const [purchaseDate, setPurchaseDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const { id } = useParams();

    const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    };

    const handlePurchaseDateChange = (date) => {
        setPurchaseDate(date);
    };

    const handleExpiryDateChange = (date) => {
        setExpiryDate(date);
    };

    const handleUpdate = async (event) => {
    event.preventDefault();

    if (formData.name.trim() === '' || formData.type === '' || !purchaseDate || !expiryDate) {
    return;
    }

    const newData = {
      "records": [
        {  
            "id": id,
            "fields": {
            "name": formData.name,
            "type": formData.type,
            "purchaseDate": purchaseDate,
            "expiryDate": expiryDate,
          },
        },
      ],
    };

    const AIRTABLE_API_KEY = 'patHEpY0OX1f5m692.3c173ace26d4a13ae350424ea67f610df9c6c2aa6486fd9008060dbe191ed051';
    const BASE_ID = 'appNo7BJCMjuy3aw5';
    const TABLE_NAME = 'Ingredients%20List';

    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      body: JSON.stringify(newData)
    });
    if (response.ok) {
      const newIngredient = {
        ...formData,
        purchaseDate: formatDate(purchaseDate),
        expiryDate: formatDate(expiryDate),
    };
    setIngredientList([...ingredientList, newIngredient]);
    setFormData({ ...initialIngredient });
    setPurchaseDate(null);
    setExpiryDate(null);
    };
  };

    return (
        <>
        <h2>Update details for {formData.name}</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        
        <form className="editform-container">
            <div className="editform-ingredient">
            <span>
            <label>Ingredient</label>
            </span>
            <span>
            <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            </span>
            </div>

            <div className="editform-type">
            <label>Type</label>
            <select
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

            <div className="editform-purchase">
            <label>Purchased on</label>
            <DatePicker 
                value={purchaseDate}
                onChange={handlePurchaseDateChange}
                format="DD/MM/YYYY"
                    />
            </div>

            <div className="editform-expiry">
            <label>Expires on</label>
            <DatePicker 
                value={expiryDate}
                onChange={handleExpiryDateChange}
                format="DD/MM/YYYY"
            />
            </div>
        
        <div className="editform-buttons">
        <button className="editform-submit" onClick={handleUpdate}>Submit</button>
        <Link to={`/fridge`}><button className="go-back">Back</button></Link>
        </div>
        </form>
        
        </LocalizationProvider>
        </>
    )
}