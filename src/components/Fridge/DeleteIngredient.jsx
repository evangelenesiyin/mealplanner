import { Tooltip } from "@mui/material";

export default function DeleteIngredient({ fetchIngredients, id }) {

    const handleRemove = async () => {
        const decision = window.confirm("Are you sure?");

    if (!decision) {
    return;
    }

    const AIRTABLE_API_KEY = 'patHEpY0OX1f5m692.3c173ace26d4a13ae350424ea67f610df9c6c2aa6486fd9008060dbe191ed051';
    const BASE_ID = 'appNo7BJCMjuy3aw5';
    const TABLE_NAME = 'Ingredients%20List';

    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });
    await response.json();
    fetchIngredients();
    };

    return (
        <Tooltip title="Delete">
        <img onClick={handleRemove} className="icon" src="./assets/delete.png" alt="Delete" />
        </Tooltip>
    )
}