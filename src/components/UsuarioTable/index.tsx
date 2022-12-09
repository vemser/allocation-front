import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material'
import { TableHeadSC } from './UsuarioTable.styled';
import { UsuarioPagination } from '../UsuarioPagination';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConfirmDialog, TOptionsConfirmDialog } from '../ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext';

export default function UsuarioTable() {
  const { users, deleteUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { userLogged } = useContext(AuthContext);

  const [confirmDialog, setConfirmDialog] = useState<TOptionsConfirmDialog>({
    isOpen: false,
    title: "",
    onConfirm: () => { }
  });

  const permiteEditar = (role: string) => {
    if (userLogged && userLogged?.cargos.filter((item) => {
      return item.nome === "ROLE_ADMINISTRADOR" ||
        (item.nome === "ROLE_GESTOR" && (role === "NENHUM" || role === "ROLE_INSTRUTOR")) ||
        (item.nome === "ROLE_GESTAO_DE_PESSOAS" && (role === "NENHUM" || role === "ROLE_INSTRUTOR"))
    })?.length > 0) {
      return true;
    }
    return false;
  }

  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeadSC>
          <TableRow>
            <TableCell align="center" sx={{ color: 'white' }}>Código</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>Nome</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>E-mail</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>Perfil</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>Ação</TableCell>
          </TableRow>
        </TableHeadSC>
        <TableBody>
          {users === undefined || users.length === 0 ?
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" colSpan={5}>Nenhum registro encontrado.</TableCell>
            </TableRow>

            : users.map((row: any) => (
              <TableRow
                key={row.idUsuario}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center"> {row.idUsuario} </TableCell>
                <TableCell align="center">{row.nomeCompleto}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{
                row.cargo?.nome == 'ROLE_ADMINISTRADOR'? "Administrador": 
                row.cargo?.nome == 'ROLE_GESTOR'? 'Gestor' : 
                row.cargo?.nome == 'ROLE_GESTAO_DE_PESSOAS'? 'Gestão de pessoas' : 
                row.cargo?.nome == 'ROLE_INSTRUTOR'? 'Instrutor' :
                row.cargo?.nome == null? 'Não atribuído' : 
                row.cargo?.nome
                }</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '5px',
                      '& .MuiButtonBase-root': {
                        width: '100px',
                        fontSize: '12px'
                      },
                    }}>
                    <IconButton disabled={!permiteEditar(row.cargo?.nome ?? "NENHUM")} onClick={() => {
                      navigate("/cadastro-usuario", {
                        state: row
                      })
                    }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton disabled={!permiteEditar(row.cargo?.nome ?? "NENHUM")} onClick={(event) => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Confirma a exclusão desse registro?',
                        onConfirm: () => {
                          setConfirmDialog({
                            ...confirmDialog,
                            isOpen: false
                          })
                          deleteUser(row.idUsuario)
                        }
                      });
                    }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <UsuarioPagination />
    </TableContainer>
  );
}