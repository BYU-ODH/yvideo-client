import { GET_RESOURCE } from 'redux/actions/types'

import axios from 'axios'

const test = false

export const getResource = (id, callback) => {
	return async dispatch => {
		await axios(`${process.env.REACT_APP_RESOURCE_LIB}/resources/${id}?${Date.now().toString(36)}`, { includeCredentials: true })
			.then(async result => {
				const data = result.data.resource
				data.resources = {}

				await data.relations.forEach(item => {
					axios(`${process.env.REACT_APP_RESOURCE_LIB}/resources/${item.subjectId}?${Date.now().toString(36)}`, { includeCredentials: true })
					.then(result => {
						data.resources[result.data.resource.type] = result.data.resource
					})
				})

				if (test) dispatch({ type: GET_RESOURCE, payload: testdata })
				else dispatch({ type: GET_RESOURCE, payload: data })

				if (test) typeof callback === `function` && callback(testdata)
				else typeof callback === `function` && callback(data)
			})
			.catch(err => {
				console.error(err)
			})
	}
}

const testdata = {
	client: {
		id: `byu_demo`,
		name: `BYU Demos`
	},
	clientUser: {
		id: `user:13`
	},
	content: {
		files: [
			{
				attributes: [],
				bytes: 0,
				mime: `video/x-youtube`,
				mimeType: `video/x-youtube`,
				quality: 1,
				representation: `original`,
				streamUri: `https://www.youtube.com/watch?v=YMBj_tU7HRU`
			}
		]
	},
	dateAdded: `1556818336`,
	dateModified: `1556818336`,
	description: `Oliver`,
	id: `5ccb29a033e57c70758b4567`,
	keywords: ``,
	languages: {
		iso639_3: [`eng`]
	},
	relations: [
		{
			attributes: [],
			client: { id: `byu_demo`, name: `BYU Demos` },
			id: `54f8d4ee33e57cdb688b4568`,
			objectId: `54f8a7b633e57c55688b4569`,
			subjectId: `54f8d4ed33e57cdb688b4567`,
			type: `transcript_of`
		},
		{
			attributes: [],
			client: { id: `byu_demo`, name: `BYU Demos` },
			id: `54f8d6a733e57cba688b4568`,
			objectId: `54f8a7b633e57c55688b4569`,
			subjectId: `54f8d6a533e57cba688b4567`,
			type: `references`
		}
	],
	status: `normal`,
	title: `Johnathan`,
	type: `video`
}