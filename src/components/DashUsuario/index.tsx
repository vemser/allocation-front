import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import UsuarioTable from "../UsuarioTable";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import SearchIcon from "@mui/icons-material/Search";
import { yupResolver } from "@hookform/resolvers/yup";
import { userPesquisaSchema } from "../../util/schemas";

export const DashUsuario = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userPesquisaSchema),
  });
  const { getUsers, getPesquisaUsuariosEmail } = useContext(UserContext);

  const pesquisar = async (data: FieldValues) => {
    if (data && data.pesquisar) {
      await getPesquisaUsuariosEmail(data.pesquisar, 1);
    } else {
      limpar();
    }
  };

  const limpar = async () => {
    await getUsers(1);
    reset();
  };

  return (
    <Box
      sx={{
        width: "80%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        p: "15px 40px",
        borderRadius: "15px",
        boxShadow: "-5px 7px 15px -4px rgba(0,0,0,0.75)",
        margin: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography fontSize="20px" color="primary">
          Usuários
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "0 30px",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(pesquisar)}
          sx={{
            display: "flex",
            alignitems: "center",
            height: "50px",
            width: "60%",
            gap: "10px",
          }}
        >
          <TextField
            type="text"
            id="pesquisar"
            {...register("pesquisar")}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            label="Pesquisar"
            placeholder="Digite um e-mail"
            helperText={
              errors.pesquisar && errors.pesquisar.message
                ? `${errors.pesquisar.message}`
                : ""
            }
            error={Boolean(errors.pesquisar && errors.pesquisar.message)}
            sx={{
              width: "100%",
              "& .MuiInputBase-input": {
                height: "10px",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100px",
              transition: ".5s",
              "& :hover": {
                transition: ".8s",
                transform: "scale(1.05)",
                background: "#a41a1a",
              },

              "& :active": {
                transform: "scale(.99)",
              },
            }}
          >
            Buscar
          </Button>
          <Button
            onClick={limpar}
            variant="contained"
            sx={{
              width: "100px",
              transition: ".5s",

              "& :hover": {
                transition: ".8s",
                transform: "scale(1.05)",
                background: "#a41a1a",
              },

              "& :active": {
                transform: "scale(.99)",
              },
            }}
          >
            Limpar
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Link style={{ textDecoration: "none" }} to="/cadastro-usuario">
          <Button
            variant="contained"
            color={"success"}
            sx={{
              height: "50px",
            }}
          >
            Cadastrar usuário
          </Button>
        </Link>
      </Box>
      <UsuarioTable />
    </Box>
  );
};