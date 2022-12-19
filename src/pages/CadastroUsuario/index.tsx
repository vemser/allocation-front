import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userEditFormSchema, userFormSchema } from "../../util/schemas";

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
  TextField,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IUserForm } from "../../util/interface";
import verificaForcaSenha from "../../util/forca-senha";
import { HeaderLogin } from "../../components/HeaderLogin";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { useLocation, useNavigate } from "react-router-dom";
import perfil from "../../assets/perfil.png";
import { toBase64 } from "../../util/image-utils";
import { toast } from "react-toastify";
import { toastConfig } from "../../util/toast";

export const CadastroUsuario: React.FC = () => {
  const { createUser, updateUser, updateCargo } = useContext(UserContext);
  const { isLogged, userLogged, getImageUser } = useContext(AuthContext);
  const [mensagemSenha, setMensagemSenha] = useState<string | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEdicao = state !== null;
  const [image, setImage] = useState<File>();
  const [imageUser, setImageUser] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<IUserForm>({
    resolver: yupResolver(isEdicao ? userEditFormSchema : userFormSchema),
  });

  const validarSenha = (senha: string) => {
    setMensagemSenha(verificaForcaSenha(senha));
  };

  const handleSetImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files?.length > 0) {
      setImage(files[0]);
      setImageUser(await toBase64(files[0]));
    }
  };

  const handleSubmitUser = async (data: IUserForm) => {
    if(data.cargo === "NENHUM"){
      toast.error("Preencha o campo tipo de usuário!", toastConfig)
    } else if (!isLogged || (isLogged && !isEdicao)) {
      createUser({ ...data }, isLogged ? data.cargo : "", image);
    } else if (isLogged && isEdicao) {
      if (Object.keys(dirtyFields).length === 1 && dirtyFields.cargo) {
        await updateCargo(data.cargo ?? "", data.email);
      } else {
        updateUser(
          data,
          state.idUsuario,
          data.cargo === "NENHUM" ? "" : data.cargo,
          image
        );
      }
    }
  };

  const getImagemUsuario = async () => {
    if (isEdicao) {
      setImageUser(await getImageUser(state.email));
    }
  };

  useEffect(() => {
    getImagemUsuario();
  }, []);
  
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5%",
      }}
    >
      {isLogged ? <HeaderPrincipal /> : <HeaderLogin />}
      <Box
        sx={{
          width: smDown? '90%' : '80%',
          height: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          p: "15px 40px",
          borderRadius: "15px",
          boxShadow: "-5px 7px 15px -4px rgba(0,0,0,0.75)",
          margin: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography fontSize="25px" color="primary">
            {isEdicao ? "Editar Usuário" : "Cadastro de Usuário"}
          </Typography>
        </Box>
        <Box
          component="form"
          id="form"
          onSubmit={handleSubmit((data: IUserForm) => handleSubmitUser(data))}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormLabel>Enviar foto de perfil</FormLabel>
            <Avatar
              src={imageUser ? imageUser : perfil}
              sx={{ width: 128, height: 128 }}
              alt="perfil"
            />
            <Button
              variant="contained"
              component="label"
              sx={{
                width: "90px",
              }}
            >
              Enviar
              <input
                hidden
                accept="image/*"
                id="foto-perfil"
                type="file"
                onChange={(e) => handleSetImage(e)}
              />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              flexDirection: smDown ? "column" : "row",
            }}
          >
            <TextField
              type="text"
              placeholder="Nome Completo"
              id="nomeCompleto"
              {...register("nomeCompleto")}
              variant="outlined"
              label="Nome Completo"
              defaultValue={isEdicao ? state.nomeCompleto : null}
              sx={{
                width: "100%",
                "& .MuiInputBase-input": {
                  height: "10px",
                },
              }}
              helperText={
                errors.nomeCompleto && errors.nomeCompleto
                  ? errors.nomeCompleto.message
                  : null
              }
              error={Boolean(
                errors.nomeCompleto && errors.nomeCompleto.message
              )}
            />
            <TextField
              type="email"
              placeholder="E-mail"
              id="email"
              {...register("email")}
              variant="outlined"
              label="E-mail"
              defaultValue={isEdicao ? state.email : null}
              sx={{
                width: "100%",
                "& .MuiInputBase-input": {
                  height: "10px",
                },
              }}
              helperText={
                errors.email && errors.email.message
                  ? errors.email.message
                  : null
              }
              error={Boolean(errors.email && errors.email.message)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "top",
              gap: "40px",
              flexDirection: smDown ? "column" : "row",
            }}
          >
            <FormControl
              fullWidth
              error={Boolean(errors.senha && errors.senha.message)}
            >
              <TextField
                type="password"
                id="senha"
                {...register("senha", {
                  onChange: (event) => {
                    validarSenha(event.target.value);
                  },
                })}
                variant="outlined"
                label="Senha"
                defaultValue={isEdicao ? state.senha : null}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    height: "10px",
                  },
                }}
                helperText={
                  errors.senha && errors.senha.message
                    ? errors.senha.message
                    : mensagemSenha
                      ? mensagemSenha
                      : null
                }
                error={Boolean(errors.senha && errors.senha.message)}
              />
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(errors.senhaIgual && errors.senhaIgual.message)}
            >
              <TextField
                type="password"
                id="senhaIgual"
                {...register("senhaIgual")}
                variant="outlined"
                label="Confirme a senha"
                defaultValue={isEdicao ? state.senhaIgual : null}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    height: "10px",
                  },
                }}
                helperText={
                  errors.senhaIgual && errors.senhaIgual.message
                    ? errors.senhaIgual.message
                    : null
                }
                error={Boolean(errors.senhaIgual && errors.senhaIgual.message)}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              gap: "40px",
              flexDirection: smDown ? "column" : "row",
            }}
          >
            {isLogged ? (
              <FormControl
                fullWidth
                error={Boolean(errors.cargo && errors.cargo.message)}
              >
                <FormLabel htmlFor="tipo-usuario"> Tipo de usuário</FormLabel>
                <Select
                  error={Boolean(errors.cargo && errors.cargo.message)}
                  id="tipo-usuario"
                  defaultValue={
                    isEdicao
                      ? state.cargo?.nome.replaceAll("ROLE_", "") ?? "NENHUM"
                      : "NENHUM"
                  }
                  labelId="label-tipo-usuario"
                  size="small"
                  {...register("cargo")}
                >
                  <MenuItem
                    disabled={
                      userLogged?.cargos.filter(
                        (item) => item.nome === "ROLE_ADMINISTRADOR"
                      ).length === 0
                    }
                    value="ADMINISTRADOR"
                  >
                    Administrador
                  </MenuItem>
                  <MenuItem
                    disabled={
                      userLogged?.cargos.filter(
                        (item) =>
                          item.nome === "ROLE_ADMINISTRADOR" ||
                          item.nome === "ROLE_GESTOR" ||
                          item.nome === "ROLE_GESTAO_DE_PESSOAS"
                      ).length === 0
                    }
                    value="INSTRUTOR"
                  >
                    Instrutor(a)
                  </MenuItem>
                  <MenuItem
                    disabled={
                      userLogged?.cargos.filter(
                        (item) => item.nome === "ROLE_ADMINISTRADOR"
                      ).length === 0
                    }
                    value="GESTAO_DE_PESSOAS"
                  >
                    Gestão de Pessoas
                  </MenuItem>
                  <MenuItem
                    disabled={
                      userLogged?.cargos.filter(
                        (item) => item.nome === "ROLE_ADMINISTRADOR"
                      ).length === 0
                    }
                    value="GESTOR"
                  >
                    Gestor
                  </MenuItem>
                  <MenuItem value="NENHUM">Nenhum</MenuItem>
                </Select>
              </FormControl>
              
            ) : null}
            <FormControl
              fullWidth
              sx={{
                width: "100%",
              }}
            ></FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "40px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={() => navigate("/usuarios")}
                sx={{
                  height: "50px",
                }}
              >
                Voltar
              </Button>
            </Box>
            <Button
              variant="contained"
              type="submit"
              color="success"
              sx={{
                height: "50px",
              }}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};