import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Footer from './Layout/Footer/Footer'
import Header from './Layout/Header/Header'
import CartPage from './Pages/CartPage/CartPage'
import HomePage from './Pages/HomePage/HomePage'
import LoginPage from './Pages/LoginPage/LoginPage'
import ProductPage from './Pages/ProductPage/ProductPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/products/:id" component={ProductPage} />
      <Route path="/cart" component={CartPage} />
    </Switch>
    <Footer />
  </>
)

export default App
