import React, { useState } from "react";

import './ImagesArea.css'
import { ImageModal } from '../../ImageModal/ImageModal';
import { IconButton, ImageList, ImageListItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function ImagesArea({ note, handleDeleteFile }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

    const openModal = (index) => {
        setSelectedImage(index);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleMouseOver = (index) => {
        setHoveredImageIndex(index)
    }

    const handleMouseOut = () => {
        setHoveredImageIndex(null)
    }

    const handleDeleteImageIconClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleDeleteFile(hoveredImageIndex)
    }

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
                        <ImageListItem
                            key={index}
                            cols={1}
                            rows={1}
                            onMouseOver={() => handleMouseOver(index)}
                            onMouseOut={handleMouseOut}
                            sx={{
                                position: 'relative'
                            }}
                        >
                            <img src={objectURL}
                                alt={`Note ${index}`}
                                loading="lazy"
                                style={{
                                    borderRadius: '0.7rem',
                                    objectFit: 'cover',
                                    maxHeight: '20rem'
                                }}
                            />
                            {hoveredImageIndex === index && (
                                <div
                                    className="delete-image-container"
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => openModal(index)}
                                >
                                    <IconButton
                                        onClick={handleDeleteImageIconClick}
                                        color="primary"
                                        aria-label="delete image"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            )}
                        </ImageListItem>
                    )
                })}
            </ImageList >
            {
                selectedImage !== null && (
                    <ImageModal note={note} selectedImage={selectedImage} closeModal={closeModal} />
                )
            }
        </>
    );
}
