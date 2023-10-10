import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import Home from '../pages/general/Home';
import NoPage from '../pages/general/NoPage';
import Profile from '../pages/store/Profile';
import Store from '../pages/store/Store';
import Order from '../pages/store/Order';
import Management from '../pages/store/Management';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/store" element={<Store />}>
          <Route path="profile" element={<Profile />} />
          <Route path="order" element={<Order />} />
          <Route path="management" element={<Management />} />
        </Route>
        <Route path="/error" element={<NoPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
