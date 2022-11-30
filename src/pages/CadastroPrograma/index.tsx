import { Box, Button, FormControl, FormLabel, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { IProgramaForm } from "../../util/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { programaFormSchema } from "../../util/schemas";
import { useContext, useEffect } from "react";
import { ProgramaContext } from "../../context/ProgramaContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { toastConfig } from "../../util/toast";
import { podeAcessarTela } from "../../util/valida-senha";

export const CadastroPrograma: React.FC = () => {
    const roles = [
        { nome: "ROLE_ADMINISTRADOR" },
        { nome: "ROLE_GESTOR" }
      ];

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IProgramaForm>({
        resolver: yupResolver(programaFormSchema)
    });

    const { createPrograma } = useContext(ProgramaContext);
    const navigate = useNavigate();
    const { userLogged } = useContext(AuthContext);

    useEffect(() => {
        if (userLogged && !podeAcessarTela(roles,userLogged)) {
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
                    <Typography fontSize='25px' color='primary'>Cadastro de Programa</Typography>
                </Box>
                <Box component='form' id='form' onSubmit={handleSubmit((dataTermino: IProgramaForm) => {
                    createPrograma(dataTermino);
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
                        <TextField type="text" placeholder='Digite o seu nome' id='nome' {...register("nome")} variant="outlined"
                            label='Nome'
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}
                            helperText={errors.nome && errors.nome.message ? errors.nome.message : null}
                            error={Boolean(errors.nome && errors.nome.message)}
                        />
                        <TextField type="text" placeholder='Digite a descrição' id='descricao' {...register('descricao')} variant="outlined"
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
                        <FormControl fullWidth error={Boolean(errors.dataTermino && errors.dataTermino.message)}>
                            <FormLabel htmlFor="dataTermino">Data</FormLabel>
                            <TextField type="date" id='dataTermino' {...register('dataTermino')} variant="outlined"
                                label=''
                                sx={{
                                    width: '100%',
                                    "& .MuiInputBase-input": {
                                        height: '10px'
                                    }
                                }}
                                helperText={errors.dataTermino && errors.dataTermino.message ? errors.dataTermino.message : null}
                                error={Boolean(errors.dataTermino && errors.dataTermino.message)}
                            />
                        </FormControl>
                        <FormControl fullWidth >
                            <FormLabel htmlFor="situacao"> Situação</FormLabel>
                            <Select id="situacao" defaultValue={"aberto"} size="small" {...register("situacao")} >
                                <MenuItem value="aberto" sx={{ height: '30px' }}>Aberto</MenuItem>
                                <MenuItem value="fechado" sx={{ height: '30px' }}>Fechado</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '40px', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Box sx={{ textAlign: 'center' }}>
                            <Button variant="contained" onClick={() => navigate("/programas")} sx={{
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


