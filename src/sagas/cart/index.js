import { put } from 'redux-saga/effects'
import { createSliceSaga, SagaType } from 'redux-toolkit-saga'

import {
	itemAdded,
	itemRemoved,
	itemsRemoved,
	itemQuantityRemoved
} from '../../store/cart/cartSlice'

const cartSagaSlice = createSliceSaga({
	name: 'cart',
	sagaType: SagaType.Normal,
	caseSagas: {
		onItemAdded: {
			*fn(action) {
				yield put(itemAdded(action.payload))
			}
		},
		onItemRemoved: {
			*fn(action) {
				yield put(itemRemoved(action.payload))
			}
		},
		onAllItemsRemoved: {
			*fn(action) {
				yield put(itemsRemoved(action.payload))
			}
		},
		onItemQuantityRemoved: {
			*fn(action) {
				yield put(itemQuantityRemoved(action.payload))
			}
		}
	}
})

export const cartSaga = cartSagaSlice.saga

export const {
	onItemAdded,
	onItemRemoved,
	onAllItemsRemoved,
	onItemQuantityRemoved
} = cartSagaSlice.actions
