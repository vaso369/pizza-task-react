import { faBookOpen, faShoppingCart, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { HashRouter, Link } from 'react-router-dom'
import Logo from '../../Assets/logo-pizza.svg'
import './Header.scss'

const Header = () => (
  <HashRouter>
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow" sticky="top">
      <Container>
        <Navbar.Brand href="#">
          <div className="d-flex align-items-center">
            <Image
              src={Logo}
              alt="logo-yummi-pizza"
              style={{
                width: '50px',
                height: '50px',
                marginRight: '0.5rem',
              }}
            />
            <h1 className="logo-brand-text">yummi-pizza</h1>
          </div>
        </Navbar.Brand>{' '}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="bg-dark">
          <Nav className="mr-auto ml-5">
            <Link to="/" className="nav-link mr-5">
              <FontAwesomeIcon icon={faBookOpen} /> Menu
            </Link>
            <Link to="/cart" className="nav-link mr-5">
              <FontAwesomeIcon icon={faShoppingCart} /> Cart( )
            </Link>
          </Nav>
          <Link to="/login" className="nav-link login-btn">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </HashRouter>
)

export default Header
