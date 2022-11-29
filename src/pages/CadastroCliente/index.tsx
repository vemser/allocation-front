import { Autocomplete, Box, Button, Container, FormControl, FormLabel, Grid, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { IVagaForm } from "../../util/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { clienteFormSchema, vagaFormSchema } from "../../util/schemas";
import { useContext, useEffect } from "react";
import { VagaContext } from "../../context/VagaContext";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { toastConfig } from "../../util/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { podeAcessarTela } from "../../util/valida-senha";
import { TCliente } from "../../util/types";
import { ClienteContext } from "../../context/ClienteContext";

export const CadastroCliente: React.FC = () => {
    const roles = [
        { nome: "ROLE_ADMINISTRADOR" },
        { nome: "ROLE_GESTOR" },
    ];

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TCliente>({
        resolver: yupResolver(clienteFormSchema)
    });

    const { createCliente, updateCliente, deleteCliente } = useContext(ClienteContext);

    const navigate = useNavigate();
    const { userLogged } = useContext(AuthContext);

    const { state } = useLocation();
    const isEdicao = state !== null;


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
                    <Typography fontSize='25px' color='primary'>Cadastro de Cliente</Typography>
                </Box>
                <Box component='form' id='form' onSubmit={handleSubmit((data: TCliente) => {
                    if (!isEdicao) {
                        createCliente(data);
                    } else {
                        updateCliente(data, state.idCliente);
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
                        <TextField type="number" placeholder="Digite o código" id="idCliente" {...register("idCliente")} variant="outlined"
                            label='Código'
                            defaultValue={isEdicao ? state.idCliente : null}
                            disabled={true}
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                            helperText={errors.idCliente && errors.idCliente.message ? errors.idCliente.message : null}
                            error={Boolean(errors.idCliente && errors.idCliente.message)}
                        />

                        <TextField type="text" placeholder='Nome do cliente' id='nome' {...register('nome')} variant="outlined"
                            label='Nome'
                            defaultValue={isEdicao ? state.nome : undefined}
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                            helperText={errors.nome && errors.nome.message ? errors.nome.message : null}
                            error={Boolean(errors.nome && errors.nome.message)}
                        />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'top',
                        gap: '40px'
                    }}>
                        <FormControl fullWidth error={Boolean(errors.telefone && errors.telefone.message)}>
                            <TextField type="text" id='telefone'  {...register("telefone")} variant="outlined"
                                label='Telefone'
                                defaultValue={isEdicao ? state.telefone : undefined}
                                sx={{
                                    width: '100%',
                                    "& .MuiInputBase-input": {
                                        height: '10px'
                                    }
                                }}
                                helperText={errors.telefone && errors.telefone.message ? errors.telefone.message : null}
                                error={Boolean(errors.telefone && errors.telefone.message)}
                            />
                        </FormControl>
                        <FormControl fullWidth error={Boolean(errors.email && errors.email.message)}>
                            <TextField type="email" placeholder='E-mail' id='email' {...register("email")} variant="outlined"
                                label='E-mail'
                                defaultValue={isEdicao ? state.email : undefined}
                                sx={{
                                    width: '100%',
                                    "& .MuiInputBase-input": {
                                        height: '10px'
                                    }
                                }}
                                helperText={errors.email && errors.email.message ? errors.email.message : null}
                                error={Boolean(errors.email && errors.email.message)}
                            />
                        </FormControl>

                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        gap: '40px',
                    }}>
                        <FormControl fullWidth error={Boolean(errors.situacao && errors.situacao.message)} >
                            <FormLabel htmlFor="situacao"> Situação</FormLabel>
                            <Select
                                error={Boolean(errors.situacao && errors.situacao.message)}
                                id="situacao"
                                defaultValue={isEdicao ? state.situacao : "ATIVO"}
                                labelId="situacao"
                                size="small" {...register("situacao")} >
                                <MenuItem value="ATIVO" >Ativo</MenuItem>
                                <MenuItem value="INATIVO" >Inativo</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '40px', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Box sx={{ textAlign: 'center' }}>
                            <Button variant="contained" onClick={() => navigate("/clientes")} sx={{
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
