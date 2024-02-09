import React, { useEffect } from 'react'

import AppHeader from './AppHeader';
import AppBody from './AppBody';
import { Grid } from "@mui/material";
import { useFetch } from "../hooks/useFetch";
import { useCustomContext, useCustomContextUpdate, MODIFY_OPTIONS } from '../context/CustomContext';

export default function AppWrapper() {
    const updateContext = useCustomContextUpdate()
    const { notes } = useCustomContext()
    const { sendRequest, isLoading, reset } = useFetch();
    useEffect(() => {
        // Fetch your notes here
        const fetchNotes = async () => {
            try {
                const response = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes`);
                // Update context with the fetched notes
                updateContext({
                    target: MODIFY_OPTIONS.NOTES,
                    value: response.notes,
                });
            } catch (error) {
                console.error('Error fetching notes:', error);
                // Handle error if needed
            }
        };

        // Call the fetchNotes function when the component mounts
        fetchNotes();

        // Cleanup function to reset the useFetch state when the component unmounts
        return () => {
            reset();
        };
    }, []);
    return (
        <Grid container spacing={2} rowSpacing={1} sx={{
            padding: '0.5rem 1rem',
            margin: 0,
            justifyContent: 'center',
            width: '100%',
        }}>
            <AppHeader></AppHeader>
            <AppBody></AppBody>
        </Grid>
    )
}
