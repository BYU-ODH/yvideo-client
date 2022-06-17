import configureMockStore from 'redux-mock-store'
import React from 'react'
import { composeWithDevTools } from 'redux-devtools-extension'
import proxies, { browserStorage } from 'proxy'

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
	targetLanguage: `English`,
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
	targetLanguage: `english`,
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
		copyrighted: false,
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
		words: [`testWord1`],
		tag: [`testTag1`],
		editing: true,
		clips: ``,
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
		copyrighted: false,
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
		words: [`testWord2`],
		tag: [`testTag2`],
		editing: true,
		clips: ``,
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
		copyrighted: false,
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
		copyrighted: false,
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
	'expired-content': content,
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

export const collection6 = {
	archived: false,
	content: contentBeforeModel,
	id: 1,
	name: `Collection 5`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
	public: false,
}

export const collection7 = {
	archived: false,
	content: [{thumbnail: `test@thumbnail`}],
	id: 1,
	name: `Collection 5`,
	owner: 12,
	published: true,
	thumbnail: `test@thumbnail`,
	public: false,
}

export const collections = {
	0:collection1,
	1:collection2,
}

export const collections1 = {
	0:collection1,
}
collections1.content = content

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

export const subtitle =
{
	content: ``,
	"content-id": `0`,
	id: `1`,
	language: `english`,
	title: `title`,
	words: `b, a, c`,
}

export const updateSubtitle =
{
	content: ``,
	"content-id": `0`,
	id: `1`,
	language: `english`,
	title: `title`,
	words: `b, a, c , d, e`,
}

export const updateSubtitle1 =
{
	content: 0,
	"content-id": `0`,
	id: `1`,
	language: `english`,
	title: `title`,
	words: `b, a, c , d, e`,
}

export const subtitle1 =
[
	{
		content: ``,
		"content-id": `0`,
		id: `1`,
		language: `english`,
		title: `title`,
		words: `b, a, c`,
	},
]

export const emptyStore = mockStore(
	{
		resourceStore: {
			access: {
				"id1" : [],
			},
		},
		authStore: {
			user,
		},
		adminStore: {
			data: null,
			professor: professor1,
			morePublicCollections: {
				collections1,
			},
		},
		interfaceStore: {
			languageCodes: {},
			jsonResponse: {},
			tip: {
				active: false,
			},
			breadcrumbs: {	path: [``],
				collectionId: ``,
				contentId: ``},
			modal: {
				isLabAssistantRoute: false,
			},
		},
		collectionStore: {
			roles,
			cache: [],
			users: [],
			courses: [],
			newCollectionId: `b3a29aff-235e-4261-9b08-7b32023afc9e`,
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
		subtitlesStore:{
			cache: [],
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
			access: {
				"id1" :
					[
						{
							username: `yrich`,
							valid: true,
						},
					],
			},
			streamKey: `key`,
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
			morePublicCollections: {
				collections1,
			},
		},
		interfaceStore: {
			menuActive: false,
			modal: {
				active: false,
				collectionId: -1,
				isLabAssistantRoute: false,
				component: (props) => (<div></div>),
				props: { active: true },
			},
			displayBlocks: browserStorage.displayBlocks,
			headerBorder: false,
			editorStyle: false,
			lost: false,
			events: [
				{start: 1, end: 2, type: `Skip`},
				{start: 1, end: 2, type: `Mute`},
				{start: 1, end: 2, type: `Pause`},
				{start: 1, end: 2, type: `Comment`},
				{start: 1, end: 2, type: `Blank`},
				{start: 1, end: 2, type: `Censor`},
				{start: 1, end: 2, type: `Error`},
			],
			tip: {
				active: true,
				props: {
					name: `help`,
					position: {
						width: 20,
						x: 136,
						y: 108,
					},
				},
			},
			languageCodes: {
				german: `de`,
				russian: `ru`,
				spanish: `es`,
			},
			jsonResponse: {
				json: [
					{
						meanings: [
							{
								meaning: ` meaning `,
								lemma: `lemma`,
							},
						],
					},
				],
			},
			breadcrumbs: {	path: [`Home`, `Manage Collections`, `Video Editor`],
				collectionId: `collectionId`,
				contentId: `contentId`},
		},
		collectionStore: {
			roles,
			cache: collections,
			users: [],
			courses: [],
			newCollectionId: `b3a29aff-235e-4261-9b08-7b32023afc9e`,
		},
		contentStore:{
			cache: {
				"0": {
					authKey: `5377628e855d31ad4d84a8fdedf5758b`,
					clips: ``,
					collectionId: `f20a6546-1960-4271-a315-b022177458c0`,
					contentType: `video`,
					dateValidated: ``,
					description: `test`,
					expired: false,
					fullVideo: false,
					id: `0`,
					isCopyrighted: false,
					name: `testname`,
					physicalCopyExists: false,
					published: true,
					requester: ``,
					resource: {keywords: ``},
					resourceId: `00000000-0000-0000-0000-000000000000`,
					settings: {},
					thumbnail: `https://i.ytimg.com/vi/HK7SPnGSxLM/default.jpg`,
					url: ``,
					views: 0,
				},
			},
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
		subtitlesStore:{
			cache: [
				{
					content: [
						{
							start: 0,
							end: 200,
							text: `First Line`,
						},
					],
					[`content-id`]: `0`,
					id: `1`,
					language: `english`,
					title: `title`,
					words: `b, a, c`,
				},
				{
					content: ``,
					[`content-id`]: `1`,
					id: `1`,
					language: `spanish`,
					title: `title1`,
					words: `a, d, c`,
				},
			],
			loading: false,
			lastFetched: 0,
			active: 0,
			contentId : 12,
		},
	},
	composeWithDevTools(thunk.withExtraArgument(proxies)),
)

export const store2 = mockStore(
	{
		resourceStore: {},
		authStore: {
			user,
		},
		adminStore: {
			data: [],
			professor: professor1,
		},
		interfaceStore: {
			languageCodes: {},
			modal: {
				component: (props) => (<div></div>),
				props: { active: false },
			},
			breadcrumbs: {	path: [`Home`, `Feedback`, `Lab Assistant Manager`, `Admin Dashboard`, `Lab assistant Dashboard`, `Manage Resource`, `Manage Public Collections`, `Player`, `Subtitle Editor`, `Clip Manager`, `Manage Collections`],
				collectionId: `collectionId`,
				contentId: `contentId`},
		},
		collectionStore: {
			roles,
			cache: [],
			users: [],
			courses: [],
		},
		contentStore:{
			cache: {
				"0": {
					authKey: `5377628e855d31ad4d84a8fdedf5758b`,
					clips: ``,
					collectionId: `f20a6546-1960-4271-a315-b022177458c0`,
					contentType: `video`,
					dateValidated: ``,
					description: `test`,
					expired: false,
					fullVideo: false,
					isCopyrighted: false,
					name: `testname`,
					physicalCopyExists: false,
					published: true,
					requester: ``,
					resource: {keywords: ``},
					resourceId: `00000000-0000-0000-0000-000000000000`,
					settings: {},
					thumbnail: `https://i.ytimg.com/vi/HK7SPnGSxLM/default.jpg`,
					url: `https://www.youtube.com/watch?v=HK7SPnGSxLM`,
					views: 0,
				},
			},
		},
		fileStore:{
			cache: {},
		},
		languageStore:{
			cache: {},
		},
		subtitlesStore:{
			cache: [
				{
					words: ``,
				},
			],
			active: 10,
		},
	},
	composeWithDevTools(thunk.withExtraArgument(proxies)),
)

describe(`test util`, () => {
	it(`test util ready to use`, ()=> {})
})