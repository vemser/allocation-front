import React from 'react';
import { Box, TextField, Button, InputAdornment, Typography, OutlinedInput, FormControl } from "@mui/material";
import { AccountCircle } from '@mui/icons-material';
import HttpsIcon from '@mui/icons-material/Https';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TUser } from '../../util/types';
import { yupResolver } from "@hookform/resolvers/yup";
import { userFormSchema } from '../../util/schemas';


export const FormLogin: React.FC = () => {
  const { register, handleSubmit, formState: { errors }} = useForm<TUser>({
    resolver: yupResolver(userFormSchema)
  });

  return (
    <div>
          <Box sx={{
            mt: '100px',
            width: '400px',
            boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
            height: '400px',
            p: '15px',            
            borderRadius:  '15px'  
          }}>

            <Box component='form' id="form"
            sx={{
              display:'flex',
              justifyContent: 'center',
              gap: '20px',
              height: '100%'
            }}>
              <Box sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection:'column',
                gap: '20px',
                height: '100%'
              }}>
                <Typography sx={{
                  fontSize:'20px',
                  color:'#3C3A58'
                }}>Login</Typography>
                <Box>
                    <TextField type="email" placeholder='Digite o seu e-mail' required id='email' {...register('email')} label="E-mail" variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.email && errors.email)}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </Box>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <TextField type="password" placeholder='Digite a sua senha' required id='senha' {...register('senha')} label="Senha" variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HttpsIcon />
                        </InputAdornment>
                      ),
                    }}
                    />
                    {errors.senha && <span>{errors.senha.message}</span>}
                  <Link to={'/'}>
                    <Typography sx={{
                    mt: '10px',  
                    fontSize:'12px',
                    color:'#403DDE'
                    }}>Esqueci minha senha</Typography>
                  </Link>
                  </Box>
                  <Button type="submit" variant="contained" id="button-login">                      
                        Login
                  </Button>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <Typography>Ou</Typography>                 
                    <Link to={'/sign-up'}>
                      <Typography sx={{
                      fontSize:'14px',
                      color:'#403DDE'
                      }}>Crie uma conta</Typography>
                    </Link>
                  </Box> 
              </Box>
            </Box>
          </Box>
    </div>
  )
}