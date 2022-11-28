import { Grid, Box, Typography, Button } from "@mui/material";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import Skeleton from '@mui/material/Skeleton';

export const DashAluno = () => {

    const aluno = [
        {
            id: 1,
            nome: 'daniela',
            area: 'frontend',
            programa: 'programa',
            processo: 'sim',
            alocado: 'sim'
        },
        {
            id: 2,
            nome: 'renan',
            area: 'frontend',
            programa: 'programa',
            processo: 'sim',
            alocado: 'sim'
        },
        {
            id: 3,
            nome: 'fernanda',
            area: 'backend',
            programa: 'programa',
            processo: 'sim',
            alocado: 'sim'
        },
        {
            id: 4,
            nome: 'fernanda',
            area: 'backend',
            programa: 'programa',
            processo: 'sim',
            alocado: 'sim'
        },
        {
            id: 5,
            nome: 'fernanda',
            area: 'backend',
            programa: 'programa',
            processo: 'sim',
            alocado: 'sim'
        },
        ,
        {
            id: 6,
            nome: 'fernanda',
            area: 'backend',
            programa: 'programa',
            processo: 'sim',
            alocado: 'sim'
        }
    ]

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
        width: '85%',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        p: '25px 40px',
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
            <Typography fontSize='20px' color='primary'>Alunos</Typography>
        </Box>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background:'#1e62fe',
                borderRadius:  '15px',
                p: '30px',
            }}
        >
        <Box sx={{
            background:'#1952d7',
            borderRadius:  '15px',
            width: '95%',
            height: '95%',
            p: '10px',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap'

        }}> 

        {aluno.length == 0 ? (<Skeleton></Skeleton>) : 

            aluno.map((el:any) => (
                <Box sx={{
                    background:'#D9D9D9',
                    borderRadius:  '15px',
                    width: '300px',
                    // height: '300px',                    
                    boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
                    display: 'flex',
                    flexDirection: 'column',
                    p: '30px'
                }}
                key={el.id}
                >
                    <Typography><strong>Nome: </strong>{el.nome}</Typography>
                    <Typography><strong>Área: </strong>{el.area}</Typography>
                    <Typography><strong>Programa: </strong>{el.programa}</Typography>
                    <Typography><strong>Processo: </strong>{el.processo}</Typography>
                    <Typography><strong>Alocado: </strong>{el.alocado}</Typography>  

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
                        <Button size="small" variant="contained">Reversar</Button>
                    </Box>
                </Box>
            ))
                 
                
             

        }

        </Box>  
        </Box> 
        </Box>
    </Grid>
  )
}

