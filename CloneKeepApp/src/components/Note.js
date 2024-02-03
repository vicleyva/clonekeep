import React, { useRef, useState } from "react";

import { ImagesArea } from './ImagesArea';
import { TextField, Tooltip, IconButton, Menu, MenuItem } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { CirclePicker } from 'react-color';
import './CirclePickerStyles.css'
import TagManager from "./TagManager";
import Chip from '@mui/material/Chip';

export function Note({
    note,
    handleTitleChange,
    handleTextChange,
    handleDeleteTag,
    handleAddTag,
    handleColorChange,
    handleFileInputChange
}) {
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [tagMenuAnchor, setTagMenuAnchor] = useState(null);
    const fileInputRef = useRef(null);
    const colorPickerButtonRef = useRef(null);

    const handleImageIconClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInputRef.current.click();
    };

    const handleColorIconClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setColorPickerVisible(prev => !prev);
    };

    const handleTagMenuOpen = (event) => {
        setTagMenuAnchor(event.currentTarget);
    };

    const handleTagMenuClose = () => {
        setTagMenuAnchor(null);
    };

    return <>
        <ImagesArea note={note} />
        <TextField placeholder="Título"
            InputProps={{
                style: {
                    outline: 'none'
                },
                disableUnderline: true
            }}
            sx={{
                marginBottom: '0.5rem'
            }}
            fullWidth
            variant="standard"
            multiline
            onChange={handleTitleChange}
            value={note.titulo}
        />
        <TextField
            placeholder="Añade una nota..."
            fullWidth
            variant="standard"
            onChange={handleTextChange}
            InputProps={{
                style: {
                    outline: 'none',
                    borderRadius: '0.7rem'
                },
                disableUnderline: true
            }}
            value={note.texto}
        />
        {note.tags.map((tag, index) =>
            <Chip
                key={index}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                style={{
                    marginRight: '0.5rem',
                    marginBottom: '0.5rem'
                }}
            />
        )}
        <div>
            <Tooltip title="Agregar imagen">
                <IconButton onMouseDown={handleImageIconClick}>
                    <ImageOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Color de fondo">
                <IconButton onMouseDown={handleColorIconClick} ref={colorPickerButtonRef}>
                    <PaletteOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Etiquetas">
                <IconButton onClick={handleTagMenuOpen}>
                    <LocalOfferOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Menu anchorEl={tagMenuAnchor} open={tagMenuAnchor !== null} onClose={handleTagMenuClose}>
                <MenuItem>
                    <TagManager onAddTag={handleAddTag} />
                </MenuItem>
            </Menu>
            {colorPickerVisible &&
                <CirclePicker
                    onChange={handleColorChange}
                    color={note.color}
                    circleSize={20}
                    colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "rgba(0, 0, 0, 0)"]}
                    styles={{
                        default: {
                            border: "2px solid #ccc"
                        }
                    }}
                />
            }
            <input type="file" id="fileInput" multiple accept=".jpg,.jpeg,.png,.svg" ref={fileInputRef} style={{
                display: 'none'
            }} onChange={handleFileInputChange} />
        </div>
    </>;
}
