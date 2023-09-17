export default function IngredientCard() {
    return (
        <>
                <div className="ingredient-card grid-item">
                <span>
                    <p className="ingredient-name">Chicken</p>
                </span>
                <span className="icon-container">
                    <img className="icon" src="./assets/search.png" alt="Search recipes" />
                    <img className="icon" src="./assets/edit.png" alt="Edit" />
                    <img className="icon" src="./assets/delete.png" alt="Delete" />
                </span>
                    <p className="ingredient-type">Meat</p>
                    <p className="purchased-date">Purchased on 17/09/2023</p>
                    <p className="expiry-date">Expiring on 30/09/2023</p>
                </div>
        </>
    )
}