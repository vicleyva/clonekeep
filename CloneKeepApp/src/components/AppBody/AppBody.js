import React from 'react'
import { BodyCardsArea } from '../BodyCardsArea/BodyCardsArea';
import { NoteCreateArea } from '../NoteCreateArea/NoteCreateArea';
import { Grid } from '@mui/material';

export default function AppBody() {
    return (
        <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{
            padding: '0rem 0rem',
            margin: '0 0 0 0',
        }}>
            <NoteCreateArea />
            <BodyCardsArea />
        </Grid>
    )
}
