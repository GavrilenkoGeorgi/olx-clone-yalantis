import React from 'react'

const ProductGroups = ({ groups }) => {

	if (!groups.length)
		return <>Empty cart</>
	else return <>
		{groups.map(group => (
			<div style={{ border: '1px solid red' }}
				key={group.origin}>
				<p>{group.origin}</p>
				<p>{group.products.length} pcs</p>
			</div>
		))}
	</>
}

export default ProductGroups
