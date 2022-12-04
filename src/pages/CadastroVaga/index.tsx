import { Box, Button, FormControl, FormLabel, Grid, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { IVagaForm } from "../../util/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { vagaFormSchema } from "../../util/schemas";
import { useContext, useEffect, useState } from "react";
import { VagaContext } from "../../context/VagaContext";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { toastConfig } from "../../util/toast";
import { useNavigate, useLocation } from "react-router-dom";
import { podeAcessarTela } from "../../util/valida-senha";


export const CadastroVaga: React.FC = () => {
  const roles = [
    { nome: "ROLE_ADMINISTRADOR" },
    { nome: "ROLE_GESTOR" },
    { nome: "ROLE_GESTAO_DE_PESSOAS" },
  ];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IVagaForm>({
    resolver: yupResolver(vagaFormSchema)
  });

  const { createVaga, updateVaga } = useContext(VagaContext);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { userLogged } = useContext(AuthContext);

  useEffect(() => {
    if (userLogged && !podeAcessarTela(roles, userLogged)) {
      toast.error("Usuário sem permissão.", toastConfig);
      navigate('/painel-vagas');
    }

  }, [userLogged]);

  const [codigoValue, setCodigoValue] = useState<any>(null)

  useEffect(() => {
    state != null ? setCodigoValue(state.idVaga) : setCodigoValue(null)
  }, [])

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
          <Typography fontSize='25px' color='primary'>{state != null ? "Editar Vaga" : "Cadastro de Vaga"}</Typography>
        </Box>
        <Box component='form' id='form' onSubmit={handleSubmit((data: IVagaForm) => {
          state != null ? updateVaga(data, state.idVaga, state.dataCriacao) : createVaga(data);
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

            <TextField type="text" placeholder='Nome da vaga' id='nome' {...register('nome')} variant="outlined"
              label='Vaga'
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}
              helperText={errors.nome && errors.nome.message ? errors.nome.message : null}
              error={Boolean(errors.nome && errors.nome.message)}
              defaultValue={state != null ? state.nome : ""}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
          }}>
            <TextField type="text" placeholder='Id cliente' id='idCliente' {...register('idCliente')} variant="outlined"
              label='Id cliente'
              InputProps={{ inputProps: { min: 1 } }}
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}
              helperText={errors.idCliente && errors.idCliente ? errors.idCliente.message : null}
              error={Boolean(errors.idCliente && errors.idCliente.message)}
              defaultValue={state != null ? state.clienteDTO.idCliente : ""}
            />


            <TextField type="number" placeholder='id Programa' id='idPrograma' {...register('idPrograma')} variant="outlined"
              label='Id Programa'
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}
              InputProps={{ inputProps: { min: 1 } }}
              helperText={errors.idPrograma && errors.idPrograma ? errors.idPrograma.message : null}
              error={Boolean(errors.idPrograma && errors.idPrograma.message)}
              defaultValue={state != null ? state.idPrograma : ""}
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
                InputProps={{ inputProps: { min: 1 } }}
                helperText={errors.quantidade && errors.quantidade.message ? errors.quantidade.message : null}
                error={Boolean(errors.quantidade && errors.quantidade.message)}
                defaultValue={state != null ? state.quantidade : ""}
              />
            </FormControl>
            <TextField type="number" placeholder='Quantidade de Alocados' id='quantidadeAlocados' {...register("quantidadeAlocados")} variant="outlined"
              label='Quantidade de Alocados'
              disabled
              sx={{
                width: '100%',
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}
              InputProps={{ inputProps: { min: 0 } }}
              defaultValue={state != null ? state.quantidadeAlocados : ""}
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
                // helperText={errors.dataAbertura && errors.dataAbertura.message ? errors.dataAbertura.message : null}
                error={Boolean(errors.dataAbertura && errors.dataAbertura.message)}
                defaultValue={state != null ? state.dataAbertura : ""}
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
                defaultValue={state != null ? state.dataFechamento : ""}
              />
            </FormControl>
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: 'start',
            gap: '40px',
          }}>
            <FormControl fullWidth error={Boolean(errors.situacaoCliente && errors.situacaoCliente.message)} >
              <FormLabel htmlFor="situacaoCliente"> Situação</FormLabel>
              <Select error={Boolean(errors.situacaoCliente && errors.situacaoCliente.message)} id="situacaoCliente" defaultValue={state != null ? state.situacaoCliente : ""} labelId="situacaoCliente" size="small" {...register("situacaoCliente")} >
                <MenuItem value="ABERTO" >ABERTO</MenuItem>
                <MenuItem value="FECHADO" >FECHADO</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth error={Boolean(errors.observacoes && errors.observacoes.message)}>
              <FormLabel htmlFor="observacoes">{errors.observacoes ? errors.observacoes.message : "Observações/Lembretes"}</FormLabel>
              <OutlinedInput
                id="observacoes"
                type="text"
                placeholder="Observações"
                size="small"
                multiline minRows={3}
                {...register("observacoes")} />
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
