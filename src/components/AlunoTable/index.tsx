import { useContext, useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog, TOptionsConfirmDialog } from '../ConfirmDialog';
import { ClienteContext } from '../../context/ClienteContext';
import { ClientePagination } from '../ClientePagination';
import { AlunoContext } from '../../context/AlunoContext';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AlunoPagination } from '../AlunoPagination';
import Pagination from '@mui/material/Pagination';

export default function AlunoTable() {
  const navigate = useNavigate();

  const { alunos, deleteAluno, getAlunos, totalPages } = useContext(AlunoContext);

  const [confirmDialog, setConfirmDialog] = useState<TOptionsConfirmDialog>({
      isOpen: false,
      title: "",
      onConfirm: () => { }
  });


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
          { alunos.length === 0|| alunos === undefined ?  
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
              key={aluno.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center"> {aluno.idAluno} </TableCell>
              <TableCell align="center">{aluno.nome}</TableCell>
              <TableCell align="center">{aluno.email}</TableCell>
              <TableCell align="center">{aluno.area}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => navigate('/cadastro-alunos', {state: aluno})}>
                    <EditIcon />
                </IconButton>

                <IconButton onClick={(event) => {
                    setConfirmDialog({
                        isOpen: true,
                        title: 'Confirma a exclusão desse registro?',
                        onConfirm: () => {
                            setConfirmDialog({
                                ...confirmDialog,
                                isOpen: false
                            })
                            deleteAluno(aluno.idAluno)
                              }
                        });
                      }}>
                      <DeleteIcon />
                </IconButton>

                {/* <Button variant="contained" onClick={()=> navigate('/cadastro-alunos', {state: aluno})}>Editar</Button> */}
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
          <AlunoPagination />
          <Box sx={{
            height: '40px',
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center'
          }}>            
            <Pagination count={totalPages} color="primary" />
          </Box>
          <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
    </TableContainer>   
  );
}


