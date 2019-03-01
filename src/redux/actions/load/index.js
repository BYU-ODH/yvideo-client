import { LOAD, DONE, READY, LOADED } from './types'

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