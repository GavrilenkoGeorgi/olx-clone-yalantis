import React from 'react'
import PropTypes from 'prop-types'
import { productGroup } from '../../propTypes'

import classes from './ProductGroups.module.sass'

const ProductGroups = ({ groups }) => {

	const groupTotalPrice = ({ products }) =>
		products.reduce((acc, curr) => acc += curr.price, 0)

	if (!groups.length)
		return <div className={classes.emptyCart}>
			Your cart is empty.
		</div>
	else return <div className={classes.cart}>
		{groups.map(group => (
			<div key={group.origin}
				className={classes.group}
			>
				<p>{group.origin}</p>
				<div className={classes.totals}>
					<p>{group.products.length} pcs</p>
					<p>Total: <span>{groupTotalPrice(group)}</span>
					</p>
				</div>
			</div>
		))}
	</div>
}

ProductGroups.propTypes = {
	groups: PropTypes.arrayOf(productGroup)
}

ProductGroups.defaultProps = {
	groups: []
}

export default ProductGroups
