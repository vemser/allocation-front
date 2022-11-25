import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;