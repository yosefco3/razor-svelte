import { writable, derived } from 'svelte/store'
// import localCart from './localCart'

// cart
const cart = writable(getStorageCart())

// the total price of the items : 
export const cartTotal = derived(cart, $cart => parseFloat($cart.reduce(
    (acc, curr) => acc + curr.price * curr.amount, 0).toFixed(2)))

// local functions
const remove = (id, items) => items.filter(item => item.id !== id)

// action - increase "inc" or decrease "dec"
const toggleAmount = (id, items, action) => items.map(item => {
    let newAmount;
    action === "inc" ? newAmount = item.amount + 1 :
        action === "dec" ? newAmount = item.amount - 1 :
            newAmount = item.amount;

    return item.id === id ? { ...item, amount: newAmount } : { ...item }
})



// global functions
export const removeItem = id => {
    cart.update(storeValue => remove(id, storeValue))
}

export const increaseAmount = id => {
    cart.update(storeValue => toggleAmount(id, storeValue, "inc"))
}


export const decreaseAmount = id => {
    cart.update(storeValue => {
        let item = storeValue.find(item => item.id === id)
        let cart;
        item.amount === 1 ? cart = remove(id, storeValue) : cart = toggleAmount(id, storeValue, "dec")
        return [...cart]
    })
}


export const addToCart = product => {
    cart.update(storeValue => {
        const { id } = product
        let item = storeValue.find(item => item.id === id);
        let cart
        if (item) {
            cart = toggleAmount(id, storeValue, 'inc')
        } else {
            let newItem = { ...product, amount: 1 }
            cart = [...storeValue, newItem]
        }
        return cart
    })
}

// local storage
function getStorageCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}

export const setStorageCart = cartValues => localStorage.setItem('cart', JSON.stringify(cartValues))

export default cart

