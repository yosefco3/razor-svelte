import { writable } from 'svelte/store'
// import url from '../strapi/URL'
import getProducts from '../strapi/getProducts'

let flattenProducts = data => {
    return data.map(item => {
        let image = item.image.url;
        // console.log(image)
        // item.image = `${url}${item.image.url}`
        return { ...item, image }
    })
}

// [...flattenProducts(localProducts)]
const store = writable([], () => {
    setProducts()
    return () => { }
})

async function setProducts() {
    let products = await getProducts()
    if (products) {
        products = flattenProducts(products)
        store.set(products)
    }
}

export default store;