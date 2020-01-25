import { writable, derived } from 'svelte/store'
import localCart from './localCart'

// cart
const cart = writable([...localCart])

// the total price of the items : 
export const cartTotal = derived(cart, $cart => $cart.reduce(
    (acc, curr) => acc + curr.price * curr.amount,
    0
).toFixed(2))

// local functions
const remove = (id, items) => items.filter(item => item.id !== id)

// global functions
export const removeItem = id => {
    cart.update(storeValue => remove(id, storeValue))
}
// local storage

export default cart

