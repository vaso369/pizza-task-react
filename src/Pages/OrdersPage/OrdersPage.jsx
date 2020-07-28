import React from 'react'
import { Spinner, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function OrdersPage() {
  // const dispatch = useDispatch()
  const ordersList = useSelector((state) => state.myOrderList)
  const { orders, loading, error } = ordersList

  // useEffect(() => dispatch(listMyOrders()), [])

  return (
    <div className="content content-margined">
      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">
        <Table striped bordered hover responsive="sm md lg" variant="dark" className="text-center">
          <thead>
            <tr>
              <th>No.</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Items</th>
              <th>Total EUR</th>
              <th>Total USD</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
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
              orders.map((el, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el.address}</td>
                  <td>{el.phone}</td>
                  <td>{el.payment}</td>
                  <td>{el.status}</td>
                  <td>{el.items.length}</td>
                  <td>{el.price_eur}</td>
                  <td>{el.price_usd}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
export default OrdersPage
