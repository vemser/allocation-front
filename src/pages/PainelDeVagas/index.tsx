import { Grid, Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import Skeleton from '@mui/material/Skeleton';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import {useForm} from 'react-hook-form';
import { VagaContext } from "../../context/VagaContext";
import { ConfirmDialog, TOptionsConfirmDialog } from '../../components/ConfirmDialog';
import { LinkSC } from "../../components/HeaderPrincipal/HeaderPrincipal.styled";
import SearchIcon from '@mui/icons-material/Search';


export const PainelDeVagas = () => {
    const navigate = useNavigate();

    const { deleteVaga } = useContext(VagaContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<any>();

    const [confirmDialog, setConfirmDialog] = useState<TOptionsConfirmDialog>({
        isOpen: false,
        title: "",
        onConfirm: () => { }
    });


  const vaga: any = [
    {
        idPrograma: 1,
        nome: 'Desenvolvedor(a) Java - Back-end',
        quantidade: 1,
        situacao: 'ABERTO',
        processo: 'sim',
        dataAbertura: "2022-12-20",
        dataFechamento: "2022-12-26",
        dataCriacao: "2022-11-29",
        observacoes: "Seguir conceitos de programação como: Alta coesão, Baixo acoplamento, e componentização.",
        emailCliente: "sicred@dbccompany.com.br"
    },
    {
        idPrograma: 2,
        nome: 'Desenvolvedor(a) Java - Back-end',
        quantidade: 1,
        situacao: 'ABERTO',
        processo: 'sim',
        dataAbertura: "2022-12-20",
        dataFechamento: "2022-12-26",
        dataCriacao: "2022-11-29",
        observacoes: "Seguir conceitos de programação como: Alta coesão, Baixo acoplamento, e componentização.",
        emailCliente: "sicred@dbccompany.com.br"
    },
    {
        idPrograma: 3,
        nome: 'Desenvolvedor(a) Java - Back-end',
        quantidade: 1,
        situacao: 'ABERTO',
        processo: 'sim',
        dataAbertura: "2022-12-20",
        dataFechamento: "2022-12-26",
        dataCriacao: "2022-11-29",
        observacoes: "Seguir conceitos de programação como: Alta coesão, Baixo acoplamento, e componentização.",
        emailCliente: "sicred@dbccompany.com.br"
    },
    {
        idPrograma: 4,
        nome: 'Desenvolvedor(a) Java - Back-end',
        quantidade: 1,
        situacao: 'ABERTO',
        processo: 'sim',
        dataAbertura: "2022-12-20",
        dataFechamento: "2022-12-26",
        dataCriacao: "2022-11-29",
        observacoes: "Seguir conceitos de programação como: Alta coesão, Baixo acoplamento, e componentização.",
        emailCliente: "sicred@dbccompany.com.br"
    },  {
        idPrograma: 5,
        nome: 'Desenvolvedor(a) Java - Back-end',
        quantidade: 1,
        situacao: 'ABERTO',
        processo: 'sim',
        dataAbertura: "2022-12-20",
        dataFechamento: "2022-12-26",
        dataCriacao: "2022-11-29",
        observacoes: "Seguir conceitos de programação como: Alta coesão, Baixo acoplamento, e componentização.",
        emailCliente: "sicred@dbccompany.com.br"
    },
    {
        idPrograma: 6,
        nome: 'Desenvolvedor(a) Java - Back-end',
        quantidade: 1,
        situacao: 'ABERTO',
        processo: 'sim',
        dataAbertura: "2022-12-20",
        dataFechamento: "2022-12-26",
        dataCriacao: "2022-11-29",
        observacoes: "Seguir conceitos de programação como: Alta coesão, Baixo acoplamento, e componentização.",
        emailCliente: "sicred@dbccompany.com.br"
    },
    {
        idPrograma: 7,
        nome: 'Desenvolvedor(a) Java - Back-end',
        quantidade: 1,
        situacao: 'ABERTO',
        processo: 'sim',
        dataAbertura: "2022-12-20",
        dataFechamento: "2022-12-26",
        dataCriacao: "2022-11-29",
        observacoes: "Seguir conceitos de programação como: Alta coesão, Baixo acoplamento, e componentização.",
        emailCliente: "sicred@dbccompany.com.br"
    },
    {
        idPrograma: 8,
        nome: 'Desenvolvedor(a) Java - Back-end',
        quantidade: 1,
        situacao: 'ABERTO',
        processo: 'sim',
        dataAbertura: "2022-12-20",
        dataFechamento: "2022-12-26",
        dataCriacao: "2022-11-29",
        observacoes: "Seguir conceitos de programação como: Alta coesão, Baixo acoplamento, e componentização.",
        emailCliente: "sicred@dbccompany.com.br"
    }
    
]

const clicou = (data :any) =>{
    console.log(data)
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
      <HeaderPrincipal />

      <Box sx={{
      width: '95%',
      height: '90%',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      p: '25px 20px',
      borderRadius:  '15px',
      boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
      margin: '30px'    
      }}>
      <Box
      sx={{
          display: 'flex',
          justifyContent: 'center',
      }}
      >
          <Typography fontSize='25px' color='primary'>Vagas</Typography>
      </Box>
      <Box sx={{
        width: '100%',
        height: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        p: '0 30px'
      }}>
        
        <Box component='form' id='form' sx={{
            display: 'flex',
            width: '100%',
            gap: '10px'
        }} onSubmit={handleSubmit(clicou)}>
            <TextField type="text" placeholder='Digite o nome da vaga' id='pesquisa' {...register('pesquisa')} variant="outlined"
            label="Pesquisar"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                ),
            }}    
            sx={{          
                width: '100%',
                "& .MuiInputBase-input": {
                height: '10px'
                }
            }}                     
            />
                <Button size="small" variant="contained" type="submit" sx={{
                width: '100px',

                "& :hover":{
                    transform: 'scale(1.05)',
                },

                "& :active":{
                    transform: 'scale(.99)',
                }
            }}>Buscar</Button>
        </Box>
        
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }}>
            <LinkSC to="/cadastro-vaga">
                <Button size="medium" variant="contained"
                sx={{
                    "&:hover": { background: "#080f26", transform: 'scale(1.05)'},
                    "& :active":{
                        transform: 'scale(.99)',
                    }
                }}>Criar Vaga</Button>
            </LinkSC>
        </Box>

      </Box>
      <Box
          sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background:'#1e62fe',
              borderRadius:  '15px',
              p: '25px',
          }}
      >
      <Box sx={{
          background:'#1952d7',
          borderRadius:  '15px',
          width: '100%',
          height: '95%',
          p: '20px',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap'

      }}> 

      {vaga.length == 0 || vaga == null? 
      (<Box 
      sx={{
        display: 'flex', 
        width: '100%', 
        height: '100%', 
        alignItems: 'start',
        gap: '20px'}}
      >
      <Skeleton width='300px' height='300px'></Skeleton>
      <Skeleton width='300px' height='300px'></Skeleton>
      <Skeleton width='300px' height='300px'></Skeleton>
      <Skeleton width='300px' height='300px'></Skeleton>
      </Box>
      ) : 

          vaga.map((el:any) => (
              <Box sx={{
                  background:'#D9D9D9',
                  borderRadius:  '15px',
                  minWidth: '200px',
                  // height: '300px',                    
                  boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
                  display: 'flex',
                  flexDirection: 'column',
                  p: '15px'
              }}
              key={el.id}
              >
                    <Box sx={{
                        display:'flex',
                        gap: '5px',
                        justifyContent: 'end',
                        // background: 'red',
                        mb: '15px'
                    }}>
                        <IconButton onClick={() => navigate('/cadastro-vaga', {state: el})} sx={{
                                background: '#1e62fe',
                                color: 'white',
                                width: '30px',
                                height: '30px',
                                "&:hover": { background: "#080f26", transform: 'scale(1.05)'},
                                "& :active":{
                                    transform: 'scale(.99)',
                                }
                            }}>
                            <EditIcon />
                        </IconButton>

                        <IconButton onClick={(event) => {
                            setConfirmDialog({
                                isOpen: true,
                                title: 'Confirma a exclusão desse registro?',
                                onConfirm: () => {
                                    setConfirmDialog({
                                        ...confirmDialog,
                                        isOpen: false
                                    })
                                    deleteVaga(el.idPrograma)
                                    }
                                });
                            }} sx={{
                                background: 'red',
                                color: 'white',
                                width: '30px',
                                height: '30px',

                                "&:hover": { background: "#a41a1a", transform: 'scale(1.05)' },
                                "& :active":{
                                    transform: 'scale(.99)',
                                }
                            }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                  <Typography sx={{fontSize: '12px'}}><strong>Nome: </strong>{el.nome}</Typography>
                  <Typography sx={{fontSize: '12px'}}><strong>Área: </strong>{el.area}</Typography>
                  <Typography sx={{fontSize: '12px'}}><strong>Programa: </strong>{el.programa}</Typography>
                  <Typography sx={{fontSize: '12px'}}><strong>Processo: </strong>{el.processo}</Typography>
                  <Typography sx={{fontSize: '12px'}}><strong>Alocado: </strong>{el.alocado}</Typography>  

                  <Box sx={{
                      marginTop: '15px',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',  

                      "& :hover":{
                          transform: 'scale(1.05)',
                      },

                      "& :active":{
                          transform: 'scale(.99)',
                      }
                  }}>
                      <Button size="small" variant="contained" sx={{
                        fontSize: '10px',
                      }}>Reversar Aluno para vaga</Button>


                  </Box>
              </Box>
          ))
               
              
           

      }

      </Box>  
      </Box> 
      </Box>
  </Grid>
  );
}