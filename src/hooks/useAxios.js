import { useState, useEffect } from 'react'

export default function useFetch({ api, method, url, data = null, config = null }) {
	const [ response, setResponse ] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const res = await api[method](url, JSON.parse(config), JSON.parse(data))
			setResponse(res.data)
		}

		fetchData()
	}, [ api, method, url, data, config ])

	return { response }
}
