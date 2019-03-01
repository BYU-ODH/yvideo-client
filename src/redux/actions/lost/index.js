import { LOST, FOUND } from './types'

export const lost = () => {
	return { type: LOST }
}

export const found = () => {
	return { type: FOUND }
}