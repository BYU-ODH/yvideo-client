import configureMockStore from 'redux-mock-store'

const thunk = require(`redux-thunk`).default
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

export const content = [
	{
		id: 115,
		name: `testname`,
		contentType: `video`,
		collectionId: 85,
		thumbnail: `test@thumbnail.com`,
		physicalCopyExists:false,
		isCopyrighted:false,
		expired:true,
		dateValidated:``,
		requester:``,
		resourceId:`5ebdaef833e57cec218b457c`,
		published:true,
		settings: {
			allowDefinitions:false,
			showAnnotations:false,
			showCaptions:false,
			showTranscripts:false,
			showWordList:false,
			aspectRatio:`1.77`,
			description:``,
			targetLanguages: [],
			annotationDocument: [],
			captionTrack: [],
		},
		fullVideo: true,
		authKey: `5377628e855d31ad4d84a8fdedf5758b`,
		views: 0,
	},
]

export const collection = {
	archived: false,
	content,
	id: 65,
	name: `Collection 1`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
}

export const collections = [collection]

export const props = {
	collection,
	content,
	getContent: jest.fn(),
	updateCollectionName: jest.fn(),
	updateCollectionStatus: jest.fn(),
}

export const professor1 = {
	email: `test1@email.com`,
	id: 22,
	lastLogin: `2020-05-14T19:53:02.807Z`,
	linked: `-1`,
	name: `testname professor1`,
	roles: [`admin`],
	username: `testusername`,
}

export const professor2 = {
	email: `test2@email.com`,
	id: 23,
	lastLogin: `2020-05-14T19:53:02.807Z`,
	linked: `-1`,
	name: `testname professor2`,
	roles: [`admin`],
	username: `testusername2`,
}

export const store = mockStore({
	resourceStore: {
		cache:{
			loading: false,
			lastFetched: 1591825599289,
			resourceId: {
				id: `resourceId`,
				title: `resource title`,
				description: `description`,
				keywords: [],
				languages: {
					iso639_3:[],
				},
				type: `video`,
				dateAdded: `1591672795`,
				dateModified:`1591672795`,
				status:`normal`,
				clientUser: {
					id: `user:22`,
				},
				client:{
					id: `byu_demo`,
					name: `BYU Demos`,
				},
				content:{
					files:[
						{
							streamUri:`https://www.youtube.com/watch?v=H_431Dxt-4c`,
							bytes:0,
							representation:`original`,
							quality:1,
							mime:`video/x-youtube`,
							mimeType:`video/x-youtube`,
							attributes: [],
						},
					],
				},
			},
		},
	},
	authStore: {
		user:{
			roles: `admin`,
		},
	},
	adminStore: {
		data: [
			{
				email: `test@email.com`,
				id: 22,
				lastLogin: `2020-05-14T19:53:02.807Z`,
				linked: `-1`,
				name: `testname`,
				roles: [`admin`],
				username: `testusername`,
			},
		],
		professors: [
			professor1,
			professor2,
		],
		professorCollections:{
			archived: false,
			content : [
				{
					contentType: `video`,
					id: 110,
					name: `testname`,
					thumbnail: `test@thumbnail`,
					views: 0,
				},
			],
			id: 65,
			name: `Collection 1`,
			owner: 22,
			published: true,
			thumbnail: `test@thumbnail`,
			collections: [
				{
					archived: false,
					content : [
						{
							contentType: `video`,
							id: 110,
							name: `testname`,
							thumbnail: `test@thumbnail`,
							views: 0,
						},
					],
					id: 65,
					name: `Collection 1`,
					owner: 22,
					published: true,
					thumbnail: `test@thumbnail`,
				},
			],
		},
	},
	interfaceStore: {
		displayBlocks: true,
	},
	collectionStore: {
		cache: {
			archived: false,
			content : [
				{
					contentType: `video`,
					id: 110,
					name: `testname`,
					thumbnail: `test@thumbnail`,
					views: 0,
				},
			],
			id: 65,
			name: `Collection 1`,
			owner: 22,
			published: true,
			thumbnail: `test@thumbnail`,
			collections: [
				{
					archived: false,
					content : [
						{
							contentType: `video`,
							id: 110,
							name: `testname`,
							thumbnail: `test@thumbnail`,
							views: 0,
						},
					],
					id: 65,
					name: `Collection 1`,
					owner: 22,
					published: true,
					thumbnail: `test@thumbnail`,
				},
			],
		},
	},
	contentStore:{
		cache: [
			{
				id: 115,
				name: `testname`,
				contentType: `video`,
				collectionId: 85,
				thumbnail: `test@thumbnail.com`,
				physicalCopyExists:false,
				isCopyrighted:false,
				expired:true,
				dateValidated:``,
				requester:``,
				resourceId:`5ebdaef833e57cec218b457c`,
				published:true,
				settings: {
					allowDefinitions:false,
					showAnnotations:false,
					showCaptions:false,
					showTranscripts:false,
					showWordList:false,
					aspectRatio:`1.77`,
					description:``,
					targetLanguages: [],
					annotationDocument: [],
					captionTrack: [],
				},
				fullVideo: true,
				authKey: `5377628e855d31ad4d84a8fdedf5758b`,
				views: 0,
			},
		],
	},
})

describe(`test util`, () => {
	it(`test util ready to use`, ()=> {})
})