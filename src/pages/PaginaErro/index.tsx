import ReportIcon from '@mui/icons-material/Report';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button, Box } from '@mui/material';


export const PaginaErro = () => {
  return (
    <Grid
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
       
      }}>
        <ReportIcon color='error' sx={{fontSize:"7rem"}}/>
        <Typography variant="h4" color='primary'>A página que você procura não foi encontrada!</Typography>
        <Box
                    sx={{
                      marginTop: "20px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      transition: ".8s",
                      height: '80px',

                      "& :hover": {
                        transform: "scale(1.02)",
                        transition: ".8s",
                      },

                      "& :active": {
                        transform: "scale(.99)",
                      },
                    }}
                  >
                    <Link style={{ textDecoration: 'none'}} to='/painel-vagas'>
                    <Button                      
                      size="large"
                      variant="contained"
                      sx={{
                        fontSize: "10px",
                      }}
                    >
                      Voltar para o início
                    </Button></Link>
                  </Box>
        {/* <Typography variant="h6" color='secundary' sx={{fontWeight:'bold'}}>Voltar para página inicial</Typography> */}
    
    </Grid>
  );
}

