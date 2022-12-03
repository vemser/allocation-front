import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, Button, FormControl, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HeaderPrincipal } from '../../components/HeaderPrincipal';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { ReservaAlocacaoContext } from '../../context/ReservaAlocacaoContext';
import { reservaAlocacaoFormSchema } from '../../util/schemas';
import { toastConfig } from '../../util/toast';
import { TReservaAlocacao } from '../../util/types';
import { podeAcessarTela } from '../../util/valida-senha';

export const CadastroReservaAlocacao: React.FC = () => {
    const roles = [
        { nome: "ROLE_ADMINISTRADOR" },
        { nome: "ROLE_GESTOR" },
        { nome: "ROLE_GESTAO_DE_PESSOAS" }
    ];

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TReservaAlocacao>({
        resolver: yupResolver(reservaAlocacaoFormSchema)
    });

    const { createReservaAlocacao, updateReservaAlocacao } = useContext(ReservaAlocacaoContext);
    const navigate = useNavigate();
    const { userLogged } = useContext(AuthContext);
    const { state } = useLocation();
    const isEdicao = state !== null;
    const [searchParam] = useSearchParams();
    const idVaga = (searchParam.get("idVaga"));
    const idAluno = (searchParam.get("idAluno"));


    useEffect(() => {
        if (userLogged && !podeAcessarTela(roles, userLogged)) {
            toast.error("Usuário sem permissão.", toastConfig);
            navigate('/painel-vagas');
        }

    }, [userLogged]);

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
                    <Typography fontSize='25px' color='primary'>{ !isEdicao ?  "Cadastro de Reserva e Alocação" : "Editar Cadastro de Reserva e Alocação"}</Typography>
                </Box>
                <Box component='form' id='form' onSubmit={handleSubmit((data: TReservaAlocacao) => {

                    const dataAtual = `${new Date().getFullYear()}-${new Date().getMonth()}-${("0" + new Date().getDate()).slice(-2)}`;
                    if (!isEdicao) {
                        createReservaAlocacao(data);  //cria novo registro
                    } else {
                        updateReservaAlocacao({ ...data }, state.idReservaAlocacao); //cria atualiza registro
                    }
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
                        <TextField type="number" placeholder='Digite o código' id='idReservaAlocacao' {...register("idReservaAlocacao")} variant="outlined"
                            label='Código'
                            defaultValue={isEdicao ? state.idReservaAlocacao : null}
                            disabled={true}
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                            helperText={errors.idReservaAlocacao && errors.idReservaAlocacao.message ? errors.idReservaAlocacao.message : null}
                            error={Boolean(errors.idReservaAlocacao && errors.idReservaAlocacao.message)}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '40px',
                    }}>
                        <TextField type="number" placeholder='Digite o aluno' id='idAluno' {...register("idAluno")} variant="outlined"
                            label='Código do Aluno'
                            defaultValue={isEdicao ? state.idAluno : (idAluno ?? null)}
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                            InputProps={{ inputProps: { min: 1 } }}
                            helperText={errors.idAluno && errors.idAluno.message ? errors.idAluno.message : null}
                            error={Boolean(errors.idAluno && errors.idAluno.message)}
                        />
                        <TextField type="number" placeholder='Digite a vaga' id='idVaga' {...register("idVaga")} variant="outlined"
                            label='Código da Vaga'
                            defaultValue={isEdicao ? state.idVaga : (idVaga ?? null)}
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                            InputProps={{ inputProps: { min: 1 } }}
                            helperText={errors.idVaga && errors.idVaga.message ? errors.idVaga.message : null}
                            error={Boolean(errors.idVaga && errors.idVaga.message)}
                        />

                        {/* <Autocomplete options={listaAlunos} id='idAluno' {...register("idAluno")}
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
                        /> */}
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '40px',
                    }}>
                        <TextField type="number" placeholder='Digite a avaliação' id='idAvaliacao' {...register("idAvaliacao")} variant="outlined"
                            label="Código da Avaliação"
                            defaultValue={isEdicao ? state.idAvaliacao : null}
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                            InputProps={{ inputProps: { min: 1 } }}
                            helperText={errors.idAvaliacao && errors.idAvaliacao.message ? errors.idAvaliacao.message : null}
                            error={Boolean(errors.idAvaliacao && errors.idAvaliacao.message)}
                        />
                        {/*Lista avaliações campo obrigario caso alocado*/}
                        {/* <Autocomplete options={listaAvaliacoes} id='idAvaliacao' {...register("idAvaliacao")}
                            renderInput={(params) => <TextField {...params} label='Selecionar Avaliação' {...register("idAvaliacao")}
                                helperText={errors.idAvaliacao && errors.idAvaliacao ? errors.idAvaliacao.message : null}
                                error={Boolean(errors.idAvaliacao && errors.idAvaliacao.message)} />}
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                        /> */}
                        <TextField type="text" placeholder='Descrição' id='descricao' {...register('descricao')} variant="outlined"
                            label='Descrição'
                            defaultValue={isEdicao ? state.descricao : null}
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
                                defaultValue={isEdicao ? state.dataReserva : null}
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
                                defaultValue={isEdicao ? state.dataAlocacao : null}
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
                                defaultValue={isEdicao ? state.dataCancelamento : null}
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
                                defaultValue={isEdicao ? state.dataFinalizacao : null}
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
                            <FormLabel htmlFor="statusAluno"> Situação</FormLabel>
                            <Select id="statusAluno" defaultValue={isEdicao ? state.statusAluno : "RESERVADO"} size="small" {...register("statusAluno")} >
                                <MenuItem value="RESERVADO" sx={{ height: '30px' }}>Reservado</MenuItem>
                                <MenuItem value="ALOCADO" sx={{ height: '30px' }}>Alocado</MenuItem>
                                <MenuItem value="INATIVO" sx={{ height: '30px' }}>Inativo</MenuItem>
                                <MenuItem value="DISPONIVEL" sx={{ height: '30px' }}>Disponível</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '40px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Button variant="contained" onClick={() => navigate("/reservas-alocacoes")} sx={{
                                height: '50px'
                            }}>
                                Voltar
                            </Button>
                        </Box>
                        <Button variant="contained" color="success" type="submit" sx={{
                            height: '50px'
                        }}>
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Grid>

    );
}


