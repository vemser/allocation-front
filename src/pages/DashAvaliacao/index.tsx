import {
    Grid,
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AvaliacaoTable } from "../../components/AvaliacaoTable";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { AvaliacaoContext } from "../../context/AvaliacaoContext";
import { toastConfig } from "../../util/toast";
import { podeAcessarTela } from "../../util/valida-senha";
import SearchIcon from "@mui/icons-material/Search";

export const DashAvaliacao: React.FC = () => {
    const roles = [
        { nome: "ROLE_ADMINISTRADOR" },
        { nome: "ROLE_GESTAO_DE_PESSOAS" },
        { nome: "ROLE_INSTRUTOR" },
    ];
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const { userLogged } = useContext(AuthContext);
    const { avaliacoes, setAvaliacoes, getAvaliacoes, getPesquisaIdAvaliacao } =
        useContext(AvaliacaoContext);

    useEffect(() => {
        if (userLogged && !podeAcessarTela(roles, userLogged)) {
            toast.error("Usuário sem permissão.", toastConfig);
            navigate("/painel-vagas");
        }
    }, [userLogged]);

    const pesquisar = async (data: any) => {
        if (data && data.pesquisar) {
            await getPesquisaIdAvaliacao(data.pesquisar);
        } else {
            limpar();
        }
    };

    const limpar = () => {
        getAvaliacoes(1);
        reset();
    };

    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));
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
                    width: mdDown ? "90%" : "80%",
                    height: "90%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    p: "15px 40px",
                    paddingLeft: smDown ? '20px' : '40px',
                    paddingRight: smDown ? '20px' : '40px',
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
                    <Typography fontSize="20px" color="primary">
                        Avaliações/Entrevistas
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: "50px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: "0 30px",
                        flexDirection: mdDown ? "column" : "row",
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit(pesquisar)}
                        sx={{
                            display: "flex",
                            width: mdDown ? "100%" : "75%",
                            gap: "5px",
                            flexDirection: mdDown ? "column" : "row",
                        }}
                    >
                        <TextField
                            type="text"
                            id="pesquisar"
                            placeholder="Digite o código da avaliação"
                            {...register("pesquisar")}
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            label="Pesquisar"
                            sx={{
                                width: "100%",
                                "& .MuiInputBase-input": {
                                    height: "10px",
                                },
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                gap: "10px",
                                mt: mdDown ? "10px" : "",
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    width: "100px",
                                    transition: ".5s",
                                    "& :hover": {
                                        transition: ".8s",
                                        transform: "scale(1.05)",
                                        background: "#a41a1a",
                                    },

                                    "& :active": {
                                        transform: "scale(.99)",
                                    },
                                }}
                            >
                                Buscar
                            </Button>
                            <Button
                                onClick={limpar}
                                variant="contained"
                                sx={{
                                    width: "100px",
                                    transition: ".5s",
                                    "& :hover": {
                                        transition: ".8s",
                                        transform: "scale(1.05)",
                                        background: "#a41a1a",
                                    },

                                    "& :active": {
                                        transform: "scale(.99)",
                                    },
                                }}
                            >
                                Limpar
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: mdDown ? '50px' : '',
                        gap: "20px",
                        flexDirection: smDown ? 'column' : 'row'
                    }}
                >
                    <Link
                        style={{ textDecoration: "none" }}
                        to="/cadastro/avaliacao/simples"
                    >
                        <Button
                            variant="contained"
                            color="success"
                            sx={{
                                height: "50px",
                            }}
                        >
                            Avaliação simples
                        </Button>
                    </Link>
                    <Link
                        style={{ textDecoration: "none" }}
                        to="/cadastro/avaliacao/entrevista"
                    >
                        <Button
                            variant="contained"
                            color="success"
                            sx={{
                                height: "50px",
                            }}
                        >
                            Entrevista
                        </Button>
                    </Link>
                </Box>
                <AvaliacaoTable />
            </Box>
        </Grid>
    );
};