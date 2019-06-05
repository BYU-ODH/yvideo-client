import { GET_COLLECTION, GET_COLLECTIONS } from './types'

import axios from 'axios'

export const getCollections = callback => {
	return async dispatch => {
		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/collectionsPreview`, { withCredentials: true })
			.then(result => {
				const json = result.data
				const err = `Could not load collection previews. Displaying fillers.`
				if (json.length > 0) dispatch({ type: GET_COLLECTIONS, payload: json })
				else throw err
				typeof callback === `function` && callback(json)
			})
			.catch(err => console.error(err))
	}
}

export const getCollection = (id, callback) => {
	return async dispatch => {

		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${id}`, { withCredentials: true })
			.then(async result => {

				const collRes = result.data
				collRes.resource = {}

				await axios(`${process.env.REACT_APP_RESOURCE_LIB}/resources/${collRes.resourceId}?${Date.now().toString(36)}`, { includeCredentials: true })
					.then(async result => {
						collRes.resource = result.data.resource
						collRes.resource.resources = {}
						collRes.resource.relations.forEach(item => collRes.resource.resources[item.attributes.kind] = [])

						await collRes.resource.relations.forEach(item => {
							axios(`${process.env.REACT_APP_RESOURCE_LIB}/resources/${item.subjectId}?${Date.now().toString(36)}`, { includeCredentials: true })
								.then(result => {
									collRes.resource.resources[item.attributes.kind].push(result.data.resource)
								})
								.catch(err => {
									throw err
								})
						})

					})
					.catch(err => {
						throw err
					})

				if (Object.entries(collRes).length === 0 && collRes.constructor === Object)
					dispatch({ type: GET_COLLECTION, paylaod: collRes })

				if (typeof callback === `function`) callback(collRes)
			})
			.catch(err => console.error(err))

	}
}
