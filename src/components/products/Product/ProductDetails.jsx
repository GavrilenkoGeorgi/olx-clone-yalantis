import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import useAxios from '../../../hooks/useAxios'
import { productsListApi } from '../../../api/productsApi'
import URIs from '../../../api/URIs'

import Product from './Product'

const ProductDetails = ({ match }) => {

	const [ product, setProduct ] = useState(null)

	const { response } = useAxios({
		api: productsListApi,
		method: 'get',
		url: `${URIs.products}/${match.params.id}`
	})

	useEffect(() => {
		if (response) setProduct(response)
	}, [ response ])

	let productDetails

	if (!product) {
		productDetails =
			<p>Something went wrong while fetching details for this product: {match.params.id}</p>
	} else {
		productDetails = <Product product={product} />
	}

	return productDetails
}

ProductDetails.propTypes = {
	match: PropTypes.object.isRequired
}

export default ProductDetails
