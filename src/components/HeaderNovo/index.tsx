import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import AdbIcon from '@mui/icons-material/Adb'
import { BoxSC } from '../HeaderLogin/HeaderLogin.styled'
import logo from '../../assets/dbclogo.png'
import { useMediaQuery, useTheme } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { Link, useNavigate } from 'react-router-dom'
import { LinkSC, LinkMenu, LinkMenuMin } from './NewHeader.styled'
import { AuthContext } from '../../context/AuthContext/AuthContext'

const pages = ['aaabbbb', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function HeaderNovo() {
  const { userLogged } = React.useContext(AuthContext)
  const { handleUserLogout } = React.useContext(AuthContext)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md')) // menor que 600px
  const xsDown = useMediaQuery(theme.breakpoints.down('xs')) // menor que 420px

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorEl(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BoxSC>
            <img src={logo} alt="dasdas" />
          </BoxSC>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <MenuItem>
                <LinkMenu to="/painel-vagas">
                  <Button sx={{ minWidth: 100 }}>Painel de Vagas</Button>
                </LinkMenu>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              // color: 'inherit',
              textDecoration: 'none'
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' }
            }}
          >
            <LinkMenu to="/painel-vagas">
              <Button> Painel de Vagas</Button>
            </LinkMenu>
            <LinkMenu to="/dash-alunos">
              <Button> Painel de Alunos</Button>
            </LinkMenu>
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
                  'aria-labelledby': 'basic-button'
                }}
              >
                <LinkMenuMin to="/painel-vagas">
                  <MenuItem onClick={handleClose}>Painel de Vagas</MenuItem>
                </LinkMenuMin>
                <LinkMenuMin to="/dash-alunos">
                  <MenuItem onClick={handleClose}>Painel de Alunos</MenuItem>
                </LinkMenuMin>
                <LinkSC to="/alunos">
                  <MenuItem onClick={handleClose}>Alunos</MenuItem>
                </LinkSC>
                <LinkSC to="/usuarios">
                  <MenuItem onClick={handleClose}>Usuários</MenuItem>
                </LinkSC>
                <LinkSC to="/clientes">
                  <MenuItem onClick={handleClose}>Clientes</MenuItem>
                </LinkSC>
                <LinkSC to="/programas">
                  <MenuItem onClick={handleClose}>Programas</MenuItem>
                </LinkSC>
                <LinkSC to="/avaliacoes">
                  <MenuItem onClick={handleClose}>Avaliações</MenuItem>
                </LinkSC>
                <LinkSC to="/reservas-alocacoes">
                  <MenuItem onClick={handleClose}>Reserva e Alocação</MenuItem>
                </LinkSC>
                {mdDown && (
                  <Button color="error" onClick={() => handleUserLogout()}>
                    Sair
                  </Button>
                )}
              </Menu>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Perfil">
              <IconButton
                // onClick={() => navigate('/perfil')}
                size="small"
                sx={{
                  ml: 2,
                  borderRadius: '20px',
                  '&:hover': {
                    background: 'var(--azul-header)',
                    color: 'white'
                  }
                }}
                aria-controls={true ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={true ? 'true' : undefined}
              >
                <Typography sx={{ m: 0.5 }}>
                  {userLogged?.nomeCompleto}{' '}
                </Typography>
                <LinkSC to={'/perfil'}>
                  {userLogged?.image ? (
                    <Avatar
                      src={`${userLogged?.image}`}
                      sx={{ width: 40, height: 40 }}
                    >
                      {' '}
                    </Avatar>
                  ) : (
                    <Avatar sx={{ width: 40, height: 32 }}>
                      {userLogged?.nomeCompleto.substring(0, 1)}
                    </Avatar>
                  )}
                </LinkSC>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map(setting => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </IconButton>
            </Tooltip>
            {!mdDown && (
              <Button color="error" onClick={() => handleUserLogout()}>
                Sairaaa
              </Button>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default HeaderNovo
