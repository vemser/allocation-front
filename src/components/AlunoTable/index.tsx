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
import { TableHeadSC } from './AlunoTable.styled';
import { useNavigate } from 'react-router-dom'

export default function AlunoTable() {
  const navigate = useNavigate();


    const alunos:any = [
        {
            id: '1',
            nome: 'João',
            area: 'qa',
            programa: '9edicao',
            email: 'joao@dbccompany.com.br',
            tecnologias: ['testes unitários', 'testar alguma coisa']
          },
          {
            id: '2',
            nome: 'julia',
            area: 'backend',
            programa: '11edicao',
            email: 'julia@dbccompany.com.br',
            tecnologias: ['java', 'node js']
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
            <TableCell align="center" sx={{color: 'white'}}>Área</TableCell>
            <TableCell align="center" sx={{color: 'white'}}>Ação</TableCell>
          </TableRow>
        </TableHeadSC>
        <TableBody>
          { alunos.length == 0|| alunos == ''?  
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >              
              <TableCell align="center"><Skeleton  height={'60px'}/></TableCell>
              <TableCell align="center"><Skeleton  height={'60px'} /></TableCell>
              <TableCell align="center"><Skeleton  height={'60px'}/></TableCell>
              <TableCell align="center"><Skeleton  height={'60px'}/></TableCell>
              <TableCell align="center"><Skeleton  height={'60px'}/></TableCell>
            </TableRow>
              
            : alunos.map((aluno:any) => (
            <TableRow
              key={aluno.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center"> {aluno.id} </TableCell>
              <TableCell align="center">{aluno.nome}</TableCell>
              <TableCell align="center">{aluno.email}</TableCell>
              <TableCell align="center">{aluno.area}</TableCell>
              <TableCell align="center">
                <Button variant="contained" onClick={()=> navigate('/cadastro-alunos', {state: aluno})}>Editar</Button>
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>   
  );
}


