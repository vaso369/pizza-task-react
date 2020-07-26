export const inputsValidation = (elementName, elementValue, regex, okMessage, errorMessage) => {
  const reElement = new RegExp(regex)
  if (reElement.test(elementValue) && elementValue !== '') {
    return { error: false, message: okMessage, elValue: elementValue, name: elementName }
  }

  return { error: true, message: errorMessage, elValue: elementValue, name: elementName }
}
