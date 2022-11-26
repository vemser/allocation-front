import { Grid, Box } from "@mui/material";
import { HeaderLogin } from "../../components/HeaderLogin";

export const DashCadastroAluno = () => {
  return (
    <Grid
    sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10%'}}
    >
      <HeaderLogin />
      <Box>

      </Box>
    </Grid>
  )
}