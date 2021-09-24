import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails'
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import Cart from './components/Cart';
import { useState } from 'react';
import ViewmyProfile from './components/ViewmyProfile';
import Editprofile from './components/Editprofile';
import Checkout from './components/Checkout';
import Orderstatus from './components/Orderstatus';
import Paymentstatus from './components/Paymentstatus';
import Myorders from './components/Myorders';
import AdminHome from './Admin/components/AdminHome';
import Dashboard from './Admin/components/Dashboard';
function App() {
 let[login,setLogin]=useState("")


//  console.log(info)
 console.log(login)
  return (
    <>
   
   <BrowserRouter>
   <Header log_stat={login} />
      <Route exact path="/" component={()=> <Home log_stat={setLogin}/>} />
      <Route exact path="/product-details/:id" component={ProductDetails} />
      {/* <Route exact path="/login"  component={() => <Login log_stat={setLogin} />} /> */}
      <Route exact path="/login"  component={()=> <Login  log_stat={setLogin} />} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/user/cart" component={()=><Cart log_stat={setLogin}/>}/>
      <Route exact path="/user/view-profile" component={()=> <ViewmyProfile log_stat={setLogin} />} />
      <Route exact path="/user/profile/edit-profile" component={()=> <Editprofile log_stat={setLogin}/>}/>
      <Route exact path="/user/cart/checkout/:id" component={Checkout}/>
      {/* <Route exact path="/user/cart/checkout/order-confirmed" component={ConfirmOrder} /> */}
      <Route exact path="/user/cart/order/payment-status/:id" component={Paymentstatus}/>
      <Route exact path="/user/cart/order/order-status" component={Orderstatus}/>
      <Route exact path="/user/my-orders" component={Myorders} />

      <Route exact path="/admin-dashbord" component={()=><AdminHome log_stat={setLogin}/>}/>
      <Route exact path="/Dashoard" component={Dashboard} />
   </BrowserRouter>
   </>
  );
}

export default App;
