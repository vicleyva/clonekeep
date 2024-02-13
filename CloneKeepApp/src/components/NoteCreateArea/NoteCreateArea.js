import React, { useEffect, useState, useCallback } from "react";

import { useCustomContext, useCustomContextUpdate, MODIFY_OPTIONS } from '../../context/CustomContext';
import { Note } from '../Note/Note';
import NoteDummy from "../NoteDummy/NoteDummy";
import { Grid, Paper, ClickAwayListener } from '@mui/material';
import { useNotesService } from "../../services/useNoteService";

const defaultNewNote = {
    title: null,
    text: null,
    color: null,
    files: [],
    tags: [],
};

export function NoteCreateArea() {
    const { notes } = useCustomContext();
    const updateContext = useCustomContextUpdate();
    const { createNote, getNote } = useNotesService();


    const [newNote, setNewNote] = useState({
        ...defaultNewNote,
    });
    const [renderWithFocus, setRenderWithFocus] = useState(false);
    const [isGridFocused, setGridFocused] = useState(false);

    const resetNewNote = useCallback(() => {
        setNewNote({
            ...defaultNewNote,
        });
    }, []);

    useEffect(() => {
        resetNewNote();
    }, [notes.length, resetNewNote]);

    useEffect(() => {
        if (renderWithFocus) {
            setRenderWithFocus(false);
            setGridFocused(true);
        }
    }, [renderWithFocus]);

    const handleTitleChange = (e) => {
        setNewNote({ ...newNote, title: (e.target.value.length) ? e.target.value : null });
    };

    const handleTextChange = (e) => {
        setNewNote({ ...newNote, text: (e.target.value.length) ? e.target.value : null });
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            if (newNote.files === null) {
                setNewNote((prev) => ({ ...prev, files: files }));
            } else {
                setNewNote((prev) => ({ ...prev, files: [...prev.files, ...files] }));
            }
            setRenderWithFocus(true);
        }
    };

    const handleDeleteFile = (index) => {
        let filesNewArray = newNote.files.filter((file, fileIndex) => fileIndex !== index)
        setNewNote(prev => ({
            ...prev, files: [...filesNewArray]
        }))
    }

    const handleColorChange = (newColor) => {
        setNewNote({ ...newNote, color: (newColor.hex !== 'transparent') ? newColor.hex : null });
    };

    const handleFocus = () => {
        setGridFocused(true);
    };

    const handleClickAway = async () => {
        if (!!newNote.text || !!newNote.title || newNote.files.length) {
            const createNoteRequest = await createNote(newNote)

            const newCreatedNote = await getNote(createNoteRequest.noteID)

            updateContext({
                target: MODIFY_OPTIONS.ADD_NOTE,
                value: [newCreatedNote],
            });
        }
        setGridFocused(false);
        resetNewNote()
    };

    const handleAddTag = (tag) => {
        const newTag = {
            text: tag
        }
        setNewNote((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
    };

    const handleDeleteTag = (tagToDelete) => {
        setNewNote((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToDelete),
        }));
    };
    return (
        <Grid container spacing={2} rowSpacing={1} justifyContent="center" wrap="wrap" style={{ margin: '2rem 0' }}>
            <Grid item xs={12} sm={8} md={4} >
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Paper
                        variant="outlined"
                        onFocus={handleFocus}
                        sx={{
                            borderRadius: '0.7rem',
                            padding: (!isGridFocused) ? '0.2rem 0.5rem' : '0.5rem 1rem',
                            backgroundColor: newNote.color || '',
                        }}
                    >
                        {isGridFocused ? (
                            <Note
                                note={newNote}
                                handleTitleChange={handleTitleChange}
                                handleTextChange={handleTextChange}
                                handleDeleteTag={handleDeleteTag}
                                handleAddTag={handleAddTag}
                                handleColorChange={handleColorChange}
                                handleFileInputChange={handleFileInputChange}
                                handleDeleteFile={handleDeleteFile}
                            />
                        ) : (
                            <NoteDummy handleFileInputChange={handleFileInputChange} />
                        )}
                    </Paper>
                </ClickAwayListener>
            </Grid>
        </Grid >
    );
}
