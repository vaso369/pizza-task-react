import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Footer from './Layout/Footer/Footer'
import Header from './Layout/Header/Header'
import HomePage from './Pages/HomePage/HomePage'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
    <Footer />
  </>
)

export default App
