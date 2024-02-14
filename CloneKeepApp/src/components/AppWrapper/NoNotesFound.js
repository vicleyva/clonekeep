import React from 'react'

import { Typography, Paper } from '@mui/material';

export default function NoNotesFound() {
    return (
        <Paper sx={{ padding: '1rem', marginTop: '2rem', textAlign: 'center', width: '100%' }}>
            <Typography variant="h6">No Notes Found</Typography>
            <Typography variant="body2">Try changing your search criteria or create a new note.</Typography>
        </Paper>
    );
}
