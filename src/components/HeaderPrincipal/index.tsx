import { Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import { BoxSC } from "../HeaderLogin/HeaderLogin.styled";
import logo from '../../assets/dbclogo.png';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { Link, useNavigate } from 'react-router-dom'
import { LinkSC } from "./HeaderPrincipal.styled";

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
    return (
        <Container>
            <Box sx={{
                mt: '20px',
                height: '70px',
                borderRadius: '15px',
                boxShadow: '-5px 7px 15px -4px rgba(0,0,0,0.75)',
                display: 'flex',
                alignItems: 'center',
                p: 2,
                justifyContent: "space-between"
            }}>
                <BoxSC>
                    <img src={logo} alt="logo" />
                </BoxSC>

                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', flexWrap: "wrap" }}>
                    <LinkSC to='/painel-vagas'> <Button sx={{ minWidth: 100 }}>Painel de Vagas</Button></LinkSC>
                    <LinkSC to='/dash-alunos'> <Button sx={{ minWidth: 100 }}>Painel de Alunos</Button></LinkSC>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Menu
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <LinkSC to='/alunos'><MenuItem onClick={handleClose}>Alunos</MenuItem></LinkSC>
                        <LinkSC to='/usuarios'><MenuItem onClick={handleClose}>Usuários</MenuItem></LinkSC>
                        <LinkSC to='/clientes'><MenuItem onClick={handleClose}>Clientes</MenuItem></LinkSC>
                        <LinkSC to='/painel-vagas'><MenuItem onClick={handleClose}>Vagas</MenuItem></LinkSC>
                        <LinkSC to='/programas'><MenuItem onClick={handleClose}>Programas</MenuItem></LinkSC>
                        <LinkSC to='/avaliacoes'><MenuItem onClick={handleClose}>Avaliações</MenuItem></LinkSC>
                        <LinkSC to='/cadastro-reserva-alocacao'><MenuItem onClick={handleClose}>Reserva e Alocação</MenuItem></LinkSC>
                    </Menu>
                    <Tooltip title="Perfil">
                        <IconButton
                        onClick={()=> navigate('/perfil')}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={true ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={true ? 'true' : undefined}
                        >
                            <Typography sx={{ m: 0.5 }}>{userLogged?.nomeCompleto} </Typography>
                            <LinkSC to={'/perfil'}>
                                {userLogged?.image ?
                                    <Avatar src={`data:image/jpg;base64,${userLogged?.image}`} sx={{ width: 32, height: 32 }}> </Avatar> :
                                    <Avatar sx={{ width: 32, height: 32 }}>{userLogged?.nomeCompleto.substring(0, 1)}</Avatar>}
                            </LinkSC>

                        </IconButton>
                    </Tooltip>
                    <Button color="error" onClick={() => handleUserLogout()}>Sair</Button>
                </Box>
            </Box>
        </Container>
    );
}


