import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TableCell, TableRow, Checkbox, Box } from '@mui/material';
import '../../pages/Honeypot/Honeypot.css';

function HoneypotTable({ row, selectedRows, handleSelectRow, handleRowClick }) {
  return (
    <TableRow>
      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">
        <Checkbox
          checked={selectedRows.includes(row.no)}
          onChange={() => handleSelectRow(row.no)}
        />
      </TableCell>
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