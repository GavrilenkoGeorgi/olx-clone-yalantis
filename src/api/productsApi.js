import axios from 'axios'

export const productsListApi = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		post: {
			Authorization: process.env.REACT_APP_AUTH_TOKEN
		}
	}
})
