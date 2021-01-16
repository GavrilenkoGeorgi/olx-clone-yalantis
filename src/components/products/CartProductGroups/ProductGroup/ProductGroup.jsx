import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { productType } from '../../../propTypes'

import {
	itemAdded,
	itemRemoved,
	itemsRemoved,
	itemQuantityRemoved
} from '../../../../store/cart/cartSlice'

import Button from '../../../UI/Button/Button'
import NumberInput from '../../../UI/Inputs/NumberInput/NumberInput'
import classes from './ProductGroup.module.sass'

const ProductGroup = ({ product }) => {

	const dispatch = useDispatch()

	const [ pcsToRemove, setPcsToRemove ] = useState('1')

	const memoizedTotal =
		useMemo(() => product.quantity * product.price, [ product ])

	const handleAddItem = () => {
		dispatch(itemAdded(product))
	}

	const handleRemoveItem = () => {
		dispatch(itemRemoved(product))
	}

	const handleRemoveAllItems = () => {
		dispatch(itemsRemoved(product))
	}

	const removeCertainQuantity = () => {
		dispatch(itemQuantityRemoved({
			pcs: Number(pcsToRemove),
			id: product.id
		}))
	}

	return <div key={product.origin}
		className={classes.group}
	>
		<p>{product.name}</p>
		<p>{product.origin}</p>
		<div className={classes.totals}>
			<p>{product.quantity} pcs</p>
			<p>Total: <span>{memoizedTotal}</span>
			</p>
		</div>
		<div>
			<Button label="+"
				clicked={handleAddItem}
			/>
			<Button label="-"
				clicked={handleRemoveItem}
			/>
			<Button label="remove all"
				clicked={handleRemoveAllItems}
			/>
		</div>
		<div>
			<NumberInput
				labelText="Remove this many pcs:"
				id="pcs"
				name="pcs"
				min="1"
				value={pcsToRemove}
				onChange={(e) => setPcsToRemove(e.target.value)}
				max={product.quantity.toString()}
			/>
			<Button label="remove"
				clicked={removeCertainQuantity}
			/>
		</div>
	</div>
}

ProductGroup.propTypes = {
	product: productType.isRequired
}

export default ProductGroup
