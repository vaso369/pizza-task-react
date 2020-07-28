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

function orderCreateReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload, success: true }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

function myOrderListReducer(
  state = {
    orders: [],
    orderCount: 0,
  },
  action,
) {
  switch (action.type) {
    case MY_ORDER_LIST_REQUEST:
      return { loading: true }
    case MY_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload, orderCount: action.payload.length }
    case MY_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
function priceConverterReducer(
  state = {
    price: 0,
    currency: '',
  },
  action,
) {
  switch (action.type) {
    case PRICE_CURRENCY_REQUEST:
      return { loading: true }
    case PRICE_CURRENCY_SUCCESS:
      return { loading: false, price: action.price, currency: action.currency }
    case PRICE_CURRENCY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
// eslint-disable-line
export { orderCreateReducer, myOrderListReducer, priceConverterReducer }
