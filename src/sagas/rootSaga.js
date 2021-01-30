import { all } from 'redux-saga/effects'
import notificationsSagaWatcher from './notifications/saga'
import productsSaga from './products/saga'

export default function* rootSaga() {
	yield all([ notificationsSagaWatcher(), productsSaga() ])
}