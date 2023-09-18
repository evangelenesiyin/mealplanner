import { Tooltip } from "@mui/material";

export default function DeleteIngredient() {
    return (
        <Tooltip title="Delete">
        <img className="icon" src="./assets/delete.png" alt="Delete" />
        </Tooltip>
    )
}