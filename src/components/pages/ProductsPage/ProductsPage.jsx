import React, { useEffect, useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { object } from 'prop-types'

import { MIN_PRICE, MAX_PRICE } from '../../../constants/constants'
import { ProductsList } from '../../products'
import { ProductFilter, Pagination } from '../../widgets'
import classes from './ProductsPage.module.sass'
import { buildQuery } from '../../../utils'

const ProductsPage = () => {

	const history = useHistory()
	const currentQuery =
		useMemo(() => new URLSearchParams(history.location.search),
			[ history.location.search ])

	const filterSettings = {
		origins: new Set(currentQuery.has('origins') && currentQuery.get('origins').split(',') || []),
		minPrice: currentQuery.get('minPrice') || MIN_PRICE,
		maxPrice: currentQuery.get('maxPrice') || MAX_PRICE
	}

	const [ filter, setFilter ] = useState(filterSettings)
	const [ search, setSearch ] = useState('')

	const loadFilteredProducts = () => {
		if (search !== currentQuery.toString()) {
			history.push({ search })
		}
	}

	useEffect(() => {
		const params = []

		if (filter.origins.size) {
			params.push({
				param: 'origins',
				value: Array.from(filter.origins).join(',')
			})
		}

		if (filter.minPrice !== MIN_PRICE)
			params.push({
				param: 'minPrice',
				value: filter.minPrice
			})

		if (filter.maxPrice !== MAX_PRICE)
			params.push({
				param: 'maxPrice',
				value: filter.maxPrice
			})

		if (params.length) {
			setSearch(buildQuery(params))
		}

	}, [ filter ])

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

ProductsPage.propTypes = {
	location: object.isRequired
}

export default ProductsPage
