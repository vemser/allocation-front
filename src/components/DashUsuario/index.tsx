import { Box, Typography, TextField, Button, InputAdornment } from "@mui/material";
import { FieldValues, useForm } from 'react-hook-form'
import UsuarioTable from "../UsuarioTable";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import SearchIcon from '@mui/icons-material/Search';
import { yupResolver } from "@hookform/resolvers/yup";
import { userPesquisaSchema } from "../../util/schemas";

export const DashUsuario = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(userPesquisaSchema)
  });
  const { getUsers, getPesquisaUsuariosEmail } = useContext(UserContext);

  const pesquisar = async (data: FieldValues) => {
    if (data && data.pesquisar) {
      await getPesquisaUsuariosEmail(data.pesquisar, 1);
    } else {
      limpar();
    }
  }

  const limpar = async () => {
    await getUsers(1);
    reset();
  }

  return (
    <Box sx={{
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
        <Typography fontSize='20px' color='primary'>Usuários</Typography>
      </Box>
      <form onSubmit={handleSubmit(pesquisar)}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
        }}>

          <TextField type="text" id='pesquisar' {...register('pesquisar')} variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            label='Pesquisar'
            placeholder='Digite um e-mail'
            helperText={errors.pesquisar && errors.pesquisar.message ? `${errors.pesquisar.message}` : ''}
            error={Boolean(errors.pesquisar && errors.pesquisar.message)}
            sx={{
              width: '100%',
              "& .MuiInputBase-input": {
                height: '10px'
              }
            }}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          m: "30px 0 100px 0",

          "& .MuiSelect-select": {
            height: '10px',
            width: '200px'
          }
        }}>

          <Button onClick={limpar} variant="contained" sx={{
            height: '50px'
          }}>
            Limpar
          </Button>
          <Button type="submit" variant="contained" sx={{
            height: '50px'
          }}>
            Filtrar
          </Button>
          <Link style={{ textDecoration: 'none' }}
            to='/cadastro-usuario'><Button
              variant="contained"
              color={"success"}
              sx={{
                height: '50px'
              }}>
              Cadastrar usuário
            </Button></Link>
        </Box>
      </form>
      <UsuarioTable />
    </Box>
  )
}