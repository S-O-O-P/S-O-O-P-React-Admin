import React from 'react';
import Sidebar from '../components/commons/Sidebar';
import { Box } from '@mui/material';
import '../components/commons/Sidebar.css'; // Sidebar.css를 참조
import './Layout.css'; // Layout.css 추가

function Layout({ children }) {
  return (
    <Box className="layout">
      <Sidebar />
      <Box className="main-content">
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
