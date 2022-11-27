import { Autocomplete, Box, Button, Container, FormControl, FormLabel, Grid, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
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

  const listaClientes = [
    "Daniela", "Renan"
  ];
  const listaProgramas = [
    "VemSer10", "VemSer11"
  ];

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
      <Box
        sx={{
          width: '80%',
          height: '90%',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          p: '15px 40px',
          borderRadius: '15px',
          boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
          margin: '30px'
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography fontSize='25px' color='primary'>Cadastro de Vaga</Typography>
        </Box>
        <Box component='form' id='form' onSubmit={handleSubmit((data: IVagaForm) => {
          createVaga(data);
        })}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
          }}>
            <TextField type="number" placeholder='Digite o código' id='idVaga' {...register("idVaga")} variant="outlined"
              label='Código'
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}
              helperText={errors.idVaga && errors.idVaga.message ? errors.idVaga.message : null}
              error={Boolean(errors.idVaga && errors.idVaga.message)}
            />
            <TextField type="text" placeholder='Nome da vaga' id='nome' {...register('nome')} variant="outlined"
              label='Descrição'
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}
              helperText={errors.nome && errors.nome.message ? errors.nome.message : null}
              error={Boolean(errors.nome && errors.nome.message)}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
          }}>
            {/*No options vai o array de clientes*/}
            <Autocomplete options={listaClientes} id='idCliente' {...register("idCliente")}
              renderInput={(params) => <TextField {...params} label='Selecionar Cliente' {...register("idCliente")}
                helperText={errors.idCliente && errors.idCliente ? errors.idCliente.message : null}
                error={Boolean(errors.idCliente && errors.idCliente.message)} />}
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}
            />
            <Autocomplete options={listaProgramas} id='idPrograma' {...register("idPrograma")}
              renderInput={(params) => <TextField {...params} label='Selecionar Programa' {...register("idPrograma")}
                helperText={errors.idPrograma && errors.idPrograma ? errors.idPrograma.message : null}
                error={Boolean(errors.idPrograma && errors.idPrograma.message)} />}
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}
            />

          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'top',
            gap: '40px'
          }}>
            <FormControl fullWidth error={Boolean(errors.quantidade && errors.quantidade.message)}>
              <TextField type="number" id='quantidade'  {...register("quantidade")} variant="outlined"
                label='Número de Vagas'
                sx={{
                  width: '100%',
                  "& .MuiInputBase-input": {
                    height: '10px'
                  }
                }}
                helperText={errors.quantidade && errors.quantidade.message ? errors.quantidade.message : null}
                error={Boolean(errors.quantidade && errors.quantidade.message)}
              />
            </FormControl>
            <TextField type="number" placeholder='Quantidade de Alocados' id='quantidadeAlocados' {...register("quantidadeAlocados")} variant="outlined"
              label='Quantidade de Alocados'
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}
              disabled
            />

          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'top',
            gap: '40px'
          }}>
            <FormControl fullWidth error={Boolean(errors.dataAbertura && errors.dataAbertura.message)}>
              <FormLabel htmlFor="dataAbertura">Data de Abertura</FormLabel>
              <TextField type="date" id='dataAbertura'  {...register("dataAbertura")} variant="outlined"
                label=''
                sx={{
                  width: '100%',
                  "& .MuiInputBase-input": {
                    height: '10px'
                  }
                }}
                helperText={errors.dataAbertura && errors.dataAbertura.message ? errors.dataAbertura.message : null}
                error={Boolean(errors.dataAbertura && errors.dataAbertura.message)}
              />
            </FormControl>
            <FormControl fullWidth >
              <FormLabel htmlFor="dataFechamento">Data de Fechamento</FormLabel>
              <TextField type="date" id='dataFechamento'  {...register("dataFechamento")} variant="outlined"
                label=''
                sx={{
                  width: '100%',
                  "& .MuiInputBase-input": {
                    height: '10px'
                  }
                }}
              />
            </FormControl>
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: 'start',
            gap: '40px',
          }}>
            <FormControl fullWidth error={Boolean(errors.situacao && errors.situacao.message)} >
              <FormLabel htmlFor="situacao"> Situação</FormLabel>
              <Select error={Boolean(errors.situacao && errors.situacao.message)} id="situacao" defaultValue={"aberto"} labelId="situacao" size="small" {...register("situacao")} >
                <MenuItem value="aberto" >Aberto</MenuItem>
                <MenuItem value="fechado" >Fechado</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="observacoes">Observações/Lembretes</FormLabel>
              <OutlinedInput id="observacoes" type="text" placeholder="Observações" size="small" multiline minRows={3} {...register("observacoes")} />
            </FormControl >
          </Box>
          <Box sx={{ display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <input type="date" hidden id="data-criacao" {...register("dataCriacao")} />
              <Button variant="contained" type="submit" sx={{
                height: '50px'
              }}>
                Salvar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>

  );
}


