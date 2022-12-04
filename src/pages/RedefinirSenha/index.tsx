import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TrocarSenhaFormSchema } from "../../util/schemas";
import {
  FormControl,
  Button,
  Grid,
  Typography,
  Box,
  TextField,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { HeaderLogin } from "../../components/HeaderLogin";
import { SenhaContext } from "../../context/SenhaContext";
import verificaForcaSenha from "../../util/forca-senha";
import { useParams, useSearchParams } from "react-router-dom";

export const RedefinirSenha = () => {

  let [searchParams, setSearchParams] = useSearchParams()

  let token = searchParams.get('token');
 
  const {tokenState, setTokenState} = useContext(SenhaContext)

  useEffect(()=>{
    setTokenState(token)
  }, [token])

  const { enviarSenha } = useContext(SenhaContext)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>({
    resolver: yupResolver((TrocarSenhaFormSchema))
  });

  const [mensagemSenha, setMensagemSenha] = useState<any>(undefined);

  const validarSenha = (senha: string) => {
    setMensagemSenha(verificaForcaSenha(senha));
  }

  const theme = useTheme();   
  const xsDown = useMediaQuery(theme.breakpoints.down('xs')) // menor que 420px 

  return (
    <Grid
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5%",
      }}
    >
      <HeaderLogin />
      <Box
        sx={{
          width: xsDown? '360px' : '380px',
          height: "90%",
          display: "flex",
          gap: "15px",
          p: "25px 20px",
          borderRadius: "15px",
          boxShadow: "-5px 7px 15px -4px rgba(0,0,0,0.75)",
          margin: "30px",
          background: "#e4e6e7",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: "25px",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit((data: any)=> {
              enviarSenha(data);
              reset()
            })}
            id="form"
            sx={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "30px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                  }}
                >
                  Redefinir Senha
                </Typography>
              </Box>
              
                <TextField
                  type="password"
                  id="senha"
                  {...register("senha", { onChange: (event) => { validarSenha(event.target.value) } })}
                  variant="outlined"
                  // label="Nova Senha"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      height: "10px",
                    },
                  }}
                  label={errors.senha && errors.senha.message ? `${errors.senha.message}` : `Senha`}
                  helperText={errors.senha && errors.senha.message ? errors.senha.message : (mensagemSenha ? mensagemSenha : null)}
                  // error={Boolean(errors.senha && errors.senha.message)}
                />
             
              <FormControl
                fullWidth
                error={Boolean(errors.senhaIgual && errors.senhaIgual.message)}
              >
                <TextField
                  type="password"
                  id="senhaIgual"
                  {...register("senhaIgual")}
                  variant="outlined"                
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      height: "10px",
                    },
                  }}
                   label={errors.senhaIgual && errors.senhaIgual.message ? `${errors.senhaIgual.message}` : `Confirmar senha`}
                   error={Boolean(errors.senhaIgual && errors.senhaIgual.message)}
                  // helperText={errors.senha && errors.senha.message ? errors.senha.message : (mensagemSenha ? mensagemSenha : null)}
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "40px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "100%", textAlign: "center", mt: "30px" }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    height: "50px",
                  }}
                >
                  Redefinir
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
