import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  Button,
  Grid,
  Typography,
  Box,
  TextField
} from "@mui/material";
import { HeaderLogin } from "../../components/HeaderLogin";
import { SenhaContext } from "../../context/SenhaContext";
import { TSenha } from "../../util/types";

export const AtualizarSenha = () => {

    const { enviarEmail } = useContext(SenhaContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
          width: "40%",
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
            onSubmit={handleSubmit((data: any)=> enviarEmail(data))}
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
                type="email"
                placeholder="Digite seu E-mail"
                id="email"
                {...register("email")}
                variant="outlined"
                label="E-mail"
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    height: "10px",
                  },
                }}
                // helperText={errors.nomeCompleto && errors.nomeCompleto ? errors.nomeCompleto.message : null}
                // error={Boolean(errors.nomeCompleto && errors.nomeCompleto.message)}
              />

              {/* <FormControl fullWidth>
                <TextField
                  type="password"
                  id="novaSenha"
                  // {...register("novaSenha", { onChange: (event) => { validarSenha(event.target.value) } })}
                  variant="outlined"
                  label="Nova Senha"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      height: "10px",
                    },
                  }}
                  // helperText={errors.senha && errors.senha.message ? errors.senha.message : (mensagemSenha ? mensagemSenha : null)}
                  // error={Boolean(errors.senha && errors.senha.message)}
                />
              </FormControl>
              <FormControl
                fullWidth
                // error={Boolean(errors.senhaIgual && errors.senhaIgual.message)}
              >
                <TextField
                  type="password"
                  id="senhaIgual"
                  {...register("senhaIgual")}
                  variant="outlined"
                  label="Confirme a senha"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      height: "10px",
                    },
                  }}
                  // helperText={errors.senhaIgual && errors.senhaIgual.message ? errors.senhaIgual.message : null}
                  // error={Boolean(errors.senhaIgual && errors.senhaIgual.message)}
                />
              </FormControl> */}
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
