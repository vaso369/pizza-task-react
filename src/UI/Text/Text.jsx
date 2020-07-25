import { PropTypes } from 'prop-types'
import React from 'react'
import './Text.scss'

export const Text = ({ text, spreadText }) => (
  <p className="text">
    {spreadText} {text}
  </p>
)
Text.defaultProps = {
  text: '',
  spreadText: '',
}

Text.propTypes = {
  text: PropTypes.string,
  spreadText: PropTypes.string,
}
