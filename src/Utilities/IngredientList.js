import React from 'react'

export function ingredientList(ingredients) {
  if (ingredients !== undefined) {
    const items = []
    for (const i of ingredients) {
      items.push(<li>{i.name}</li>)
    }
    return items
  }

  return 0
}
