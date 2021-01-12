import React from 'react'
import { arrayOf } from 'prop-types'
import { productGroup } from '../../propTypes'

import classes from './CartProductGroups.module.sass'

import ProductGroup from './ProductGroup/ProductGroup'

const CartProductGroups = ({ groups }) => {

	if (!groups.length)
		return <div className={classes.emptyCart}>
			Your cart is empty.
		</div>

	return <div className={classes.cart}>
		{groups.map(group => (
			<ProductGroup
				key={group.origin}
				group={group}
			/>
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
