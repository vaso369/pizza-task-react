import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
} from '../../ActionTypes/CartTypes/CartTypes'

function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload
      const product = state.cartItems.find((x) => x.id === item.id && x.sizeId === item.sizeId)
      if (product) {
        const updateQty = state.cartItems.reduce((acc, current) => {
          acc.push({
            product: current.product,
            name: current.name,
            image: current.image,
            price: current.price,
            qty: current.qty + item.qty,
            size: current.size,
            sizeId: current.sizeId,
          })
          return acc.filter((el) => el)
        }, [])
        return {
          cartItems: updateQty,
        }
      }

      return { cartItems: [...state.cartItems, item] }
    }
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      }
    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload }
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload }
    default:
      return state
  }
}

export { cartReducer }
// eslint-disable-line
