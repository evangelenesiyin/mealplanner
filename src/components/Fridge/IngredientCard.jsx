import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import DeleteIngredient from './DeleteIngredient';
import EditIngredient from './EditIngredient';

export default function IngredientCard({ ingredientList, setIngredientList, formData, name, type, purchaseDate, expiryDate }) {
    const formattedPurchaseDate = dayjs(purchaseDate).format('DD/MM/YYYY');
    const formattedExpiryDate = dayjs(expiryDate).format('DD/MM/YYYY');
    const navigate = useNavigate();

    return (
        <>
                <div className="ingredient-card grid-item">
                <span>
                    <p className="ingredient-name">{name}</p>
                </span>
                <span className="icon-container">
                    <img className="icon" src="./assets/search.png" alt="Search recipes" />
                    <EditIngredient />
                    <DeleteIngredient
                    ingredientList={ingredientList} setIngredientList={setIngredientList} formData={formData}
                    purchaseDate={purchaseDate}
                    expiryDate={expiryDate}
                    callback={() => navigate("/fridge")}
                    />
                </span>
                    <p className="ingredient-type"><em>{type}</em></p>
                    <p className="purchased-date">Purchased on {purchaseDate}</p>
                    <p className="expiry-date">Expiring on {expiryDate}</p>
                </div>
        </>
    )
}