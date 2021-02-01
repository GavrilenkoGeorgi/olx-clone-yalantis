import { put, take } from 'redux-saga/effects'

import {
	itemAdded,
	itemRemoved,
	itemsRemoved,
	itemQuantityRemoved
} from '../../store/cart/cartSlice'

function* onItemAdded(action) {
	yield put(itemAdded(action.payload))
}

function* onItemRemoved(action) {
	yield put(itemRemoved(action.payload))
}

function* onItemsRemoved(action) {
	yield put(itemsRemoved(action.payload))
}

function* onItemQuantityRemoved(action) {
	yield put(itemQuantityRemoved(action.payload))
}

export default function* cartWatcher() {
	yield take(itemAdded, onItemAdded)
	yield take(itemRemoved, onItemRemoved)
	yield take(itemsRemoved, onItemsRemoved)
	yield take(itemQuantityRemoved, onItemQuantityRemoved)
}
