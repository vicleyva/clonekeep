import React from "react";

import ThemeContext from "./context/ThemeContext";
import { CustomContext } from './context/CustomContext';
import AppHeader from './components/AppHeader'
import AppBody from './components/AppBody'
import { Grid } from "@mui/material";

function App() {
  return (
    <CustomContext>
      <ThemeContext>
        <Grid container spacing={2} rowSpacing={1} sx={{
          padding: '0.5rem 1rem',
          margin: 0,
          justifyContent: 'center',
          width: '100%',
        }}>
          <AppHeader></AppHeader>
          <AppBody></AppBody>
        </Grid>
      </ThemeContext>
    </CustomContext>
  );
}

export default App;
