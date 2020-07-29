import Cookie from 'js-cookie'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from '../Reducers/CartReducer'
import {
  myOrderListReducer,
  orderCreateReducer,
  priceConverterReducer,
} from '../Reducers/OrderReducer'
import { productDetailsReducer, productListReducer } from '../Reducers/ProductReducer'
import { userRegisterReducer, userSigninReducer } from '../Reducers/UserReducer'

const userInfo = Cookie.getJSON('userInfo') || null
const cartItems = Cookie.getJSON('cartItems') || []
const orders = Cookie.getJSON('orders') || []

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  myOrderList: { orders },
  userSignIn: { userInfo },
}

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userSignIn: userSigninReducer,
  userRegister: userRegisterReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  myOrderList: myOrderListReducer,
  priceConverter: priceConverterReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store
