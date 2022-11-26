import { Grid, Box } from "@mui/material";
import { FormLogin } from "../../components/FormLogin";
import logo from '../../assets/dbclogo.png';
import { BoxSC } from "./Login.styled";

export const Login = () => {
  return (
      <Grid sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10%'
        }}>    

        <Box sx={{
          mt:'20px',
          width: '80% ',
          maxWidth: '1100px',
          height: '70px',
          borderRadius: '15px',
          boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',               
          display: 'flex',
          alignItems: 'center',
          p:2
        }}>
          <BoxSC >
            <img src={logo} alt="logo" />
          </BoxSC>
        </Box>

        <FormLogin />
      </Grid>    
  )
}
