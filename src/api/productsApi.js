import axios from 'axios'

const defaults = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	Authorization: process.env.REACT_APP_AUTH_TOKEN
}

export const productsListApi = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		post: defaults,
		get: defaults,
		patch: defaults,
		delete: defaults
	}
})
