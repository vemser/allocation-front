import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { IProgramaForm } from "../../util/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { programaFormSchema } from "../../util/schemas";
import { useContext, useEffect } from "react";
import { ProgramaContext } from "../../context/ProgramaContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { toastConfig } from "../../util/toast";
import { podeAcessarTela } from "../../util/valida-senha";

export const CadastroPrograma: React.FC = () => {
    const roles = [{ nome: "ROLE_ADMINISTRADOR" }, { nome: "ROLE_GESTOR" }];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IProgramaForm>({
        resolver: yupResolver(programaFormSchema),
    });

    const { createPrograma, updatePrograma } = useContext(ProgramaContext);
    const navigate = useNavigate();
    const { userLogged, isLogged } = useContext(AuthContext);
    const { state } = useLocation();
    console.log(state)
    const isEdicao = state !== null;

    useEffect(() => {
        if (userLogged && !podeAcessarTela(roles, userLogged)) {
            toast.error("Usuário sem permissão.", toastConfig);
            navigate("/painel-vagas");
        }
    }, [userLogged]);

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
            <HeaderPrincipal />
            <Box
                sx={{
                    width: smDown ? "90%" : "80%",
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
                        {isEdicao ? "Editar Programa" : "Cadastro de Programa"}
                    </Typography>
                </Box>

                <Box
                    component="form"
                    id="form"
                    onSubmit={handleSubmit((data: IProgramaForm) => {
                        const dataAtual = `${new Date().getFullYear()}-${new Date().getMonth()}-${(
                            "0" + new Date().getDate()
                        ).slice(-2)}`;
                        if (!isLogged || (isLogged && !isEdicao)) {
                            createPrograma({ ...data, dataCriacao: dataAtual });
                        } else if (isLogged && isEdicao) {
                            updatePrograma(
                                { ...data, dataCriacao: dataAtual },
                                state.idPrograma
                            );
                        }
                    })}
                    sx={{
                        display: "flex",
                        gap: "20px",
                        width:"100%"
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "40px",
                            flexDirection: smDown ? "column" : "column",
                            width:"50%"
                        }}
                    >
                        <TextField
                            type="text"
                            placeholder="Digite o seu nome"
                            id="nome"
                            {...register("nome")}
                            variant="outlined"
                            label="Nome"
                            defaultValue={isEdicao ? state.nome : null}
                            sx={{
                                width: "100%",
                                "& .MuiInputBase-input": {
                                    height: "10px",
                                },
                            }}
                            helperText={
                                errors.nome && errors.nome.message ? errors.nome.message : null
                            }
                            error={Boolean(errors.nome && errors.nome.message)}
                        />

                        <FormControl
                            fullWidth
                            // error={Boolean(errors.dataTermino && errors.dataTermino.message)}
                        >
                            <FormLabel htmlFor="dataTermino">Data de Início</FormLabel>
                            <TextField
                                type="date"
                                id="dataInicio"
                                // {...register("dataTermino")}
                                variant="outlined"
                                label=""
                                // defaultValue={isEdicao ? state.dataTermino : null}
                                sx={{
                                    width: "100%",
                                    "& .MuiInputBase-input": {
                                        height: "10px",
                                    },
                                }}
                                // helperText={
                                //     errors.dataTermino && errors.dataTermino.message
                                //         ? errors.dataTermino.message
                                //         : null
                                // }
                                // error={Boolean(
                                //     errors.dataTermino && errors.dataTermino.message
                                // )}
                            />
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(errors.dataTermino && errors.dataTermino.message)}
                        >
                            <FormLabel htmlFor="dataTermino">Data de Término</FormLabel>
                            <TextField
                                type="date"
                                id="dataTermino"
                                {...register("dataTermino")}
                                variant="outlined"
                                label=""
                                defaultValue={isEdicao ? state.dataTermino : null}
                                sx={{
                                    width: "100%",
                                    "& .MuiInputBase-input": {
                                        height: "10px",
                                    },
                                }}
                                helperText={
                                    errors.dataTermino && errors.dataTermino.message
                                        ? errors.dataTermino.message
                                        : null
                                }
                                error={Boolean(
                                    errors.dataTermino && errors.dataTermino.message
                                )}
                            />
                        </FormControl>

                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: "40px",
                            flexDirection: smDown ? "column" : "column",
                            width:"50%"
                        }}
                    >
                        <TextField
                            type="text"
                            placeholder="Digite a descrição"
                            id="descricao"
                            {...register("descricao")}
                            variant="outlined"
                            label="Descrição"
                            defaultValue={isEdicao ? state.descricao : null}
                            sx={{
                                width: "100%",
                                "& .MuiInputBase-input": {
                                    height: "10px",
                                },
                            }}
                            helperText={
                                errors.descricao && errors.descricao.message
                                    ? errors.descricao.message
                                    : null
                            }
                            error={Boolean(errors.descricao && errors.descricao.message)}
                        />    
                        
                        <FormControl fullWidth>
                            <FormLabel htmlFor="situacao"> Situação</FormLabel>
                            <Select
                                id="situacao"
                                defaultValue={isEdicao ? state.situacao : "ABERTO"}
                                size="small"
                                {...register("situacao")}
                            >
                                <MenuItem value="ABERTO" sx={{ height: "30px" }}>
                                    Aberto
                                </MenuItem>
                                <MenuItem value="FECHADO" sx={{ height: "30px" }}>
                                    Fechado
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
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
                                onClick={() => navigate("/programas")}
                                sx={{
                                    height: "50px",
                                }}
                            >
                                Voltar
                            </Button>
                        </Box>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            sx={{
                                height: "50px",
                            }}
                        >
                            Salvar
                        </Button>
                    </Box>
            </Box>
        </Grid>
    );
};
