import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Loading...</h1>
            <CircularProgress />
        </div>
    );
};

export default Spinner;
