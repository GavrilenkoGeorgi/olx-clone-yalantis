/**
 * Calculate total price
 * @param {Object[]} arrayOfObjects - Array of product objects
 * @param {number} object.price - Price of the product
 *
 * @throws Throws an error if argument is missing or invalid
 *
 * @returns {number} Current total
 */

export const calcTotal = arrayOfObjects => {

	if (!arrayOfObjects || !Array.isArray(arrayOfObjects))
		throw new Error('Can\'t calculate total, argument is missing or invalid.')

	return arrayOfObjects.map(item => item.price)
		.reduce((total, current) => total + current, 0)
}

/**
 * Group array of product objects by property
 * @param {Object[]} arrayOfObjects - Array of product objects
 * @param {string} object.origin - Origin of the product
 *
 * @throws - Will throw an error if arg is missing or invalid
 *
 * @returns {Object[]} - Array of grouped products
 */

export const groupByOrigin = arrayOfObjects => {
	if (!arrayOfObjects || !Array.isArray(arrayOfObjects))
		throw new Error('Can\'t group by prop, array of objects is missing.')

	let data = arrayOfObjects.reduce((acc, item) => {
		let origin = item.origin
		if(!acc[origin]) acc[origin] = { origin, products: [ item ] }
		else acc[origin].products.push(item)
		return acc
	}, {})

	const result = Object.values(data)
	return result
}
