import { useState } from "react";
import { Tooltip } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';

export default function DeleteIngredient({ fetchIngredients, id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);

    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: '#fff',
    borderRadius: '3px',
    p: 4,
  };

    const handleRemove = async () => {
    setLoading(true);
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
    setLoading(false);
    handleClose();
    };

    return (
      <>
        <Tooltip title="Delete">
        <img onClick={handleOpen} className="icon" src="./assets/delete.png" alt="Delete" />
        </Tooltip>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: '18px', marginTop: '-10px', fontWeight: '300' }}>
            Confirm to delete?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
            <LoadingButton
              loading={loading}
              onClick={handleRemove}
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
              Delete
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