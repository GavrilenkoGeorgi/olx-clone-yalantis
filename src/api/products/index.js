import { productsListApi } from '../productsApi'
import URIs from '../URIs'

export const getProducts = async (query) => {
	const response = await productsListApi.get(URIs.products + query.toString())
	return response.data
}
