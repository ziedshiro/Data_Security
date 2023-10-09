import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import Home from '../pages/general/Home';
import NoPage from '../pages/general/NoPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/error" element={<NoPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
