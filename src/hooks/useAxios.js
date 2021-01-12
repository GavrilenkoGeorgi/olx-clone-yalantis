import { useState, useEffect, useRef } from 'react'

export default function useFetch({ api, method, url, data = null, config = null }) {
	const [ response, setResponse ] = useState(null)
	const [ error, setError ] = useState(null)
	const isMounted = useRef(false)

	useEffect(() => {
		isMounted.current = true
		return () => isMounted.current = false
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api[method](url, JSON.parse(config), JSON.parse(data))
				if (isMounted.current) setResponse(res.data)
			} catch (error) {
				setError(error)
			}
		}

		fetchData()
	}, [ api, method, url, data, config ])

	return { response, error }
}
