import { render, screen } from '@testing-library/react'
import React from 'react'
import Footer from './Footer'

describe('Footer', () => {
  test('renders Footer component', () => {
    const { getByText } = render(<Footer />)
    screen.getByText('Copyright - Vasilije Vasilijevic © 2020')
    screen.getByText('yummi-pizza')
    expect(getByText).toMatchSnapshot()
  })
})
