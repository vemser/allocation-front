import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "../context/UserContext";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { useContext } from "react";
import { CadastroUsuario } from "../pages/CadastroUsuario";
import { Login } from "../pages/Login";

export const PrivateRoute = () => {
  const { token } = useContext(AuthContext);
  return token ? <Outlet /> : <Navigate to="/" />;
}

function Router() {
  return (
    <BrowserRouter>
      <ToastContainer />   
      <AuthProvider>
        <UserProvider>
        <Routes>
          <Route index element={<Login />}/>
          <Route path='/cadastro-usuario' element={<CadastroUsuario />} />
          <Route element={<PrivateRoute />}>

          </Route>
        </Routes>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default Router;