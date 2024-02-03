import React from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useCustomContext } from './CustomContext'


export default function ThemeContext({ children }) {
    const { theme } = useCustomContext()

    const appTheme = createTheme({
        palette: {
            mode: theme ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider >
    )
}
