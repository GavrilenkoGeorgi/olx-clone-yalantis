import { calcTotal, groupByOrigin, formatDate } from './utils'

import products from '../fixtures/products.json'

describe('Utils', () => {
	it('\'calcTotal\' calculates total', () => {
		const total = calcTotal(products.items)
		expect(total).toEqual(1131)
	})

	it('\'calcTotal\' throws an error if supplied with invalid arguments', () => {
		expect(() => calcTotal())
			.toThrowError('Can\'t calculate total, argument is missing or invalid.')

		expect(() => calcTotal(''))
			.toThrowError('Can\'t calculate total, argument is missing or invalid.')
	})

	it('\'groupByOrigin\' groups by origin', () => {
		const [ firstProduct, secondProduct ] = products.items

		const grouped = groupByOrigin(products.items)
		expect(grouped).toHaveLength(2)

		const [ firstGroup, secondGroup ] = grouped
		expect(firstGroup.origin).toEqual(firstProduct.origin)
		expect(secondGroup.origin).toEqual(secondProduct.origin)
		expect(secondGroup.products).toHaveLength(2)
	})

	it('\'groupByOrigin\' throws an error if supplied with invalid arguments', () => {
		expect(() => groupByOrigin())
			.toThrowError('Can\'t group by prop, array of objects is missing.')
	})

	it('\'formatDate\' correctly formats date', () => {
		const dateString = '2020-12-22T17:28:32.195Z'
		const formattedDate = formatDate(dateString)

		expect(formattedDate).toEqual('December 22, 2020')
	})

	it('\'formatDate\' throws ans error if date string is invalid', () => {
		const invalidDates = [ '', 'asd3434', '34242sdfsdf', 'march' ]

		for (const date of invalidDates)
			expect(() => formatDate(date))
				.toThrowError('Can\'t create date from given string.')
	})
})
