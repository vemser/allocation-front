import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Button} from '@mui/material';

export default function AlunoTable() {

    const rows = [
        {
            id: '1',
            nome: 'João',
            email: 'joao@dbccompany.com.br',
            area: 'qa'
        },
        {
            id: '2',
            nome: 'julia',
            email: 'julia@dbccompany.com.br',
            area: 'backend'
        },             
    ];

    return(

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell align="center">Nome</TableCell>
            <TableCell align="center">E-mail</TableCell>
            <TableCell align="center">Áera</TableCell>
            <TableCell align="center">Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"> {row.id} </TableCell>
              <TableCell align="center">{row.nome}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.area}</TableCell>
              <TableCell align="center"><Button variant="contained">Editar</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>   
  );
}


