import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Skeleton } from '@mui/material'
import { TableHeadSC } from './ClienteTable.styled';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {  useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ConfirmDialog, TOptionsConfirmDialog } from '../ConfirmDialog';
import { ClienteContext } from '../../context/ClienteContext';
import { ClientePagination } from '../ClientePagination';

export const ClienteTable: React.FC = () => {

    const { deleteCliente, clientes, getClientes } = useContext(ClienteContext);
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
                        <TableCell align="center" sx={{ color: 'white' }}>E-mail</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Telefone</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Situação</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Ações</TableCell>
                    </TableRow>
                </TableHeadSC>
                <TableBody>
                    {clientes === undefined || clientes.length === 0 ?
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                        </TableRow>

                        : clientes.map((row: any) => (
                            <TableRow
                                key={row.idCliente}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center"> {row.idCliente} </TableCell>
                                <TableCell align="center">{row.nome}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.telefone}</TableCell>
                                <TableCell align="center">{row.situacao}</TableCell>
                                <TableCell align="center">

                                    <IconButton onClick={() => {
                                        navigate("/cadastro/cliente", {
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
                                                deleteCliente(row.idCliente)
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
            <ClientePagination/>
        </TableContainer>
    );
}


