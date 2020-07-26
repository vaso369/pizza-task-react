import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Footer from './Layout/Footer/Footer'
import Header from './Layout/Header/Header'
import HomePage from './Pages/HomePage/HomePage'
import LoginPage from './Pages/LoginPage/LoginPage'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
    <Footer />
  </>
)

export default App
