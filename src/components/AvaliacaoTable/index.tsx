import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { Skeleton } from '@mui/material'
import { TableHeadSC } from './AvaliacaoTable.styled';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { AvaliacaoContext } from '../../context/AvaliacaoContext';
import { useContext, useState } from 'react';
import { ConfirmDialog, TOptionsConfirmDialog } from '../ConfirmDialog';
import { AvaliacaoPagination } from '../AvaliacaoPagination';

export const AvaliacaoTable: React.FC = () => {

    const { deleteAvaliacao, avaliacoes, getAvaliacoes } = useContext(AvaliacaoContext);
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
                        <TableCell align="center" sx={{ color: 'white' }}>E-mail Aluno</TableCell>
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
                    {avaliacoes === undefined || avaliacoes.length === 0 ?
                        <TableRow
                            key={1}
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

                        : avaliacoes.map((row: any) => (
                            <TableRow
                                key={row.idAvaliacao}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center"> {row.idAvaliacao} </TableCell>
                                <TableCell align="center">{row.emailAluno}</TableCell>
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
                                    {/* definindo o fluxo */}
                                    <IconButton onClick={() => {
                                        navigate(`/cadastro/avaliacao/${(row.situacao === "AVALIADO" ? "simples" : "entrevista")}`, {
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
                                                deleteAvaliacao(row.idAvaliacao)
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
            <AvaliacaoPagination />
        </TableContainer>
    );
}


