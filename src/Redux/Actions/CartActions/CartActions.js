import axios from 'axios'
import Cookie from 'js-cookie'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
  UPDATE_CART_ITEM,
} from '../../ActionTypes/CartTypes/CartTypes'

const addToCart = (productId, qty, size) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `https://pizza-task-backend.herokuapp.com/api/pizza/${productId}`,
    )
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: data.id,
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
const updateQty = (id, qty, sizeId) => ({ type: UPDATE_CART_ITEM, id, qty, sizeId })

const removeFromCart = (index) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_REMOVE_ITEM, payload: index })
    const {
      cart: { cartItems },
    } = getState()
    Cookie.set('cartItems', JSON.stringify(cartItems))
  } catch (error) {
    console.log(error) // eslint-disable-line
  }
}

const resetCart = () => ({ type: CART_RESET })

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data })
}
const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data })
}
export { addToCart, updateQty, removeFromCart, resetCart, saveShipping, savePayment }
// eslint-disable-line
