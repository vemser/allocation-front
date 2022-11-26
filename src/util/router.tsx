import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import { CadastroUsuario } from "../pages/CadastroUsuario";
import { Login } from "../pages/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Router() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <UserProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/cadastro-usuario' element={<CadastroUsuario />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
export default Router;