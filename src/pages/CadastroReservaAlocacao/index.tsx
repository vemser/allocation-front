import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, Button, FormControl, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { HeaderPrincipal } from '../../components/HeaderPrincipal';
import { ReservaAlocacaoContext } from '../../context/ReservaAlocacaoContext';
import { reservaAlocacaoFormSchema } from '../../util/schemas';
import { TReservaAlocacao } from '../../util/types';

export const CadastroReservaAlocacao: React.FC = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TReservaAlocacao>({
        resolver: yupResolver(reservaAlocacaoFormSchema)
    });

    const { createReservaAlocacao } = useContext(ReservaAlocacaoContext);

    const listaAlunos = [
        "Daniela", "Renan"
    ];

    const listaVagas = [
        "Front", "Qa"
    ];

    const listaAvaliacoes = [
        "av1", "av2"
    ];

    return (
        <Grid
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5%',
            }}>
            <HeaderPrincipal />
            <Box
                sx={{
                    width: '80%',
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    p: '15px 40px',
                    borderRadius: '15px',
                    boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
                    margin: '30px'
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Typography fontSize='25px' color='primary'>Cadastro de Reserva e Alocação</Typography>
                </Box>
                <Box component='form' id='form' onSubmit={handleSubmit((data: TReservaAlocacao) => {
                    createReservaAlocacao(data);
                })}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '40px',
                    }}>
                        <TextField type="number" placeholder='Digite o código' id='codigo' {...register("codigo")} variant="outlined"
                            label='Código'
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                            helperText={errors.codigo && errors.codigo.message ? errors.codigo.message : null}
                            error={Boolean(errors.codigo && errors.codigo.message)}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '40px',
                    }}>
                        {/**/}
                        <Autocomplete options={listaAlunos} id='idAluno' {...register("idAluno")}
                            renderInput={(params) => <TextField {...params} label='Selecionar Aluno' {...register("idAluno")}
                                helperText={errors.idAluno && errors.idAluno ? errors.idAluno.message : null}
                                error={Boolean(errors.idAluno && errors.idAluno.message)} />}
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                        />
                        <Autocomplete options={listaVagas} id='idVaga' {...register("idVaga")}
                            renderInput={(params) => <TextField {...params} label='Selecionar Vaga' {...register("idVaga")}
                                helperText={errors.idVaga && errors.idVaga ? errors.idVaga.message : null}
                                error={Boolean(errors.idVaga && errors.idVaga.message)} />}
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '40px',
                    }}>
                        {/*Lista avaliações campo obrigario caso alocado*/}
                        <Autocomplete options={listaAvaliacoes} id='avaliacao' {...register("avaliacao")}
                            renderInput={(params) => <TextField {...params} label='Selecionar Avaliação' {...register("avaliacao")}
                                helperText={errors.avaliacao && errors.avaliacao ? errors.avaliacao.message : null}
                                error={Boolean(errors.avaliacao && errors.avaliacao.message)} />}
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                        />
                        <TextField type="text" placeholder='Descrição' id='descricao' {...register('descricao')} variant="outlined"
                            label='Descrição'
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                            helperText={errors.descricao && errors.descricao.message ? errors.descricao.message : null}
                            error={Boolean(errors.descricao && errors.descricao.message)}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'top',
                        gap: '40px'
                    }}>
                        <FormControl fullWidth error={Boolean(errors.dataReserva && errors.dataReserva.message)}>
                            <FormLabel htmlFor="dataReserva">Data de Reserva</FormLabel>
                            <TextField type="date" id='dataReserva'  {...register("dataReserva")} variant="outlined"
                                label=''
                                sx={{
                                    width: '100%',
                                    "& .MuiInputBase-input": {
                                        height: '10px'
                                    }
                                }}
                                helperText={errors.dataReserva && errors.dataReserva.message ? errors.dataReserva.message : null}
                                error={Boolean(errors.dataReserva && errors.dataReserva.message)}
                            />
                        </FormControl>
                        <FormControl fullWidth >
                            <FormLabel htmlFor="dataAlocacao">Data de Alocação</FormLabel>
                            <TextField type="date" id='dataAlocacao'  {...register("dataAlocacao")} variant="outlined"
                                label=''
                                sx={{
                                    width: '100%',
                                    "& .MuiInputBase-input": {
                                        height: '10px'
                                    }
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'top',
                        gap: '40px'
                    }}>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="dataCancelamento">Data de Cancelamento</FormLabel>
                            <TextField type="date" id='dataCancelamento'  {...register("dataCancelamento")} variant="outlined"
                                label=''
                                sx={{
                                    width: '100%',
                                    "& .MuiInputBase-input": {
                                        height: '10px'
                                    }
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth >
                            <FormLabel htmlFor="dataFinalizacao">Data de Finalização</FormLabel>
                            <TextField type="date" id='dataFinalizacao'  {...register("dataFinalizacao")} variant="outlined"
                                label=''
                                sx={{
                                    width: '100%',
                                    "& .MuiInputBase-input": {
                                        height: '10px'
                                    }
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'top',
                        gap: '40px'
                    }}>
                        <FormControl fullWidth >
                            <FormLabel htmlFor="situacao"> Situação</FormLabel>
                            <Select id="situacao" defaultValue={"reservado"} size="small" {...register("situacao")} >
                                <MenuItem value="reservado" sx={{ height: '30px' }}>Reservado</MenuItem>
                                <MenuItem value="alocado" sx={{ height: '30px' }}>Alocado</MenuItem>
                                <MenuItem value="cancelado" sx={{ height: '30px' }}>Cancelado</MenuItem>
                                <MenuItem value="finalizado" sx={{ height: '30px' }}>Finalizado</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <Button variant="contained" type="submit" sx={{
                                height: '50px'
                            }}>
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid>

    );
}


