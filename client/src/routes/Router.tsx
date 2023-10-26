import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import Home from '../pages/general/Home';
import NoPage from '../pages/general/NoPage';
import Profile from '../pages/store/Profile';
import Store from '../pages/store/Store';
import Order from '../pages/store/Order';
import AnonymousRoutes from '../utils/AnonymousRoutes';
import CustomerRoutes from '../utils/CustomerRoutes';
import OwnerRoutes from '../utils/OwnerRoutes';
import AdminRoutes from '../utils/AdminRoutes';
import Address from '../pages/general/Address';
import Success from '../pages/customer/Success';
import Payment from '../pages/customer/Payment';
import History from '../pages/customer/History';
import Cart from '../pages/customer/Cart';
import Favorite from '../pages/customer/Favorite';
import ValidatePayment from '../pages/administrator/ManagePayment';
import Product from '../pages/store/Product';
import EditProduct from '../pages/store/EditProduct';
import CreateProduct from '../pages/store/CreateProduct';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AnonymousRoutes/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/address" element={<Address/>}/>
          <Route path="/*" element={<NoPage/>}/>
        </Route>
        <Route element={<CustomerRoutes/>}>
          <Route path="/favorite" element={<Favorite/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="payment" element={<Payment/>}/>
          <Route path="success" element={<Success/>}/>
        </Route>
        <Route path='/store' element={<OwnerRoutes />}>
          <Route path="product" element={<Product />} />
          <Route path="product/:id" element={<EditProduct />} />
          <Route path="product/create" element={<CreateProduct />} />
          <Route path="order" element={<Order />} />
        </Route>

        <Route element={<AdminRoutes/>}>
          <Route path="/admin" element={<ValidatePayment />}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
