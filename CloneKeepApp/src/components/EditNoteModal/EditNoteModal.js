import React, { useEffect, useState } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Backdrop } from '@mui/material';
import { useCustomContext, useCustomContextUpdate, MODIFY_OPTIONS } from '../../context/CustomContext';
import { Note } from '../Note/Note';

export function EditNoteModal({ open, onClose, index }) {
    const { notes } = useCustomContext();
    const updateContext = useCustomContextUpdate();
    const [editedNote, setEditedNote] = useState(null);

    useEffect(() => {
        notes[index] && setEditedNote(notes[index]);
    }, [notes, index]);

    const handleTitleChange = (e) => {
        setEditedNote({ ...editedNote, title: e.target.value });
    };

    const handleTextChange = (e) => {
        setEditedNote({ ...editedNote, text: e.target.value });
    };

    const handleSave = () => {
        const index = notes.findIndex((n) => n.id === editedNote.id);
        if (index !== -1) {
            updateContext({
                target: MODIFY_OPTIONS.UPDATE_NOTE,
                value: editedNote,
                index
            });
        }

        onClose();
    };

    const handleAddTag = (tag) => {
        setEditedNote((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    };
    const handleDeleteTag = (tagToDelete) => {
        setEditedNote((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToDelete),
        }));
    };

    const handleColorChange = (newColor) => {
        setEditedNote({ ...editedNote, color: (newColor.hex !== 'transparent') ? newColor.hex : '' });
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            if (!editedNote.files.length) {
                setEditedNote((prev) => ({ ...prev, files: files }));
            } else {
                setEditedNote((prev) => ({ ...prev, files: [...prev.files, ...files] }));
            }
        }
    };

    const handleDeleteFile = (index) => {
        console.log('File to delete', editedNote.files[index]);
    }

    return (
        <>
            {!!editedNote &&
                <Dialog open={open}
                    onClose={onClose}
                    PaperProps={{
                        style: {
                            backgroundColor: (editedNote.color) ? editedNote.color : '',
                            margin: '0.3rem'
                        }
                    }}
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        style: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set your desired backdrop color and opacity
                        },
                    }}
                >
                    <DialogTitle>Edit Note</DialogTitle>
                    <DialogContent>
                        <Note
                            note={editedNote}
                            handleTitleChange={handleTitleChange}
                            handleTextChange={handleTextChange}
                            handleDeleteTag={handleDeleteTag}
                            handleAddTag={handleAddTag}
                            handleColorChange={handleColorChange}
                            handleFileInputChange={handleFileInputChange}
                            handleDeleteFile={handleDeleteFile}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' onClick={onClose}>Cancel</Button>
                        <Button variant='outlined' onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    );
}
