import React, { useState } from "react";

import { ImageModal } from '../../ImageModal/ImageModal';
import { ImageList, ImageListItem } from "@mui/material";

export function ImagesArea({ note }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (index) => {
        setSelectedImage(index);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    if (!note.files.length) {
        return <></>
    }
    return (
        <>
            <ImageList
                sx={{ width: '100%' }}
                variant="quilted"
                cols={(Array.from(note.files).length < 3) ? Array.from(note.files).length : 3}
            >
                {Array.from(note.files).map((file, index) => {
                    let objectURL
                    if (file instanceof File) {
                        objectURL = URL.createObjectURL(file);
                    } else {
                        objectURL = `${process.env.REACT_APP_ASSETS_URL}/${file.name}`
                    }
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
                <ImageModal note={note} selectedImage={selectedImage} closeModal={closeModal} File={File} />
            )
            }
        </>
    );
}
