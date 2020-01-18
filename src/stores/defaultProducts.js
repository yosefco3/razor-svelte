import { writable } from 'svelte/store'
import localProducts from '../localProducts'


let flattenProducts = data => {
    return data.map(item => {
        item.image = item.image.url
        return item
    })
}


const store = writable([...flattenProducts(localProducts)])

export default store;