import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setCurrency } from '../../Redux/Actions/ProductActions/ProductActions'
import './Currency.scss'

export const Currency = (props) => {
  const { page, perPage, search, currency } = props
  const dispatch = useDispatch()
  const [localCurrency, setLocalCurrency] = useState('eur')
  const isLocal = props.dispatch.name === 'getPriceByCurrency' // eslint-disable-line
  const getByCurrency = (e) => {
    if (isLocal) {
      console.log(props.price, e) // eslint-disable-line
      dispatch(props.dispatch(props.price, e))
      setLocalCurrency(e)
    } else {
      dispatch(props.dispatch(Number(page), perPage, search, e))
      dispatch(setCurrency(e))
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <p>Currency</p>
      <Form.Control
        as="select"
        className="selectList"
        value={isLocal ? localCurrency : currency}
        onChange={(e) => getByCurrency(e.target.value)}
      >
        <option value="eur">EUR</option>
        <option value="usd">USD</option>
      </Form.Control>
    </div>
  )
}
Currency.propTypes = {
  perPage: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
}
