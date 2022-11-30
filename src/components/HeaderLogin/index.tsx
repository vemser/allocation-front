import { Box } from "@mui/material";
import { BoxSC } from "./HeaderLogin.styled";
import logo from '../../assets/dbclogo.png';

export const HeaderLogin = () => {
  return (
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
  )
}
