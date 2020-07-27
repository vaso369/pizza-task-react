import {
  faBookOpen,
  faDollarSign,
  faEuroSign,
  faInfo,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Image, Spinner } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../../Redux/Actions/CartActions/CartActions'
import { detailsProduct } from '../../Redux/Actions/ProductActions/ProductActions'
import { ingredientList } from '../../Utilities/IngredientList'
import './ProductPage.scss'

const ProductPage = (props) => {
  const { match } = props

  const productDetails = useSelector((state) => state.productDetails)
  const cart = useSelector((state) => state.cart.cartItems)

  const { product, loading, error } = productDetails
  const [price, setPrice] = useState(0)
  const [size, setSize] = useState(1)
  const [quantityError, setQuantityError] = useState(false)

  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(detailsProduct(match.params.id))
    return () => {
      //
    }
  }, [dispatch, match.params.id])

  const handleAddToCart = (id) => {
    const productInCart = cart.find((el) => el.id === id && el.sizeId === size)
    if (productInCart) {
      const productInCartQuantity = productInCart.qty
      if (productInCartQuantity + quantity > 5) {
        setQuantityError(true)
        setTimeout(() => {
          setQuantityError(false)
        }, 4000)
      } else {
        dispatch(addToCart(id, quantity, size))
      }
    } else {
      dispatch(addToCart(id, quantity, size))
    }
  }
  const optionsQuantity = () => {
    const options = []
    for (let i = 1; i <= 5; i++) {
      options.push(<option value={i}>{i}</option>)
    }
    return options
  }
  const optionsHTML = optionsQuantity()
  const setPriceControlSize = (e) => {
    const productPrice = product.sizes?.filter((el) => el.size_id === e)[0].price
    setPrice(productPrice)
    setSize(e)
  }
  const setPriceControlQuantity = (e) => {
    setQuantity(e)
  }
  let priceProduct
  if (loading === false) {
    priceProduct = product.sizes[0].price
  }

  useEffect(() => {
    setPrice(priceProduct)
    return () => {
      // cleanup
    }
  }, [priceProduct])

  return (
    <div className="product-item">
      {/* <Container className="container-wrapper"> */}
      <div className="back-to-result">
        <Link to="/">
          <Button variant="outline-dark">
            <FontAwesomeIcon icon={faBookOpen} /> Back to menu
          </Button>
        </Link>
      </div>
      {loading ? (
        <Spinner
          animation="border"
          className="spiner mx-auto my-auto"
          variant="secondary"
          style={{
            position: 'absolute',
            top: '50%',
            left: '47%',
          }}
        />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <Image src={product.image_path} alt="product" fluid />
            </div>
            <div className="details-info">
              <h4>
                <b>{product.name}</b>
              </h4>
              <p>
                {' '}
                <FontAwesomeIcon icon={faInfo} className="text-dark ml-2 mr-2" />
                {product.description}
              </p>
              <div className="card-summary d-flex justify-content-between text-center">
                {product.sizes?.map((s) => (
                  <div className="d-flex flex-column card-summary--responsive" key={s.size}>
                    <Card.Text>Size: {s.size}</Card.Text>
                    <Card.Text>
                      Price: <FontAwesomeIcon icon={faEuroSign} /> <b>{s.price}</b>
                    </Card.Text>
                  </div>
                ))}
              </div>

              <h6 className="mt-3">
                <b>Ingredients </b>
              </h6>

              <ul style={{ listStyleType: 'disc', marginLeft: '2rem' }}>
                {ingredientList(product.ingredients)}
              </ul>
            </div>
            <div className="details-action">
              <Form.Group controlId="exampleForm.ControlSelect1">
                Size:
                <Form.Control
                  as="select"
                  onChange={(e) => setPriceControlSize(Number(e.target.value))}
                >
                  {product.sizes?.map((s) => (
                    <option value={s.size_id}>{s.size}</option>
                  ))}
                </Form.Control>
                Quantity:
                <Form.Control
                  as="select"
                  onChange={(e) => setPriceControlQuantity(Number(e.target.value))}
                >
                  {optionsHTML}
                </Form.Control>
                <p>Price:</p> <FontAwesomeIcon icon={faDollarSign} className="text-dark ml-2" />{' '}
                <b>{price * quantity}</b>
              </Form.Group>

              <Button variant="warning" onClick={() => handleAddToCart(product.id)}>
                <FontAwesomeIcon className="mr-2" icon={faShoppingCart} /> Add to cart
              </Button>
            </div>
          </div>
        </>
      )}
      {/* </Container> */}

      {quantityError ? (
        <Alert key={1} variant="danger">
          You already have this pizza in cart. Maximum quantity per one order is 5!
        </Alert>
      ) : null}
    </div>
  )
}
ProductPage.propTypes = {
  match: PropTypes.object.isRequired,
}
export default ProductPage
