import { Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { BoxSC } from "../HeaderLogin/HeaderLogin.styled";
import logo from '../../assets/dbclogo.png';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useNavigate } from 'react-router-dom'
import { LinkSC, LinkMenu } from "./HeaderPrincipal.styled";
export const HeaderPrincipal = () => {
    const { handleUserLogout } = useContext(AuthContext);

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const { userLogged } = useContext(AuthContext);

    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md')) // menor que 600px
    const xsDown = useMediaQuery(theme.breakpoints.down('xs')) // menor que 420px 

    return (
        <Container>
            <Box sx={{
                mt: '20px',
                height: xsDown ? '120px' : '70px',
                borderRadius: '15px',
                boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
                display: 'flex',
                alignItems: 'center',
                p: 2,
                justifyContent: "space-between",
                flexDirection: xsDown ? 'column' : 'row'
            }}>
                <BoxSC>
                    <img src={logo} alt="logo" />
                </BoxSC>

                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', flexWrap: "wrap" }}>
                    <LinkMenu to='/painel-vagas'><Button sx={{ minWidth: 100 }}>Painel de Vagas</Button></LinkMenu>
                    <LinkMenu to='/dash-alunos'> <Button sx={{ minWidth: 100 }}>Painel de Alunos</Button></LinkMenu>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Menu
                    </Button>
                    <Box>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <LinkSC to='/painel-vagas'><MenuItem onClick={handleClose}>Vagas</MenuItem></LinkSC>
                            {/* <LinkSC to='/alunos'><MenuItem onClick={handleClose}>Alunos</MenuItem></LinkSC> */}
                            <LinkSC to='/dash-alunos'><MenuItem onClick={handleClose}>Alunos</MenuItem></LinkSC>
                            <LinkSC to='/usuarios'><MenuItem onClick={handleClose}>Usuários</MenuItem></LinkSC>
                            <LinkSC to='/clientes'><MenuItem onClick={handleClose}>Clientes</MenuItem></LinkSC>
                            <LinkSC to='/programas'><MenuItem onClick={handleClose}>Programas</MenuItem></LinkSC>
                            <LinkSC to='/avaliacoes'><MenuItem onClick={handleClose}>Avaliações</MenuItem></LinkSC>
                            <LinkSC to='/reservas-alocacoes'><MenuItem onClick={handleClose}>Reserva e Alocação</MenuItem></LinkSC>
                            {(mdDown) && (<Button color="error" onClick={() => handleUserLogout()}>Sair</Button>)}
                        </Menu>
                    </Box>
                    <Box>
                        <Tooltip title="Perfil">
                            <IconButton
                                onClick={() => navigate('/perfil')}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={true ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={true ? 'true' : undefined}
                            >
                                <Typography sx={{ m: 0.5 }}>{userLogged?.nomeCompleto} </Typography>
                                <LinkSC to={'/perfil'}>
                                    {userLogged?.image ?
                                        <Avatar src={`${userLogged?.image}`} sx={{ width: 32, height: 32 }}> </Avatar> :
                                        <Avatar sx={{ width: 32, height: 32 }}>{userLogged?.nomeCompleto.substring(0, 1)}</Avatar>}
                                </LinkSC>

                            </IconButton>
                        </Tooltip>
                        {(!mdDown) && (<Button color="error" onClick={() => handleUserLogout()}>Sair</Button>)}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}


