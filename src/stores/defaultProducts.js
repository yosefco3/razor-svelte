import { writable } from 'svelte/store'
import localProducts from '../localProducts'

const store = writable([...localProducts])

export default store;