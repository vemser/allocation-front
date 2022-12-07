import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Skeleton } from '@mui/material'
import { TableHeadSC } from './ProgramaTable.styled';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ConfirmDialog, TOptionsConfirmDialog } from '../ConfirmDialog';
import { ProgramaContext } from '../../context/ProgramaContext';
import { ProgramaPagination } from '../ProgramaPagination';

export const ProgramaTable: React.FC = () => {

    const { deletePrograma, getProgramas, programas } = useContext(ProgramaContext);
    const navigate = useNavigate();

    const [confirmDialog, setConfirmDialog] = useState<TOptionsConfirmDialog>({
        isOpen: false,
        title: "",
        onConfirm: () => { }
    });


    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHeadSC>
                    <TableRow>
                        <TableCell align="center" sx={{ color: 'white' }}>Código</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Nome</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Descrição</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Data Criação</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Data Término</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Situação</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Ações</TableCell>
                    </TableRow>
                </TableHeadSC>
                <TableBody>
                    {programas === undefined || programas.length === 0 ?
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" colSpan={7}>Nenhum registro encontrado.</TableCell>
                        </TableRow>

                        : programas.map((row: any) => (
                            <TableRow
                                key={row.idPrograma}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center"> {row.idPrograma} </TableCell>
                                <TableCell align="center">{row.nome}</TableCell>
                                <TableCell align="center">{row.descricao}</TableCell>
                                <TableCell align="center">{row.dataCriacao?.split("-").reverse().join("/")}</TableCell>
                                <TableCell align="center">{row.dataTermino?.split("-").reverse().join("/")}</TableCell>
                                <TableCell align="center">{row.situacao}</TableCell>
                                <TableCell align="center">

                                    <IconButton onClick={() => {
                                        navigate("/cadastro-programa", {
                                            state: row
                                        })
                                    }}>
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
                                                deletePrograma(row.idPrograma)
                                            }
                                        });
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <ProgramaPagination />
        </TableContainer>
    );
}