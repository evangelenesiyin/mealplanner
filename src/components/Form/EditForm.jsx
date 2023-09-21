import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./EditForm.css"

export default function EditForm () {
    const initialIngredient = { name: "", type: "", purchaseDate: "", expiryDate: ""};
    const [ingredientList, setIngredientList] = useState({});
    const [formData, setFormData] = useState({ ...initialIngredient });
    const [purchaseDate, setPurchaseDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [error, setError] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    };

    const handlePurchaseDateChange = (date) => {
    if (expiryDate && date > expiryDate) {
      setError(true);
      alert("Invalid date. Purchase date is later than expiry date.")
      setPurchaseDate("")
    } else {
    setPurchaseDate(date);
    setError(false);
    };
  }

    const handleExpiryDateChange = (date) => {
      if (purchaseDate && date < purchaseDate) {
      setError(true);
      alert("Invalid date. Expiry date is earlier than purchase date.")
      setExpiryDate("");
    } else {
    setExpiryDate(date);
    setError(false);
    };
  }

  const errorStyles = error ? { borderColor: 'red' } : {};
  const errorButtonStyles = error
    ? { backgroundColor: 'lightgrey', color: 'darkgrey' }
    : {};

    const AIRTABLE_API_KEY = 'patHEpY0OX1f5m692.3c173ace26d4a13ae350424ea67f610df9c6c2aa6486fd9008060dbe191ed051';
    const BASE_ID = 'appNo7BJCMjuy3aw5';
    const TABLE_NAME = 'Ingredients%20List';

    const fetchIngredients = async () => {
      const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      });
        const data = await response.json();
        setIngredientList(data);
    };

    useEffect(() => {
        fetchIngredients();
    }, []);

    const handleUpdate = async (event) => {
    event.preventDefault();
    if (formData.name.trim() === '' && formData.type === '' && !purchaseDate && !expiryDate) {
      alert("Please fill in at least one field.")
    return;
    }

    const updatedFields = {};

    if (formData.name.trim() !== '') {
    updatedFields.name = formData.name;
    }

    if (formData.type !== '') {
      updatedFields.type = formData.type;
    }

    if (purchaseDate) {
      function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}/${month}/${year}`;
    }
      updatedFields.purchaseDate = formatDate(purchaseDate);
    }

    if (expiryDate) {
      function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}/${month}/${year}`;
    }

      updatedFields.expiryDate = formatDate(expiryDate);
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}/${month}/${year}`;
    }
    
    const newData = {
      "records": [
        {  
            "id": id,
            "fields": {
                ...updatedFields,
            },
        },
      ],
    };
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
    navigate("/fridge");
    setIngredientList([...ingredientList, newIngredient]);
    setFormData({ ...initialIngredient });
    setPurchaseDate(null);
    setExpiryDate(null);
    };
  };

    return (
        <>
        <div className="editform-statement">You are updating details for <span>"{ingredientList.fields?.name}"</span></div>
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
                style={errorStyles}
            />
            </span>
            </div>

            <div className="editform-type">
            <label>Type</label>
            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={errorStyles}
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
            <label>Purchase date</label>
            <DatePicker 
                value={purchaseDate}
                onChange={handlePurchaseDateChange}
                format="DD/MM/YYYY"
                    />
            </div>

            <div className="editform-expiry">
            <label>Expiry date</label>
            <DatePicker 
                value={expiryDate}
                onChange={handleExpiryDateChange}
                format="DD/MM/YYYY"
            />
            </div>
        
        <div className="editform-buttons">
        <button className="editform-submit" onClick={handleUpdate} style={errorButtonStyles} disabled={error}>Submit</button>
        <Link to={`/fridge`}><button className="go-back">Back</button></Link>
        </div>
        </form>
        
        </LocalizationProvider>
        </>
    )
}