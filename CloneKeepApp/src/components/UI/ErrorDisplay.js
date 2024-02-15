import React from 'react'

import { Alert, AlertTitle } from '@mui/material';

export default function ErrorDisplay({ error }) {
    return (
        <Alert
            sx={{
                padding: '1rem',
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
            }}
            severity="error"
        >
            <AlertTitle>Error</AlertTitle>
            {error}
        </Alert>
    );
}

