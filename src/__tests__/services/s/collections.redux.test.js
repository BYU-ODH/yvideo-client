import * as testutil from '../../testutil/testutil'
import CollectionService from '../../../services/s/collections.redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import proxies from 'proxy'

const collections = testutil.collections

const collection1 = testutil.collection1

const collection2 = testutil.collection2

const collectionChangedState = {
	0:{
		archived: false,
		content: [],
		id: 0,
		name: `Collection 1`,
		owner: 22,
		published: true,
		thumbnail: `test@thumbnail`,
	},
	1: {
		archived: false,
		content: [],
		id: 1,
		name: `Collection 1`,
		owner: 22,
		published: true,
		thumbnail: `test@thumbnail`,
	},
}

const newCollection = {
	0:{
		archived: false,
		content: [],
		id: 0,
		name: `new collection`,
		owner: 22,
		published: true,
		thumbnail: `test@thumbnail`,
	},
}

const courses = [
	{
		catalogNumber: 122,
		department: `ACC`,
		id: `course id`,
		sectionNumber:12,
	},
]

const newCourses = [
	{
		catalogNumber: 123,
		department: `ENG`,
		id: 13,
		sectionNumber:12,
	},
]

const admins = [
	{
		id:22,
		username: `testusername`,
		name:`testname`,
		email:`test@test.com`,
		linked:-1,
		roles: [`admin`],
		lastLogin:`2020-05-29T20:45:58.551Z`,
		exceptions:[
			{
				email:`test@test.com`,
				id:22,
				lastLogin:`2020-05-29T20:45:58.551Z`,
				name:`testname`,
				linked:-1,
				roles: [`admin`],
				username: `testusername`,
			},
		],
	},
]

const exceptions = [
	{
		email:`test@test.com`,
		id:22,
		lastLogin:`2020-05-29T20:45:58.551Z`,
		name:`testname`,
		linked:-1,
		roles: [`admin`],
		username: `testusername`,
	},
]

describe(`content service test`, () => {

	let collectionServiceConstructor
	let store
	let dispatch
	let getState
	let apiProxy

	// reset store
	beforeEach(() => {
		collectionServiceConstructor = new CollectionService()

		store = createStore(
			collectionServiceConstructor.reducer,
			{
				roles: {},
				cache: {},
				loading: false,
				lastFetched: 0,
				collectionStore:{
					roles: testutil.roles,
					cache: {
						0: collection1,
						1: collection2,
					},
					loading: false,
					lastFetched: 0,
				},
			},
			composeWithDevTools(
				applyMiddleware(thunk.withExtraArgument(proxies)),
			),
		)
		dispatch = store.dispatch
		getState = store.getState
		apiProxy = proxies.apiProxy
	})

	// types
	it(`should return correct types`, ()=> {
		const types = collectionServiceConstructor.types

		expect(types.COLLECTIONS_START).toBe(`COLLECTIONS_START`)
		expect(types.COLLECTIONS_ABORT).toBe(`COLLECTIONS_ABORT`)
		expect(types.COLLECTIONS_CLEAN).toBe(`COLLECTIONS_CLEAN`)
		expect(types.COLLECTIONS_ERROR).toBe(`COLLECTIONS_ERROR`)
		expect(types.COLLECTIONS_REMOVE_CONTENT).toBe(`COLLECTION_REMOVE_CONTENT`)
		expect(types.COLLECTION_CREATE).toBe(`COLLECTION_CREATE`)
		expect(types.COLLECTION_EDIT).toBe(`COLLECTION_EDIT`)
		expect(types.COLLECTION_ROLES_GET).toBe(`COLLECTION_ROLES_GET`)
		expect(types.COLLECTION_ROLES_UPDATE).toBe(`COLLECTION_ROLES_UPDATE`)
	})

	it(`should return correct role endpoint`, ()=> {
		const endpoints = collectionServiceConstructor.roleEndpoints

		expect(endpoints.addCourse).toBe(`add-course`)
		expect(endpoints.addTA).toBe(`add-user`)
		expect(endpoints.addException).toBe(`add-user`)
		expect(endpoints.removeCourse).toBe(`remove-course`)
		expect(endpoints.removeUser).toBe(`remove-user`)
	})

	// reducers and actions
	it(`collections start`, () => {
		const result = store.dispatch(collectionServiceConstructor.actions.collectionsStart())
		expect(store.getState().loading).toBe(true)
		expect(result.type).toBe(`COLLECTIONS_START`)
	})

	it(`collections abort`, () => {
		store.dispatch(collectionServiceConstructor.actions.collectionsStart())
		expect(store.getState().loading).toBe(true)

		const result = store.dispatch(collectionServiceConstructor.actions.collectionsAbort())
		expect(store.getState().loading).toBe(false)
		expect(result.type).toBe(`COLLECTIONS_ABORT`)
	})

	it(`collections clean`, () => {
		store.dispatch(collectionServiceConstructor.actions.collectionsGet(collections))
		expect(Object.keys(store.getState().cache).length).toBe(2)

		const result = store.dispatch(collectionServiceConstructor.actions.collectionsClean())
		expect(Object.keys(store.getState().cache).length).toBe(0)
		expect(result.type).toBe(`COLLECTIONS_CLEAN`)
	})

	it(`collections error`, () => {
		const result = store.dispatch(collectionServiceConstructor.actions.collectionsError(`COLLECTIONS_ERROR test error message`))
		expect(result.payload.error).toBe(`COLLECTIONS_ERROR test error message`)
		expect(result.type).toBe(`COLLECTIONS_ERROR`)
	})

	it(`collections get`, () => {
		const result = store.dispatch(collectionServiceConstructor.actions.collectionsGet(collections))
		expect(Object.keys(store.getState().cache).length).toBe(2)
		expect(result.type).toBe(`COLLECTIONS_GET`)
	})

	it(`collections remove content`, () => {
		store.dispatch(collectionServiceConstructor.actions.collectionsGet(collections))
		expect(Object.keys(store.getState().cache[0].content).length).toBe(2)

		const result = store.dispatch(collectionServiceConstructor.actions.collectionsRemoveContent(0, collectionChangedState[0]))
		expect(Object.keys(store.getState().cache[0].content).length).toBe(0)
		expect(result.type).toBe(`COLLECTION_REMOVE_CONTENT`)
	})

	// TODO: looks like this actions is not complited yet
	it(`collection create`, () => {
		const result = store.dispatch(collectionServiceConstructor.actions.collectionCreate(newCollection))
		// console.log(store.getState())
		expect(result.type).toBe(`COLLECTION_CREATE`)
	})

	it(`collections edit content`, () => {
		store.dispatch(collectionServiceConstructor.actions.collectionsGet(collections))
		expect(Object.keys(store.getState().cache[0].content).length).toBe(2)

		const result = store.dispatch(collectionServiceConstructor.actions.collectionEdit(collectionChangedState[0]))
		expect(Object.keys(store.getState().cache[0].content).length).toBe(0)
		expect(result.type).toBe(`COLLECTION_EDIT`)
	})

	it(`collections roles get`, () => {
		store.dispatch(collectionServiceConstructor.actions.collectionsGet(collections))
		expect(Object.keys(store.getState().cache[0].content).length).toBe(2)

		expect(Object.keys(store.getState().roles).length).toBe(0)
		const result = store.dispatch(collectionServiceConstructor.actions.collectionRolesGet(testutil.roles))
		expect(Object.keys(store.getState().roles).length).toBe(1)
		expect(store.getState().roles[0].courses[0].id).toBe(`course id`)
		expect(store.getState().roles[0].admins[0].username).toBe(`testusername`)
		expect(store.getState().roles[0].exceptions[0].email).toBe(`test@test.com`)
		expect(result.type).toBe(`COLLECTION_ROLES_GET`)
	})

	it(`collections roles update`, () => {
		store.dispatch(collectionServiceConstructor.actions.collectionsGet(collections))
		expect(Object.keys(store.getState().cache[0].content).length).toBe(2)

		expect(Object.keys(store.getState().roles).length).toBe(0)
		const result = store.dispatch(collectionServiceConstructor.actions.collectionRolesUpdate(testutil.roles))
		expect(Object.keys(store.getState().roles).length).toBe(1)
		expect(store.getState().roles[0].courses[0].id).toBe(`course id`)
		expect(store.getState().roles[0].admins[0].username).toBe(`testusername`)
		expect(store.getState().roles[0].exceptions[0].email).toBe(`test@test.com`)
		expect(result.type).toBe(`COLLECTION_ROLES_UPDATE`)
	})

	// thunk
	// TODO: need to figure out how to check actions to be called
	it(`getCollections`, async() => {

		proxies.apiProxy.user.collections.get = jest.fn()
		proxies.apiProxy.user.collections.get.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				collections,
			})
		})

		expect(store.getState().cache.collections).toBe(undefined)
		await collectionServiceConstructor.getCollections(true)(dispatch, getState, { apiProxy })
		expect(Object.keys(store.getState().cache.collections).length).toBe(2)
	})

	it(`removeCollectionContent`, async() => {

		proxies.apiProxy.collection.remove = jest.fn()
		proxies.apiProxy.collection.remove.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				data: {
					message: `Content removed from collection`,
				},
			})
		})

		// it has to be this way to check to see if content is removed from collection.
		// because this thunk calls contentStore instead of store
		// in this unit test, it is hard to set up contentStore and store as the identical
		expect(store.getState().collectionStore.cache[0].content.length).toBe(2)
		await collectionServiceConstructor.removeCollectionContent(0, 0)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[0].content.length).toBe(1)
	})

	// TODO: create collection thunk is not finished yet, will fix after thunk is fixed
	it(`createCollection`, async() => {

		proxies.apiProxy.collection.create = jest.fn()
		proxies.apiProxy.collection.create.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				collection1,
			})
		})
		expect(store.getState().cache.collections).toBe(undefined)
		await collectionServiceConstructor.getCollections(`Collection 1`)(dispatch, getState, { apiProxy })
	})

	it(`updateCollectionStatus`, async() => {

		proxies.apiProxy.user.collections.get = jest.fn()
		proxies.apiProxy.user.collections.get.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				collections,
			})
		})

		proxies.apiProxy.collection.edit = jest.fn()
		proxies.apiProxy.collection.edit.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
			})
		})

		// getCollections before editing
		expect(store.getState().cache.collections).toBe(undefined)
		await collectionServiceConstructor.getCollections(true)(dispatch, getState, { apiProxy })
		expect(Object.keys(store.getState().cache.collections).length).toBe(2)

		// publish
		await collectionServiceConstructor.updateCollectionStatus(0, `publish`)(dispatch, getState, { apiProxy })
		expect(store.getState().collectionStore.cache[0].published).toBe(true)

		// unpublish
		await collectionServiceConstructor.updateCollectionStatus(0, `unpublish`)(dispatch, getState, { apiProxy })
		expect(store.getState().collectionStore.cache[0].published).toBe(false)

		// archive
		expect(store.getState().collectionStore.cache[0].archived).toBe(false)
		await collectionServiceConstructor.updateCollectionStatus(0, `archive`)(dispatch, getState, { apiProxy })
		expect(store.getState().collectionStore.cache[0].archived).toBe(true)

		// unarchive
		await collectionServiceConstructor.updateCollectionStatus(0, `unarchive`)(dispatch, getState, { apiProxy })
		expect(store.getState().collectionStore.cache[0].archived).toBe(false)
	})

	it(`getCollectionRoles`, async() => {

		proxies.apiProxy.collection.permissions.get = jest.fn()
		proxies.apiProxy.collection.permissions.get.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				data: {
					courses,
					admins,
					exceptions,
				},
			})
		})

		await collectionServiceConstructor.getCollectionRoles(0, true)(dispatch, getState, { apiProxy })

		expect(Object.keys(store.getState().roles).length).toBe(1)
		expect(store.getState().roles[0].courses[0].id).toBe(`course id`)
		expect(store.getState().roles[0].admins[0].username).toBe(`testusername`)
		expect(store.getState().roles[0].exceptions[0].email).toBe(`test@test.com`)
	})

	// TODO: should fix later when thunk got fixed
	it(`updateCollectionName`, async() => {

		proxies.apiProxy.user.collections.get = jest.fn()
		proxies.apiProxy.user.collections.get.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				collections,
			})
		})

		proxies.apiProxy.collection.post = jest.fn()
		proxies.apiProxy.collection.post.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
			})
		})

		// create collection before changing name
		expect(store.getState().cache.collections).toBe(undefined)
		await collectionServiceConstructor.getCollections(true)(dispatch, getState, { apiProxy })
		expect(Object.keys(store.getState().cache.collections).length).toBe(2)

		// name changes
		expect(store.getState().cache.collections[0].name).toBe(`Collection 1`)
		await collectionServiceConstructor.updateCollectionName(0, `name changed`, true)(dispatch, getState, { apiProxy })
		// expect(store.getState().cache.collections[0].name).toBe(`name changed`)
	})

	// TODO: fix it later when update collectio roles is updated
	it(`updateCollectionRoles`, async() => {

		// types
		const linkCourses = collectionServiceConstructor.roleEndpoints.addCourse
		const unlinkCourses = collectionServiceConstructor.roleEndpoints.removeCourse
		const addTA = collectionServiceConstructor.roleEndpoints.addTA
		const addException = collectionServiceConstructor.roleEndpoints.addException
		const removeTA = collectionServiceConstructor.roleEndpoints.removeUser
		// const removeException = collectionServiceConstructor.roleEndpoints.removeException

		proxies.apiProxy.user.collections.get = jest.fn()
		proxies.apiProxy.user.collections.get.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				collections,
			})
		})

		proxies.apiProxy.collection.permissions.post = jest.fn()
		proxies.apiProxy.collection.permissions.post.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				data: newCourses,
			})
		})

		expect(store.getState().cache.collections).toBe(undefined)
		await collectionServiceConstructor.getCollections(true)(dispatch, getState, { apiProxy })
		expect(Object.keys(store.getState().cache.collections).length).toBe(2)

		// linkCourses
		expect(store.getState().collectionStore.roles[0].courses.length).toBe(1)
		const linkCoursesBody = { newCourses }
		await collectionServiceConstructor.updateCollectionRoles(0, linkCourses, linkCoursesBody)(dispatch, getState, { apiProxy })
		expect(store.getState().roles[0].courses.length).toBe(2)

		// unlinkCourses
		proxies.apiProxy.collection.permissions.post = jest.fn()
		proxies.apiProxy.collection.permissions.post.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				data: courses,
			})
		})
		const unlinkCoursesBody = newCourses
		await collectionServiceConstructor.updateCollectionRoles(0, unlinkCourses, unlinkCoursesBody)(dispatch, getState, { apiProxy })
		expect(store.getState().roles[0].courses.length).toBe(1)

		// addTA
		const addTABody = `testusername2`
		proxies.apiProxy.collection.permissions.post = jest.fn()
		proxies.apiProxy.collection.permissions.post.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				data: {
					email: `test@email.com`,
					id: 0,
					lastLogin: `2020-07-03T20:44:45.369Z`,
					linked: -1,
					name: `testname`,
					roles: [`admin`],
					username: `testusername2`,
				},
			})
		})
		expect(store.getState().roles[0].admins[1]).toBe(undefined)
		await collectionServiceConstructor.updateCollectionRoles(0, addTA, addTABody)(dispatch, getState, { apiProxy })
		expect(store.getState().roles[0].admins[1].username).toBe(`testusername2`)

		// removeTA
		proxies.apiProxy.collection.permissions.post = jest.fn()
		proxies.apiProxy.collection.permissions.post.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				data: {
					admins,
					exceptions,
				},
			})
		})
		expect(store.getState().roles[0].admins[1].username).toBe(`testusername2`)
		await collectionServiceConstructor.updateCollectionRoles(0, removeTA, addTABody)(dispatch, getState, { apiProxy })
		expect(store.getState().roles[0].admins[1]).toBe(undefined)

		// addException
		proxies.apiProxy.collection.permissions.post = jest.fn()
		proxies.apiProxy.collection.permissions.post.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				data: {
					email: `test@email.com`,
					id: 0,
					lastLogin: `2020-07-03T20:44:45.369Z`,
					linked: -1,
					name: `testname`,
					roles: [`admin`],
					username: `testusername2`,
				},
			})
		})
		expect(store.getState().roles[0].exceptions[1]).toBe(undefined)
		await collectionServiceConstructor.updateCollectionRoles(0, addException, addTABody)(dispatch, getState, { apiProxy })
		expect(store.getState().roles[0].exceptions[1].username).toBe(`testusername2`)

		// removeException
		proxies.apiProxy.collection.permissions.post = jest.fn()
		proxies.apiProxy.collection.permissions.post.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				data: {
					admins,
					exceptions,
				},
			})
		})
		// expect(store.getState().roles[0].exceptions[1].username).toBe(`testusername2`)
		// await collectionServiceConstructor.updateCollectionRoles(0, removeException, addTABody)(dispatch, getState, { apiProxy })
		// expect(store.getState().roles[0].exceptions[1]).toBe(undefined)
	})
})