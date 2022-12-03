import { Grid, Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LinkSC } from "../../components/HeaderPrincipal/HeaderPrincipal.styled";
import { HeaderPrincipal } from "../../components/HeaderPrincipal";
import Skeleton from '@mui/material/Skeleton';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { toastConfig } from "../../util/toast";
import { podeAcessarTela } from "../../util/valida-senha";
import { useForm } from 'react-hook-form';
import { ConfirmDialog, TOptionsConfirmDialog } from '../../components/ConfirmDialog';
import { AlunoContext } from "../../context/AlunoContext";
import { AlunoPagination } from "../../components/AlunoPagination";
import { AlunoDashPagination } from "../../components/AlunoDashPagination";
import { CleaningServicesOutlined } from "@mui/icons-material";


export const DashAluno = () => {
    const roles = [
        { nome: "ROLE_ADMINISTRADOR" },
        { nome: "ROLE_GESTOR" },
        { nome: "ROLE_GESTAO_DE_PESSOAS" },
        { nome: "ROLE_INSTRUTOR" }
    ];

    const { register, handleSubmit, formState: { errors }, reset } = useForm<any>();

    const {
        alunos,
        deleteAluno,
        getAlunos,
        pesquisaAlunoNome
    } = useContext(AlunoContext);

    const navigate = useNavigate();
    const { userLogged } = useContext(AuthContext);

    useEffect(() => {
        if (userLogged && !podeAcessarTela(roles, userLogged)) {
            toast.error("Usuário sem permissão.", toastConfig);
            navigate('/dash-alunos');
        }

    }, [userLogged]);

    useEffect(() => {
        getAlunos(1)
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [alunos]);


    const [confirmDialog, setConfirmDialog] = useState<TOptionsConfirmDialog>({
        isOpen: false,
        title: "",
        onConfirm: () => { }
    });

    const limparPesquisa = () => {
        reset();
        getAlunos(1);
    }

    const pesquisaAluno = async (data: any) => {
        console.log(data);
        if (data.pesquisa) {
            await pesquisaAlunoNome(1, data.pesquisa);
        } else {
            limparPesquisa();
        }

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
            }}>
            <HeaderPrincipal />
            <Box sx={{
                width: '95%',
                height: '90%',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                p: '25px 20px',
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
                    <Typography fontSize='25px' color='primary'>Alunos</Typography>
                </Box>
                <Box sx={{
                    width: '100%',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: '0 30px'
                }}>

                    <Box
                        component='form'
                        id='form'
                        onSubmit={handleSubmit((data: string) => pesquisaAluno(data))}
                        sx={{
                            display: 'flex',
                            width: '100%',
                            gap: '10px'
                        }}>
                        <TextField type="text"
                            placeholder='Digite o nome do aluno'
                            id='pesquisa'
                            {...register('pesquisa')}
                            variant="outlined"
                            label="Pesquisar"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                width: '100%',
                                "& .MuiInputBase-input": {
                                    height: '10px'
                                }
                            }}

                        />
                        <Button
                            size="small"
                            variant="contained"
                            type="submit"
                            sx={{
                                width: '100px',
                                transition: '.5s',

                                "& :hover": {
                                    transition: '.8s',
                                    transform: 'scale(1.05)',
                                    background: "#080f26"
                                },

                                "& :active": {
                                    transform: 'scale(.99)',
                                }
                            }
                            }>Buscar
                        </Button>
                        <Button size="small" variant="contained"
                            onClick={() => {
                                limparPesquisa();
                            }}
                            type="button"
                            sx={{
                                width: '100px',
                                transition: '.5s',
                                "& :hover": {
                                    transition: '.8s',
                                    transform: 'scale(1.05)',
                                    background: "#080f26"
                                },

                                "& :active": {
                                    transform: 'scale(.99)',
                                }
                            }
                            }>Limpar
                        </Button>
                    </Box>


                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                        <LinkSC to="/cadastro-alunos">
                            <Button size="medium" variant="contained"
                                sx={{
                                    transition: '.8s',
                                    "&:hover": { background: "#080f26", transform: 'scale(1.05)' },
                                    "& :active": {
                                        transform: 'scale(.99)',
                                    }
                                }}>Criar Aluno</Button>
                        </LinkSC>
                    </Box>

                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#1e62fe',
                        borderRadius: '15px',
                        p: '25px',
                    }}
                >
                    <Box sx={{
                        background: '#1952d7',
                        borderRadius: '15px',
                        width: '100%',
                        height: '95%',
                        p: '20px',
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'

                    }}>

                        {alunos.length == 0 || alunos == null ?
                            (<Box
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    height: '100%',
                                    alignItems: 'start',
                                    gap: '20px'
                                }}
                            >
                                <Skeleton width='300px' height='300px'></Skeleton>
                                <Skeleton width='300px' height='300px'></Skeleton>
                                <Skeleton width='300px' height='300px'></Skeleton>
                                <Skeleton width='300px' height='300px'></Skeleton>
                            </Box>
                            ) :
                            alunos.map((el: any) => (
                                <Box sx={{
                                    background: '#D9D9D9',
                                    borderRadius: '15px',
                                    width: '250px',
                                    boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    p: '15px',
                                }}
                                    key={el.idAluno}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        gap: '5px',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: '15px'
                                    }}>
                                        <Box>
                                            <Typography sx={{ fontSize: '12px' }}><strong>Código: </strong>{el.idAluno}</Typography>
                                        </Box>
                                        <Box sx={{
                                            display: 'flex',
                                            gap: '3px'
                                        }}>
                                            <IconButton onClick={() => navigate('/cadastro-alunos', { state: el })} sx={{
                                                background: '#1e62fe',
                                                color: 'white',
                                                width: '25px',
                                                height: '25px',
                                                "&:hover": { background: "#080f26", transform: 'scale(1.05)' },
                                                "& :active": {
                                                    transform: 'scale(.99)',
                                                }
                                            }}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={(event) => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Confirma a exclusão desse registro?',
                                                    onConfirm: () => {
                                                        setConfirmDialog({
                                                            ...confirmDialog,
                                                            isOpen: false
                                                        })
                                                        deleteAluno(el.idAluno)
                                                    }
                                                });
                                            }} sx={{
                                                background: 'red',
                                                color: 'white',
                                                width: '25px',
                                                height: '25px',

                                                "&:hover": { background: "#a41a1a", transform: 'scale(1.05)' },
                                                "& :active": {
                                                    transform: 'scale(.99)',
                                                }
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        width: '100%',
                                        display: 'flex',
                                        gap: '5px',
                                        flexDirection: 'column',
                                    }}>

                                        <Typography sx={{ fontSize: '12px', wordWrap: 'break-word' }}><strong>Nome: </strong>{el.nome}</Typography>
                                        <Typography sx={{ fontSize: '12px', wordWrap: 'break-word' }}><strong>Área: </strong>{el.area}</Typography>
                                        <Typography sx={{ fontSize: '12px', wordWrap: 'break-word' }}><strong>Id Programa: </strong>{el.idPrograma}</Typography>
                                        <Typography sx={{ fontSize: '12px', wordWrap: 'break-word' }}><strong>Processo: </strong>{el.emProcesso}</Typography>
                                        <Typography sx={{ fontSize: '12px', wordWrap: 'break-word' }}><strong>Status do Aluno: <Box component="span"
                                            sx={{
                                                color: el.statusAluno == "RESERVADO" ? '#cfb037' :
                                                    el.statusAluno == "ALOCADO" ? 'red' :
                                                        el.statusAluno == "DISPONIVEL" ? 'green' :
                                                            el.statusAluno == "DESALOCADO" ? 'brown' : el.statusAluno
                                        }}>{el.statusAluno}</Box></strong></Typography>
                                        <Typography sx={{ fontSize: '12px', wordWrap: 'break-word' }}><strong>Tecnologias: </strong>{el.tecnologias.map((item: string) => { return `${item} ` })}</Typography>
                                        <Typography sx={{ fontSize: '12px', wordWrap: 'break-word' }}><strong>E-mail: </strong>{el.email}</Typography>
                                    </Box>
                                    <Box sx={{
                                        marginTop: '20px',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        transition: '.8s',
                                        "& :hover": {
                                            transform: 'scale(1.02)',
                                            transition: '.8s',
                                        },

                                        "& :active": {
                                            transform: 'scale(.99)',
                                        }
                                    }}>
                                        <Button
                                            onClick={() => {
                                                navigate(`/cadastro/reserva-alocacao?idAluno=${el.idAluno}`)
                                            }}
                                            size="small"
                                            variant="contained"
                                            sx={{
                                                fontSize: '10px',
                                            }}>
                                            Reservar
                                        </Button>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
                <AlunoDashPagination />
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
            </Box>
        </Grid>
    )
}

