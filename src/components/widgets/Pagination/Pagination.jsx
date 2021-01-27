import React from 'react'
import { useSelector } from 'react-redux'
import { func } from 'prop-types'

import { selectPaginationInfo } from '../../../store/products/productsSlice'
import { Select, Button } from '../../UI'

import cx from 'classnames'
import classes from './Pagination.module.sass'

const Pagination = ({ changePages }) => {

	const { currentPage, perPage, totalItems } = useSelector(selectPaginationInfo)
	const perPageOptions = [ '50', '25', '10' ]
	const numberOfPages = Math.ceil(totalItems / perPage)

	const buttons = () => {
		const pageButtons = []

		for (let page = 1; page <= numberOfPages; page++) {
			pageButtons.push(
				<Button
					key={page}
					className={cx(classes.pageBtn, { [classes.currentPage]: page === currentPage })}
					clicked={() => changePages({ page })}
					disabled={page === currentPage}
					label={page.toString()}
				/>
			)
		}

		if (currentPage > 3)
			return pageButtons.slice(currentPage - 3, currentPage + 2)

		return pageButtons.slice(0, currentPage + 2)
	}

	const isPrevButtonDisabled = () => currentPage - 1 === 0
	const isNextButtonDisabled = () => currentPage + 1 > numberOfPages

	return <section className={classes.paginationContainer}>
		<div className={classes.perPageSelect}>
			<div>
				<Select
					name="perPage"
					options={perPageOptions}
					value={perPage.toString()}
					onChange={e => changePages({ perPage: e.target.value })}
				/>
				<span>products per page on {numberOfPages} pages.</span>
			</div>
		</div>
		<div className={classes.buttons}>
			<Button className={classes.navBtn}
				label="-"
				clicked={() => changePages({ page: currentPage - 1 })}
				disabled={isPrevButtonDisabled()}
			/>
			{buttons()}
			<Button className={classes.navBtn}
				label="+"
				clicked={() => changePages({ page: currentPage + 1 })}
				disabled={isNextButtonDisabled()}
			/>
		</div>
	</section>
}

Pagination.propTypes = {
	changePages: func.isRequired
}

export default Pagination
