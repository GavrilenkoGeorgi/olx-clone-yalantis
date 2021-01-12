import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useAxios from '../../../hooks/useAxios'
import { productsListApi } from '../../../api/productsApi'
import URIs from '../../../api/URIs'

import Product from './Product'
import { BackButton } from '../../widgets'

const ProductDetails = () => {

	const params = useParams()
	const [ product, setProduct ] = useState(null)

	const { response } = useAxios({
		api: productsListApi,
		method: 'get',
		url: `${URIs.products}/${params.id}`
	})

	useEffect(() => {
		if (response) setProduct(response)
	}, [ response ])

	let productDetails

	if (!product) {
		productDetails =
			<p>Something went wrong while fetching details for this product: {params.id}</p>
	} else {
		productDetails = <Product product={product} />
	}

	return <>
		<BackButton />
		{productDetails}
	</>
}

export default ProductDetails
