import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material'
import { UserProvider } from "../context/UserContext";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { useContext } from "react";
import { CadastroUsuario } from "../pages/CadastroUsuario";
import { Login } from "../pages/Login";
import PainelDeVagas from "../pages/PainelDeVagas";
import { DbcTheme } from "../themes";
import { DashCadastroAluno } from "../pages/DashCadastroAluno";
import { CadastroVaga } from "../pages/CadastroVaga";
import { VagaProvider } from "../context/VagaContext";

export const PrivateRoute = () => {
  const { token } = useContext(AuthContext);
  return <Outlet />;//!token ? <Outlet /> : <Navigate to="/" />;
}

function Router() {
  return (
    <ThemeProvider theme={DbcTheme}>
      <BrowserRouter>
        <ToastContainer />
        <AuthProvider>
          <UserProvider>
            <VagaProvider>
              <Routes>
                <Route index element={<Login />} />
                <Route path='/cadastro-usuario' element={<CadastroUsuario />} />
                <Route element={<PrivateRoute />}>
                  <Route path='/cadastro-vaga' element={<CadastroVaga />} />
                  <Route path='/painel-vagas' element={<PainelDeVagas />} />
                  <Route path='/alunos' element={<DashCadastroAluno />} />
                </Route>
              </Routes>
            </VagaProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default Router;