import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Select } from '../../UI'

const Pagination = (props) => {

	const { page: currentPage, perPage, totalItems } = useSelector(state => state.products)
	const perPageOptions = [ '50', '25', '10' ]
	const numberOfPages = Math.ceil(totalItems / perPage)

	const buttons = () => {
		const pageButtons = []

		for (let page = 1; page <= numberOfPages; page++) {
			pageButtons.push(
				<button
					key={page}
					onClick={() => props.changePage(page)}
					disabled={page === currentPage}
				>{page}</button>
			)
		}

		return pageButtons.slice(currentPage - 1, currentPage + 2)
	}

	const prevButton = <button
		onClick={() => props.changePage(currentPage - 1)}
		disabled={currentPage - 1 === 0}
	>
		-
	</button>

	const nextButton = <button
		onClick={() => props.changePage(currentPage + 1)}
		disabled={currentPage + 1 > numberOfPages}
	>
			+
	</button>

	return <>
		<Select
			name="perPage"
			options={perPageOptions}
			value={perPage}
			defaultValue={perPage.toString()}
			onChange={e => props.changePerPage(e.target.value)}
		/>
		{prevButton}
		{buttons()}
		{nextButton}
	</>

}

Pagination.propTypes = {
	changePage: PropTypes.func.isRequired,
	changePerPage: PropTypes.func.isRequired
}

export default Pagination
