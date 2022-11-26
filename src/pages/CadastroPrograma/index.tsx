import { Box, Button, Container, FormControl, FormLabel, Grid, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { IProgramaForm } from "../../util/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { programaFormSchema } from "../../util/schemas";
import { useContext } from "react";
import Span from "../../components/Span";
import { ProgramaContext } from "../../context/ProgramaContext";

export const CadastroPrograma: React.FC = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IProgramaForm>({
        resolver: yupResolver(programaFormSchema)
    });

    const { createPrograma } = useContext(ProgramaContext);
    return (
        <div>
            <HeaderPrincipal />
            <Container
                sx={{
                    mt: 4,
                    mb: 4,
                    width: '800px',
                    boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
                    height: '500px',
                    p: '15px',
                    borderRadius: '15px'
                }} >
                <Typography variant="h4" m={2} textAlign="center">Cadastro de programa</Typography>
                <form onSubmit={handleSubmit((data: IProgramaForm) => {
                    createPrograma(data);
                })}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6}>
                            <FormControl>
                                <FormLabel htmlFor="nome">Nome*</FormLabel>
                                <OutlinedInput  error={Boolean(errors.nome && errors.nome.message)} id="nome" type="text" placeholder="Nome do programa " size="small" {...register("nome")} />
                                {errors.nome && <Span className="error" texto={errors.nome.message} />}
                            </FormControl>
                        </Grid>
                        <Grid item xs={8} md={6}>
                            <FormControl>
                                <FormLabel htmlFor="descricao">Descrição*</FormLabel>
                                <OutlinedInput  error={Boolean(errors.descricao && errors.descricao.message)} id="descricao" type="text" placeholder="Digite a descrição da vaga" size="small" {...register("descricao")} />
                                {errors.descricao && <Span className="error" texto={errors.descricao.message} />}
                            </FormControl>
                        </Grid>
                        <Grid item xs={8} md={6}>
                            <FormControl>
                                <FormLabel htmlFor="data">Data*</FormLabel>
                                <OutlinedInput error={Boolean(errors.data && errors.data.message)} id="codigo" type="date" size="small" {...register("data")} />
                                {errors.data && <Span className="error" texto={errors.data.message} />}
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


