import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, Button, FormControl, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import { HeaderPrincipal } from '../../components/HeaderPrincipal';
import { AvaliacaoContext } from '../../context/AvaliacaoContext';
import { avaliacaoFormSchema } from '../../util/schemas';
import { TAvaliacao } from '../../util/types';

export const CadastroAvaliacao: React.FC = () => {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<TAvaliacao>({
        resolver: yupResolver(avaliacaoFormSchema)
    });

    const { createAvaliacao, updateAvaliacao } = useContext(AvaliacaoContext);

    const { tipo } = useParams();
    const isAvaliacaoSimples = tipo === "simples";
    const { state } = useLocation();
    const isEdicao = state !== null;

    useEffect(() => {
        console.log(isEdicao)
    }, []);

    const listaAlunos = [
        {
            codigo: 1,
            nome: "Daniela"
        },
        {
            codigo: 2,
            nome: "Renan"
        }
    ];

    const listaVagas = [
        "Front", "Qa"
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
                    <Typography fontSize='25px' color='primary'>Cadastro de Avaliação</Typography>
                </Box>
                <Box component='form' id='form' onSubmit={handleSubmit((data: TAvaliacao) => {
                    if (!isEdicao) {
                        createAvaliacao(data);  //cria novo registro
                    } else {
                        updateAvaliacao(data); //cria atualiza registro
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
                            id='codigo'
                            {...register("codigo")}
                            defaultValue={isEdicao ? state.codigo : null} // na edição carregar o valor na tela
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
                        {/**/}
                        <Autocomplete
                            options={listaAlunos}
                            id='idAluno'
                            getOptionLabel={(option) => option.nome}
                            isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
                            {...register("idAluno")}
                            defaultValue={isEdicao ? state.idAluno : undefined}
                            renderInput={(params) => <TextField
                                {...params}
                                label='Selecionar Aluno'
                                defaultValue={isEdicao ? state.idAluno : undefined}
                                {...register("idAluno")}
                                helperText={errors.idAluno && errors.idAluno ? errors.idAluno.message : null}
                                error={Boolean(errors.idAluno && errors.idAluno.message)} />}
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                        />
                        <Autocomplete options={listaVagas}
                            id='idVaga'
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
                        />
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
                                defaultValue={isEdicao ? state.nota : "individual"}
                                size="small"
                                {...register("tipoAvaliacao")} >
                                <MenuItem value="individual" sx={{ height: '30px' }}>Individual</MenuItem>
                                <MenuItem value="cliente" sx={{ height: '30px' }}>Cliente</MenuItem>
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
                                defaultValue={isEdicao ? state.nota : (tipo === "simples" ? "avaliado" : "agendado")}
                                size="small"
                                {...register("situacao")} >
                                <MenuItem value="avaliado" sx={{ height: '30px' }}>Avaliado</MenuItem>
                                <MenuItem disabled={tipo === "simples" } value="agendado" sx={{ height: '30px' }}>Agendado</MenuItem>
                                <MenuItem disabled={tipo === "simples" } value="entrevistado" sx={{ height: '30px' }}>Entrevistado</MenuItem>
                                <MenuItem disabled={tipo === "simples" } value="agendadocliente" sx={{ height: '30px' }}>Agendado Cliente</MenuItem>
                                <MenuItem disabled={tipo === "simples" } value="entrevistadocliente" sx={{ height: '30px' }}>Entrevistado Cliente</MenuItem>
                                <MenuItem disabled={tipo === "simples" } value="aprovado" sx={{ height: '30px' }}>Aprovado</MenuItem>
                                <MenuItem disabled={tipo === "simples" } value="reprovado" sx={{ height: '30px' }}>Reprovado</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <input type="date" hidden id="data-criacao" {...register("dataCriacao")} />
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


