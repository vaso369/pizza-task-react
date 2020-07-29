import axios from 'axios'
import Cookie from 'js-cookie'
import {
  MY_ORDER_LIST_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  PRICE_CURRENCY_FAIL,
  PRICE_CURRENCY_REQUEST,
  PRICE_CURRENCY_SUCCESS,
} from '../../ActionTypes/OrderTypes/OrderTypes'
import { resetCart } from '../CartActions/CartActions'

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
    const {
      userSignIn: { userInfo },
    } = getState()
    const {
      data: { data: newOrder },
    } = await axios.post('http://pizza-task-back.herokuapp.com/api/order', order, {
      headers: {
        Authorization: ` Bearer ${userInfo.token}`,
      },
    })
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder })
    dispatch(listMyOrders()) // eslint-disable-line
    Cookie.remove('cartItems')
    dispatch(resetCart())
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message })
  }
}

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST })
    const {
      userSignIn: { userInfo },
    } = getState()
    const { data } = await axios.get('http://pizza-task-back.herokuapp.com/api/order', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message })
  }
}
const getPriceByCurrency = (price, currency) => async (dispatch) => {
  try {
    dispatch({ type: PRICE_CURRENCY_REQUEST, price, currency })
    const { data } = await axios.get(
      `http://pizza-task-back.herokuapp.com/api/convert?price=${price}&currency=${currency}`,
    )
    dispatch({ type: PRICE_CURRENCY_SUCCESS, price: data.price, currency: data.currency })
  } catch (error) {
    dispatch({ type: PRICE_CURRENCY_FAIL, payload: error.message })
  }
}
// eslint-disable-line
export { createOrder, listMyOrders, getPriceByCurrency }
// eslint-disable-line
