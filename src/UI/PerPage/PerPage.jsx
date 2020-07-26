import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setLimit, setPage } from '../../Redux/Actions/ProductActions/ProductActions'
import './PerPage.scss'

export const PerPage = (props) => {
  const dispatch = useDispatch()
  const { perPage, search, currency } = props

  const getPerPage = (e) => {
    dispatch(props.dispatch(1, e, search, currency))
    dispatch(setLimit(e))
    dispatch(setPage(1))
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <p>Per page</p>
      <Form.Control
        as="select"
        className="selectList"
        value={perPage}
        onChange={(e) => getPerPage(e.target.value)}
      >
        <option value="1">1</option>
        <option value="3">3</option>
        <option value="6">6</option>
      </Form.Control>
    </div>
  )
}
PerPage.propTypes = {
  perPage: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}
