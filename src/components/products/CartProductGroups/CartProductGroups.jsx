import React from 'react'
import { arrayOf } from 'prop-types'
import { productGroup } from '../../propTypes'

import classes from './CartProductGroups.module.sass'

const CartProductGroups = ({ groups }) => {

	const totalPriceOfTheGroup = ({ products }) =>
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
					<p>Total: <span>{totalPriceOfTheGroup(group)}</span>
					</p>
				</div>
			</div>
		))}
	</div>
}

CartProductGroups.propTypes = {
	groups: arrayOf(productGroup)
}

CartProductGroups.defaultProps = {
	groups: []
}

export default CartProductGroups
