import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setPage } from '../../Redux/Actions/ProductActions/ProductActions'

export default function Pagination(props) {
  const dispatch = useDispatch()
  const { pageCount, perPage, search, currency } = props
  const [pagesNext, setPagesNext] = useState(4)
  const [active, setActive] = useState(1)
  const items = []
  const pages = Math.ceil(pageCount / perPage)

  const pageClick = (e) => {
    dispatch(props.dispatch(e.target.value, perPage, search, currency))
    dispatch(setPage(e.target.value))
    setActive(Number(e.target.value))
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    setActive(1)
  }, [perPage])

  if (pages > 4) {
    for (let i = pagesNext - 3; i <= pagesNext; i++) {
      items.push(
        <Button
          key={i}
          variant="outline-dark"
          value={i}
          onClick={pageClick}
          className={`mx-1 ${i === active ? 'active' : ''}`}
        >
          {i}
        </Button>,
      )
    }
  } else {
    for (let i = 1; i <= pages; i++) {
      items.push(
        <Button
          key={i}
          variant="outline-dark"
          value={i}
          onClick={pageClick}
          className={`mx-1 ${i === active ? 'active' : ''}`}
        >
          {i}
        </Button>,
      )
    }
  }

  const setPagesPrevHandle = () => {
    if (pagesNext > 4 && pagesNext < 8) {
      setPagesNext(pagesNext - (pagesNext - 4))
    } else {
      setPagesNext(pagesNext - 4)
    }
  }
  const setPagesNextHandle = () => {
    if (pagesNext + 4 < pageCount) {
      setPagesNext(pagesNext + 4)
    } else {
      setPagesNext(pageCount)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {pages > 4 ? (
        <>
          <Button variant="outline-dark" value="1" onClick={pageClick} className="mr-1">
            1
          </Button>
          <Button variant="outline-dark" onClick={setPagesPrevHandle} value="<" className="mx-1">
            Prev
          </Button>
        </>
      ) : null}
      {items}
      {pages > 4 ? (
        <>
          <Button variant="outline-dark" onClick={setPagesNextHandle} value="<" className="mx-1">
            Next
          </Button>
          <Button variant="outline-dark" value={pages} onClick={pageClick} className="ml-1">
            {pages}
          </Button>
        </>
      ) : null}
    </div>
  )
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}
