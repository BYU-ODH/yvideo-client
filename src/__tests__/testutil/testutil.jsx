import configureMockStore from 'redux-mock-store'
import { composeWithDevTools } from 'redux-devtools-extension'
import proxies from 'proxy'
import { browserStorage } from 'proxy'

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
	copyrighted: true,
	resourceName: `test resource name`,
	physicalCopyExists: true,
	published: true,
	views: 0,
	fullVideo: ``,
	metadata: ``,
	requesterEmail: `email`,
	allFileVersions: ``,
	resourceType: `video`,
	dateValidated: ``,
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

export const contentBeforeModel = [
	{
		id: `contentid1`,
		views: 0,
		"collection-id": `collectionsid1`,
		url: `test url`,
		"content-type":`video`,
		"resource-id":`5ebdaef833e57cec218b457c`,
		thumbnail: `test@thumbnail.com`,
		description: `test`,
		authKey: `5377628e855d31ad4d84a8fdedf5758b`,
		dateValidated:``,
		expired:true,
		fullVideo: true,
		isCopyrighted:false,
		"title": `testname`,
		physicalCopyExists:false,
		published:true,
		requester:``,
		tags: ``,
		"allow-definitions":true,
		"allow-captions":true,
		"allow-notes": true,
		"file-version": [],
		"annotations": ``,
		resource,
	},
	{
		id: `contentid2`,
		views: 0,
		"collection-id": `collectionsid2`,
		url: `test ur2l`,
		"content-type":`video2`,
		"resource-id":`5ebdaef833e57cec218b457c`,
		thumbnail: `test@thumbnail.com2`,
		description: `test2`,
		authKey: `5377628e855d31ad4d84a8fdedf5758b`,
		dateValidated:``,
		expired:true,
		fullVideo: true,
		isCopyrighted:false,
		name: `testname2`,
		physicalCopyExists:false,
		published:true,
		requester:``,
		tags: ``,
		"allow-definitions":true,
		"allow-captions":true,
		"allow-notes": true,
		"file-version": [],
		"annotations": ``,
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

export const collection4 = {
	archived: false,
	content: contentBeforeModel,
	id: 1,
	name: `Collection 4`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
}

export const collection5 = {
	archived: false,
	content: contentBeforeModel,
	id: 1,
	name: `Collection 5`,
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

export const resourcesNew = {
	"0": {
		allFileVersions: `English;Spanish;Korean;`,
		copyrighted: true,
		dateValidated: ``,
		fullVideo: true,
		id: `0`,
		metadata: `test3`,
		physicalCopyExists: true,
		published: true,
		requesterEmail: `test@email.com`,
		resourceName: `resourcename0`,
		resourceType: `video`,
		views: 0,
	},
	"1": {
		allFileVersions: `English;Spanish;Korean;`,
		copyrighted: true,
		dateValidated: ``,
		fullVideo: true,
		id: `1`,
		metadata: `test1`,
		physicalCopyExists: true,
		published: true,
		requesterEmail: `test@email.com`,
		resourceName: `resourcename1`,
		resourceType: `video`,
		views: 0,
	},
}

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

export const emptyStore = mockStore(
	{
		resourceStore: {},
		authStore: {
			user,
		},
		adminStore: {
			data: [],
			professor: professor1,
		},
		interfaceStore: {},
		collectionStore: {
			roles,
			cache: [],
			users: [],
			courses: [],
		},
		contentStore:{
			cache: [],
		},
		fileStore:{
			cache: {},
		},
		languageStore:{
			cache: {},
		},
	},
	composeWithDevTools(thunk.withExtraArgument(proxies)),
)

export const store = mockStore(
	{
		resourceStore: {
			cache:{
				"0": {
					allFileVersions: `English;Spanish;Korean;`,
					copyrighted: true,
					dateValidated: ``,
					fullVideo: true,
					id: `0`,
					metadata: `test3`,
					physicalCopyExists: true,
					published: true,
					requesterEmail: `test@email.com`,
					resourceName: `resourcename0`,
					resourceType: `video`,
					views: 0,
				},
				"1": {
					allFileVersions: `English;Spanish;Korean;`,
					copyrighted: true,
					dateValidated: ``,
					fullVideo: true,
					id: `1`,
					metadata: `test1`,
					physicalCopyExists: true,
					published: true,
					requesterEmail: `test@email.com`,
					resourceName: `resourcename1`,
					resourceType: `video`,
					views: 0,
				},
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
			menuActive: false,
			modal: {
				active: false,
				component: null,
				collectionId: -1,
				isLabAssistantRoute: false,
				props: {},
			},
			displayBlocks: browserStorage.displayBlocks,
			headerBorder: false,
			editorStyle: false,
			lost: false,
			events: [],
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
		fileStore:{
			cache: {},
			loading: false,
			lastFetched: 0,
		},
		languageStore:{
			cache: {
				langs:[`test version`, `lang1`, `lang2`, `lang3`, `other`],
			},
			loading: false,
			lastFetched: 0,
		},
	},
	composeWithDevTools(thunk.withExtraArgument(proxies)),
)

describe(`test util`, () => {
	it(`test util ready to use`, ()=> {})
})