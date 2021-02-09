import React, { useEffect, useState } from 'react'
import { object, func } from 'prop-types'

import useOrigins from '../../../hooks/useOrigins'
import { MAX_PRICE, MIN_PRICE } from '../../../constants/constants'

import { Button, Slider, CheckBox } from '../../UI'
import classes from './ProductFilter.module.sass'

const ProductFilter = ({ filter, setFilter, applyFilter }) => {

	const originsData = useOrigins()
	const [ origins, setOrigins ] = useState([])

	useEffect(() => {
		setOrigins([ ...originsData ])
	}, [ originsData ])

	const handleOriginSelect = (id) => {
		if (filter.origins.has(id)) {
			setFilter(prev => ({ ...prev,
				origins: new Set([ ...prev.origins ].filter(origin => origin !== id ))
			}))
		} else {
			setFilter(prev => ({ ...prev, origins: new Set(prev.origins.add(id)) }))
		}
	}

	const adjustFilter = ({ name, value }) => {
		setFilter(prev => ({ ...prev, [name]: value }))
	}

	const sliders = <div className={classes.slidersContainer}>
		<Slider
			id="minPrice"
			name="minPrice"
			labelText={`Min price: ${filter.minPrice}`}
			min={MIN_PRICE}
			max={filter.maxPrice}
			value={filter.minPrice || 0}
			onChange={e => adjustFilter(e.target)}
		/>
		<Slider
			id="maxPrice"
			name="maxPrice"
			labelText={`Max price: ${filter.maxPrice}`}
			min={filter.minPrice}
			max={MAX_PRICE}
			value={filter.maxPrice || 0}
			onChange={e => adjustFilter(e.target)}
		/>
	</div>

	const checkboxes = <div className={classes.checkboxContainer}>
		{origins.map(({ value, displayName }) => (
			<div key={value}>
				<CheckBox
					id={value}
					name={value}
					labelText={displayName}
					checked={filter.origins.has(value)}
					clicked={e => handleOriginSelect(e.target.id)}
				/>
			</div>
		))}
	</div>

	return <section className={classes.wrapper}>
		{checkboxes}
		{sliders}
		<div className={classes.buttonContainer}>
			<Button clicked={applyFilter} label="apply" />
		</div>
	</section>
}

ProductFilter.propTypes = {
	filter: object.isRequired,
	setFilter: func.isRequired,
	applyFilter: func.isRequired
}

export default ProductFilter
