import { GET_COLLECTIONS } from './types'

import axios from 'axios'

const test = true

export const getCollections = callback => {
	return async dispatch => {
		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/collectionsPreview`, { withCredentials: true })
			.then(result => {
				const json = result.data
				const err = `Could not load collection previews. Displaying fillers.`
				if (json.length > 0 && !test) dispatch({ type: GET_COLLECTIONS, payload: json })
				else throw err
				typeof callback === `function` && callback(json)
			})
			.catch(err => {
				dispatch({ type: GET_COLLECTIONS, payload: fakedata })
				throw err
			})
	}
}

const fakedata = [
	{
		id: 0,
		thumbnail: ``,
		name: `test`,
		content: [
			{
				id: 0,
				thumbnail: ``,
				name: `video 1.1`,
				collection: `test`,
				translation: false,
				captions: false,
				annotations: false
			},
			{
				id: 1,
				thumbnail: ``,
				name: `video 1.2`,
				collection: `test`,
				translation: false,
				captions: false,
				annotations: true
			},
			{
				id: 2,
				thumbnail: ``,
				name: `video 1.3`,
				collection: `test`,
				translation: false,
				captions: true,
				annotations: false
			},
			{
				id: 3,
				thumbnail: ``,
				name: `video 1.4`,
				collection: `test`,
				translation: false,
				captions: true,
				annotations: true
			},
			{
				id: 4,
				thumbnail: ``,
				name: `video 1.5`,
				collection: `test`,
				translation: true,
				captions: false,
				annotations: false
			},
			{
				id: 5,
				thumbnail: ``,
				name: `video 1.6`,
				collection: `test`,
				translation: true,
				captions: false,
				annotations: true
			},
			{
				id: 6,
				thumbnail: ``,
				name: `video 1.7`,
				collection: `test`,
				translation: true,
				captions: true,
				annotations: false
			},
			{
				id: 7,
				thumbnail: ``,
				name: `video 1.8`,
				collection: `test`,
				translation: true,
				captions: true,
				annotations: true
			}
		]
	},
	{
		id: 1,
		thumbnail: ``,
		name: `test2`,
		content: [
			{
				id: 0,
				thumbnail: ``,
				name: `video 2.1`,
				collection: `test2`,
				translation: true,
				captions: true,
				annotations: false
			},
			{
				id: 1,
				thumbnail: ``,
				name: `video 2.2`,
				collection: `test2`,
				translation: true,
				captions: true,
				annotations: true
			}
		]
	},
	{
		id: 2,
		thumbnail: ``,
		name: `test3`,
		content: [
			{
				id: 0,
				thumbnail: ``,
				name: `video 3.1`,
				collection: `test3`,
				translation: false,
				captions: true,
				annotations: true
			}
		]
	},
	{
		id: 3,
		thumbnail: ``,
		name: `test4`,
		content: [
			{
				id: 0,
				thumbnail: ``,
				name: `video 4.1`,
				collection: `test4`,
				translation: false,
				captions: false,
				annotations: true
			},
			{
				id: 1,
				thumbnail: ``,
				name: `video 4.2`,
				collection: `test4`,
				translation: false,
				captions: true,
				annotations: false
			}
		]
	},
	{
		id: 4,
		thumbnail: ``,
		name: `test5`,
		content: [
			{
				id: 0,
				thumbnail: ``,
				name: `video 5.1`,
				collection: `test5`,
				translation: true,
				captions: false,
				annotations: true
			}
		]
	}
]
