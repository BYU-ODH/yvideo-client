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

export const props = {
	collection,
	content,
	getContent: jest.fn(),
	updateCollectionName: jest.fn(),
	updateCollectionStatus: jest.fn(),
}

export const store = mockStore({
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
			{
				email: `test1@email.com`,
				id: 22,
				lastLogin: `2020-05-14T19:53:02.807Z`,
				linked: `-1`,
				name: `testname professor1`,
				roles: [`admin`],
				username: `testusername`,
			},
			{
				email: `test2@email.com`,
				id: 23,
				lastLogin: `2020-05-14T19:53:02.807Z`,
				linked: `-1`,
				name: `testname professor2`,
				roles: [`admin`],
				username: `testusername2`,
			},
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