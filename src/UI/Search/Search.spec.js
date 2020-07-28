import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { Search } from './Search'

describe('Search', () => {
  const initialState = {}
  const mockStore = configureStore()
  let store
  test('renders Search component', () => {
    store = mockStore(initialState)
    const { getByText } = render(
      <Provider store={store}>
        <Search />
      </Provider>,
    )
    expect(getByText).toMatchSnapshot()
  })
})
