export const firstName = {
  regex: '[A-Z][a-z]{2,13}',
  errorMsg: 'You have to enter first name in regular format',
  okMsg: 'First name accepted',
}
export const lastName = {
  regex: '^[A-Z][a-z]{2,13}',
  errorMsg: 'You have to enter last name in regular format',
  okMsg: 'Last name accepted',
}
export const email = {
  regex: '\\w+([.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+',
  errorMsg: 'You have to enter email in regular format',
  okMsg: 'Email accepted',
}
export const pass = {
  regex: '^[A-z\\d]{6,30}',
  errorMsg: 'Min length:6, Example123',
  okMsg: 'Password accepted',
}
