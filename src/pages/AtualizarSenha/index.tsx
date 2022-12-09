import { useContext } from "react";
import { useForm } from "react-hook-form";
import {
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
import { yupResolver } from "@hookform/resolvers/yup";
import { emailFormSchema } from "../../util/schemas";

export const AtualizarSenha = () => {

    const { enviarEmail } = useContext(SenhaContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailFormSchema)
  });

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
                helperText={errors.email && errors.email ? `${errors.email.message}` : null}
                error={Boolean(errors.email && errors.email.message)}
              />              
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