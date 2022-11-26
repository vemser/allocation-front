import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userFormSchema } from "../../util/schemas";

import {
  MenuItem,
  FormLabel,
  Select,
  FormControl,
  Button,
  Grid,
  Typography,
  OutlinedInput,
  Box
}
  from '@mui/material';
import { Container } from '@mui/system';

import { TSpanProps } from "../../util/types";
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import { IUserForm } from "../../util/interface";
import verificaForcaSenha from "../../util/forca-senha";
import Span from "../../components/Span";

export const CadastroUsuario: React.FC = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IUserForm>({
    resolver: yupResolver(userFormSchema)
  });

  const { createUser } = useContext(UserContext);
  const [mensagemSenha, setMensagemSenha] = useState<TSpanProps | undefined>(undefined);

  const validarSenha = (senha: string) => {
    setMensagemSenha(verificaForcaSenha(senha));
  }

 

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" m={2} textAlign="center">Cadastro de Usuário</Typography>
      <form onSubmit={handleSubmit((data: IUserForm) => {
        createUser(data);
        reset();
      })}>
        <Grid container spacing={2}>
          <Grid item xs={8} md={6}>
            <FormControl>
              <FormLabel htmlFor="nomeCompleto">Nome Completo *</FormLabel>
              <OutlinedInput error={Boolean(errors.nomeCompleto && errors.nomeCompleto.message)} id="nomeCompleto" type="text" placeholder="Digite seu nome completo" size="small" {...register("nomeCompleto")} />
              {errors.nomeCompleto && <Span className="error" texto={errors.nomeCompleto.message}/>}
            </FormControl>
          </Grid>
          <Grid item xs={8} md={6}>
            <FormControl>
              <FormLabel htmlFor="email">E-mail *</FormLabel>
              <OutlinedInput error={Boolean(errors.email && errors.email.message)} id="email" type="e-mail" placeholder="Digite um e-mail" size="small" {...register("email")} />
              {errors.email && <Span className="error" texto={errors.email.message}/>}
            </FormControl>
          </Grid>
          <Grid item xs={8} md={6}>
            <FormControl>
              <FormLabel htmlFor="senha">Senha *</FormLabel>
              <OutlinedInput id="senha" type="password" placeholder="Digite a senha" size="small" {...register("senha", { onChange: (event) => { validarSenha(event.target.value) } })} error={Boolean(errors.senha && errors.senha.message)} />
              {errors.senha && <Span className="error" texto={errors.senha.message}/>}
              {
                mensagemSenha
                  ?
                  <Box textAlign="center" m={1}>
                    <Span {...mensagemSenha} />
                  </Box>
                  : null
              }
            </FormControl>
          </Grid>
          <Grid item xs={8} md={6}>
            <FormControl>
              <FormLabel htmlFor="confirma-senha">Confirmar senha *</FormLabel>
              <OutlinedInput error={Boolean(errors.confirmarSenha && errors.confirmarSenha.message)} id="confirma-senha" type="password" placeholder="Confirme a senha" size="small" {...register("confirmarSenha")} />
              {errors.confirmarSenha && <Span className="error" texto={errors.confirmarSenha.message}/>}
            </FormControl>
          </Grid>
          <Grid item xs={8} md={6}>
            <FormControl>
              <FormLabel htmlFor="tipo-usuario">Selecione o tipo de usuário *</FormLabel>
              <Select error={Boolean(errors.tipoUsuario && errors.tipoUsuario.message)} id="tipo-usuario" value="a" labelId="label-tipo-usuario" size="small" {...register("tipoUsuario")} >
                <MenuItem value="a" >Administrador</MenuItem>
                <MenuItem value="i" >Instrutor(a)</MenuItem>
                <MenuItem value="g" >Gestão de Pessoas</MenuItem>
                <MenuItem value="t" >Gestor</MenuItem>
              </Select>
              {errors.tipoUsuario && <Span className="error" texto={errors.tipoUsuario.message}/>}
            </FormControl>
          </Grid>
          <Grid item xs={8} md={6}>
            <FormControl>
              <FormLabel>Enviar foto de perfil</FormLabel>
              <input accept="image/*" id="foto-perfil" type="file" />
            </FormControl>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={2}>
          <Button type="submit" id="btn-salvar" variant="contained">Salvar</Button>
        </Box>
      </form>
    </Container>
  );
}


