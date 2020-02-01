import url from './URL'

export default async () => {
    const response = await fetch(`${url}/products`)
        .catch(err => console.error(err))
    const products = await response.json()
    return products.error ? null : products
}

