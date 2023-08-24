import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // Import your created theme
import LandingPage from "./Components/LandingPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Import Router and Routes
import SecondPage from "./Components/SecondPage";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/second" element={<SecondPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
