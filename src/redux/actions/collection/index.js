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
		published: true,
		owner: `zgrant12`,
		archived: false,
		content: [
			{
				id: 0,
				thumbnail: ``,
				name: `video 1.1`,
				views: 5,
				contentType: `video`,
				published: true,
				translation: false,
				captions: false,
				annotations: false
			},
			{
				id: 1,
				thumbnail: ``,
				name: `video 1.2`,
				views: 5,
				contentType: `video`,
				published: true,
				translation: false,
				captions: false,
				annotations: true
			},
			{
				id: 2,
				thumbnail: ``,
				name: `video 1.3`,
				views: 5,
				contentType: `video`,
				published: true,
				translation: false,
				captions: true,
				annotations: false
			},
			{
				id: 3,
				thumbnail: ``,
				name: `video 1.4`,
				views: 5,
				contentType: `video`,
				published: true,
				translation: false,
				captions: true,
				annotations: true
			},
			{
				id: 4,
				thumbnail: ``,
				name: `video 1.5`,
				views: 5,
				contentType: `video`,
				published: true,
				translation: true,
				captions: false,
				annotations: false
			},
			{
				id: 5,
				thumbnail: ``,
				name: `video 1.6`,
				views: 5,
				contentType: `video`,
				published: false,
				translation: true,
				captions: false,
				annotations: true
			},
			{
				id: 6,
				thumbnail: ``,
				name: `video 1.7`,
				views: 5,
				contentType: `video`,
				published: false,
				translation: true,
				captions: true,
				annotations: false
			},
			{
				id: 7,
				thumbnail: ``,
				name: `video 1.8`,
				views: 5,
				contentType: `video`,
				published: false,
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
		published: false,
		owner: `zgrant12`,
		archived: false,
		content: [
			{
				id: 0,
				thumbnail: ``,
				name: `video 2.1`,
				views: 5,
				contentType: `video`,
				published: true,
				translation: true,
				captions: true,
				annotations: false
			},
			{
				id: 1,
				thumbnail: ``,
				name: `video 2.2`,
				views: 5,
				contentType: `video`,
				published: true,
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
		published: true,
		owner: `zgrant12`,
		archived: false,
		content: [
			{
				id: 0,
				thumbnail: ``,
				name: `video 3.1`,
				views: 5,
				contentType: `video`,
				published: false,
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
		published: false,
		owner: `zgrant12`,
		archived: false,
		content: [
			{
				id: 0,
				thumbnail: ``,
				name: `video 4.1`,
				views: 5,
				contentType: `video`,
				published: true,
				translation: false,
				captions: false,
				annotations: true
			},
			{
				id: 1,
				thumbnail: ``,
				name: `video 4.2`,
				views: 5,
				contentType: `video`,
				published: true,
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
		published: true,
		owner: `zgrant12`,
		archived: false,
		content: [
			{
				id: 0,
				thumbnail: ``,
				name: `video 5.1`,
				views: 5,
				contentType: `video`,
				published: false,
				translation: true,
				captions: false,
				annotations: true
			}
		]
	},
	{
		id: 5,
		thumbnail: ``,
		name: `You should not see this`,
		published: true,
		owner: `zgrant12`,
		archived: true,
		content: [
			{
				id: 0,
				thumbnail: ``,
				name: `You should not see this`,
				views: 5,
				contentType: `video`,
				published: true,
				translation: true,
				captions: false,
				annotations: true
			}
		]
	}
]
