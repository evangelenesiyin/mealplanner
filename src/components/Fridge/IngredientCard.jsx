import dayjs from 'dayjs';
import DeleteIngredient from './DeleteIngredient';
import EditIngredient from './EditIngredient';

export default function IngredientCard({ name, selected, purchaseDate, expiryDate }) {
    const formattedPurchaseDate = dayjs(purchaseDate).format('DD/MM/YYYY');
    const formattedExpiryDate = dayjs(expiryDate).format('DD/MM/YYYY');

    return (
        <>
                <div className="ingredient-card grid-item">
                <span>
                    <p className="ingredient-name">{name}</p>
                </span>
                <span className="icon-container">
                    <img className="icon" src="./assets/search.png" alt="Search recipes" />
                    <EditIngredient />
                    <DeleteIngredient />
                </span>
                    <p className="ingredient-type"><em>{selected}</em></p>
                    <p className="purchased-date">Purchased on {formattedPurchaseDate}</p>
                    <p className="expiry-date">Expiring on {formattedExpiryDate}</p>
                </div>
        </>
    )
}