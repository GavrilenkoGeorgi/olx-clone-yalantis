import { put, take } from 'redux-saga/effects'
import { errorAdded, fetchingState } from '../../store/notifications/notificationsSlice'

export default function* notificationsSagaWatcher() {
	yield take(errorAdded, onErrorAdded)
}

function* onErrorAdded() {
	yield put(fetchingState(false))
}
