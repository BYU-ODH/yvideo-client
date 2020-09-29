import configureMockStore from 'redux-mock-store'
import { composeWithDevTools } from 'redux-devtools-extension'
import proxies from 'proxy'

const thunk = require(`redux-thunk`).default
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

export const settings = {
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
}

export const changedSettings = {
	allowDefinitions:true,
	showAnnotations:true,
	showCaptions:true,
	showTranscripts:true,
	showWordList:true,
	aspectRatio:`1.77`,
	description:`changed`,
	targetLanguages: [`english`],
	annotationDocument: [],
	captionTrack: [],
}

export const modal = {
	active: false,
	collectionId: -1,
	componenet: null,
	isLabAssistantRoute: false,
	props: {},
}

export const user = {
	email: `email@testemail.com`,
	id: 22,
	lastLogin: `2020-05-14T19:53:02.807Z`,
	name: `testname`,
	roles: 0,
	username: `testusername`,
}

export const file1 = {
	"file-version": `test version`,
	filepath: `test file path`,
	id: `test id`,
	metadata: `metadata`,
	"resource-id": `test resource id`,
}

export const file1mod = {
	"file-version": `test version mod`,
	filepath: `test file path`,
	id: `test id`,
	metadata: `metadata`,
	"resource-id": `test resource id`,
}

export const file2 = {
	"file-version": `test version2`,
	filepath: `test file path2`,
	id: `test id2`,
	metadata: `metadata2`,
	"resource-id": `test resource id2`,
}

export const resource = {
	id: `resourceId`,
	title: `resource title`,
	description: `description`,
	keywords: [``],
	languages: {
		iso639_3:[],
	},
	files: [file1],
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
}

export const resource2 = {
	id: `resourceId2`,
	title: `resource title2`,
	description: `description`,
	keywords: [``],
	languages: {
		iso639_3:[],
	},
	files: [file2],
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
}

export const content = [
	{
		authKey: `5377628e855d31ad4d84a8fdedf5758b`,
		collectionId: 85,
		contentType: `video`,
		dateValidated:``,
		description: `test`,
		expired:true,
		fullVideo: true,
		id: 0,
		isCopyrighted:false,
		name: `testname`,
		physicalCopyExists:false,
		published:true,
		requester:``,
		resourceId:`5ebdaef833e57cec218b457c`,
		settings,
		thumbnail: `test@thumbnail.com`,
		url: `test url`,
		views: 0,
		resource,
	},
	{
		authKey: `5377628e855d31ad4d84a8fdedf5758b`,
		collectionId: 85,
		contentType: `video2`,
		dateValidated:``,
		description: `test2`,
		expired:true,
		fullVideo: true,
		id: 1,
		isCopyrighted:false,
		name: `testname2`,
		physicalCopyExists:false,
		published:true,
		requester:``,
		resourceId:`5ebdaef833e57cec218b457c`,
		settings,
		thumbnail: `test@thumbnail.com`,
		url: `test url2`,
		views: 0,
		resource,
	},
]

export const collection = {
	archived: false,
	content,
	id: 0,
	name: `Collection 1`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
}

export const collection1 = {
	archived: false,
	content,
	id: 0,
	name: `Collection 1`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
}

export const collection2 = {
	archived: false,
	content,
	id: 1,
	name: `Collection 2`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
}

export const collection3 = {
	archived: false,
	content,
	id: 1,
	name: `Collection 3`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
}

export const collections = {
	0:collection1,
	1:collection2,
}

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
	roles: 0,
	username: `testusername`,
}

export const professor2 = {
	email: `test2@email.com`,
	id: 23,
	lastLogin: `2020-05-14T19:53:02.807Z`,
	linked: `-1`,
	name: `testname professor2`,
	roles: 0,
	username: `testusername2`,
}

export const resources = [
	{
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
]

export const resources2 = [
	{
		id: `resourceId2`,
		title: `resource title2`,
		description: `description2`,
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
]

export const roles = {
	0:{
		courses: [
			{
				catalogNumber: 122,
				department: `ACC`,
				id: `course id`,
				sectionNumber:12,
			},
		],
		admins:[
			{
				id:22,
				username: `testusername`,
				name:`testname`,
				email:`test@test.com`,
				linked:-1,
				roles: 0,
				lastLogin:`2020-05-29T20:45:58.551Z`,
				exceptions:[
					{
						email:`test@test.com`,
						id:22,
						lastLogin:`2020-05-29T20:45:58.551Z`,
						name:`testname`,
						linked:-1,
						roles: 0,
						username: `testusername`,
					},
				],
			},
		],
		exceptions:[
			{
				email:`test@test.com`,
				id:22,
				lastLogin:`2020-05-29T20:45:58.551Z`,
				name:`testname`,
				linked:-1,
				roles: 0,
				username: `testusername`,
			},
		],
	},
}

export const lang1 = {
	name: `test lang`,
}

export const adminCategory = {
	Users: {
		name: `Users`,
		placeholder: `Search for a user`,
		url: `user`,
	},
	Collections: {
		name: `Collections`,
		placeholder: `Search for a collection`,
		url: `collection`,
	},
	Content: {
		name: `Content`,
		placeholder: `Search for content`,
		url: `content`,
	},
}

export const store = mockStore(
	{
		resourceStore: {
			cache:{
				loading: false,
				lastFetched: 1591825599289,
				resources,
			},
		},
		authStore: {
			user,
			loading: false,
			message: ``,
			tried: true,
		},
		adminStore: {
			data: [
				{
					email: `test@email.com`,
					id: 22,
					lastLogin: `2020-05-14T19:53:02.807Z`,
					linked: `-1`,
					name: `testname`,
					roles: 0,
					username: `testusername`,
				},
			],
			professors: [
				professor1,
				professor2,
			],
			professorCollections: collections,
			profCollectionContent:{
				190:content[0],
			},
			professor: professor1,
		},
		interfaceStore: {
			menuActive:false,
			displayBlocks: true,
			modal,
		},
		collectionStore: {
			roles,
			cache: collections,
			users: [],
			courses: [],
		},
		contentStore:{
			loading: false,
			lastFetched:1592426369817,
			cache: [
				{
					authKey: `5377628e855d31ad4d84a8fdedf5758b`,
					collectionId: 85,
					contentType: `video`,
					dateValidated:``,
					description: `test`,
					expired:true,
					fullVideo: true,
					id: 0,
					isCopyrighted:false,
					name: `testname`,
					physicalCopyExists:false,
					published:true,
					requester:``,
					resourceId:`5ebdaef833e57cec218b457c`,
					settings,
					thumbnail: `test@thumbnail.com`,
					url: `test url`,
					views: 0,
					resource,
				},
				{
					authKey: `5377628e855d31ad4d84a8fdedf5758b`,
					collectionId: 85,
					contentType: `video2`,
					dateValidated:``,
					description: `test2`,
					expired:true,
					fullVideo: true,
					id: 1,
					isCopyrighted:false,
					name: `testname2`,
					physicalCopyExists:false,
					published:true,
					requester:``,
					resourceId:`5ebdaef833e57cec218b457c`,
					settings,
					thumbnail: `test@thumbnail.com`,
					url: `test url2`,
					views: 0,
					resource,
				},
			],
		},
	},
	composeWithDevTools(thunk.withExtraArgument(proxies)),
)

describe(`test util`, () => {
	it(`test util ready to use`, ()=> {})
})