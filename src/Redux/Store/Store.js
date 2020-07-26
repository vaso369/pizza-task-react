import Cookie from 'js-cookie'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { productListReducer } from '../Reducers/ProductReducer'
import { userRegisterReducer, userSigninReducer } from '../Reducers/UserReducer'

const userInfo = Cookie.getJSON('userInfo') || null

const initialState = {
  userSignIn: { userInfo },
}

const reducer = combineReducers({
  productList: productListReducer,
  userSignIn: userSigninReducer,
  userRegister: userRegisterReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store
