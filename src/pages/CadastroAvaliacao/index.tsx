import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, Button, FormControl, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HeaderPrincipal } from '../../components/HeaderPrincipal';
import { AlunoContext } from '../../context/AlunoContext';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { AvaliacaoContext } from '../../context/AvaliacaoContext';
import { VagaContext } from '../../context/VagaContext';
import { avaliacaoEntrevistaFormSchema, avaliacaoSimplesFormSchema } from '../../util/schemas';
import { toastConfig } from '../../util/toast';
import { TAvaliacao } from '../../util/types';
import { podeAcessarTela } from '../../util/valida-senha';

export const CadastroAvaliacao: React.FC = () => {
    const roles = [
        { nome: "ROLE_ADMINISTRADOR" },
        { nome: "ROLE_GESTAO_DE_PESSOAS" },
        { nome: "ROLE_INSTRUTOR" }
    ];


    const { createAvaliacao, updateAvaliacao } = useContext(AvaliacaoContext);
    const navigate = useNavigate();
    const { userLogged } = useContext(AuthContext);

    const { tipo } = useParams();
    const isAvaliacaoSimples = tipo === "simples";
    const { state } = useLocation();
    const isEdicao = state !== null;
    const {vagas, getVagas} = useContext(VagaContext);
    const {alunos, getAlunos} = useContext(AlunoContext);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<TAvaliacao>({
        resolver: yupResolver(tipo === 'simples' ? avaliacaoSimplesFormSchema : avaliacaoEntrevistaFormSchema)
    });

    useEffect(() => {
        console.log(isEdicao);
        if (userLogged && !podeAcessarTela(roles, userLogged)) {
            toast.error("Usuário sem permissão.", toastConfig);
            navigate('/painel-vagas');
        }
    }, [userLogged]);

    const listaVagas = [
        {
            idVaga : 1,
            descricao: 'vaga1'
        }
    ]

    const listaAlunos = [
        {
            codigo : 1,
            nome: 'Daniela'
        }
    ]

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
                    <Typography fontSize='25px' color='primary'>Cadastro de Avaliação</Typography>
                </Box>
                <Box component='form' id='form' onSubmit={handleSubmit((data: TAvaliacao) => {
                    const dataAtual = `${new Date().getFullYear()}-${new Date().getMonth()}-${("0"+new Date().getDate()).slice(-2)}`;
                    if (!isEdicao) {
                        createAvaliacao({ ...data, dataCriacao: dataAtual });  //cria novo registro
                    } else {
                        updateAvaliacao({ ...data }, state.idAvalicao); //cria atualiza registro
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
                        <TextField
                            type="number"
                            placeholder='Digite o código'
                            id='idAvaliacao'
                            {...register("idAvaliacao")}
                            defaultValue={isEdicao ? state.idAvaliacao : null} // na edição carregar o valor na tela
                            disabled={isEdicao}
                            variant="outlined"
                            label='Código'
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
                       <TextField type="text"
                            placeholder='e-mail aluno'
                            id='emailAluno'
                            defaultValue={isEdicao ? state.emailAluno : undefined}
                            {...register('emailAluno')}
                            variant="outlined"
                            label='E-mail do Aluno'
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                            helperText={errors.emailAluno && errors.emailAluno.message ? errors.emailAluno.message : null}
                            error={Boolean(errors.emailAluno&& errors.emailAluno.message)}
                        />
                         <TextField
                            type="number"
                            placeholder='Digite o código da Vaga'
                            id='idVaga'
                            {...register("idVaga")}
                            defaultValue={isEdicao ? state.idVaga : null} // na edição carregar o valor na tela
                            disabled={isEdicao}
                            variant="outlined"
                            label='Código da vaga'
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                        />
                        {/* <Autocomplete
                            options={listaAlunos}
                            id='emailAluno'
                            getOptionLabel={(option) => option.nome}
                            isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
                            {...register("emailAluno")}
                            defaultValue={isEdicao ? state.emailAluno : undefined}
                            renderInput={(params) => <TextField
                                {...params}
                                label='Selecionar Aluno'
                                defaultValue={isEdicao ? state.emailAluno : undefined}
                                {...register("emailAluno")}
                                helperText={errors.emailAluno && errors.emailAluno ? errors.emailAluno.message : null}
                                error={Boolean(errors.emailAluno && errors.emailAluno.message)} />}
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                        /> */}
                        
                        {/* <Autocomplete options={listaVagas}
                            id='idVaga'
                            getOptionLabel={(option) => option.descricao}
                            isOptionEqualToValue={(option, value) => option.idVaga === value.idVaga}
                            disabled={tipo === "simples"}
                            defaultValue={isEdicao ? state.idVaga : undefined}
                            {...register("idVaga")}
                            renderInput={(params) => <TextField {...params} label='Selecionar Vaga' defaultValue={isEdicao ? state.idVaga : undefined} {...register("idVaga")}
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
                        <TextField type="text"
                            placeholder='Descrição'
                            id='descricao'
                            defaultValue={isEdicao ? state.descricao : undefined}
                            {...register('descricao')}
                            variant="outlined"
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
                        <TextField
                            type="number"
                            placeholder='Nota'
                            id='nota'
                            defaultValue={isEdicao ? state.nota : undefined}
                            {...register('nota')}
                            variant="outlined"
                            label='Nota (1-10)'
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                            helperText={errors.nota && errors.nota.message ? errors.nota.message : null}
                            error={Boolean(errors.nota && errors.nota.message)}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'top',
                        gap: '40px'
                    }}>
                        <FormControl fullWidth error={Boolean(errors.dataAvaliacao && errors.dataAvaliacao.message)}>
                            <FormLabel htmlFor="dataAvaliacao">Data de Avaliação</FormLabel>
                            <TextField
                                type="date"
                                id='dataAvaliacao'
                                defaultValue={isEdicao ? state.dataAvaliacao : undefined}
                                {...register("dataAvaliacao")} variant="outlined"
                                label=''
                                sx={{
                                    width: '100%',
                                    "& .MuiInputBase-input": {
                                        height: '10px'
                                    }
                                }}
                                helperText={errors.dataAvaliacao && errors.dataAvaliacao.message ? errors.dataAvaliacao.message : null}
                                error={Boolean(errors.dataAvaliacao && errors.dataAvaliacao.message)}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="tipoAvaliacao"> Tipo Avaliação</FormLabel>
                            <Select
                                id="tipoAvaliacao"
                                defaultValue={isEdicao ? state.tipoAvaliacao : "INDIVIDUAL"}
                                size="small"
                                {...register("tipoAvaliacao")} >
                                <MenuItem value="INDIVIDUAL" sx={{ height: '30px' }}>Individual</MenuItem>
                                <MenuItem value="CLIENTE" sx={{ height: '30px' }}>Cliente</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'top',
                        gap: '40px'
                    }}>
                        <FormControl fullWidth error={Boolean(errors.dataEntrevistaGp && errors.dataEntrevistaGp.message)}>
                            <FormLabel htmlFor="dataEntrevistaGp">Data de Entrevista GP</FormLabel>
                            <TextField
                                type="date"
                                id='dataEntrevistaGp'
                                defaultValue={isEdicao ? state.dataEntrevistaGp : undefined}
                                {...register("dataEntrevistaGp")}
                                variant="outlined"
                                label=''
                                sx={{
                                    width: '100%',
                                    "& .MuiInputBase-input": {
                                        height: '10px'
                                    }
                                }}
                                helperText={errors.dataEntrevistaGp && errors.dataEntrevistaGp.message ? errors.dataEntrevistaGp.message : null}
                                error={Boolean(errors.dataEntrevistaGp && errors.dataEntrevistaGp.message)}
                            />
                        </FormControl>
                        <FormControl fullWidth error={Boolean(errors.dataEntrevistaCliente && errors.dataEntrevistaCliente.message)}>
                            <FormLabel htmlFor="dataEntrevistaCliente">Data de Entrevista Cliente</FormLabel>
                            <TextField
                                type="date"
                                id='dataEntrevistaCliente'
                                defaultValue={isEdicao ? state.dataEntrevistaCliente : undefined}
                                {...register("dataEntrevistaCliente")}
                                variant="outlined"
                                label=''
                                sx={{
                                    width: '100%',
                                    "& .MuiInputBase-input": {
                                        height: '10px'
                                    }
                                }}

                                helperText={errors.dataEntrevistaCliente && errors.dataEntrevistaCliente.message ? errors.dataEntrevistaCliente.message : null}
                                error={Boolean(errors.dataEntrevistaCliente && errors.dataEntrevistaCliente.message)}
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
                            <FormLabel htmlFor="dataResposta">Data de Resposta</FormLabel>
                            <TextField
                                type="date"
                                id='dataResposta'
                                defaultValue={isEdicao ? state.dataResposta : undefined}
                                {...register("dataResposta")}
                                variant="outlined"
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
                            <FormLabel htmlFor="situacao"> Situação</FormLabel>
                            <Select
                                id="situacao"
                                defaultValue={isEdicao ? state.situacao : (tipo === "simples" ? "AVALIADO" : "AGENDADO_RH")}
                                size="small"
                                {...register("situacao")} >
                                <MenuItem value="AVALIADO" sx={{ height: '30px' }}>Avaliado</MenuItem>
                                <MenuItem disabled={tipo === "simples"} value="AGENDADO_RH" sx={{ height: '30px' }}>Agendado RH</MenuItem>
                                <MenuItem disabled={tipo === "simples"} value="ENTREVISTADO_RH" sx={{ height: '30px' }}>Entrevistado RH</MenuItem>
                                <MenuItem disabled={tipo === "simples"} value="AGENDADO_CLIENTE" sx={{ height: '30px' }}>Agendado Cliente</MenuItem>
                                <MenuItem disabled={tipo === "simples"} value="ENTREVISTADO_CLIENTE" sx={{ height: '30px' }}>Entrevistado Cliente</MenuItem>
                                <MenuItem disabled={tipo === "simples"} value="APROVADO" sx={{ height: '30px' }}>Aprovado</MenuItem>
                                <MenuItem disabled={tipo === "simples"} value="REPROVADO" sx={{ height: '30px' }}>Reprovado</MenuItem>
                                <MenuItem disabled={tipo === "simples"} value="CANCELADO" sx={{ height: '30px' }}>Cancelado</MenuItem>
                                <MenuItem disabled={tipo === "simples"} value="FINALIZADO" sx={{ height: '30px' }}>Finalizado</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '40px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Button variant="contained" onClick={() => navigate("/avaliacoes")} sx={{
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


