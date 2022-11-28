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
import {Skeleton, Box} from '@mui/material'
import { TableHeadSC } from './UsuarioTable.styled';

export default function UsuaioTable() {

    const rows:any = [
        {
            id: '1',
            nome: 'João',
            email: 'joao@dbccompany.com.br',
            perfil: 'Instrutor'
        },
        {
            id: '2',
            nome: 'julia',
            email: 'julia@dbccompany.com.br',
            perfil: 'Gestão de Pessoa'
        },             
    ];

    return(

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeadSC>
          <TableRow>
            <TableCell align="center" sx={{color: 'white'}}>Código</TableCell>
            <TableCell align="center" sx={{color: 'white'}}>Nome</TableCell>
            <TableCell align="center" sx={{color: 'white'}}>E-mail</TableCell>
            <TableCell align="center" sx={{color: 'white'}}>Perfil</TableCell>
            <TableCell align="center" sx={{color: 'white'}}>Ação</TableCell>
          </TableRow>
        </TableHeadSC>
        <TableBody>
          { rows.length == 0|| rows == ''?  
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >              
              <TableCell align="center"><Skeleton  height={'60px'}/></TableCell>
              <TableCell align="center"><Skeleton  height={'60px'} /></TableCell>
              <TableCell align="center"><Skeleton  height={'60px'}/></TableCell>
              <TableCell align="center"><Skeleton  height={'60px'}/></TableCell>
              <TableCell align="center"><Skeleton  height={'60px'}/></TableCell>
            </TableRow>
              
            : rows.map((row:any) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center"> {row.id} </TableCell>
              <TableCell align="center">{row.nome}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.perfil}</TableCell>
              <TableCell align="center">
                <Box 
                sx={{
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '5px',
                  '& .MuiButtonBase-root': {
                    width: '100px',
                    fontSize: '12px'
                  },
                }}>
                <Button variant="contained" size='small' sx={{

                }}>Editar</Button>
                <Button variant="contained" color='secondary' size='small'>Desabilitar</Button>
                </Box>
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>   
  );
}

