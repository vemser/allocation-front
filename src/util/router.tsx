import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/sign-up' element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;