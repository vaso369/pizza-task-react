import { faEdit, faPaperPlane, faPhone, faStreetView } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import { useDispatch } from 'react-redux'
import { saveShipping } from '../../Redux/Actions/CartActions/CartActions'
import CheckoutSteps from '../../UI/CheckoutSteps/CheckoutSteps'
import ReusableInput from '../../UI/ReusableInput/ReusableInput'
import * as ship from './ShippingInputObjects'
import './ShippingPage.scss'

const ShippingPage = (props) => {
  const { history } = props
  const [errorForm, setErrorForm] = useState(false)

  const [state, setState] = useState({
    address: '',
    phone: '',
    additional: '',
  })
  const dispatch = useDispatch()

  const { address, phone, additional } = state

  const formHandler = (response) => {
    console.log(response)
    if (Object.keys(response).length !== 0) {
      setState({
        ...state,
        [response.name]: response.elValue,
        [`${response.name}Error`]: response.error,
      })
    }
  }

  const submitHandle = () => {
    const v = state || 'Empty values'
    const values = Object.keys(v).reduce((accumulator, current) => {
      accumulator.push(v[current])
      return accumulator.filter((el) => el === true)
    }, [])
    if (values[0]) {
      setErrorForm(true)
    } else {
      dispatch(saveShipping({ address, phone, additional }))
      history.push('payment')
    }
  }
  return (
    <>
      <div className="register">
        <>
          <CheckoutSteps step1 step2 />
        </>
        <Row className="register-form">
          <h2 className="register-form register-form--title bg-dark">
            <b>
              Shipping <FontAwesomeIcon icon={faEdit} />
            </b>
          </h2>
          <Form className="p-4">
            <Form.Group controlId="formBasicAddress">
              <Row>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={ship.address}
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    label="Address"
                    handler={formHandler}
                  />
                </Col>
                <Col lg="1" xs="2" style={{ paddingLeft: '0' }}>
                  <FontAwesomeIcon className="mt-5" icon={faStreetView} />
                </Col>
                <Col xs={10} lg={5}>
                  <ReusableInput
                    elName={ship.phone}
                    type="text"
                    placeholder="Enter phone"
                    name="phone"
                    label="Phone"
                    handler={formHandler}
                  />
                </Col>
                <Col lg="1" xs="2" style={{ paddingLeft: '0' }}>
                  <FontAwesomeIcon className="mt-5" icon={faPhone} />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <ReusableInput
                elName={ship.additional}
                type="textarea"
                name="additional"
                label="Additional informations"
                handler={formHandler}
              />
            </Form.Group>
            <Row className="d-flex justify-content-center">
              <Button
                variant="dark"
                type="button"
                className="mt-4 px-4 bg-dark"
                onClick={submitHandle}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                &nbsp; Submit
              </Button>
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
ShippingPage.propTypes = {
  history: PropTypes.object.isRequired,
}
export default ShippingPage
