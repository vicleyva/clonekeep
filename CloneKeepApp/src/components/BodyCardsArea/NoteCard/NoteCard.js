import React from "react";

import Chip from '@mui/material/Chip';
import IconButton from "@mui/material/IconButton"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ImageList, ImageListItem, Paper, TextField } from "@mui/material";

export function NoteCard({
    note,
    handleEditClick,
    index,
    handleMouseOver,
    handleMouseOut,
    selectedNoteIndex,
    hoveredIndex,
    anchorMenu,
    undefined,
    handleClick,
    handleClose,
    handleNoteEvent
}) {
    return (
        <Paper
            onClick={() => handleEditClick(index)}
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={handleMouseOut}
            variant="outlined"
            sx={{
                borderRadius: '0.6rem',
                padding: '0.5rem 1rem',
                marginTop: '1rem',
                backgroundColor: note.color || '',
                visibility: selectedNoteIndex !== null && selectedNoteIndex === index ? 'hidden' : 'visible',
                position: 'relative'
            }}>
            {!!note.files && note.files.length > 0 && <>
                <ImageList
                    sx={{
                        width: '100%'
                    }}
                    variant="quilted"
                    cols={Array.from(note.files).length < 3 ? Array.from(note.files).length : 3}
                >
                    {Array.from(note.files).map((file, index) => {
                        return (
                            <ImageListItem key={index} cols={1} rows={1}>
                                <img src={`${process.env.REACT_APP_ASSETS_URL}/${file.name}`}
                                    loading="lazy"
                                    alt={`${file.name}`}
                                    style={{
                                        borderRadius: '0.7rem',
                                        objectFit: 'cover',
                                        cursor: 'pointer',
                                        maxHeight: '10rem',
                                        maxWidth: '10rem'
                                    }}
                                />
                            </ImageListItem>
                        );
                    })}

                </ImageList>
            </>}
            {note.title &&
                <TextField
                    size="small"
                    InputProps={{
                        disableoutline: 'true',
                        disableUnderline: true
                    }}
                    sx={{
                        marginBottom: '0.5rem'
                    }} fullWidth variant="standard"
                    multiline
                    value={note.title}
                />
            }
            {note.text &&
                <TextField
                    size="small"
                    InputProps={{
                        disableoutline: 'true',
                        disableUnderline: true
                    }}
                    fullWidth
                    variant="standard"
                    multiline
                    value={note.text}
                />
            }
            {!!note.tags && note.tags.map((tag, tagIndex) => <Chip key={tagIndex} label={tag.text} style={{
                marginRight: '0.5rem',
                marginBottom: '0.5rem'
            }} />)}
            {hoveredIndex === index && <div className="delete-icon-container">
                <IconButton aria-label="more" id="menu-button" aria-controls={anchorMenu ? 'long-menu' : undefined} aria-expanded={anchorMenu ? 'true' : undefined} aria-haspopup="true" onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'menu-button'
                    }}
                    anchorEl={anchorMenu}
                    open={!!anchorMenu}
                    onClose={handleClose}>
                    <MenuItem id="delete" onClick={e => handleNoteEvent(e, index)}>
                        Delete note
                    </MenuItem>
                    <MenuItem id="clone" onClick={e => handleNoteEvent(e, index)}>
                        Clone note
                    </MenuItem>
                </Menu>
            </div>}
        </Paper>
    );
}
