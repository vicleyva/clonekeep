import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const TagManager = ({ onAddTag }) => {
    const [tagInput, setTagInput] = useState('');

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleAddTag = () => {
        if (tagInput.trim() !== '') {
            onAddTag(tagInput);
            setTagInput('');
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            handleAddTag();
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                label="Etiqueta"
                variant="outlined"
                value={tagInput}
                size="small"
                onKeyUp={handleKeyUp}
                onChange={handleTagInputChange}
                style={{ marginRight: '8px', width: '15rem' }}
            />
            <IconButton onClick={handleAddTag} aria-label="Add" color="primary">
                <AddIcon />
            </IconButton>
        </div>
    );
};

export default TagManager;
