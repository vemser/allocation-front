import react, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {
    MenuItem,
    FormLabel,
    Select,
    FormControl,
    Button,
    Grid,
    Typography,
    Box,
    TextField,
    Avatar
  }
    from '@mui/material';
import { HeaderPrincipal } from '../../components/HeaderPrincipal';
import perfil from '../../assets/perfil.png'
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';


export const Perfil = () => {
    const { createUser, updateUser } = useContext(UserContext);
    const { isLogged, userLogged } = useContext<any>(AuthContext);
    const [mensagemSenha, setMensagemSenha] = useState<string | undefined>(undefined);

   

    const {register, handleSubmit, reset, formState:{ errors }} = useForm();
    const [image, setImage] = useState<File>();
   

    const handleSetImage = (event: any) => {
        const { files } = event.target;
        console.log(files);
        if (files && files?.length > 0) {
          setImage(files[0]);
        }
    }

    const handleSubmitUser = async (data: any) => {
        data.email = userLogged.email;
        let cargo = userLogged.cargos[0].nome
        updateUser(data, userLogged.idUsuario, cargo , image);       
    }

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
        width: '40%',
        height: '90%',
        display: 'flex',
        gap: '15px',
        p: '25px 20px',
        borderRadius:  '15px',
        boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
        margin: '30px',        
        background:'#e4e6e7',    
        }}>
            <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: '25px',
            }}>
                <Box component='form' id='form' 
                onSubmit={handleSubmit((data: any) => handleSubmitUser(data))}
                    sx={{
                        width: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px'
                    }}>

                    <Box sx={{
                        display: 'flex',                                           
                        flexDirection: 'column',     
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        width: '100%',
                    }}>               
                        <Avatar src={ userLogged?.image ? `data:image/jpg;base64,${userLogged?.image}` : perfil} sx={{ width: 128, height: 128 }} alt="perfil" />      
                        <FormControl fullWidth>
                            <FormLabel>Enviar foto de perfil</FormLabel>                           
                            <Button variant="contained" component="label" sx={{ width: '50px'}}>
                                Enviar
                                <input hidden accept="image/*" id="foto-perfil" type="file" onChange={e => handleSetImage(e)}  />
                            </Button>                        
                        </FormControl>
                    </Box>  
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '30px',
                    }}>
                        <TextField type="text" placeholder='Nome Completo' id='nomeCompleto' {...register("nomeCompleto")} variant="outlined"
                        label='Nome Completo'
                        sx={{
                            width: '100%',
                            "& .MuiInputBase-input": {
                            height: '10px'
                            }
                        }}
                        // helperText={errors.nomeCompleto && errors.nomeCompleto ? errors.nomeCompleto.message : null}
                        // error={Boolean(errors.nomeCompleto && errors.nomeCompleto.message)}
                        defaultValue={userLogged != null? userLogged?.nomeCompleto : ""}  
                        />
                        

                        {/* <FormControl fullWidth error={Boolean(errors.senha && errors.senha.message)}>
                        <TextField type="password" 
                            id='senhaAtual'  
                            // {...register("senhaAtual", { onChange: (event) => { validarSenha(event.target.value) } })}
                            variant="outlined"
                            label='Senha Atual'
                            sx={{
                            width: '100%',
                            "& .MuiInputBase-input": {
                                height: '10px'
                            }
                            }}
                            // helperText={errors.senha && errors.senha.message ? errors.senha.message : (mensagemSenha ? mensagemSenha : null)}
                            // error={Boolean(errors.senha && errors.senha.message)}
                        />
                        </FormControl> */}
                        <FormControl fullWidth error={Boolean(errors.senha && errors.senha.message)}>
                        <TextField type="password" 
                            id='senha'  
                            {...register("senha")}
                            variant="outlined"
                            label='Nova Senha'
                            sx={{
                            width: '100%',
                            "& .MuiInputBase-input": {
                                height: '10px'
                            }
                            }}
                            // helperText={errors.senha && errors.senha.message ? errors.senha.message : (mensagemSenha ? mensagemSenha : null)}
                            // error={Boolean(errors.senha && errors.senha.message)}
                        />
                        </FormControl>
                        <FormControl fullWidth error={Boolean(errors.senhaIgual && errors.senhaIgual.message)}>
                        <TextField type="password" id='senhaIgual'  {...register("senhaIgual")} variant="outlined"
                            label='Confirme a senha'
                            sx={{
                            width: '100%',
                            "& .MuiInputBase-input": {
                                height: '10px'
                            }
                            }}
                            // helperText={errors.senhaIgual && errors.senhaIgual.message ? errors.senhaIgual.message : null}
                            // error={Boolean(errors.senhaIgual && errors.senhaIgual.message)}
                        />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', textAlign: 'center', mt: '30px'}}>
                            <Button variant="contained" type="submit" sx={{
                                height: '50px'
                            }}>
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>        
    </Grid>
  )
}
