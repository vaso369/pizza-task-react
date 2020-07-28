export const address = {
  regex: '^.{3,50}',
  errorMsg: 'Valid address!',
  okMsg: 'Address accepted',
}
export const phone = {
  regex: '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})',
  errorMsg: 'XXX-XXX-XXXX!',
  okMsg: 'Phone accepted',
}
export const additional = {
  regex: '^.{1,255}',
  errorMsg: 'Maximum length is 255!',
  okMsg: 'Info accepted',
}
