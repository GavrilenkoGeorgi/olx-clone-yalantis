import {
	createSlice,
	createEntityAdapter
} from '@reduxjs/toolkit'

const cartAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.name.localeCompare(b.name)
})

const cartSlice = createSlice({
	name: 'cart',
	initialState: cartAdapter.getInitialState({
		total: 0
	}),
	reducers: {
		itemAdded: {
			reducer(state, action) {
				const existingItem = state.entities[action.payload.id]
				if (!existingItem) {
					cartAdapter.addOne(state, action.payload)
					state.total += action.payload.price
				} else {
					state.total += action.payload.price
					state.entities[action.payload.id].quantity += 1
				}
			},
			prepare(item) {
				return {
					payload: {
						...item,
						quantity: 1
					}
				}
			}
		},
		itemRemoved(state, action) {
			const quantity = state.entities[action.payload.id].quantity
			if (quantity === 1) {
				cartAdapter.removeOne(state, action.payload.id)
			} else {
				state.entities[action.payload.id].quantity -= 1
			}
			state.total -= action.payload.price
		},
		itemsRemoved(state, action) {
			const itemQuantity = state.entities[action.payload.id].quantity
			const price = state.entities[action.payload.id].price

			state.total -= itemQuantity * price
			cartAdapter.removeOne(state, action.payload.id)
		},
		itemQuantityRemoved(state, action) {
			const { pcs, id } = action.payload
			const item = state.entities[id]

			if (item.quantity === pcs) {
				cartAdapter.removeOne(state, id)
			} else {
				state.entities[action.payload.id].quantity -= pcs
			}
			state.total -= item.price * pcs
		}
	}
})

export const {
	itemAdded,
	itemRemoved,
	itemsRemoved,
	itemQuantityRemoved
} = cartSlice.actions

export default cartSlice.reducer

export const {
	selectAll: selectAllItems,
	selectById: selectItemById,
	selectIds: selectItemsIds
} = cartAdapter.getSelectors(state => state.cart)
