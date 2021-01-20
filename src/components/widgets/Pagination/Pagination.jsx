import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Select } from '../../UI'

import cx from 'classnames'
import classes from './Pagination.module.sass'

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
					className={cx(classes.pageBtn, { [classes.currentPage]: page === currentPage })}
					onClick={() => props.changePage(page)}
					disabled={page === currentPage}
				>{page}</button>
			)
		}

		return pageButtons.slice(currentPage - 1, currentPage + 2)
	}

	const prevButton = <button className={classes.navBtn}
		onClick={() => props.changePage(currentPage - 1)}
		disabled={currentPage - 1 === 0}
	>
		-
	</button>

	const nextButton = <button className={classes.navBtn}
		onClick={() => props.changePage(currentPage + 1)}
		disabled={currentPage + 1 > numberOfPages}
	>
			+
	</button>

	return <section className={classes.paginationContainer}>
		<div className={classes.perPageSelect}>
			<div>
				<Select
					name="perPage"
					options={perPageOptions}
					value={perPage}
					defaultValue={perPage.toString()}
					onChange={e => props.changePerPage(e.target.value)}
				/>
				<span>products per page on {numberOfPages} pages.</span>
			</div>
		</div>
		<div className={classes.buttons}>
			{prevButton}
			{buttons()}
			{nextButton}
		</div>
	</section>

}

Pagination.propTypes = {
	changePage: PropTypes.func.isRequired,
	changePerPage: PropTypes.func.isRequired
}

export default Pagination
