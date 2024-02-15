import React, { useRef, useState } from "react";

import { ImagesArea } from './ImagesArea/ImagesArea';
import TagManager from "./TagManager/TagManager";
import './Note.css'
import { TextField, Tooltip, IconButton, Menu, MenuItem } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { CirclePicker } from 'react-color';
import Chip from '@mui/material/Chip';

export function Note({
    note,
    handleTitleChange,
    handleTextChange,
    handleDeleteTag,
    handleAddTag,
    handleColorChange,
    handleFileInputChange,
    handleDeleteFile
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
        <ImagesArea note={note} handleDeleteFile={handleDeleteFile} />
        <TextField placeholder="Title"
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
            onChange={handleTitleChange}
            value={note.title || ''}
        />
        <TextField
            placeholder="Add note..."
            fullWidth
            variant="standard"
            onChange={handleTextChange}
            InputProps={{
                rows: 5,
                multiline: true,
                inputComponent: 'textarea',
                value: note.text || '',
                disableUnderline: true
            }}
        />
        {note.tags.map((tag, index) =>
            <Chip
                key={index}
                label={tag.text}
                onDelete={() => handleDeleteTag(tag)}
                style={{
                    marginRight: '0.5rem',
                    marginBottom: '0.5rem'
                }}
            />
        )}
        <div>
            <Tooltip title="Add image">
                <IconButton onMouseDown={handleImageIconClick}>
                    <ImageOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Background">
                <IconButton onMouseDown={handleColorIconClick} ref={colorPickerButtonRef}>
                    <PaletteOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Tags">
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
                    color={note.color || false}
                    circleSize={20}
                    colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#00000000"]}
                    styles={{
                        default: {
                            border: "2px solid #ccc"
                        }
                    }}
                />
            }
            <input
                type="file"
                id="fileInput"
                multiple
                accept=".jpg,.jpeg,.png,.svg"
                ref={fileInputRef}
                style={{
                    display: 'none'
                }}
                onChange={handleFileInputChange}
            />
        </div>
    </>;
}
