import PropTypes from 'prop-types'
import React from 'react'
import {
  Form,
} from 'react-bootstrap'
import {
  useDispatch, useSelector,
} from 'react-redux'
import {
  setCurrency,
} from '../../Redux/Actions/ProductActions/ProductActions'
import './Currency.scss'

export const Currency = (props) => {
  const dispatch = useDispatch()

  const currency = useSelector((state) => state.productList.currency)
  const page = useSelector((state) => state.productList.page)
  const search = useSelector((state) => state.productList.search)

  const perPage = Number(useSelector((state) => state.productList.limit))

  const getByCurrency = (e) => {
    dispatch(props.dispatch(Number(page), perPage, search, e))
    dispatch(setCurrency(e))
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <p>Currency</p>
      <Form.Control
        as="select"
        className="selectList"
        value={currency}
        onChange={(e) => getByCurrency(e.target.value)}
      >
        <option value="eur">EUR</option>
        <option value="usd">USD</option>
      </Form.Control>
    </div>
  )
}
Currency.propTypes = {
  dispatch: PropTypes.func.isRequired,
}
