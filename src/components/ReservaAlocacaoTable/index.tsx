import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton } from '@mui/material';
import { Skeleton } from '@mui/material'
import { TableHeadSC } from './ReservaAlocacaoTable.styled';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ConfirmDialog, TOptionsConfirmDialog } from '../ConfirmDialog';
import { ReservaAlocacaoContext } from '../../context/ReservaAlocacaoContext';
import { ReservaAlocacaoPagination } from '../ReservaAlocacaoPagination';

export const ReservaAlocacaoTable: React.FC = () => {

    const { deleteReservaAlocacao, reservasAlocacoes } = useContext(ReservaAlocacaoContext);
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
                        <TableCell align="center" sx={{ color: 'white' }}>Aluno</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Vaga</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Descrição</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Avaliação</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Data Reserva</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Data Alocação</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Data Cancelamento</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Data Finalização</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Situação</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Ações</TableCell>
                    </TableRow>
                </TableHeadSC>
                <TableBody>
                    {reservasAlocacoes === undefined || reservasAlocacoes.length === 0 ?
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

                        : reservasAlocacoes.map((row: any) => (
                            <TableRow
                                key={row.idReservaAlocacao}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center"> {row.idReservaAlocacao} </TableCell>
                                <TableCell align="center">{`${row.aluno.idAluno} - ${row.aluno.nome}`}</TableCell>
                                <TableCell align="center">{`${row.vaga.idVaga} - ${row.vaga.nome}`}</TableCell>
                                <TableCell align="center">{`${row.avaliacaoEntity.idAvaliacao} - ${row.avaliacaoEntity.descricao}`}</TableCell>
                                <TableCell align="center">{row.descricao}</TableCell>
                                <TableCell align="center">{row.dataReserva?.split("-").reverse().join("/")}</TableCell>
                                <TableCell align="center">{row.dataAlocacao?.split("-").reverse().join("/")}</TableCell>
                                <TableCell align="center">{row.dataCancelamento?.split("-").reverse().join("/")}</TableCell>
                                <TableCell align="center">{row.dataFinalizacao?.split("-").reverse().join("/")}</TableCell>
                                <TableCell align="center"
                                    sx={{
                                        color: row.situacaoAlocacao === "RESERVADO" ? '#cfb037' :
                                            row.situacaoAlocacao === "ALOCADO" ? 'red' :
                                                row.situacaoAlocacao === "DISPONIVEL" ? 'green' :
                                                    row.situacaoAlocacao === "FINALIZADO" ? 'brown' : 
                                                        row.situacaoAlocacao === "INATIVO"  ? 'orange' : 'black'
                                    }}
                                >{row.situacaoAlocacao}</TableCell>
                                <TableCell align="center">

                                    <IconButton onClick={() => {
                                        navigate(`/cadastro/reserva-alocacao`, {
                                            state: {
                                                idReservaAlocacao: row.idReservaAlocacao,
                                                idAluno: row.aluno.idAluno,
                                                idVaga: row.vaga.idVaga,
                                                idAvaliacao: row.avaliacaoEntity.idAvaliacao,
                                                descricao: row.descricao,
                                                dataReserva: row.dataReserva,
                                                dataAlocacao: row.dataAlocacao,
                                                dataCancelamento: row.dataCancelamento,
                                                dataFinalizacao: row.dataFinalizacao,
                                                situacaoAlocacao: row.situacaoAlocacao
                                            }
                                        })
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                    <Button
                                        startIcon={<DeleteIcon />}
                                        disabled={row.situacaoAlocacao === "INATIVO"  ? true : false}
                                        onClick={(event) => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: 'Deseja desativar esse registro?',
                                                onConfirm: () => {
                                                    setConfirmDialog({
                                                        ...confirmDialog,
                                                        isOpen: false
                                                    })
                                                    deleteReservaAlocacao(row.idReservaAlocacao)
                                                }
                                            });
                                        }}>
                                        Desativar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <ReservaAlocacaoPagination />
        </TableContainer>
    );
}


