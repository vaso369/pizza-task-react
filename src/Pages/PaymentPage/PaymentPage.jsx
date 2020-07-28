import { faEdit, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { savePayment } from '../../Redux/Actions/CartActions/CartActions'
import CheckoutSteps from '../../UI/CheckoutSteps/CheckoutSteps'
import './PaymentPage.scss'

const PaymentPage = (props) => {
  const { history } = props
  const [paymentMethod, setPaymentMethod] = useState()

  const dispatch = useDispatch()

  const submitHandle = () => {
    dispatch(savePayment({ paymentMethod }))
    history.push('placeorder')
  }
  return (
    <>
      <div className="register">
        <div>
          <CheckoutSteps step1 step2 step3 />
        </div>
        <Row className="register-form">
          <h2 className="register-form register-form--title">
            <b>
              Shipping <FontAwesomeIcon icon={faEdit} />
            </b>
          </h2>
          <Form className="p-4 ">
            <Form.Group controlId="formBasicAddress">
              <Row className="w-100 d-flex justify-content-center text-center">
                <Col xs={10} lg={5}>
                  <label htmlFor="radio" className="mr-4">
                    Credit Card
                  </label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    value="Card"
                  />
                </Col>
                <Col xs={10} lg={5}>
                  <label htmlFor="radio" className="mr-4">
                    Cash
                  </label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    value="Cash"
                  />
                </Col>
              </Row>
            </Form.Group>

            <Row className="d-flex justify-content-center">
              <Button variant="dark" type="button" className="mt-4 px-4" onClick={submitHandle}>
                <FontAwesomeIcon icon={faPaperPlane} />
                &nbsp; Continue
              </Button>
            </Row>
          </Form>
        </Row>
      </div>
    </>
  )
}
PaymentPage.propTypes = {
  history: PropTypes.object.isRequired,
}
export default PaymentPage
