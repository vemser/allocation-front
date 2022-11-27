import { Box, Button, FormControl, FormLabel, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { IProgramaForm } from "../../util/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { programaFormSchema } from "../../util/schemas";
import { useContext } from "react";
import { ProgramaContext } from "../../context/ProgramaContext";

export const CadastroPrograma: React.FC = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IProgramaForm>({
        resolver: yupResolver(programaFormSchema)
    });

    const { createPrograma } = useContext(ProgramaContext);
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
                <Box component='form' id='form' onSubmit={handleSubmit((data: IProgramaForm) => {
                    createPrograma(data);
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
                        <FormControl fullWidth error={Boolean(errors.data && errors.data.message)}>
                            <FormLabel htmlFor="data">Data*</FormLabel>
                            <TextField type="date" id='data' {...register('data')} variant="outlined"
                                label=''
                                sx={{
                                    width: '100%',
                                    "& .MuiInputBase-input": {
                                        height: '10px'
                                    }
                                }}
                                helperText={errors.data && errors.data.message ? errors.data.message : null}
                                error={Boolean(errors.data && errors.data.message)}
                            />
                        </FormControl>
                        <FormControl fullWidth >
                            <FormLabel htmlFor="situacao"> Situação*</FormLabel>
                            <Select id="situacao" defaultValue={"aberto"} size="small" {...register("situacao")} >
                                <MenuItem value="aberto" sx={{ height: '30px' }}>Aberto</MenuItem>
                                <MenuItem value="fechado" sx={{ height: '30px' }}>Fechado</MenuItem>
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


