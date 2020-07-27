import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../Redux/Actions/ProductActions/ProductActions'
import Card from '../../UI/Card/Card'
import { Currency } from '../../UI/Currency/Currency'
import Pagination from '../../UI/Pagination/Pagination'
import { PerPage } from '../../UI/PerPage/PerPage'
import { Search } from '../../UI/Search/Search'
import './HomePage.scss'

const HomePage = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products, loading, error, allDocs, limit, currency, search, page } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return loading ? (
    <Spinner
      animation="border"
      className="spiner mx-auto my-auto"
      variant="secondary"
      style={{
        position: 'absolute',
        top: '50%',
        left: '47%',
      }}
    />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      <div className="products-div d-flex flex-column justify-content-around ml-auto">
        <Search dispatch={listProducts} perPage={Number(limit)} currency={currency} />
        <div className="products-div--filter-wrapper d-flex align-items-center justify-content-between mt-1">
          <Currency
            dispatch={listProducts}
            perPage={Number(limit)}
            search={search}
            currency={currency}
            page={page}
          />
          <PerPage
            dispatch={listProducts}
            perPage={Number(limit)}
            search={search}
            currency={currency}
          />
        </div>
        <div className="home d-flex flex-wrap justify-content-around">
          <Card products={products} currency={currency} />
        </div>
        <div className="mx-auto mt-5 paginate-bottom">
          <Pagination
            dispatch={listProducts}
            pageCount={allDocs}
            perPage={Number(limit)}
            search={search}
            currency={currency}
          />
        </div>
      </div>
    </>
  )
}

export default HomePage
