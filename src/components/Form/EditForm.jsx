import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Tooltip } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import "./EditForm.css"
import formatDate from "./Date.jsx"

export default function EditForm ({ fetchIngredients, id }) {
    const initialIngredient = { name: "", type: "", purchaseDate: "", expiryDate: ""};
    const [ingredientList, setIngredientList] = useState([]);
    const [formData, setFormData] = useState({ ...initialIngredient });
    const [purchaseDate, setPurchaseDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(false);

    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: '#fff',
    borderRadius: '3px',
    p: 4,
  };

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
      updatedFields.purchaseDate = formatDate(purchaseDate);
    }

    if (expiryDate) {
      updatedFields.expiryDate = formatDate(expiryDate);
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
    fetchIngredients();
    handleClose();
    };
  };

    return (
        <>
        <Tooltip title="Edit">
          <img onClick={handleOpen} className="icon" src="./assets/edit.png" alt="Edit" />
        </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
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
                value={ingredientList.fields?.name}
                onChange={handleChange}
                style={errorStyles}
            />
            </span>
            </div>

            <div className="editform-type">
            <label>Type</label>
            <select
                name="type"
                value={ingredientList.fields?.type}
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
            <label className="editform-purchaselabel">Purchase date</label>
            <div className="editform-purchasedate">
            <DatePicker 
                value={purchaseDate}
                onChange={handlePurchaseDateChange}
                format="DD/MM/YYYY"
                sx={{ fontSize: '15px' }}
                    />
                    </div>
            </div>

            <div className="editform-expiry">
            <label>Expiry date</label>
            <DatePicker 
                className="editform-expirydate"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                format="DD/MM/YYYY"
                sx={{ height: '20px' }}
            />
            </div>
        </form>
        
        </LocalizationProvider>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
            <LoadingButton
              loading={loading}
              onClick={handleUpdate}
              disabled={error}
              variant="contained"
              sx={{
                backgroundColor: 'rgb(250, 212, 102)',
                color: '#000',
                boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)',
                marginRight: '10px',
                padding: '5px 15px',
                textTransform: 'capitalize',
                '&:hover': {
                    backgroundColor: 'rgb(255, 230, 153)',
                }
              }}
            >
              Update
            </LoadingButton>
            <Button
            onClick={handleClose}
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)',
              padding: '5px 15px',
              textTransform: 'capitalize',
            }}
            >
              Cancel
              </Button>
          </Typography>
        </Box>
      </Modal>
      </>
    )
}