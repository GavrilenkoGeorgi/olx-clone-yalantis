import { useState, useEffect, useRef, useCallback } from 'react'
import useAxios from '../hooks/useAxios'
import URIs from '../api/URIs'
import { productsListApi } from '../api/productsApi'

export default function useOrigins() {

	const [ origins, setOrigins ] = useState([])
	const isMounted = useRef(false)

	const { response } = useAxios({
		api: productsListApi,
		method: 'get',
		url: URIs.origins
	})

	useEffect(() => {
		isMounted.current = true
		return () => isMounted.current = false
	}, [])

	const initOrigins = useCallback(items => {
		setOrigins(items)
	}, [ setOrigins ])

	useEffect(() => {
		if (response) initOrigins(response.items)
	}, [ response, initOrigins ])

	return origins
}
