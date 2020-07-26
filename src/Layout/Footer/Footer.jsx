import React from 'react'
import { Image } from 'react-bootstrap'
import Logo from '../../Assets/logo-pizza-white.svg'
import './Footer.scss'

const Footer = () => (
  <div className="text-center footer bg-dark fixed-bottom d-flex align-items-center justify-content-around flex-wrap">
    <div>
      <small>Copyright - Vasilije Vasilijevic &copy; 2020</small>
    </div>
    <div className="d-flex align-items-center">
      <Image src={Logo} alt="logo-yummi-pizza" className="logo" />

      <h1 className="logo-brand-text-footer">yummi-pizza</h1>
    </div>
  </div>
)

export default Footer
