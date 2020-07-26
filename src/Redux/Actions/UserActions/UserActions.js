import axios from 'axios'
import Cookie from 'js-cookie'
import {
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
} from '../../ActionTypes/UserTypes/UserTypes'

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
  try {
    const { data } = await axios.post('/api/login', { email, password })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    Cookie.set('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: 'Invalid credentials!' })
  }
}

const register = (firstName, lastName, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { firstName, lastName, email, password },
  })
  try {
    await axios.post('/api/user', {
      firstName,
      lastName,
      email,
      password,
    })
    dispatch({ type: USER_REGISTER_SUCCESS, registrated: true })
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message })
  }
}

const logout = () => (dispatch) => {
  Cookie.remove('userInfo')
  dispatch({ type: USER_LOGOUT })
}
const registerReset = () => ({ type: USER_REGISTER_RESET })

export { signin, logout, register, registerReset }
// eslint-disable-line
