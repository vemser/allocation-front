import react, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {
    FormLabel,
    FormControl,
    Button,
    Grid,
    Box,
    TextField,
    Avatar,
    useTheme,
    useMediaQuery
}
    from '@mui/material';
import { HeaderPrincipal } from '../../components/HeaderPrincipal';
import perfil from '../../assets/perfil.png'
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { PerfilFormSchema } from '../../util/schemas';
import { TPerfil } from '../../util/types';
import verificaForcaSenha from '../../util/forca-senha';
import { useNavigate } from 'react-router-dom';
import { toBase64 } from '../../util/image-utils';


export const Perfil = () => {
    const { updateUser } = useContext(UserContext);
    const { userLogged, handleUserLogged } = useContext(AuthContext);
    const [mensagemSenha, setMensagemSenha] = useState<string | undefined>(undefined);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TPerfil>({
        resolver: yupResolver(PerfilFormSchema)
    });

    const [image, setImage] = useState<File>();
    const [imageUser, setImageUser] = useState<string | undefined>(userLogged?.image);
    const navigate = useNavigate();

    useEffect(() => {
     setImageUser(userLogged?.image);
    }, [userLogged]);

    const handleSetImage = async (event: any) => {
        const { files } = event.target;
        if (files && files?.length > 0) {
            setImage(files[0]);
            setImageUser(await toBase64(files[0]));
        }
    }

    const handleSubmitUser = async (data: any) => {

        let cargoIn = userLogged?.cargos[0].nome === 'ROLE_ADMINISTRADOR' ? "Administrador" :
            userLogged?.cargos[0].nome === 'ROLE_GESTOR' ? 'Gestor' :
                userLogged?.cargos[0].nome === 'ROLE_GESTAO_DE_PESSOAS' ? 'Gestão de pessoas' :
                    userLogged?.cargos[0].nome === 'ROLE_INSTRUTOR' ? 'Instrutor' :
                        userLogged?.cargos[0].nome === null ? 'Não atribuído' :
                            userLogged?.cargos[0].nome;

        data.email = userLogged?.email;

        let cargo = cargoIn?.toUpperCase() ?? "";
        await updateUser(data, userLogged?.idUsuario ?? 0, cargo, image, "/perfil");
        await handleUserLogged(false);
                      
    }

    const validarSenha = (senha: string) => {
        setMensagemSenha(verificaForcaSenha(senha));
    }

    const theme = useTheme();   
    const xsDown = useMediaQuery(theme.breakpoints.down('xs')) // menor que 420px 


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
                    width: xsDown? '90%' : '420px',
                    height: '90%',
                    display: 'flex',
                    gap: '15px',
                    p: '25px 20px',
                    borderRadius: '15px',
                    boxShadow: '5px 5px 10px #6d6c6cbe',
                    margin: '30px',
                    backgroundColor:"#f1f1f1"
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
                            gap: '10px',
                            width: '100%',
                        }}>
                            <Avatar src={imageUser ? imageUser : perfil} sx={{ width: 128, height: 128 }} alt="perfil" />
                            <FormControl >
                                <FormLabel sx={{fontSize:"16px",marginBottom:"10px"}}>Enviar foto de perfil</FormLabel>
                                <Button variant="contained" component="label" sx={{ width: '50px',display:"flex",margin:"0 auto" }}>
                                    Enviar
                                    <input hidden accept="image/*" id="foto-perfil" type="file" onChange={e => handleSetImage(e)} />
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
                                // helperText={errors.nomeCompleto && errors.nomeCompleto ? `${errors.nomeCompleto.message}` : null}
                                error={Boolean(errors.nomeCompleto && errors.nomeCompleto.message)}
                                defaultValue={userLogged != null ? userLogged?.nomeCompleto : ""}
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
                                    {...register("senha", { onChange: (event) => { validarSenha(event.target.value) } })}
                                    variant="outlined"
                                    label='Nova Senha'
                                    sx={{
                                        width: '100%',
                                        "& .MuiInputBase-input": {
                                            height: '10px'
                                        }
                                    }}
                                    helperText={errors.senha && errors.senha.message ? errors.senha.message : (mensagemSenha ? mensagemSenha : null)}
                                    error={Boolean(errors.senha && errors.senha.message)}
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
                                    helperText={errors.senhaIgual && errors.senhaIgual.message ? errors.senhaIgual.message : null}
                                    error={Boolean(errors.senhaIgual && errors.senhaIgual.message)}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', textAlign: 'center', mt: '30px' }}>
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
