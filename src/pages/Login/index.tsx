import { Grid} from "@mui/material";
import { FormLogin } from "../../components/FormLogin";
import { HeaderLogin } from "../../components/HeaderLogin";

export const Login = () => {
  return (
      <Grid sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10%'}}>  
          <HeaderLogin />
          <FormLogin />
      </Grid>    
  )
}
