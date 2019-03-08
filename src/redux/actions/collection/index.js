import { GET_COLLECTIONS } from './types'

import axios from 'axios'

export const getCollections = callback => {
	return async dispatch => {
		await axios(process.env.REACT_APP_YVIDEO_SERVER + '/api/user/collectionsPreview', { withCredentials: true })
			.then(result => {
				const json = result.data
				if (json.length > 0) dispatch({ type: GET_COLLECTIONS, payload: json })
				typeof callback === 'function' && callback(json)
			})
			.catch(() => {
				const err = 'Could not load collection previews.'
				throw err
			})
	}
}
