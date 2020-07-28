import { faDollarSign, faEuroSign, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, getPriceByCurrency } from '../../Redux/Actions/OrderActions/OrderActions'
import CheckoutSteps from '../../UI/CheckoutSteps/CheckoutSteps'
import { Currency } from '../../UI/Currency/Currency'
import './PlaceOrderPage.scss'

const PlaceOrderPage = (props) => {
  const dispatch = useDispatch()
  const { history } = props
  const cart = useSelector((state) => state.cart)
  const { cartItems, shipping, payment } = cart
  const convert = useSelector((state) => state.priceConverter)
  const { price, currency } = convert
  if (!shipping.address) {
    history.push('/shipping')
  }
  if (!payment.paymentMethod) {
    history.push('/payment')
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0)
  const shippingPrice = itemsPrice > 15 ? 0 : 5
  const totalPrice = itemsPrice + shippingPrice

  const placeOrderHandler = () => {
    const order = {
      address: shipping.address,
      phone: shipping.phone,
      additionalInfo: shipping.additional,
      payment: payment.paymentMethod,
      items: cart.cartItems.reduce((acc, current) => {
        acc.push({
          pizzaId: current.id,
          quantity: current.qty,
          pizzaSizeId: current.sizeId,
        })
        return acc.filter((el) => el)
      }, []),
    }
    dispatch(createOrder(order))
    history.push('/orders')
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3 className="pb-4">
              <b>Shipping</b>
            </h3>
            <div>
              <h5>Address:</h5>
              <p>{shipping.address}</p>
              <h5>Phone:</h5>
              <p>{shipping.phone}</p>
              <h5>Additional info</h5>
              <p>{shipping.additional}</p>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="pb-4">
              <b>Payment</b>
            </h3>
            <div>Payment Method: {payment.paymentMethod}</div>
          </div>
          <div className="mt-5">
            <ul className="cart-list-container">
              <li>
                <h3 className="pb-4">
                  <b>Shopping Cart</b>
                </h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>{item.name}</div>
                      <div>Quantity: {item.qty}</div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>
                {itemsPrice}
                <FontAwesomeIcon icon={faEuroSign} className="text-dark ml-2" />
              </div>
            </li>
            <li>
              <div>Shipping</div>
              <div>
                {shippingPrice} <FontAwesomeIcon icon={faEuroSign} className="text-dark ml-2" />
              </div>
            </li>

            <hr />

            <li>
              <div>Order Total</div>
              <div>
                {price !== 0
                  ? currency === 'eur'
                    ? itemsPrice + shippingPrice
                    : price
                  : itemsPrice + shippingPrice}{' '}
                <FontAwesomeIcon
                  icon={
                    currency === '' ? faEuroSign : currency === 'usd' ? faDollarSign : faEuroSign
                  }
                  className="text-dark ml-2"
                />
              </div>
            </li>
            <li>
              <div>
                <Currency
                  dispatch={getPriceByCurrency}
                  price={
                    price !== 0
                      ? currency === 'eur'
                        ? itemsPrice + shippingPrice
                        : price
                      : itemsPrice + shippingPrice
                  }
                />
              </div>
            </li>
            <li>
              <Button variant="warning" onClick={placeOrderHandler} className="mt-5">
                <FontAwesomeIcon icon={faPaperPlane} />
                &nbsp; Place Order
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
PlaceOrderPage.propTypes = {
  history: PropTypes.object.isRequired,
}
export default PlaceOrderPage
