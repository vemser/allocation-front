import {
  MenuItem,
  FormLabel,
  Select,
  FormControl,
  Button,
  Grid,
  Typography,
  OutlinedInput,
  Box,
  Avatar,
}
  from '@mui/material';
import { Container } from '@mui/system';
import {
  MoodBad,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  Mood,
  Person
}
  from '@mui/icons-material';

export const SignUp: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" m={2} textAlign="center">Cadastro de Usuário</Typography>
      <Grid container spacing={2}>
        <Grid item xs={8} md={6}>
          <FormControl>
            <FormLabel htmlFor="sign-up">Nome Completo *</FormLabel>
            <OutlinedInput id="nome" type="text" placeholder="Digite seu nome completo" size="small" required />
          </FormControl>
        </Grid>
        <Grid item xs={8} md={6}>
          <FormControl>
            <FormLabel htmlFor="sign-up">E-mail *</FormLabel>
            <OutlinedInput id="email" type="e-mail" placeholder="Digite um e-mail" size="small" required />
          </FormControl>
        </Grid>
        <Grid item xs={8} md={6}>
          <FormControl>
            <FormLabel htmlFor="sign-up">Senha *</FormLabel>
            <OutlinedInput id="senha" type="password" placeholder="Digite a senha" size="small" required />
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
            <FormLabel htmlFor="sign-up">Confirmar senha *</FormLabel>
            <OutlinedInput id="confirma-senha" type="password" placeholder="Confirme a senha" size="small" required />
          </FormControl>
        </Grid>
        <Grid item xs={8} md={6}>
          <FormControl>
            <FormLabel id="label-tipo-usuario">Selecione o tipo de usuário *</FormLabel>
            <Select name="tipo-usuario" id="tipo-usuario" value="a" labelId="label-tipo-usuario" size="small" required>
              <MenuItem value="a" >Administrador</MenuItem>
              <MenuItem value="i" >Instrutor(a)</MenuItem>
              <MenuItem value="g" >Gestão de Pessoas</MenuItem>
              <MenuItem value="t" >Gestor</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8} md={6}>
          <FormControl>
            <FormLabel>Enviar foto de perfil</FormLabel>
            <input accept="image/*" id="foto-perfil" type="file" />
            <Avatar>
              <Person />
            </Avatar>
          </FormControl>

        </Grid>
      </Grid>
      <Button id="btn-salvar" variant="contained">Salvar</Button>
    </Container>
  );
}


