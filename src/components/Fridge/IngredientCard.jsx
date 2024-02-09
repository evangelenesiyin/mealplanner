import DeleteIngredient from './DeleteIngredient';
import EditForm from '../Form/EditForm';

export default function IngredientCard({ fetchIngredients, id, name, type, purchaseDate, expiryDate }) {
    
    return (
            <div className="ingredient-card grid-item">
                <span>
                    <p className="ingredient-name">{name}</p>
                </span>
                <span className="icon-container">
                    <EditForm
                    id={id}
                    fetchIngredients={fetchIngredients}
                    /> 
                    <DeleteIngredient
                    id={id}
                    fetchIngredients={fetchIngredients}
                    />
                </span>
                    <p className="ingredient-type"><em>{type}</em></p>
                    <p className="purchased-date">Purchase date: {purchaseDate}</p>
                    <p className="expiry-date">Expiry date: {expiryDate}</p>

            </div>
    )
}