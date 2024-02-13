import React, { useEffect } from 'react'

import AppHeader from '../AppHeader/AppHeader';
import AppBody from '../AppBody/AppBody';
import { Grid } from "@mui/material";
import { useCustomContextUpdate, MODIFY_OPTIONS } from '../../context/CustomContext';
import { useNotesService } from "../../services/useNoteService";
import Spinner from '../UI/Spinner';

export default function AppWrapper() {
    const updateContext = useCustomContextUpdate()
    const { isLoading, fetchNotes, reset } = useNotesService();

    useEffect(() => {
        // Fetch your notes here
        const fetchData = async () => {
            try {
                const getNotesRequest = await fetchNotes()

                // Update context with the fetched notes
                updateContext({
                    target: MODIFY_OPTIONS.UPDATE_NOTES,
                    value: getNotesRequest.notes,
                });
            } catch (error) {
                // console.error('Error fetching notes:', error);
                // Handle error if needed
            }
        };
        fetchData();

        return () => {
            reset();
        };
        // eslint-disable-next-line
    }, []);
    return (
        <Grid container spacing={2} rowSpacing={1} sx={{
            padding: '0.5rem 1rem',
            margin: 0,
            justifyContent: 'center',
            width: '100%',
        }}>
            {isLoading && <Spinner></Spinner>}
            {!isLoading &&
                <>
                    <AppHeader></AppHeader>
                    <AppBody></AppBody>
                </>
            }
        </Grid>
    )
}
