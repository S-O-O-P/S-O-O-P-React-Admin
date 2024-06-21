import React from 'react';
import { TableCell, TableRow, Box } from '@mui/material';
import '../../pages/Honeypot/Honeypot.css';

function HoneypotTable({ row, handleRowClick }) {
  return (
    <TableRow>
      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.no}</TableCell>
      <TableCell
        onClick={() => handleRowClick(row.no, row.status)}
        style={{ cursor: 'pointer' }}
        sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}
        align="center"
      >
        {row.title}
      </TableCell>
      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.date}</TableCell>
      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.report}</TableCell>
      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">
        <Box className="status-cell">
          {row.status}
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default HoneypotTable;
