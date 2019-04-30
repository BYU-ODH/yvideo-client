import {
	TOGGLE_MENU,
	LOAD,
	DONE,
	READY,
	LOADED,
	LOST,
	FOUND,
	ADMIN_ON,
	ADMIN_OFF
} from './types'

export const toggleMenu = () => {
	return { type: TOGGLE_MENU }
}

export const load = () => {
	return { type: LOAD }
}

export const loaded = () => {
	return dispatch => {
		dispatch({ type: DONE })
		setTimeout(() => {
			dispatch({ type: READY })
			dispatch({ type: LOADED })
		},
			250)
	}
}

export const lost = () => {
	return { type: LOST }
}

export const found = () => {
	return { type: FOUND }
}

export const adminOn = () => {
	return { type: ADMIN_ON }
}

export const adminOff = () => {
	return { type: ADMIN_OFF }
}
