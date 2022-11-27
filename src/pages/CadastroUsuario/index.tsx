import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userFormSchema } from "../../util/schemas";

import {
  MenuItem,
  FormLabel,
  Select,
  FormControl,
  Button,
  Grid,
  Typography,
  OutlinedInput,
  Box,
  TextField
}
  from '@mui/material';
import { Container } from '@mui/system';

import { TSpanProps } from "../../util/types";
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import { IUserForm } from "../../util/interface";
import verificaForcaSenha from "../../util/forca-senha";
import Span from "../../components/Span";
import { HeaderLogin } from "../../components/HeaderLogin";


export const CadastroUsuario: React.FC = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IUserForm>({
    resolver: yupResolver(userFormSchema)
  });

  const { createUser } = useContext(UserContext);
  const [mensagemSenha, setMensagemSenha] = useState<string | undefined>(undefined);

  const validarSenha = (senha: string) => {
    setMensagemSenha(verificaForcaSenha(senha));
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
      <HeaderLogin />
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
          <Typography fontSize='25px' color='primary'>Cadastro de Usuário</Typography>
        </Box>
        <Box component='form' id='form' onSubmit={handleSubmit((data: IUserForm) => {
          createUser(data);
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
            <TextField type="text" placeholder='Nome Completo' id='nomeCompleto' {...register("nomeCompleto")} variant="outlined"
              label='Nome Completo'
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}
              helperText={errors.nomeCompleto && errors.nomeCompleto ? errors.nomeCompleto.message : null}
              error={Boolean(errors.nomeCompleto && errors.nomeCompleto.message)}
            />
            <TextField type="email" placeholder='E-mail' id='email' {...register('email')} variant="outlined"
              label='E-mail'
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}
              helperText={errors.email && errors.email.message ? errors.email.message : null}
              error={Boolean(errors.email && errors.email.message)}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'top',
            gap: '40px'
          }}>
            <FormControl fullWidth error={Boolean(errors.senha && errors.senha.message)}>
              <TextField type="password" id='senha'  {...register("senha", { onChange: (event) => { validarSenha(event.target.value) } })} variant="outlined"
                label='Senha'
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
            <FormControl fullWidth error={Boolean(errors.confirmarSenha && errors.confirmarSenha.message)}>
              <TextField type="password" id='confirmarSenha'  {...register("confirmarSenha")} variant="outlined"
                label='Confirma senha'
                sx={{
                  width: '100%',
                  "& .MuiInputBase-input": {
                    height: '10px'
                  }
                }}
                helperText={errors.confirmarSenha && errors.confirmarSenha.message ? errors.confirmarSenha.message : null}
                error={Boolean(errors.confirmarSenha && errors.confirmarSenha.message)}
              />
            </FormControl>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'start',
            gap: '40px',
          }}>
            <FormControl  fullWidth error={Boolean(errors.tipoUsuario && errors.tipoUsuario.message)} >
              <FormLabel htmlFor="tipo-usuario"> Tipo de usuário</FormLabel>
              <Select error={Boolean(errors.tipoUsuario && errors.tipoUsuario.message)} id="tipo-usuario" defaultValue={"a"} labelId="label-tipo-usuario" size="small" {...register("tipoUsuario")} >
                <MenuItem value="a" >Administrador</MenuItem>
                <MenuItem value="i" >Instrutor(a)</MenuItem>
                <MenuItem value="g" >Gestão de Pessoas</MenuItem>
                <MenuItem value="t" >Gestor</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Enviar foto de perfil</FormLabel>
              <Button variant="contained" component="label">
                Enviar
                <input hidden accept="image/*" id="foto-perfil" type="file" />
              </Button>
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

  //   return (
  //     <Grid sx={{
  //       width: '100%',
  //       height: '100vh',
  //       display: 'flex',
  //       flexDirection: 'column',
  //       alignItems: 'center',
  //       gap: '10%'
  //       }}>

  //       <HeaderLogin />

  //       <Container maxWidth="sm"
  //         sx={{
  //           width: '850px',
  //           boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
  //           height: '450px',
  //           p: '15px',
  //           borderRadius: '15px'
  //         }}
  //       >
  //         <Typography variant="h4" m={2} textAlign="center">Cadastro de Usuário</Typography>
  //         <form onSubmit={handleSubmit((data: IUserForm) => {
  //           createUser(data);
  //         })}>
  //           <Grid container spacing={2}>
  //             <Grid item xs={8} md={6}>
  //               <FormControl>
  //                 <FormLabel htmlFor="nomeCompleto">Nome Completo *</FormLabel>
  //                 <OutlinedInput error={Boolean(errors.nomeCompleto && errors.nomeCompleto.message)} id="nomeCompleto" type="text" placeholder="Digite seu nome completo" size="small" {...register("nomeCompleto")} />
  //                 {errors.nomeCompleto && <Span className="error" texto={errors.nomeCompleto.message} />}
  //               </FormControl>
  //             </Grid>
  //             <Grid item xs={8} md={6}>
  //               <FormControl>
  //                 <FormLabel htmlFor="email">E-mail *</FormLabel>
  //                 <OutlinedInput error={Boolean(errors.email && errors.email.message)} id="email" type="e-mail" placeholder="Digite um e-mail" size="small" {...register("email")} />
  //                 {errors.email && <Span className="error" texto={errors.email.message} />}
  //               </FormControl>
  //             </Grid>
  //             <Grid item xs={8} md={6}>
  //               <FormControl>
  //                 <FormLabel htmlFor="senha">Senha *</FormLabel>
  //                 <OutlinedInput id="senha" type="password" placeholder="Digite a senha" size="small" {...register("senha", { onChange: (event) => { validarSenha(event.target.value) } })} error={Boolean(errors.senha && errors.senha.message)} />
  //                 {
  //                   mensagemSenha
  //                     ?
  //                     <Box textAlign="center" m={1}>
  //                       <Span {...mensagemSenha} />
  //                     </Box>
  //                     : null
  //                 }
  //               </FormControl>
  //             </Grid>
  //             <Grid item xs={8} md={6}>
  //               <FormControl>
  //                 <FormLabel htmlFor="confirma-senha">Confirmar senha *</FormLabel>
  //                 <OutlinedInput error={Boolean(errors.confirmarSenha && errors.confirmarSenha.message)} id="confirma-senha" type="password" placeholder="Confirme a senha" size="small" {...register("confirmarSenha")} />
  //                 {errors.confirmarSenha && <Span className="error" texto={errors.confirmarSenha.message} />}
  //               </FormControl>
  //             </Grid>
  //             <Grid item xs={8} md={6}>
  //               <FormControl>
  //                 <FormLabel htmlFor="tipo-usuario"> Tipo de usuário *</FormLabel>
  //                 <Select error={Boolean(errors.tipoUsuario && errors.tipoUsuario.message)} id="tipo-usuario"  defaultValue={"a"} labelId="label-tipo-usuario" size="small" {...register("tipoUsuario")} >
  //                   <MenuItem value="a" >Administrador</MenuItem>
  //                   <MenuItem value="i" >Instrutor(a)</MenuItem>
  //                   <MenuItem value="g" >Gestão de Pessoas</MenuItem>
  //                   <MenuItem value="t" >Gestor</MenuItem>
  //                 </Select>
  //                 {errors.tipoUsuario && <Span className="error" texto={errors.tipoUsuario.message} />}
  //               </FormControl>
  //             </Grid>
  //             <Grid item xs={8} md={6}>
  //               <FormControl>
  //                 <FormLabel>Enviar foto de perfil</FormLabel>
  //                 <Button variant="contained" component="label">
  //                   Enviar
  //                   <input hidden accept="image/*" id="foto-perfil" type="file" />
  //                 </Button>
  //               </FormControl>
  //             </Grid>
  //           </Grid>
  //           <Box textAlign="center" mt={2}>
  //             <Button type="submit" id="btn-salvar" variant="contained">Salvar</Button>
  //           </Box>
  //         </form>
  //       </Container>
  //     </Grid>
  //   );
}


