import React, { useState } from "react";

import { ImageList, ImageListItem } from "@mui/material";
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';

export function ImagesArea({ note }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (index) => {
        setSelectedImage(index);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    if (note.img === null) {
        return <></>
    }
    return (
        <>
            <ImageList
                sx={{ width: '100%' }}
                variant="quilted"
                cols={(Array.from(note.img).length < 3) ? Array.from(note.img).length : 3}
            >
                {Array.from(note.img).map((file, index) => {
                    const objectURL = URL.createObjectURL(file);
                    return (
                        <ImageListItem key={index} cols={1} rows={1}>
                            <img src={objectURL} alt={`Note ${index}`} loading="lazy"
                                style={{
                                    borderRadius: '0.7rem',
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                    maxHeight: '20rem'
                                }}
                                onClick={() => openModal(index)}
                            />
                        </ImageListItem>
                    )
                })}
            </ImageList >
            {selectedImage !== null && (
                <Dialog open={selectedImage !== null} onClose={closeModal}>
                    <DialogContent>
                        <img
                            src={URL.createObjectURL(note.img[selectedImage])}
                            alt={`Note ${selectedImage}`}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal}>Cerrar</Button>
                    </DialogActions>
                </Dialog>)
            }
        </>
    );
}
