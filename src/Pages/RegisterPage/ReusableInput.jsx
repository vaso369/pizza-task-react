import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { inputsValidation } from "../../Utilities/inputValidation";
import "./RegisterPage.css";

const ReusableInput = (props) => {
    const [response, setResponse] = useState({});

    const inputHandle =  (
      e,
      regex,
      okMsg,
      errMsg
    ) => {
      const result = inputsValidation(
        e.target.name,
        e.target.value,
        regex,
        okMsg,
        errMsg
      ); 
      setResponse(result);
    }

   
    useEffect(() => {
      props.handler(response);
    }, [response])

    const styles = ()=> {
      if(Object.keys(response).length ===0 || response.elValue===""){
        console.log(props.styles);
return {};
      }
      else{
        return {
          border: response.error?"1px solid red":"1px solid green",
          ":focus": {
            border: response.error?"1px solid red":"1px solid green",
          }
        }
      }
 
  }
  const styleResponse = styles();
  const {regex,okMsg,errorMsg} = props.elName;
    return (
      <>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          {...props}
          style={props.styles,styleResponse}
          onChange={(e) =>
            inputHandle(
              e,
              regex,
              okMsg,
              errorMsg
            )
          }
        />
        {response.elValue!==""&& <div className={response.error?"text-danger":"text-success"}>{response.message}</div>}
      </>
  )
}

export default ReusableInput
