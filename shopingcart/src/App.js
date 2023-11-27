import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login';
import Reg from './Reg';
import Dashboard from './Dashboard';
import Header from './Header';
import Footer from './Footer';
import { ContextApi } from './ContextApi';
import { useEffect, useState } from 'react';
import AdminProduct from './AdminProduct';
import Addproduct from './Addproduct';
import Updateproduct from './Updateproduct';
import Products from './Products';
import Cart from './Cart';
import MyOrders from './MyOrders';


function App() {
  const [loginName, setLoginName] = useState(localStorage.getItem('loginName'))
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <Router>
      <ContextApi.Provider value={{ loginName, setLoginName, cart, setCart }}>
        <Header />
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/reg' element={<Reg />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/adminproduct' element={<AdminProduct />}></Route>
          <Route path='/addproduct' element={<Addproduct />}></Route>
          <Route path='/updateproduct/:id' element={<Updateproduct />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/myorders' element={<MyOrders />}></Route>
        </Routes>
        <Footer />
      </ContextApi.Provider>
    </Router>
  );
}

export default App;