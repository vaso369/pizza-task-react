export function ingredientString(ingredients) {
  let string = ''
  for (const i of ingredients) {
    string += `${i.name}, `
  }
  string = string.replace(/,\s*$/, '')
  return string
}
