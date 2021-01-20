import React, { useEffect, useCallback, useState } from 'react'
// import { useSelector } from 'react-redux'
import { useErrorHandler } from 'react-error-boundary'
import { object, func } from 'prop-types'

import useAxios from '../../../hooks/useAxios'
import { productsListApi } from '../../../api/productsApi'
import URIs from '../../../api/URIs'

import CheckBox from '../../UI/CheckBox/CheckBox'
import { Slider } from '../../UI'
import { MAX_PRICE, MIN_PRICE } from '../../../constants/constants'

const ProductFilter = ({ filter, setFilter }) => {

	const [ origins, setOrigins ] = useState([])
	const handleError = useErrorHandler()

	const { response, error } = useAxios({
		api: productsListApi,
		method: 'get',
		url: URIs.origins
	})

	const initOrigins = useCallback(items => {
		setOrigins(items)
	}, [ setOrigins ])

	useEffect(() => {
		response
			? initOrigins(response.items)
			: handleError(error)
	}, [ response, initOrigins, error, handleError ])

	const handleOriginSelect = (id) => {
		if (filter.origins.has(id)) {
			setFilter(prev => ({ ...prev,
				origins: new Set([ ...prev.origins ].filter(origin => origin !== id ))
			}))
		} else {
			setFilter(prev => ({ ...prev, origins: new Set(prev.origins.add(id)) }))
		}
	}

	const adjustFilter = (e) => {
		setFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const sliders = <div>
		<Slider
			id="minPrice"
			name="minPrice"
			labelText="Min Price"
			min={MIN_PRICE}
			max={filter.maxPrice}
			value={filter.minPrice || 0}
			onChange={e => adjustFilter(e)}
		/>
		<p>Current min value: {filter.minPrice}</p>
		<Slider
			id="maxPrice"
			name="maxPrice"
			labelText="Max Price"
			min={filter.minPrice}
			max={MAX_PRICE}
			value={filter.maxPrice || 0}
			onChange={e => adjustFilter(e)}
		/>
		<p>Current max value: {filter.maxPrice}</p>
	</div>

	const checkboxes = <div>
		{origins.map(({ value, displayName }) => (
			<CheckBox
				key={value}
				id={value}
				name={value}
				labelText={displayName}
				checked={filter.origins.has(value)}
				clicked={e => handleOriginSelect(e.target.id)}
			/>
		))}
	</div>

	return <>
		<p>Origin Filter</p>
		{checkboxes}
		{sliders}
	</>
}

ProductFilter.propTypes = {
	filter: object.isRequired,
	setFilter: func.isRequired
}

export default ProductFilter
