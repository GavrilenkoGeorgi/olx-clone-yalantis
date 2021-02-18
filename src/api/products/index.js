import { productsListApi } from '../productsApi'
import URIs from '../URIs'

export const getProducts = async query => {
	const { data } = await productsListApi.get(URIs.products + query.toString())
	return data
}

export const deleteProduct = async id => {
	const { status } = await productsListApi.delete(`${URIs.products}/${id}`)
	return status // only status?
}

export const addProduct = async product => {
	const { data } = await productsListApi.post(URIs.products, product)
	return data
}

export const editProduct = async ({ product }) => {
	const { data } = await productsListApi.patch(`${URIs.products}/${product.id}`, { product })
	return data
}
