import {
  faAlignLeft,
  faBookOpen,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { HashRouter, Link } from 'react-router-dom'
import Logo from '../../Assets/logo-pizza.svg'
import { logout } from '../../Redux/Actions/UserActions/UserActions'
import './Header.scss'

const Header = () => {
  const dispatch = useDispatch()
  const [welcome, setWelcome] = useState('Welcome, ')
  const [pulse, setPulse] = useState(false)

  const userSignin = useSelector((state) => state.userSignIn)
  const cart = useSelector((state) => state.cart.cartItems)
  const ordersCount = useSelector((state) => state.myOrderList.orderCount)

  const { userInfo } = userSignin
  const userFullName = userInfo ? `${userInfo.user.first_name} ${userInfo.user.last_name}` : ''
  const handleLogOut = () => {
    dispatch(logout())
    setWelcome('Welcome, ')
  }
  if (userInfo) {
    setTimeout(() => {
      setWelcome('')
    }, 3000)
  }

  useEffect(() => {
    if (cart.length > 0) {
      setPulse(true)
      setTimeout(() => {
        setPulse(false)
      }, 2000)
    }
  }, [cart])
  return (
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
                <FontAwesomeIcon icon={faShoppingCart} className={pulse ? 'anim' : ''} />{' '}
                Cart(&nbsp;
                {cart.length}&nbsp;)
              </Link>
              {userInfo ? (
                <>
                  <Link to="/orders" className="nav-link">
                    <FontAwesomeIcon icon={faAlignLeft} /> Orders(&nbsp;
                    {ordersCount}&nbsp;)
                  </Link>
                </>
              ) : null}
            </Nav>
            {userInfo ? (
              <div className="d-flex align-items-center">
                <p style={{ margin: 0 }} className="text-white">
                  {welcome} {userFullName}
                </p>
                <Link to="/" className="nav-link" onClick={handleLogOut}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </Link>
              </div>
            ) : (
              <Link to="/login" className="nav-link login-btn">
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </HashRouter>
  )
}
export default Header
