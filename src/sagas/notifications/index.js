import { put } from 'redux-saga/effects'
import { createSliceSaga, SagaType } from 'redux-toolkit-saga'

import { fetchingState } from '../../store/notifications/notificationsSlice'

const notificationsSagaSlice = createSliceSaga({
	name: 'notifications',
	sagaType: SagaType.Normal,
	caseSagas: {
		onErrorAdded: {
			*fn() {
				yield put(fetchingState(false))
			}
		}
	}
})

export const notificationsSaga = notificationsSagaSlice.saga

export const { onErrorAdded } = notificationsSagaSlice.actions
