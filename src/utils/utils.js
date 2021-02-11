/**
 * Build query string from array of objects
 *
 * @param {Object[]} params - Objects
 * @param {Object} item - Item with query name and value
 * @param {string} item.param - Search param name
 * @param {string} item.value - Search param value
 *
 * @throws Will throw an error if argument is missing of invalid
 *
 * @returns {string} Query string
 */

export const buildQuery = params => {

	if (!params || !Array.isArray(params))
		throw new Error('(buildQuery): Can\'t build query string, check input params.')

	let queryString = ''
	const queryParams = []

	for (let { param, value } of params)
		if (value) queryParams
			.push(`${encodeURIComponent(param)}=${encodeURIComponent(value)}`)

	if (queryParams.length)
		return `${queryString}${queryParams.join('&')}`
	else return ''
}

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

/**
 * Format date
 * @param dateString - ISO 8601 date string
 *
 * @throw - Will throw an error of provided date string is invalid
 *
 * @returns {string} - Formatted date string
 */

export const formatDate = dateString => {
	const date = new Date(dateString)

	if (date.toString() === 'Invalid Date')
		throw new Error('Can\'t create date from given string.')

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}
	return date.toLocaleString('en-us', options)
}

/**
* Check if object is empty
* @param {Object} obj - Object to check
*
* @returns {boolean} - True if object exists, false otherwise
*/
export const pureObjectIsEmpty = obj => obj && obj.constructor === Object && Object.keys(obj).length === 0

/**
 * Generate search params string considering 'editable' param
 * @param {*} editable - Value to convert to boolean
 * @param {string} search - Search string if any
 *
 * @returns {string} - Search params
 */

export const editableParam = (editable, search) => {
	let param = ''
	const edit = `editable=${Boolean(editable)}`
	if (search && editable) {
		// put it to the end
		return param = `&${edit}`
	} else if (search && !editable) {
		// just return empty
		return param
	} else if (!search) {
		// single editable param
		return param = `?${edit}`
	}
}

/**
 * Get error message text from response
 * @param {Object} response - Response object
 *
 * @throw - Will throw an error if argument is missing
 *
 * @returns {string} - Error message
 */

export const getErrorMessageText = ({ response }) => {
	const { data } = response

	if (!data)
		throw new Error('getErrorMessageText: Response object is required.')

	return data.error.message
}
