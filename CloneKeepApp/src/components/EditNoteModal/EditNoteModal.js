import React, { useEffect, useState } from 'react';

import { useNotesService } from "../../services/useNoteService";
import { Dialog, DialogTitle, DialogContent, Backdrop } from '@mui/material';
import { useCustomContext, useCustomContextUpdate, MODIFY_OPTIONS } from '../../context/CustomContext';
import { Note } from '../Note/Note';

export function EditNoteModal({ open, onClose, index }) {
    const { notes } = useCustomContext();
    const updateContext = useCustomContextUpdate();
    const [editedNote, setEditedNote] = useState(null);
    const { deleteNoteTag, createNoteTag, getNote, deleteNoteFile, createNoteFile, updateNote } = useNotesService();

    useEffect(() => {
        notes[index] && setEditedNote(notes[index]);
    }, [notes, index]);

    const handleTitleChange = (e) => {
        setEditedNote({ ...editedNote, title: e.target.value });
    };

    const handleTextChange = (e) => {
        setEditedNote({ ...editedNote, text: e.target.value });
    };

    const handleModalClose = async () => {
        await updateNote(editedNote)
        const updatedNote = await getNote(editedNote.noteID)

        const index = notes.findIndex((n) => n.noteID === updatedNote.noteID);
        updateContext({
            target: MODIFY_OPTIONS.UPDATE_NOTE,
            value: updatedNote,
            index
        });

        onClose();
    }

    const handleAddTag = async (tag) => {
        const newTag = {
            text: tag
        }
        await createNoteTag(editedNote.noteID, newTag)
        const updatedNote = await getNote(editedNote.noteID)
        setEditedNote(updatedNote);
    };
    const handleDeleteTag = async (tagToDelete) => {
        await deleteNoteTag(editedNote.noteID, tagToDelete.noteTagID)
        const updatedNote = await getNote(editedNote.noteID)
        setEditedNote(updatedNote);
    };

    const handleColorChange = (newColor) => {
        setEditedNote({ ...editedNote, color: (newColor.hex !== 'transparent') ? newColor.hex : null });
    };

    const handleFileInputChange = async (e) => {
        const files = e.target.files;
        const filesArray = Array.from(files)

        if (filesArray.length) {
            await Promise.all(filesArray.map(async file => {
                await createNoteFile(editedNote.noteID, file)
            }))
            const updatedNote = await getNote(editedNote.noteID)
            setEditedNote(updatedNote);
        }
    };

    const handleDeleteFile = async (index) => {
        const fileToDelete = editedNote.files[index]
        await deleteNoteFile(editedNote.noteID, fileToDelete.noteFileID)
        const updatedNote = await getNote(editedNote.noteID)
        setEditedNote(updatedNote);
    }

    return (
        <>
            {!!editedNote &&
                <Dialog open={open}
                    onClose={handleModalClose}
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
                </Dialog>
            }
        </>
    );
}
