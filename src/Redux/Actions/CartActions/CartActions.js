import axios from 'axios'
import Cookie from 'js-cookie'
import { CART_ADD_ITEM } from '../../ActionTypes/CartTypes/CartTypes'

const addToCart = (productId, qty, size) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/pizzas/${productId}`)
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data.id,
        name: data.name,
        image: data.image_path,
        price: data.sizes[size - 1].price,
        qty,
        size: data.sizes[size - 1].size,
        sizeId: size,
      },
    })
    const {
      cart: { cartItems },
    } = getState()
    Cookie.set('cartItems', JSON.stringify(cartItems))
  } catch (error) {
    console.log(error) // eslint-disable-line
  }
}

export { addToCart }
// eslint-disable-line
