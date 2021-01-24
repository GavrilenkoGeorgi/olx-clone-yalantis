import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	message: '',
	fetching: false,
	error: ''
}

const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		messageAdded(state, action) {
			state.message = action.payload
		},
		messageCleared(state) {
			state.message = ''
		},
		fetchingState(state, action) {
			state.fetching = action.payload
		},
		errorAdded(state, action) {
			state.error = action.payload
		},
		errorCleared(state) {
			state.error = ''
		},
		notificationsCleared(state) {
			state.message = ''
			state.error = ''
		}
	}
})

export const {
	errorAdded,
	errorCleared,
	messageAdded,
	messageCleared,
	fetchingState,
	notificationsCleared
} = notificationsSlice.actions

export default notificationsSlice.reducer

export const selectMessage = state => state.notifications.message
export const selectError = state => state.notifications.error
export const selectIsFetching = state => state.notifications.fetching

export const selectAllNotifications = state => state.notifications
