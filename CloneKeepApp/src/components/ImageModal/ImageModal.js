import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';

export function ImageModal({
    note,
    selectedImage,
    closeModal
}) {
    return (
        <Dialog open={selectedImage !== null} onClose={closeModal} style={{
            width: '100%',
            height: '100%'
        }}>
            <DialogContent>
                <img src={note.files[selectedImage] instanceof File ? URL.createObjectURL(note.files[selectedImage]) : `${process.env.REACT_APP_ASSETS_URL}/${note.files[selectedImage].name}`} alt={`Note ${selectedImage}`} style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover'
                }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}
