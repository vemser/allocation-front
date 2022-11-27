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
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import { IUserForm } from "../../util/interface";
import verificaForcaSenha from "../../util/forca-senha";
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
                label='Confirme a senha'
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
            <FormControl fullWidth error={Boolean(errors.tipoUsuario && errors.tipoUsuario.message)} >
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
}


