import React from 'react';
import Sidebar from '../components/commons/Sidebar';
import { Box, ThemeProvider } from '@mui/material';
import '../components/commons/Sidebar.css'; // Sidebar.css import
import './Layout.css'; // Layout.css import
import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  typography: {
    fontFamily: ["SUIT"].join(","),
  },
});

function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Box className="layout">
        <Sidebar />
        <Box className="main-content">
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
