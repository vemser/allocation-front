import { Box, Typography, TextField, Button, InputAdornment } from "@mui/material";
import { useForm } from 'react-hook-form'
import AlunoTable from "../AlunoTable";
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from "react";
import { AlunoContext } from "../../context/AlunoContext";

export const DashAluno = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { getAlunos, pesquisaAlunoNome } = useContext(AlunoContext);

  const limparPesquisa = () => {
    reset();
    getAlunos(1);
  }

  const pesquisaAluno = async (data: any) => {
    console.log(data);
    if (data.pesquisar) {
      await pesquisaAlunoNome(1, data.pesquisar);
    } else {
      limparPesquisa();
    }

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
        <Typography fontSize='20px' color='primary'>Alunos</Typography>
      </Box>
      <form onSubmit={handleSubmit(pesquisaAluno)}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
        }}>
          <TextField
            type="text"
            id='pesquisar'
            placeholder="Digite o nome do aluno"
            {...register('pesquisar')}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            label='Pesquisar'
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
          <Button onClick={limparPesquisa} variant="contained" sx={{
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
          to='/cadastro-alunos'>
            <Button 
          variant="contained"
          color={"success"}
            sx={{
              height: '50px'
            }}>
            Cadastrar Aluno
          </Button></Link>
        </Box>
      </form>
      <AlunoTable />
    </Box>
  )
}