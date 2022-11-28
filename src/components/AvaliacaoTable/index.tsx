import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { Skeleton } from '@mui/material'
import { TableHeadSC } from './AvaliacaoTable.styled';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { AvaliacaoContext } from '../../context/AvaliacaoContext';
import { useContext, useState } from 'react';
import {ConfirmDialog, TOptionsConfirmDialog } from '../ConfirmDialog';

export const AvaliacaoTable: React.FC = () => {

    const { deleteAvaliacao } = useContext(AvaliacaoContext);

    const [confirmDialog, setConfirmDialog] = useState<TOptionsConfirmDialog>({
        isOpen: false,
        title: "",
        onConfirm: () => {}
    });

    const rows: any = [
        {
            codigo: 1,
            idAluno: 1,
            idVaga: 1,
            descricao: "teste teste teste",
            nota: 5,
            tipoAvaliacao: "teste",
            dataAvaliacao: "27-11-2022",
            dataEntrevistaGp: "27-11-2022",
            dataEntrevistaCliente: "27-11-2022",
            dataResposta: "27-11-2022",
            dataCriacao: "27-11-2022",
            situacao: "avaliado"
        },
        {
            codigo: 2,
            idAluno: 2,
            idVaga: 2,
            descricao: "teste teste teste",
            nota: 5,
            tipoAvaliacao: "teste",
            dataAvaliacao: "27-11-2022",
            dataEntrevistaGp: "27-11-2022",
            dataEntrevistaCliente: "27-11-2022",
            dataResposta: "27-11-2022",
            dataCriacao: "27-11-2022",
            situacao: "avaliado"
        }

    ];


    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHeadSC>
                    <TableRow>
                        <TableCell align="center" sx={{ color: 'white' }}>Código</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Aluno</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Vaga</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Descrição</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Nota</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Tipo Avaliação</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Data Avaliação</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Data Entrevista Gp</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Data Entrevista Cliente</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Data Resposta Cliente</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Situação</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Ações</TableCell>
                    </TableRow>
                </TableHeadSC>
                <TableBody>
                    {rows.length === 0 || rows === '' ?
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                            <TableCell align="center"><Skeleton height={'60px'} /></TableCell>
                        </TableRow>

                        : rows.map((row: any) => (
                            <TableRow
                                key={row.codigo}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center"> {row.codigo} </TableCell>
                                <TableCell align="center">{row.idAluno}</TableCell>
                                <TableCell align="center">{row.idVaga}</TableCell>
                                <TableCell align="center">{row.descricao}</TableCell>
                                <TableCell align="center">{row.nota}</TableCell>
                                <TableCell align="center">{row.tipoAvaliacao}</TableCell>
                                <TableCell align="center">{row.dataAvaliacao}</TableCell>
                                <TableCell align="center">{row.dataEntrevistaGp}</TableCell>
                                <TableCell align="center">{row.dataEntrevistaCliente}</TableCell>
                                <TableCell align="center">{row.dataResposta}</TableCell>
                                <TableCell align="center">{row.situacao}</TableCell>
                                <TableCell align="center">
                                    <Link style={{ textDecoration: 'none' }} to='/cadastro/avaliacao/entrevista'>
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                    <IconButton onClick={(event) => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: 'Are you sure to delete this record?',
                                            onConfirm: () => { 
                                                setConfirmDialog({
                                                    ...confirmDialog,
                                                    isOpen: false
                                                })
                                                deleteAvaliacao(row.codigo) 
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
        </TableContainer>
    );
}


