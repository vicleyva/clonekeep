import React from "react";
import { CustomContext } from './context/CustomContext';
import ThemeContext from "./context/ThemeContext";
import AppWrapper from "./components/AppWrapper/AppWrapper";

function App() {
  return (
    <CustomContext>
      <ThemeContext>
        <AppWrapper></AppWrapper>
      </ThemeContext>
    </CustomContext>
  );
}

export default App;
