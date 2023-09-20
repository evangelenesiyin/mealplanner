import { Link } from 'react-router-dom';
import { Tooltip } from "@mui/material";
import DeleteIngredient from './DeleteIngredient';

export default function IngredientCard({ fetchIngredients, id, name, type, purchaseDate, expiryDate }) {

    return (
            <div className="ingredient-card grid-item">
                <span>
                    <p className="ingredient-name">{name}</p>
                </span>
                <span className="icon-container">
                    <Tooltip title="Search recipes">
                        <Link to={`/fridge/${id}`}><img className="icon" src="./assets/search.png" alt="Search recipes" /></Link>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Link to={`/fridge/${id}/edit`}><img className="icon" src="./assets/edit.png" alt="Edit" /></Link>
                    </Tooltip>
                    <DeleteIngredient
                    id={id}
                    fetchIngredients={fetchIngredients}
                    />
                </span>
                    <p className="ingredient-type"><em>{type}</em></p>
                    <p className="purchased-date">Purchased on {purchaseDate}</p>
                    <p className="expiry-date">Expiring on {expiryDate}</p>
            </div>
    )
}