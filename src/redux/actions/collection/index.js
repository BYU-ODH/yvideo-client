import { GET_CONTENT, GET_COLLECTIONS, GET_PRIVILEGED_COLLECTIONS } from './types'

import axios from 'axios'

export const getCollections = callback => {

	return async dispatch => {

		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/collections`, { withCredentials: true })
			.then(result => {
				const { data } = result

				const err = `Could not load collection previews. Displaying fillers.`

				if (data.length > 0)
					dispatch({ type: GET_COLLECTIONS, payload: data })
				else throw err

				typeof callback === `function` && callback(data)
			})
			.catch(err => console.error(err))
	}
}

export const getPrivilegedCollections = callback => {

	return async dispatch => {

		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/privilegedCollections`, { withCredentials: true })
			.then(result => {
				const { data } = result

				const err = `Could not load collection previews. Displaying fillers.`

				if (data.length > 0)
					dispatch({ type: GET_PRIVILEGED_COLLECTIONS, payload: data })
				else throw err

				typeof callback === `function` && callback(data)
			})
			.catch(err => console.error(err))
	}
}

export const getContent = collection => {

	return async dispatch => {

		const finalResult = {}

		await collection.content.forEach(async item => {
			await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${item.id}`, { withCredentials: true })
				.then(response => {
					finalResult[item.id] = response.data
				})
				.catch(err => console.error(err))
		})

		dispatch({ type: GET_CONTENT, payload: finalResult })
	}
}
