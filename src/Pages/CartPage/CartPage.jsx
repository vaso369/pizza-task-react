import {
  faEuroSign,
  faShoppingCart,
  faSortNumericDown,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart, updateQty } from '../../Redux/Actions/CartActions/CartActions'
import './CartPage.scss'

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const productId = props.match.params.id // eslint-disable-line
  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1 // eslint-disable-line
  const dispatch = useDispatch()
  useEffect(() => {
    if (productId) {
      //
    }
  }, [dispatch, productId, qty, cartItems])
  const removeFromCartHandler = (id, sizeId) => {
    dispatch(removeFromCart(id, sizeId))
  }
  const checkOutHandler = () => {
    props.history.push('/login?redirect=shipping')
  }
  const optionsQuantity = () => {
    const options = []
    for (let i = 1; i <= 5; i++) {
      options.push(<option value={i}>{i}</option>)
    }
    return options
  }
  const optionsHTML = optionsQuantity()
  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>
              Shopping cart <FontAwesomeIcon icon={faShoppingCart} />
            </h3>
            <div>
              <FontAwesomeIcon icon={faEuroSign} className="text-dark ml-2" /> Price
            </div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item-container" key={item.price}>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name d-flex align-items-center justify-content-around">
                  <Link
                    to={`product/${item.id}`}
                    className="text-dark cart-name-link"
                    style={{ flexBasis: '20rem' }}
                  >
                    <b>{item.name}</b>
                    <h5>
                      {' '}
                      <b>{item.size}</b>
                    </h5>
                  </Link>

                  <Form.Label className="d-flex align-items-center">
                    <FontAwesomeIcon className="mr-2" icon={faSortNumericDown} /> Quantity:
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={
                        (e) => dispatch(updateQty(item.id, Number(e.target.value), item.sizeId)) // eslint-disable-line
                      }
                      className="ml-4"
                    >
                      {optionsHTML}
                    </Form.Control>
                  </Form.Label>

                  <Button
                    variant="dark"
                    onClick={() => removeFromCartHandler(index)}
                    className="cartBtn"
                  >
                    <FontAwesomeIcon className="mr-2" icon={faTrash} /> Delete
                  </Button>
                </div>
                <div className="cart-price d-flex align-items-center">
                  <FontAwesomeIcon icon={faEuroSign} className="text-dark ml-2" /> &nbsp;
                  {item.price}
                </div>
              </div>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ({cartItems.reduce((a) => a + qty, 0)} items): <br />
          <FontAwesomeIcon icon={faEuroSign} className="text-dark ml-2" />{' '}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <Button
          variant="dark"
          onClick={checkOutHandler}
          className="button primary full-width cartBtn"
          disabled={cartItems.length === 0}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          &nbsp; Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}

CartPage.propTypes = {
  history: PropTypes.object.isRequired,
}

export default CartPage
