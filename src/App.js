import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Footer from './Layout/Footer/Footer'
import Header from './Layout/Header/Header'
import HomePage from './Pages/HomePage/HomePage'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </Switch>
    <Footer />
  </>
)

export default App
