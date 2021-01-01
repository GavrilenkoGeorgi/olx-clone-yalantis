import { calcTotal, groupByOrigin } from './utils'

import products from '../fixtures/products.json'

describe('Utils', () => {
	it('calcTotal\' calculates total', () => {
		const total = calcTotal(products)
		expect(total).toEqual(1131)
	})

	it('calcTotal\' throws an error if supplied with invalid arguments', () => {
		expect(() => calcTotal())
			.toThrowError('Can\'t calculate total, argument is missing or invalid.')

		expect(() => calcTotal(''))
			.toThrowError('Can\'t calculate total, argument is missing or invalid.')
	})

	it('groupByOrigin\' groups by origin', () => {
		const [ firstProduct, secondProduct ] = products

		const grouped = groupByOrigin(products)
		expect(grouped).toHaveLength(2)

		const [ firstGroup, secondGroup ] = grouped
		expect(firstGroup.origin).toEqual(firstProduct.origin)
		expect(secondGroup.origin).toEqual(secondProduct.origin)
		expect(secondGroup.products).toHaveLength(2)
	})

	it('groupByOrigin\' throws an error if supplied with invalid arguments', () => {
		expect(() => groupByOrigin())
			.toThrowError('Can\'t group by prop, array of objects is missing.')
	})
})
