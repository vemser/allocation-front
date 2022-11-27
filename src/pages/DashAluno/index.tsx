import { Grid } from "@mui/material";
import { HeaderPrincipal } from "../../components/HeaderPrincipal"

export const DashAluno = () => {
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

    </Grid>
  )
}

