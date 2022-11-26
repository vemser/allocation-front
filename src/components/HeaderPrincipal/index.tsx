import { Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import { BoxSC } from "../HeaderLogin/HeaderLogin.styled";
import logo from '../../assets/dbclogo.png';
import { useState } from "react";

export const HeaderPrincipal = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
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
                    <Button sx={{ minWidth: 100 }}>Painel de Vagas</Button>
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
                        <MenuItem onClick={handleClose}>Alunos</MenuItem>
                        <MenuItem onClick={handleClose}>Clientes</MenuItem>
                        <MenuItem onClick={handleClose}>Vagas</MenuItem>
                        <MenuItem onClick={handleClose}>Programas</MenuItem>
                        <MenuItem onClick={handleClose}>Avaliações</MenuItem>
                        <MenuItem onClick={handleClose}>Reserva e Alocação</MenuItem>
                    </Menu>
                    <Tooltip title="Account settings">
                        <IconButton
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={true ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={true ? 'true' : undefined}
                        >
                            <Typography sx={{ m: 0.5 }}>Nome do Usuário </Typography>
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                           
                        </IconButton>
                    </Tooltip>
                    <Button color="error">Sair</Button>
                </Box>
            </Box>
        </Container>
    );
}


