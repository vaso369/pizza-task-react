import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setSearch } from '../../Redux/Actions/ProductActions/ProductActions'
import './Search.scss'

export const Search = (props) => {
  const { perPage, currency } = props
  const dispatch = useDispatch()

  const [innerWidth, setInnerWidth] = useState(false)
  useEffect(() => {
    if (window.innerWidth < 800) {
      setInnerWidth(true)
    }
  }, [innerWidth])

  const getBySearch = (e) => {
    dispatch(props.dispatch(1, perPage, e, currency))
    dispatch(setSearch(e))
  }

  const style = innerWidth
    ? {
      position: 'absolute',
      top: '.5rem',
      zIndex: 2,
      display: 'block',
      width: '2.375rem',
      height: '1.3rem',
      lineHeight: '1.3rem',
      textAlign: 'center',
      pointerEvents: 'none',
      color: '#aaa',
    }
    : {
      position: 'absolute',
      zIndex: 2,
      display: 'block',
      width: '2.375rem',
      height: '2.375rem',
      lineHeight: '3.375rem',
      textAlign: 'center',
      pointerEvents: 'none',
      color: '#aaa',
      padding: '.4rem',
    }
  return (
    <Form inline className="form d-flex align-items-center mt-3">
      <FormGroup className="has-search formGroup">
        <FormControl
          onChange={(e) => getBySearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="pl-5 inputForm"
        />
        <FontAwesomeIcon icon={faSearch} style={style} />
      </FormGroup>
    </Form>
  )
}
Search.propTypes = {
  perPage: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}
