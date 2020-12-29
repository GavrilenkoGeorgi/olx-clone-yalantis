import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ product }) => {
	return <section>
		<article>
			<h1>Product details</h1>
			<h2>{product.name}</h2>
			<div>
				<p>
					Origin: {product.origin}
				</p>
				<p>
					Price: {product.price}
				</p>
			</div>
		</article>
	</section>
}

Product.propTypes = {
	product: PropTypes.object.isRequired
}

export default Product
