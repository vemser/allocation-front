import { Grid } from "@mui/material";
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { DashUsuario } from "../../components/DashUsuario";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { toastConfig } from "../../util/toast";
import { podeAcessarTela } from "../../util/valida-senha";


export const DashCadastroUsuarios = () => {

  const roles = [
    { nome: "ROLE_ADMINISTRADOR" },
    { nome: "ROLE_GESTOR" },
    { nome: "ROLE_GESTAO_DE_PESSOAS" }

  ];

  const navigate = useNavigate();
  const { userLogged } = useContext(AuthContext);


  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
      <DashUsuario />
    </Grid>
  )
}