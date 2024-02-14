import React, { useEffect, useState } from 'react'

import { useDebouncer } from "../../hooks/useDebouncer";
import AppHeader from '../AppHeader/AppHeader';
import AppBody from '../AppBody/AppBody';
import { Grid } from "@mui/material";
import { useCustomContext, useCustomContextUpdate, MODIFY_OPTIONS } from '../../context/CustomContext';
import { useNotesService } from "../../services/useNoteService";
import Spinner from '../UI/Spinner';
import NoNotesFound from './NoNotesFound';

export default function AppWrapper() {
    const { notes } = useCustomContext()
    const updateContext = useCustomContextUpdate()
    const [search, setSearch] = useState(null);
    const debouncedSearch = useDebouncer(search)
    const { isLoading, fetchNotes, reset } = useNotesService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getNotesRequest = await fetchNotes(debouncedSearch)

                updateContext({
                    target: MODIFY_OPTIONS.UPDATE_NOTES,
                    value: getNotesRequest.notes,
                });
            } catch (error) {
                // console.error('Error fetching notes:', error);
            }
        };
        fetchData();

        return () => {
            reset();
        };

    }, [debouncedSearch]);

    return (
        <Grid container spacing={2} rowSpacing={1} sx={{
            padding: '0.5rem 1rem',
            margin: 0,
            justifyContent: 'center',
            width: '100%',
        }}>
            <AppHeader search={search} setSearch={setSearch}></AppHeader>
            {isLoading && <Spinner></Spinner>}
            {!isLoading && !notes.length && <NoNotesFound></NoNotesFound>}
            {!isLoading && !!notes.length &&
                <AppBody></AppBody>
            }
        </Grid>
    )
}
