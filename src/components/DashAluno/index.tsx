import { Box, Typography, TextField, Button, InputAdornment, useTheme, useMediaQuery } from "@mui/material";
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
    if (data.pesquisar) {
      await pesquisaAlunoNome(1, data.pesquisar);
    } else {
      limparPesquisa();
    }

  }

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{
      width: mdDown ? "90%" : "80%",
      height: '90%',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      p: '15px 40px',
      paddingLeft: smDown? '20px' : '40px',
      paddingRight: smDown? '20px' : '40px',
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
      <Box
      sx={{
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: "0 30px",
        flexDirection: mdDown ? "column" : "row",
    }}
      >        
        <Box
        component="form"
        onSubmit={handleSubmit(pesquisaAluno)}
        sx={{
          display: "flex",
          width: mdDown ? "100%" : "75%",
          gap: "5px",
          flexDirection: mdDown ? "column" : "row",
        }}
        >          
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
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                mt: mdDown ? "10px" : "",
              }}
            >              
              <Button type="submit"
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
                }}>
                Buscar
              </Button>
              <Button onClick={limparPesquisa} variant="contained"
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
      </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: mdDown ? '50px' : '',
              gap: "20px",
              flexDirection: smDown? 'column' : 'row'
          }}
          >
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
      <AlunoTable />
    </Box>
  )
}