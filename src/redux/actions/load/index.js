import { LOAD, LOADED } from './types'

export const load = () => {
	return {
		type: LOAD,
		payload: true
	}
}

export const loaded = () => {
	return {
		type: LOADED,
		payload: false
	}
}