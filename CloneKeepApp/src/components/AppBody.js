import React from 'react'
import { BodyCards } from './BodyCards';
import { CreateNote } from './CreateNote';
import { Grid } from '@mui/material';

export default function AppBody() {
    return (
        <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{
            padding: '0rem 0rem',
            margin: '0 0 0 0',
        }}>
            <CreateNote />
            <BodyCards />
        </Grid>
    )
}
