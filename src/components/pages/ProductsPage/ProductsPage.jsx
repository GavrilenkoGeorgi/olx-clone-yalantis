import React, { useEffect, useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { MIN_PRICE, MAX_PRICE } from '../../../constants/constants'
import { ProductsList } from '../../products'
import { ProductFilter, Pagination } from '../../widgets'
import classes from './ProductsPage.module.sass'
import { buildQuery } from '../../../utils'

const ProductsPage = () => {

	const history = useHistory()
	const currentQuery = useMemo(() => new URLSearchParams(location.search.substring(1)), [])

	const filterSettings = {
		origins: new Set(currentQuery.has('origins') && currentQuery.get('origins').split(',') || []),
		minPrice: currentQuery.get('minPrice') || MIN_PRICE,
		maxPrice: currentQuery.get('maxPrice') || MAX_PRICE
	}

	const currentFilterQuery = new URLSearchParams(history.location.search.substring(1))

	const changePage = page => {
		currentFilterQuery.set('page', page)
		history.push({ search: currentFilterQuery.toString() })
	}

	const changePerPage = perPage => {
		currentFilterQuery.set('perPage', perPage)
		history.push({ search: currentFilterQuery.toString() })
	}

	const [ filter, setFilter ] = useState(filterSettings)
	const [ search, setSearch ] = useState('')


	const loadFilteredProducts = () => {
		const current = new URLSearchParams(location.search)
		if (search.toString() !== current.toString()) {
			history.push({ search })
		}
	}

	const filterHasChanged = (filter) => {
		if (filter.origins.size
				|| filter.minPrice !== MIN_PRICE
				|| filter.maxPrice !== MAX_PRICE)
		{
			return true
		}
	}

	useEffect(() => {
		const params = []

		if (filterHasChanged(filter)) {
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
		}

		if (params.length) {
			setSearch(buildQuery(params))
		}

	}, [ filter ])

	return <section className={classes.content}>
		<h1>Products page</h1>
		<ProductFilter
			filter={filter}
			setFilter={setFilter}
			applyFilter={loadFilteredProducts}
		/>
		<Pagination
			changePage={changePage}
			changePerPage={changePerPage}
		/>
		<ProductsList filter={filter} query={history.location.search}/>
	</section>
}

ProductsPage.propTypes = {
	location: PropTypes.object.isRequired
}

export default ProductsPage
