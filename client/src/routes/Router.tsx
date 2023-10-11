import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import Home from '../pages/general/Home';
import NoPage from '../pages/general/NoPage';
import Profile from '../pages/store/Profile';
import Store from '../pages/store/Store';
import Order from '../pages/store/Order';
import Management from '../pages/store/Management';
import AnonymousRoutes from '../utils/AnonymousRoutes';
import CustomerRoutes from '../utils/CustomerRoutes';
import OwnerRoutes from '../utils/OwnerRoutes';
import AdminRoutes from '../utils/AdminRoutes';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AnonymousRoutes/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/*" element={<NoPage/>}/>
        </Route>
        <Route element={<CustomerRoutes/>}>


        </Route>
        <Route element={<OwnerRoutes/>}>


        </Route>

        <Route element={<AdminRoutes/>}>


        </Route>

        <Route path="/store" element={<Store />}>
          <Route path="profile" element={<Profile />} />
          <Route path="order" element={<Order />} />
          <Route path="management" element={<Management />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
