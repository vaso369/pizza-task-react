import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Footer from './Layout/Footer/Footer'
import Header from './Layout/Header/Header'
import CartPage from './Pages/CartPage/CartPage'
import HomePage from './Pages/HomePage/HomePage'
import LoginPage from './Pages/LoginPage/LoginPage'
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage'
import OrdersPage from './Pages/OrdersPage/OrdersPage'
import PaymentPage from './Pages/PaymentPage/PaymentPage'
import PlaceOrderPage from './Pages/PlaceOrderPage/PlaceOrderPage'
import ProductPage from './Pages/ProductPage/ProductPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import ShippingPage from './Pages/ShippingPage/ShippingPage'
import PrivateRoute from './Routes/PrivateRoute' // eslint-disable-line

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/products/:id" component={ProductPage} />
      <Route path="/cart" component={CartPage} />
      <PrivateRoute path="/shipping" component={ShippingPage} />
      <PrivateRoute path="/payment" component={PaymentPage} />
      <PrivateRoute path="/placeorder" component={PlaceOrderPage} />
      <PrivateRoute path="/orders" component={OrdersPage} />
      <Route component={NotFoundPage} />
    </Switch>
    <Footer />
  </>
)

export default App
