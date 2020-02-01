import axios from 'axios'
import url from './URL'
import setupUser from './setupUser'

async function registerUser({ email, password, username }) {
    const response = await axios.post(`${url}/auth/local/register`, {
        email,
        password,
        username
    })
        .catch(error => console.log(error))
    if (response) {
        setupUser(response)
    }
    return response

}

export default registerUser