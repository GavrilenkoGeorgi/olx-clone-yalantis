import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useQuery } from '../../../hooks/useQuery'
import { MIN_PRICE, MAX_PRICE } from '../../../constants/constants'

import { ProductsList } from '../../products'
import { ProductFilter, Pagination } from '../../widgets'
import classes from './ProductsPage.module.sass'

const ProductsPage = () => {

	const history = useHistory()
	let currentQuery = useQuery()

	const filterSettings = {
		origins: new Set(currentQuery.has('origins') && currentQuery.get('origins').split(',') || []),
		minPrice: currentQuery.get('minPrice') || MIN_PRICE,
		maxPrice: currentQuery.get('maxPrice') || MAX_PRICE,
	}

	const [ filter, setFilter ] = useState(filterSettings)

	useEffect(() => {
		if (filter.origins.size)
			currentQuery.set('origins', Array.from(filter.origins).join(','))
		else currentQuery.delete('origins')

		if (filter.minPrice && (filter.minPrice !== MIN_PRICE))
			currentQuery.set('minPrice', filter.minPrice)
		else currentQuery.delete('minPrice')

		if (filter.maxPrice !== MAX_PRICE)
			currentQuery.set('maxPrice', filter.maxPrice)
		else currentQuery.delete('maxPrice')

	}, [ filter, currentQuery ])

	// filter products after setting up filter through UI
	const loadFilteredProducts = () => {
		const search = currentQuery.toString()
		history.push({ search })
	}

	// change page settings
	const changePages = ({ page, perPage }) => {
		if (page) {
			currentQuery.set('page', page)
		}

		if (perPage) {
			currentQuery.set('page', 1)
			currentQuery.set('perPage', perPage)
		}

		history.push({ search: currentQuery.toString() })
	}

	return <section className={classes.content}>
		<h1>Products page</h1>
		<ProductFilter
			filter={filter}
			setFilter={setFilter}
			applyFilter={loadFilteredProducts}
		/>
		<Pagination
			key="top"
			changePages={changePages}
		/>
		<ProductsList
			filter={filter}
			query={history.location.search}
		/>
		<Pagination
			key="bottom"
			changePages={changePages}
		/>
	</section>
}

export default ProductsPage
