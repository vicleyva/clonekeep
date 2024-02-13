import React from 'react'
import TextField from '@mui/material/TextField'
import IconButton from "@mui/material/IconButton"
import { Grid } from "@mui/material"
import { Search } from "@mui/icons-material"
import CloseIcon from '@mui/icons-material/Close'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useCustomContext, useCustomContextUpdate, MODIFY_OPTIONS } from '../context/CustomContext';

export default function AppHeader() {
    const { theme } = useCustomContext()
    const updateContext = useCustomContextUpdate()
    return (
        <>
            <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                <Grid item xs={2} sm={2} md={4} >
                    Keep
                </Grid>
                <Grid item xs={8} sm={8} md={4}>
                    <TextField
                        placeholder="Search"
                        fullWidth
                        size="small"
                        InputProps={{
                            style: {
                                borderRadius: '0.7rem',
                            },
                            startAdornment: (
                                <IconButton>
                                    <Search />
                                </IconButton>
                            ),
                            endAdornment: (
                                <IconButton>
                                    <CloseIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>
                <Grid container item spacing={2} justifyContent="flex-end" xs={2} sm={2} md={4} sx={{ marginTop: 0 }}>
                    <IconButton onClick={() => updateContext({ target: MODIFY_OPTIONS.TOGGLE_THEME, value: !theme })}>
                        {theme ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Grid>
            </Grid >
        </>
    )
}
