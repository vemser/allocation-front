import { useContext } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext, AuthProvider } from "../context/AuthContext";
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
        <Routes>
          <Route index element={<Login />}/>
          <Route element={<PrivateRoute />}>

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default Router;