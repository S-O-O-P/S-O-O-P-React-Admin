import React from 'react';
import { TableCell, TableRow, Box } from '@mui/material';
import '../admin/Table.css' ; // CSS 파일 임포트

function HoneypotTable({ row, handleRowClick }) {
  return (
    <TableRow className="table-row">
      <TableCell className="table-cell">{row.honeypotCode}</TableCell>
      <TableCell onClick={() => handleRowClick(row.honeypotCode)} style={{ cursor: 'pointer' }} className="table-cell">{row.honeypotTitle}</TableCell>
      <TableCell className="table-cell">{row.regDate}</TableCell>
      <TableCell className="table-cell">{row.reportCount}</TableCell>
      <TableCell className="table-cell">
        <Box className={`answer-status ${row.visibilityStatus === '비활성화' ? 'notAnswer-status' : ''}`}>
          {row.visibilityStatus}
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default HoneypotTable;
