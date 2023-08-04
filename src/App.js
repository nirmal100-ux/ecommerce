import React from 'react'
import { Route, Routes } from 'react-router'
import RootLayOut from './components/RootLayOut'
import HomePage from './pages/HomePage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/auths/Login';
import SignUp from './pages/auths/SignUp';
import UserRoutes from './components/UserRoutes';
import AdminRoutes from './components/AdminRoutes';
import AddProduct from './pages/AdminPage/AddProduct';
import ProductList from './pages/AdminPage/ProductList';
import EditProduct from './pages/AdminPage/EditProduct';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import AuthRoutes from './components/AuthRoutes';
import Shipping from './pages/auths/Shipping';
import OrderPage from './pages/auths/OrderPage';
import UserProfile from './pages/UserPage/UserProfile';
import OrderDetail from './pages/UserPage/OrderDetail';
import AdminProfile from './pages/AdminPage/AdminProfile';


const App = () => {
  // let data = [{ id: 1, title: 'hello' }, { id: 2, title: 'welcome' }];


  // data = data.map((d) => d.id === 1 ? { title: 'sello', id: 1 } : d);
  // console.log(data);

  // const numbers = [22, 33, 44, 55];
  // numbers.splice(1, 1);
  // console.log(numbers);

  return (
    <>
      <Routes>
        <Route path='/' element={<RootLayOut />}>

          <Route index element={<HomePage />} />

          <Route path='product/detail/:id' element={<ProductDetail />} />

          <Route element={<AuthRoutes />}>
            <Route path='user/login' element={<Login />} />
            <Route path='user/SignUp' element={<SignUp />} />
          </Route>

          <Route element={<UserRoutes />}>
            <Route path='user/profile' element={<UserProfile />} />
            <Route path='user/cart' element={<CartPage />} />
            <Route path='user/shipping' element={<Shipping />} />
            <Route path='user/checkout' element={<OrderPage />} />
            <Route path='user/order/:id' element={<OrderDetail />} />

          </Route>

          <Route element={<AdminRoutes />}>
            <Route path='user/login' element={<Login />} />
            <Route path='user/SignUp' element={<SignUp />} />
            <Route path='products/all' element={<ProductList />} />
            <Route path='product/add' element={<AddProduct />} />
            <Route path='product/:id' element={<EditProduct />} />
            <Route path='user/allDetail' element={<AdminProfile />} />

          </Route>




        </Route>

      </Routes>
      <ToastContainer autoClose={1000} position='top-right' />
    </>
  )
}

export default App
