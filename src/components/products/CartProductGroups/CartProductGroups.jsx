import React from 'react'
import { arrayOf } from 'prop-types'
import { productType } from '../../propTypes'

import classes from './CartProductGroups.module.sass'

import ProductGroup from './ProductGroup/ProductGroup'

const CartProductGroups = ({ items }) => {

	if (!items.length)
		return <div className={classes.emptyCart}>
			Your cart is empty.
		</div>

	return <div className={classes.cart}>
		{items.map(item => (
			<ProductGroup
				key={item.id}
				product={item}
			/>
		))}
	</div>
}

CartProductGroups.propTypes = {
	items: arrayOf(productType)
}

CartProductGroups.defaultProps = {
	items: []
}

export default CartProductGroups
