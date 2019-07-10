import {
	TOGGLE_MENU,
	LOAD,
	LOADED,
	LOST,
	FOUND,
	DONE,
	READY,
	ADMIN_ON,
	ADMIN_OFF,
	TOGGLE_EDIT,
	TOGGLE_MODAL
} from 'redux/actions/types'

const initState = {
	menuActive: false,
	loading: false,
	done: false,
	lost: false,
	onAdmin: false,
	editMode: false,
	modalActive: false
}

export const menuReducer = (state = initState.menuActive, { type }) => {
	if (type === TOGGLE_MENU) return !state
	return state
}

export const loadReducer = (state = initState.loading, { type }) => {
	switch (type) {

		case LOAD:
			return true

		case LOADED:
			return false

		default:
			return state
	}
}

export const doneReducer = (state = initState.done, { type }) => {
	switch (type) {

		case DONE:
			return true

		case READY:
			return false

		default:
			return state
	}
}

export const lostReducer = (state = initState.lost, { type }) => {
	switch (type) {

		case LOST:
			return true

		case FOUND:
			return false

		default:
			return state
	}
}

export const onAdminReducer = (state = initState.onAdmin, { type }) => {
	switch (type) {

		case ADMIN_ON:
			return true

		case ADMIN_OFF:
			return false

		default:
			return state
	}
}

export const editReducer = (state = initState.editMode, { type }) => {
	if (type === TOGGLE_EDIT) return !state
	return state
}

export const modalReducer = (state = initState.modalActive, { type }) => {
	if (type === TOGGLE_MODAL) return !state
	return state
}