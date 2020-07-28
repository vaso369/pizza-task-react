import {
  faEdit,
  faEye,
  faEyeSlash,
  faIdCard,
  faPaperPlane,
  faUser,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register, registerReset } from '../../Redux/Actions/UserActions/UserActions'
import ReusableInput from '../../UI/ReusableInput/ReusableInput'
import { email, firstName, lastName, pass } from './RegisterInputObjects'
import './RegisterPage.css'

const RegisterPage = (props) => {
  const { location, history } = props
  const [state, setState] = useState({})
  const [errorForm, setErrorForm] = useState(false)
  const [passShow, setPassShow] = useState(false)
  const userRegister = useSelector((stateRedux) => stateRedux.userRegister)
  const { loading, registrated, error } = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const dispatch = useDispatch()

  const formHandler = (response) => {
    if (Object.keys(response).length !== 0) {
      setState({
        ...state,
        [response.name]: response.elValue,
        [`${response.name}Error`]: response.error,
      })
    }
  }

  const handlePassShow = () => {
    setPassShow(!passShow)
  }

  const submitHandle = () => {
    const v = state
    const values = Object.keys(v).reduce((accumulator, current) => {
      accumulator.push(v[current])
      return accumulator.filter((el) => el === true)
    }, [])
    if (values[0]) {
      setErrorForm(true)
    } else {
      dispatch(register(state.firstName, state.lastName, state.email, state.password))
    }
  }
  useEffect(() => {
    if (registrated) {
      history.push(redirect === '/' ? '/login' : 'login?redirect=shipping')
      dispatch(registerReset())
    }
  }, [registrated])

  return (
    <>
      <div className="register">
        <Row className="register-form">
          <h2 className="register-form register-form--title">
            <b>
              Register <FontAwesomeIcon icon={faEdit} />
            </b>
          </h2>
          {loading && (
            <Spinner
              animation="border"
              className="spiner mx-auto my-auto"
              variant="secondary"
              style={{ justifySelf: 'center' }}
            />
          )}
          {error && <div>{error}</div>}
          <Form className="p-4">
            <Form.Group controlId="formBasicInfo">
              <Row>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={firstName}
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    label="First Name"
                    handler={formHandler}
                    styles={{ color: 'red' }}
                  />
                </Col>
                <Col lg="1" xs="2" style={{ paddingLeft: '0' }}>
                  <FontAwesomeIcon className="mt-5" icon={faUser} />
                </Col>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={lastName}
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    label="Last Name"
                    handler={formHandler}
                  />
                </Col>
                <Col lg="1" xs="2" style={{ paddingLeft: '0' }}>
                  <FontAwesomeIcon className="mt-5" icon={faUserTie} />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Row>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={email}
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    label="Email"
                    handler={formHandler}
                  />
                </Col>

                <Col lg="1" xs="2" style={{ paddingLeft: '0' }}>
                  <FontAwesomeIcon className="mt-5" icon={faIdCard} />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Row>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={pass}
                    type={passShow ? 'text' : 'password'}
                    placeholder="Password"
                    name="password"
                    label="Password"
                    handler={formHandler}
                  />
                </Col>
                <Col lg="1" xs="2" style={{ paddingLeft: '0' }}>
                  {passShow ? (
                    <FontAwesomeIcon className="mt-5" icon={faEyeSlash} onClick={handlePassShow} />
                  ) : (
                    <FontAwesomeIcon className="mt-5" icon={faEye} onClick={handlePassShow} />
                  )}
                </Col>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={pass}
                    type={passShow ? 'text' : 'password'}
                    placeholder="Repeat password"
                    name="rePassword"
                    label="Re password"
                    handler={formHandler}
                  />
                </Col>
                <Col lg="1" xs="2" style={{ paddingLeft: '0' }}>
                  {passShow ? (
                    <FontAwesomeIcon className="mt-5" icon={faEyeSlash} onClick={handlePassShow} />
                  ) : (
                    <FontAwesomeIcon className="mt-5" icon={faEye} onClick={handlePassShow} />
                  )}
                </Col>
              </Row>
            </Form.Group>
            <Row className="d-flex justify-content-center">
              <Button variant="dark" type="button" className="mt-4 px-4" onClick={submitHandle}>
                <FontAwesomeIcon icon={faPaperPlane} />
                &nbsp; Register
              </Button>
            </Row>
            <Row className="d-flex justify-content-center mt-4">Already have account?</Row>
            <Row className="d-flex justify-content-center">
              Login{' '}
              <Link
                to={redirect === '/' ? 'login' : `login?redirect=${redirect}`}
                className="text-primary"
              >
                <u>here</u>
              </Link>
            </Row>
          </Form>
        </Row>
      </div>
      {errorForm ? (
        <Alert key={1} variant="danger">
          You already have this pizza in cart. Maximum quantity per one order is 5!
        </Alert>
      ) : null}
    </>
  )
}
RegisterPage.propTypes = {
  location: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}
export default RegisterPage
