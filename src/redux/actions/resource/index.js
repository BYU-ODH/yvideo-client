import { GET_RESOURCE } from 'redux/actions/types'

import axios from 'axios'

export const getResource = (collRes, callback) => {
	return async dispatch => {
		await axios(`${process.env.REACT_APP_RESOURCE_LIB}/resources/${collRes.resourceId}?${Date.now().toString(36)}`, { includeCredentials: true })
			.then(async result => {
				collRes.resource = result.data.resource
				collRes.resource.resources = {}
				collRes.resource.relations.forEach(item => collRes.resource.resources[item.type] = [])

				await collRes.resource.relations.forEach(async item => {
					await axios(`${process.env.REACT_APP_RESOURCE_LIB}/resources/${item.subjectId}?${Date.now().toString(36)}`, { includeCredentials: true })
						.then(result => {
							collRes.resource.resources[item.type].push(result.data.resource)

							if (Object.entries(collRes).length === 0 && collRes.constructor === Object)
								dispatch({ type: GET_RESOURCE, payload: collRes })

							if (typeof callback === `function`) callback(collRes)

						})
						.catch(err => {
							throw err
						})
				})
			})
			.catch(err => {
				throw err
			})
	}
}

// const testdata = {
// 	client: {
// 		id: `byu_demo`,
// 		name: `BYU Demos`
// 	},
// 	clientUser: {
// 		id: `user:13`
// 	},
// 	content: {
// 		files: [
// 			{
// 				attributes: [],
// 				bytes: 0,
// 				mime: `video/x-youtube`,
// 				mimeType: `video/x-youtube`,
// 				quality: 1,
// 				representation: `original`,
// 				streamUri: `https://www.youtube.com/watch?v=YMBj_tU7HRU`
// 			}
// 		]
// 	},
// 	dateAdded: `1556818336`,
// 	dateModified: `1556818336`,
// 	description: `Oliver`,
// 	id: `5ccb29a033e57c70758b4567`,
// 	keywords: ``,
// 	languages: {
// 		iso639_3: [`eng`]
// 	},
// 	relations: [
// 		{
// 			attributes: [],
// 			client: { id: `byu_demo`, name: `BYU Demos` },
// 			id: `54f8d4ee33e57cdb688b4568`,
// 			objectId: `54f8a7b633e57c55688b4569`,
// 			subjectId: `54f8d4ed33e57cdb688b4567`,
// 			type: `transcript_of`
// 		},
// 		{
// 			attributes: [],
// 			client: { id: `byu_demo`, name: `BYU Demos` },
// 			id: `54f8d6a733e57cba688b4568`,
// 			objectId: `54f8a7b633e57c55688b4569`,
// 			subjectId: `54f8d6a533e57cba688b4567`,
// 			type: `references`
// 		}
// 	],
// 	status: `normal`,
// 	title: `Johnathan`,
// 	type: `video`
// }