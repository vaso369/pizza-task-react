import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Header from './Header'

describe('Header', () => {
  const initialState = {
    cart: {
      cartItems: [{ id: 1 }],
    },
    userSignIn: {
      userInfo: { user: { first_name: 'John', last_name: 'Majkl' } },
    },
    myOrderList: { orderCount: 0 },
  }
  const mockStore = configureStore()
  let store
  test('renders Header component', () => {
    store = mockStore(initialState)
    const { getByText } = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    )
    screen.getByText('Menu')
    expect(getByText).toMatchSnapshot()
  })
})
