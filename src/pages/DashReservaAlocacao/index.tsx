import { Grid, Box, Typography, TextField, Button, InputAdornment } from "@mui/material";
import { useContext, useEffect } from "react";
import { FieldValues, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { ReservaAlocacaoTable } from "../../components/ReservaAlocacaoTable";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { toastConfig } from "../../util/toast";
import { podeAcessarTela } from "../../util/valida-senha";
import SearchIcon from '@mui/icons-material/Search';
import { ReservaAlocacaoContext } from "../../context/ReservaAlocacaoContext";

export const DashReservaAlocacao: React.FC = () => {
    const roles = [
        { nome: "ROLE_ADMINISTRADOR" },
        { nome: "ROLE_GESTAO_DE_PESSOAS" },
        { nome: "ROLE_GESTOR" }
    ];
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const { userLogged } = useContext(AuthContext);
    const { reservasAlocacoes, setReservasAlocacoes, getReservasAlocacoes, getPesquisaAlocacao } = useContext(ReservaAlocacaoContext);

    useEffect(() => {
        if (userLogged && !podeAcessarTela(roles, userLogged)) {
            toast.error("Usuário sem permissão.", toastConfig);
            navigate('/painel-vagas');
        }

    }, [userLogged]);

    const pesquisaIdAlocacao = async (data: any) => {
        console.log(data);
        if (data.pesquisar && !isNaN(data.pesquisar)) {
          await getPesquisaAlocacao(data.pesquisar, data.pesquisar, 1);
        } else {
          limpar();
        }
    
      }

    const limpar = async () => {
        await getReservasAlocacoes(1);
        reset();
    }


    return (
        <Grid
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5%',
            }}
        >
            <HeaderPrincipal />
            <Box sx={{
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
                    <Typography fontSize='20px' color='primary'>Reserva e Alocação</Typography>
                </Box>
                <form onSubmit={handleSubmit(pesquisaIdAlocacao)}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '40px',
                    }}>
                        <TextField type="text" id='pesquisar' {...register('pesquisar')} variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            label='Pesquisar'
                            placeholder='Pesquisar por nome do aluno e/ou nome da vaga'
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
                        alignItems: 'center',
                        m: "30px 0 100px 0",

                        "& .MuiSelect-select": {
                            height: '10px',
                            width: '200px'
                        }
                    }}>
                        <Button onClick={limpar} variant="contained" sx={{
                            height: '50px'
                        }}>
                            Limpar
                        </Button>
                        <Button type="submit" variant="contained" sx={{
                            height: '50px'
                        }}>
                            Filtrar
                        </Button>
                        <Link style={{ textDecoration: 'none' }} to='/cadastro/reserva-alocacao'>
                            <Button variant="contained"
                                color="success"
                                sx={{
                                    height: '50px'
                                }}>
                                Cadastrar
                            </Button>
                        </Link>
          
                    </Box>
                </form>
                <ReservaAlocacaoTable />
            </Box>
        </Grid>
    )
}
