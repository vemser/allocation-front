import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CadastroUsuario } from "../pages/CadastroUsuario";
import { Login } from "../pages/Login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/cadastro-usuario' element={<CadastroUsuario />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;