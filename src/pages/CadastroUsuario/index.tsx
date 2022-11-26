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
import {
  MoodBad,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  Mood,
}
  from '@mui/icons-material';
import { TUser } from "../../util/types";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { IUserForm } from "../../util/interface";

export const CadastroUsuario: React.FC = () => {

  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm<IUserForm>({
    resolver: yupResolver(userFormSchema)
  });

  const { createUser } = useContext(UserContext);


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" m={2} textAlign="center">Cadastro de Usuário</Typography>
      <form onSubmit={handleSubmit((data: IUserForm) => createUser(data))}>
        <Grid container spacing={2}>
          <Grid item xs={8} md={6}>
            <FormControl>
              <FormLabel htmlFor="nome">Nome Completo *</FormLabel>
              <OutlinedInput error={Boolean(errors.nome && errors.nome.message)} id="nome" type="text" placeholder="Digite seu nome completo" size="small" {...register("nome")} />
              {errors.nome && <span className="error">{errors.nome.message}</span>}

            </FormControl>
          </Grid>
          <Grid item xs={8} md={6}>
            <FormControl>
              <FormLabel htmlFor="email">E-mail *</FormLabel>
              <OutlinedInput error={Boolean(errors.email && errors.email.message)} id="email" type="e-mail" placeholder="Digite um e-mail" size="small" {...register("email")} />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </FormControl>
          </Grid>
          <Grid item xs={8} md={6}>
            <FormControl>
              <FormLabel htmlFor="senha">Senha *</FormLabel>
              <OutlinedInput error={Boolean(errors.senha && errors.senha.message)} id="senha" type="password" placeholder="Digite a senha" size="small" {...register("senha")} />
              {errors.senha && <span className="error">{errors.senha.message}</span>}
              <Box textAlign="center" m={1}>
                <MoodBad />
                <SentimentDissatisfied />
                <SentimentNeutral />
                <SentimentSatisfied />
                <Mood />
              </Box>
            </FormControl>
          </Grid>
          <Grid item xs={8} md={6}>
            <FormControl>
              <FormLabel htmlFor="confirma-senha">Confirmar senha *</FormLabel>
              <OutlinedInput error={Boolean(errors.confirmarSenha && errors.confirmarSenha.message)} id="confirma-senha" type="password" placeholder="Confirme a senha" size="small" {...register("confirmarSenha")} />
              {errors.confirmarSenha && <span className="error">{errors.confirmarSenha.message}</span>}
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
              {errors.tipoUsuario && <span className="error">{errors.tipoUsuario.message}</span>}
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


