import ReportIcon from '@mui/icons-material/Report';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';


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
        <Link style={{ textDecoration: 'none'}} to='/painel-vagas'><Typography variant="h6" color='secundary' sx={{fontWeight:'bold'}}>Voltar para página inicial</Typography></Link>
    
    </Grid>
  );
}

