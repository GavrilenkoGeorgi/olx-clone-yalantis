import React, { useMemo } from 'react'
import { productGroup } from '../../../propTypes'

import classes from './ProductGroup.module.sass'

const ProductGroup = ({ group }) => {

	const memoizedTotal =
		useMemo(() => group.products.reduce((acc, curr) => acc += curr.price, 0), [ group ])

	return <div key={group.origin}
		className={classes.group}
	>
		<p>{group.origin}</p>
		<div className={classes.totals}>
			<p>{group.products.length} pcs</p>
			<p>Total: <span>{memoizedTotal}</span>
			</p>
		</div>
	</div>
}

ProductGroup.propTypes = {
	group: productGroup.isRequired
}

export default ProductGroup
