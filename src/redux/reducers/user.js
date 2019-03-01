import { GET_USER_INFO, GET_COLL_PREVIEW, GET_COLL_RECENT } from '../actions/types'

const initUserInfo = {}

export const userInfoReducer = (state = initUserInfo, { type, payload }) => {
	switch (type) {
		case GET_USER_INFO:
			console.log('payload', payload)
			return payload

		default:
			return state
	}
}

const initUserPreview = [
	{
		'contentCount': 17,
		'name': 'American Heritage',
		'url': '',
		'id': 16
	},
	{
		'contentCount': 4,
		'name': 'Germ 101 - Term Videos',
		'url': '',
		'id': 8
	},
	{
		'contentCount': 2,
		'name': 'MTV Music Videos',
		'url': '',
		'id': 17
	},
	{
		'contentCount': 8,
		'name': 'Yoga Meditation',
		'url': '',
		'id': 20
	}
]

export const userPreviewReducer = (state = initUserPreview, { type, payload }) => {
	switch (type) {
		case GET_COLL_PREVIEW:
			return payload

		default:
			return state
	}
}

const initUserRecent = [
	{
		'contentId': 1,
		'name': 'Collection 1 Video 1',
		'thumbnail': '',
		'collection': 'Collection 1'
	},
	{
		'contentId': 2,
		'name': 'Collection 2 Video 1',
		'thumbnail': '',
		'collection': 'Collection 2'
	},
	{
		'contentId': 3,
		'name': 'Collection 2 Video 2',
		'thumbnail': '',
		'collection': 'Collection 2'
	},
	{
		'contentId': 4,
		'name': 'Collection 3 Video 1',
		'thumbnail': '',
		'collection': 'Collection 3'
	}
]

export const userRecentReducer = (state = initUserRecent, { type, payload }) => {
	switch (type) {
		case GET_COLL_RECENT:
			return payload

		default:
			return state
	}
}
