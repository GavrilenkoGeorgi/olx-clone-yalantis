import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { productsListApi } from '../../../api/productsApi'
import URIs from '../../../api/URIs'

import Product from './Product'

const ProductDetails = ({ match }) => {

	const [ product, setProduct ] = useState(null)

	useEffect(() => {
		productsListApi.get(`${URIs.products}/${match.params.id}`)
			.then(response => {
				setProduct(response.data)
			})
	}, [ match, setProduct ])

	let productDetails

	if (!product) {
		productDetails = <div>
			<p>Just a sec, fetching product data...</p>
		</div>
	} else {
		productDetails = <Product product={product} />
	}

	return productDetails
}

ProductDetails.propTypes = {
	match: PropTypes.object.isRequired
}

export default ProductDetails
