import { Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { DashAluno } from "../../components/DashAluno";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { toastConfig } from "../../util/toast";
import { podeAcessarTela } from "../../util/valida-senha";

export const DashCadastroAluno = () => {
  const roles = [
    { nome: "ROLE_ADMINISTRADOR" },
    { nome: "ROLE_GESTOR" },
    { nome: "ROLE_GESTAO_DE_PESSOAS" },
    { nome: "ROLE_INSTRUTOR" }
  ];
 
  const navigate = useNavigate();
  const { userLogged } = useContext(AuthContext);

  useEffect(() => {
    if (userLogged && !podeAcessarTela(roles, userLogged)) {
      toast.error("Usuário sem permissão.", toastConfig);
      navigate('/painel-vagas');
    }

  }, [userLogged]);

  return (
    <Grid
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5%',
      }}
    >
      <HeaderPrincipal />

      <DashAluno />
      
    </Grid>
  )
}