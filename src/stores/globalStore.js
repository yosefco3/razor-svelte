import { writable } from 'svelte/store'

const globalStore = writable({
    sidebar: false,
    cart: false,
    alert: false,
    alertText: '',
    alertDanger: false
})


const store = {
    subscribe: globalStore.subscribe,
    toggleItem: (item, value, alertText = "default", alertDanger = false) => {
        if (item === 'alert') {
            globalStore.update(storeValues => {
                return { ...storeValues, [item]: value, alertDanger, alertText }
            })
        } else {
            globalStore.update(storeValues => {
                return { ...storeValues, [item]: value }
            })
        }

    }
}

export default store
