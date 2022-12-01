import { Grid, Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import Skeleton from '@mui/material/Skeleton';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LinkSC } from "../../components/HeaderPrincipal/HeaderPrincipal.styled";
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from "react";
import {useForm} from 'react-hook-form';
import { VagaContext } from "../../context/VagaContext";
import { ConfirmDialog, TOptionsConfirmDialog } from '../../components/ConfirmDialog';
import SearchIcon from '@mui/icons-material/Search';
import { VagasPagination } from "../../components/VagasPagination";
import { VagasPainelPagination } from "../../components/VagasPainelPagination";


export const PainelDeVagas = () => {
    const navigate = useNavigate();

    const { deleteVaga, totalPages, vagas  } = useContext(VagaContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<any>();

    const [confirmDialog, setConfirmDialog] = useState<TOptionsConfirmDialog>({
        isOpen: false,
        title: "",
        onConfirm: () => { }
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [vagas]);


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
                }} onSubmit={handleSubmit((data: string) => clicou(data))}>
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
                        transition: '.5s',
                        
                        "& :hover":{
                            transition: '.8s',
                            transform: 'scale(1.05)',
                            background: "#080f26"
                        },

                        "& :active":{
                            transform: 'scale(.99)',
                        }
                    }
                    }>Buscar</Button>
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
                            transition: '.8s',
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

            {vagas.length == 0 || vagas == null? 
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
                vagas.map((el:any) => (
                    <Box sx={{
                        background:'#D9D9D9',
                        borderRadius:  '15px',
                        width: '250px',                 
                        boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        p: '15px'
                    }}
                    key={el.idVaga}
                    >
                        <Box sx={{
                            display:'flex',
                            gap: '5px',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: '15px'
                        }}> 
                            <Box>
                                <Typography sx={{fontSize: '12px'}}><strong>Código: </strong>{el.idVaga}</Typography>
                            </Box>
                            <Box sx={{
                            display:'flex',
                            gap: '3px'
                             }}>
                                <IconButton onClick={() => navigate('/cadastro-vaga', {state: el})} sx={{
                                        background: '#1e62fe',
                                        color: 'white',
                                        width: '25px',
                                        height: '25px',
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
                                            deleteVaga(el.idVaga)
                                            }
                                        });
                                    }} sx={{
                                        background: 'red',
                                        color: 'white',
                                        width: '25px',
                                        height: '25px',

                                        "&:hover": { background: "#a41a1a", transform: 'scale(1.05)' },
                                        "& :active":{
                                            transform: 'scale(.99)',
                                        }
                                    }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box sx={{
                            display:'flex',
                            gap: '5px',
                            flexDirection: 'column'
                        }}>
                        <Typography sx={{fontSize: '12px', wordWrap: 'break-word'}}><strong>Nome: </strong>{el.nome}</Typography>
                        <Typography sx={{fontSize: '12px', wordWrap: 'break-word'}}><strong>Descrição: </strong>{el.observacoes}</Typography>
                        <Typography sx={{fontSize: '12px', wordWrap: 'break-word'}}><strong>Vagas: </strong>{el.quantidade} vaga</Typography>
                        <Typography sx={{fontSize: '12px', wordWrap: 'break-word'}}><strong>Situação: </strong>{el.situacao}</Typography>
                        <Typography sx={{fontSize: '12px', wordWrap: 'break-word'}}><strong>E-mail do cliente: </strong>{el.emailCliente}</Typography>
                        <Typography sx={{fontSize: '12px', wordWrap: 'break-word'}}><strong>Data de abertura: </strong>{el.dataAbertura.split('-').reverse().join('-')}</Typography>
                        <Typography sx={{fontSize: '12px', wordWrap: 'break-word'}}><strong>Data de fechamento: </strong>{el.dataFechamento.split('-').reverse().join('-')}</Typography>
                        </Box>   
                        <Box sx={{
                            marginTop: '20px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',  
                            transition: '.8s',
                            "& :hover":{
                                transform: 'scale(1.02)',
                                transition: '.8s',
                            },

                            "& :active":{
                                transform: 'scale(.99)',
                            }
                        }}>
                            <Button size="small" variant="contained" sx={{
                                fontSize: '10px',
                            }}>
                                Reversar Aluno para vaga
                            </Button>
                        </Box>
                    </Box>
                ))
            }
            </Box>  
            </Box> 
            <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
            />
            <VagasPainelPagination />
      </Box>
  </Grid>
  );
}