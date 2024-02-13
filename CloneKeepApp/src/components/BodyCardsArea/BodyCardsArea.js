import React, { useState } from "react";

import { NoteCard } from './NoteCard/NoteCard';
import { useCustomContext, useCustomContextUpdate, MODIFY_OPTIONS } from '../../context/CustomContext';
import { useNotesService } from "../../services/useNoteService";
import { EditNoteModal } from "../EditNoteModal/EditNoteModal";
import { Grid } from "@mui/material";
import Masonry from '@mui/lab/Masonry';


import './BodyCardsArea.css'

export function BodyCardsArea() {
    const { notes } = useCustomContext();
    const updateContext = useCustomContextUpdate();
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [anchorMenu, setAnchorElMenu] = useState(null);
    const { fetchNotes, deleteNote, cloneNote } = useNotesService();

    const handleEditClick = (index) => {
        setSelectedNoteIndex(index);
    };

    const handleEditModalClose = () => {
        setSelectedNoteIndex(null);
    };

    const handleMouseOver = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseOut = () => {
        setHoveredIndex(null);
    };

    const handleNoteEvent = async (e, noteIndex) => {
        e.preventDefault();
        e.stopPropagation();

        switch (e.currentTarget.id) {
            case 'delete':
                {
                    const targetNoteToDelete = notes.find((note, index) => index === noteIndex)
                    await deleteNote(targetNoteToDelete.noteID)
                    const getNotesRequest = await fetchNotes()
                    updateContext({
                        target: MODIFY_OPTIONS.UPDATE_NOTES,
                        value: getNotesRequest.notes,
                    });
                }
                break;
            case 'clone':
                {
                    const targetNoteToClone = notes.find((note, index) => index === noteIndex)
                    await cloneNote(targetNoteToClone.noteID)
                    const getNotesRequest = await fetchNotes()
                    updateContext({
                        target: MODIFY_OPTIONS.UPDATE_NOTES,
                        value: getNotesRequest.notes,
                    });
                }
                break;
            default:
                console.log('Action not handled');
                break;
        }
        setAnchorElMenu(null);
    };

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setAnchorElMenu(e.currentTarget);
    };
    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setAnchorElMenu(null);
    };

    return (
        <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            sx={{
                padding: 0,
                margin: 0,
            }}
        >
            <Masonry spacing={1} columns={{ xs: 1, sm: 2, md: 4 }}>
                {
                    notes.map((note, index) =>
                    (
                        <NoteCard
                            key={index}
                            note={note}
                            handleEditClick={handleEditClick}
                            index={index}
                            handleMouseOver={handleMouseOver}
                            handleMouseOut={handleMouseOut}
                            selectedNoteIndex={selectedNoteIndex}
                            hoveredIndex={hoveredIndex}
                            anchorMenu={anchorMenu}
                            undefined={undefined}
                            handleClick={handleClick}
                            handleClose={handleClose}
                            handleNoteEvent={handleNoteEvent} />
                    ))
                }
                <EditNoteModal
                    open={selectedNoteIndex !== null}
                    onClose={() => handleEditModalClose()}
                    index={selectedNoteIndex}
                />
            </Masonry>
        </Grid>
    )
}
