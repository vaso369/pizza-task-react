import { faEnvelope, faEye, faEyeSlash, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from '../../Redux/Actions/UserActions/UserActions'
import './LoginPage.css'

const LoginPage = (props) => {
  const { location, history } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passShow, setPassShow] = useState(false)

  const userSignIn = useSelector((state) => state.userSignIn)
  const { loading, userInfo, error } = userSignIn
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()
  useEffect(() => {
    if (userInfo) {
      history.push(redirect === '/' ? '/' : '/shipping')
    }
  }, [userInfo])
  const handlePassShow = () => {
    setPassShow(!passShow)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(signin(email, password))
  }

  return (
    <div className="login">
      <Row className="login-form">
        <h2 className="login-form login-form--title bg-dark">
          <b>Login</b>
        </h2>
        <Form className="p-4" onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col lg="1" xs="2" style={{ paddingLeft: '0' }}>
                <FontAwesomeIcon icon={faEnvelope} />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type={passShow ? 'text' : 'password'}
                  placeholder="Password"
                  name="email"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
              <Col lg="1" xs="2" style={{ paddingLeft: '0' }}>
                {passShow ? (
                  <FontAwesomeIcon icon={faEyeSlash} onClick={handlePassShow} />
                ) : (
                  <FontAwesomeIcon icon={faEye} onClick={handlePassShow} />
                )}
              </Col>
            </Row>
          </Form.Group>
          <Row className="d-flex justify-content-center">
            {loading && <Spinner animation="border" variant="secondary" />}
            {error && <div className="text-danger">{error}</div>}
          </Row>
          <Row className="d-flex justify-content-center">
            <Button variant="dark" type="submit" className="mt-5 px-4">
              <FontAwesomeIcon icon={faSignInAlt} />
              &nbsp; Login
            </Button>
          </Row>
          <Row className="d-flex justify-content-center mt-4">Don`t have an account?</Row>
          <Row className="d-flex justify-content-center">
            Register{' '}
            <Link
              to={redirect === '/' ? 'register' : `register?redirect=${redirect}`}
              className="text-primary"
            >
              &nbsp;<u>here</u>
            </Link>
          </Row>
        </Form>
      </Row>
    </div>
  )
}
LoginPage.propTypes = {
  location: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}
export default LoginPage
