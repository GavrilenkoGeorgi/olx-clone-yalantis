import { productsListApi } from '../productsApi'
import URIs from '../URIs'

export const getProducts = async (query) => {
	const response = await productsListApi.get(URIs.products + query.toString())
	return response.data
}

export const deleteProduct = async (id) => {
	const response = await productsListApi.delete(`${URIs.products}/${id}`)
	return response.status
}
