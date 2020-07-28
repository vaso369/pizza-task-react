import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
  UPDATE_CART_ITEM,
} from '../../ActionTypes/CartTypes/CartTypes'

function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload
      const product = state.cartItems.find((x) => x.id === item.id && x.sizeId === item.sizeId)
      if (product) {
        const updateQty = state.cartItems.reduce((acc, current) => {
          const sameProduct = current.id === item.id && current.sizeId === item.sizeId
          acc.push({
            id: current.id,
            name: current.name,
            image: current.image,
            price: current.price,
            qty: sameProduct ? current.qty + item.qty : current.qty,
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
    case UPDATE_CART_ITEM: {
      const product = state.cartItems.find((x) => x.id === action.id && x.sizeId === action.sizeId)
      if (product) {
        const updateQty = state.cartItems.reduce((acc, current) => {
          const sameProduct = current.id === action.id && current.sizeId === action.sizeId
          acc.push({
            id: current.id,
            name: current.name,
            image: current.image,
            price: current.price,
            qty: sameProduct ? action.qty : current.qty,
            size: current.size,
            sizeId: current.sizeId,
          })
          return acc.filter((el) => el)
        }, [])
        return { cartItems: updateQty }
      }
      return { cartItems: [...state.cartItems] }
    }
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x, index) => index !== action.payload), // eslint-disable-line
      }
    case CART_RESET:
      return {
        cartItems: [],
        shipping: { address: '', phone: '', additional: '' },
        payment: { paymentMethod: '' },
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
