import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "../context/AuthContext";
import { Login } from "../pages/Login";

function Router() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default Router;