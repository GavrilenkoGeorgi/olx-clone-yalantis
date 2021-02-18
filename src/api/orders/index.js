import { productsListApi } from '../productsApi'
import URIs from '../URIs'

export const getOrders = async () => {
	const { data } = await productsListApi.get(URIs.orders)
	return data
}

export const addOrder = async order => {
	const { data } = await productsListApi.post(URIs.orders, order)
	return data
}

export const getOrderDetails = async id => {
	const { data } = await productsListApi.get(`${URIs.orders}/${id}`)
	return data
}
