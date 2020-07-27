import axios from 'axios'
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SET_CURRENCY,
  PRODUCT_SET_LIMIT,
  PRODUCT_SET_PAGE,
  PRODUCT_SET_SEARCH,
} from '../../ActionTypes/ProductTypes/ProductTypes'

const listProducts = (page = 1, limit = 3, searchKeyword = '', currency = 'eur') => async (
  dispatch,
) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    })
    const { data } = await axios.get(
      `/api/pizzas?name=${searchKeyword}&page=${page}&per_page=${limit}&currency=${currency}`,
    )
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      products: data.data,
      allDocs: data.total,
      limit: data.per_page,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message,
    })
  }
}

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId })
    const { data } = await axios.get(`/api/pizzas/${productId}`)

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message })
  }
}

const setLimit = (value) => ({
  type: PRODUCT_SET_LIMIT,
  payload: value,
})

const setCurrency = (value) => ({
  type: PRODUCT_SET_CURRENCY,
  payload: value,
})
const setPage = (value) => ({
  type: PRODUCT_SET_PAGE,
  payload: value,
})
const setSearch = (value) => ({
  type: PRODUCT_SET_SEARCH,
  payload: value,
})

export { listProducts, setLimit, setCurrency, setPage, setSearch, detailsProduct } // eslint-disable-line
// eslint-disable-line
