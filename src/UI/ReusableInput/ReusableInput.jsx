import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { inputsValidation } from '../../Utilities/inputValidation'

const ReusableInput = (props) => {
  const [response, setResponse] = useState({})

  const inputHandle = (name, value, regex, okMsg, errMsg) => {
    console.log(name)
    const result = inputsValidation(name, value, regex, okMsg, errMsg)
    setResponse(result)
  }

  useEffect(() => {
    props.handler(response)
  }, [response])

  const styles = () => {
    if (Object.keys(response).length === 0 || response.elValue === '') {
      return {}
    }

    return {
      border: response.error ? '1px solid red' : '1px solid green',
      ':focus': {
        border: response.error ? '1px solid red' : '1px solid green',
      },
    }
  }
  const styleResponse = styles()
  const { regex, okMsg, errorMsg } = props.elName
  return (
    <>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        style={styleResponse}
        onChange={(e) => inputHandle(props.name, e.target.value, regex, okMsg, errorMsg)}
      />
      {response.elValue !== '' && (
        <div className={response.error ? 'text-danger' : 'text-success'}>{response.message}</div>
      )}
    </>
  )
}

export default ReusableInput
