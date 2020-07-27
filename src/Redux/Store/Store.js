import Cookie from 'js-cookie'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from '../Reducers/CartReducer'
import { productDetailsReducer, productListReducer } from '../Reducers/ProductReducer'
import { userRegisterReducer, userSigninReducer } from '../Reducers/UserReducer'

const userInfo = Cookie.getJSON('userInfo') || null
const cartItems = Cookie.getJSON('cartItems') || []

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },

  userSignIn: { userInfo },
}

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userSignIn: userSigninReducer,
  userRegister: userRegisterReducer,
  cart: cartReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store
