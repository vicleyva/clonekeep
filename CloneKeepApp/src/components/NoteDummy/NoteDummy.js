import React, { useRef } from "react";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { IconButton, TextField, Tooltip } from '@mui/material';

export default function NoteDummy({ handleFileInputChange }) {
    const fileInputRef = useRef(null);

    const handleImageIconClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInputRef.current.click();
    };

    return (
        <TextField
            placeholder="Add note..."
            fullWidth
            variant="standard"
            InputProps={{
                style: { outline: 'none', borderRadius: '0.7rem', },
                disableUnderline: true,
                endAdornment: (
                    <>
                        <Tooltip title="New note with image"
                            style={{
                                marginLeft: '1rem',
                            }}
                        >
                            <IconButton onMouseDown={handleImageIconClick}>
                                <ImageOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <input
                            type="file"
                            id="fileInput"
                            multiple
                            accept=".jpg,.jpeg,.png,.svg"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                    </>
                ),
            }}
        />
    );
}

