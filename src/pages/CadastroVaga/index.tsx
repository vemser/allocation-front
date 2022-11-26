import { Box, Button, Container, FormControl, FormLabel, Grid, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { IVagaForm } from "../../util/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { vagaFormSchema } from "../../util/schemas";
import { useContext } from "react";
import { VagaContext } from "../../context/VagaContext";
import Span from "../../components/Span";

export const CadastroVaga: React.FC = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IVagaForm>({
    resolver: yupResolver(vagaFormSchema)
  });

  const { createVaga } = useContext(VagaContext);
  return (
    <div>

      <HeaderPrincipal />
      <Container
        sx={{
          mt: 4,
          mb: 4,
          width: '800px',
          boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
          height: '750px',
          p: '15px',
          borderRadius: '15px'
        }} >
        <Typography variant="h4" m={2} textAlign="center">Cadastro de vaga</Typography>
        <form onSubmit={handleSubmit((data: IVagaForm) => {
          createVaga(data);
        })}>
          <Grid container spacing={2}>
            <Grid item xs={8} md={6}>
              <FormControl>
                <FormLabel htmlFor="cliente">Pesquisar Cliente*</FormLabel>
                <OutlinedInput error={Boolean(errors.idCliente && errors.idCliente.message)}  id="nome-cliente" type="text" placeholder="Procurar cliente " size="small" {...register("idCliente")} />
                {errors.idCliente && <Span className="error" texto={errors.idCliente.message} />}
              </FormControl>
            </Grid>
            <Grid item xs={8} md={6}>
              <FormControl>
                <FormLabel htmlFor="vaga">Vaga*</FormLabel>
                <OutlinedInput error={Boolean(errors.nome && errors.nome.message)}  id="nome-vaga" type="text" placeholder="Digite a vaga" size="small" {...register("nome")} />
                {errors.nome && <Span className="error" texto={errors.nome.message} />}
              </FormControl>
            </Grid>
            <Grid item xs={8} md={6}>
              <FormControl>
                <FormLabel htmlFor="codigo">Código*</FormLabel>
                <OutlinedInput error={Boolean(errors.idVaga && errors.idVaga.message)}  id="codigo" type="text" placeholder="Digite o código" size="small" {...register("idVaga")} />
                {errors.idVaga && <Span className="error" texto={errors.idVaga.message} />}
              </FormControl>
            </Grid>
            <Grid item xs={8} md={6}>
              <FormControl>
                <FormLabel htmlFor="codigo">Programa*</FormLabel>
                <OutlinedInput error={Boolean(errors.idPrograma && errors.idPrograma.message)} id="codigo" type="text" placeholder="Digite o programa" size="small" {...register("idPrograma")} />
                {errors.idPrograma && <Span className="error" texto={errors.idPrograma.message} />}
              </FormControl>
            </Grid>
            <Grid item xs={8} md={6}>
              <FormControl>
                <FormLabel htmlFor="situacao"> Situação*</FormLabel>
                <Select error={Boolean(errors.situacao && errors.situacao.message)} id="situacao" labelId="situacao" size="small" defaultValue={"aberto"} {...register("situacao")}>
                  <MenuItem value="aberto" >Aberto</MenuItem>
                  <MenuItem value="fechado" >Fechado</MenuItem>
                </Select>
                {errors.situacao && <Span className="error" texto={errors.situacao.message} />}
              </FormControl>
            </Grid>
            <Grid item xs={8} md={6}>
              <FormControl>
                <FormLabel htmlFor="vagas">Número de Vagas*</FormLabel>
                <OutlinedInput error={Boolean(errors.quantidade && errors.quantidade.message)} id="vagas" type="number" size="small" {...register("quantidade")} />
                {errors.quantidade && <Span className="error" texto={errors.quantidade.message} />}
              </FormControl>
            </Grid>
            <Grid item xs={8} md={6}>
              <FormControl>
                <FormLabel htmlFor="data-abertura">Data de abertura*</FormLabel>
                <OutlinedInput error={Boolean(errors.dataAbertura && errors.dataAbertura.message)} id="data-abertura" type="date" size="small" {...register("dataAbertura")} />
                {errors.dataAbertura && <Span className="error" texto={errors.dataAbertura.message} />}
              </FormControl>
            </Grid>
            <Grid item xs={8} md={6}>
              <FormControl>
                <FormLabel htmlFor="data-fechamento">Data de fechamento</FormLabel>
                <OutlinedInput id="data-fechamento" type="date" size="small" {...register("dataFechamento")} />
              </FormControl>
            </Grid>
            <Grid item xs={8} md={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="observacoes">Observações/Lembretes</FormLabel>
                <OutlinedInput id="observacoes" type="text" placeholder="Observações" size="small" multiline minRows={3} {...register("observacoes")} />
              </FormControl >
            </Grid>
          </Grid>
          <input type="date" hidden id="data-criacao" {...register("dataCriacao")} />
          <Box textAlign="center" mt={2}>
            <Button type="submit" id="btn-salvar" variant="contained">Salvar</Button>
          </Box>
        </form>
      </Container>


    </div>
  );
}


