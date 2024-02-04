import React, { useEffect, useState, useCallback } from "react";

import { useCustomContext, useCustomContextUpdate, MODIFY_OPTIONS } from '../context/CustomContext';
import { Note } from './Note';
import NoteDummy from "./NoteDummy";
import { Grid, Paper, ClickAwayListener } from '@mui/material';

const defaultNewNote = {
    titulo: '',
    texto: '',
    color: false,
    img: null,
    tags: [],
};

export function CreateArea() {
    const { notes } = useCustomContext();
    const updateContext = useCustomContextUpdate();

    const [newNote, setNewNote] = useState({
        id: notes.length + 1,
        ...defaultNewNote,
    });
    const [renderWithFocus, setRenderWithFocus] = useState(false);
    const [isGridFocused, setGridFocused] = useState(false);

    const resetNewNote = useCallback(() => {
        setNewNote({
            id: notes.length + 1,
            ...defaultNewNote,
        });
    }, [notes.length]);

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
        setNewNote({ ...newNote, titulo: e.target.value });
    };

    const handleTextChange = (e) => {
        setNewNote({ ...newNote, texto: e.target.value });
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            if (newNote.img === null) {
                setNewNote((prev) => ({ ...prev, img: files }));
            } else {
                setNewNote((prev) => ({ ...prev, img: [...prev.img, ...files] }));
            }
            setRenderWithFocus(true);
        }
    };

    const handleColorChange = (newColor) => {
        setNewNote({ ...newNote, color: newColor.hex });
    };

    const handleFocus = () => {
        setGridFocused(true);
    };

    const handleClickAway = () => {
        setGridFocused(false);
        resetNewNote()
        if (newNote.texto.trim().length || newNote.titulo.trim().length || !!newNote.img) {
            updateContext({
                target: MODIFY_OPTIONS.NOTES,
                value: [newNote],
            });
        }
    };

    const handleAddTag = (tag) => {
        setNewNote((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
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
