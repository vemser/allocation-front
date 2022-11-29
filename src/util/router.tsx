import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material'
import { UserProvider } from "../context/UserContext";
import { AuthContext, AuthProvider } from "../context/AuthContext/AuthContext";
import { useContext } from "react";
import { CadastroUsuario } from "../pages/CadastroUsuario";
import { Login } from "../pages/Login";
import PainelDeVagas from "../pages/PainelDeVagas";
import { DbcTheme } from "../themes";
import { DashCadastroAluno } from "../pages/DashCadastroAluno";
import { CadastroVaga } from "../pages/CadastroVaga";
import { VagaProvider } from "../context/VagaContext";
import { CadastroPrograma } from "../pages/CadastroPrograma";
import { ProgramaProvider } from "../context/ProgramaContext";
import { ReservaAlocacaoProvider } from "../context/ReservaAlocacaoContext";
import { CadastroReservaAlocacao } from "../pages/CadastroReservaAlocacao";
import { CadastroAlunos } from "../pages/CadastroAlunos";
import { AlunoProvider } from "../context/AlunoContext";
import { AvaliacaoProvider } from "../context/AvaliacaoContext";
import { DashAvaliacao } from "../pages/DashAvaliacao";
import { CadastroAvaliacao } from "../pages/CadastroAvaliacao";
import { DashCadastroUsuarios } from "../pages/DashCadastroUsuarios";
import { DashAluno } from "../pages/DashAluno";
import { PaginaErro } from "../pages/PaginaErro";
import { Perfil } from "../pages/Perfil";
import { CadastroCliente } from "../pages/CadastroCliente";
import { ClienteProvider } from "../context/ClienteContext";
import { DashClientes } from "../pages/DashClientes";

export const PrivateRoute = () => {
  const { token } = useContext(AuthContext);
  return token ? <Outlet /> : <Navigate to="/" />;
}

function Router() {
  return (
    <ThemeProvider theme={DbcTheme}>
      <BrowserRouter>
        <ToastContainer />
        <AuthProvider>
          <UserProvider>
            <VagaProvider>
              <ProgramaProvider>
                <ReservaAlocacaoProvider>
                  <AlunoProvider>
                    <AvaliacaoProvider>
                      <ClienteProvider>
                        <Routes>
                          <Route index element={<Login />} />
                          <Route path='/cadastro-usuario' element={<CadastroUsuario />} />
                          <Route element={<PrivateRoute />}>
                            <Route path='/cadastro-vaga' element={<CadastroVaga />} />
                            <Route path='/painel-vagas' element={<PainelDeVagas />} />
                            <Route path='/alunos' element={<DashCadastroAluno />} />
                            <Route path='/perfil' element={<Perfil />} />
                            <Route path='/usuarios' element={<DashCadastroUsuarios />} />
                            <Route path='/cadastro-programa' element={<CadastroPrograma />} />
                            <Route path='/cadastro-reserva-alocacao' element={<CadastroReservaAlocacao />} />
                            <Route path='/cadastro-alunos' element={<CadastroAlunos />} />
                            <Route path='/cadastro/avaliacao/:tipo' element={<CadastroAvaliacao />} />
                            <Route path='/avaliacoes' element={<DashAvaliacao />} />
                            <Route path='/dash-alunos' element={<DashAluno />} />
                            <Route path='/clientes' element={<DashClientes />} />
                            <Route path='/cadastro/cliente' element={<CadastroCliente />} />
                            <Route path='*' element={<PaginaErro />} />
                          </Route>
                        </Routes>
                      </ClienteProvider>
                    </AvaliacaoProvider>
                  </AlunoProvider>
                </ReservaAlocacaoProvider>
              </ProgramaProvider>
            </VagaProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider >
  );
}
export default Router;