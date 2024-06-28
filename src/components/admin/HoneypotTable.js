import React from 'react';
import { TableCell, TableRow, Box } from '@mui/material';
import '../../pages/Honeypot/Honeypot.css'; // CSS 파일 임포트

// HoneypotTable 컴포넌트
function HoneypotTable({ row, handleRowClick }) {
  return (
    <TableRow className='honeypot-table-row'>
      <TableCell
      onClick={() => handleRowClick(row.honeypotCode, row.visibilityStatus)}
        style={{ cursor: 'pointer' }} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}} align="center">{row.honeypotCode}</TableCell>
      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}} align="center">{row.honeypotTitle}</TableCell>
      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}} align="center">{row.regDate}</TableCell>
      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}} align="center">{row.reportCount}</TableCell>
      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}} align="center">
        <Box onClick={() => handleRowClick(row.honeypotCode, row.visibilityStatus)}
          style={{ cursor: 'pointer' }} className={`status-cell ${row.visibilityStatus === '비활성화' ? 'inactive-status' : ''}`}>
          {row.visibilityStatus}
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default HoneypotTable;
