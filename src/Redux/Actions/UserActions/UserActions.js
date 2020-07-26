import axios from 'axios'
import Cookie from 'js-cookie'
import {
  USER_LOGOUT,
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

const logout = () => (dispatch) => {
  Cookie.remove('userInfo')
  dispatch({ type: USER_LOGOUT })
}

export { signin, logout }
// eslint-disable-line
