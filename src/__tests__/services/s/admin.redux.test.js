import * as testutil from '../../testutil/testutil'
import AdminService from '../../../services/s/admin.redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import proxies from 'proxy'
import User from '../../../models/User'
import Content from 'models/Content'

const content = testutil.content
const collection = testutil.collection

const searchResults = [
	{
		email: `test@test.com`,
		id: 22,
		"last-login": `2020-05-29T20:45:58.551Z`,
		"account-name": `testname`,
		linked: -1,
		"account-type": [`admin`],
		username: `testusername`,
		published: false,
		archived: false,
	},
]

describe(`content service test`, () => {

	let adminServiceConstructor
	let store
	let dispatch
	let getState
	let apiProxy

	// reset store
	beforeEach(() => {
		adminServiceConstructor = new AdminService()

		// TODO: good to fix: when getState().adminStore is used, this mock store has to have adminStore object,
		// is there any way to combine these duplicated stores?
		store = createStore(
			adminServiceConstructor.reducer,
			{
				data: null,
				cache: {},
				professors: [],
				professor: {},
				professorCollections: null,
				profCollectionContent: null,
				loading: false,
				lastFetched: 0,
				lastFetchedProfContent: 0,
				lastFetchedProfessors: 0,
				lastFetchedCollections: 0,
				adminStore: {
					data: [searchResults[0]],
					cache: {},
					professors: [],
					professor: {},
					professorCollections: {
						22: searchResults[0],
					},
					profCollectionContent: null,
					loading: false,
					lastFetched: 0,
					lastFetchedProfContent: 0,
					lastFetchedProfessors: 0,
					lastFetchedCollections: 0,
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
		const types = adminServiceConstructor.types

		expect(types.ADMIN_START).toBe(`ADMIN_START`)
		expect(types.ADMIN_ABORT).toBe(`ADMIN_ABORT`)
		expect(types.ADMIN_CLEAN).toBe(`ADMIN_CLEAN`)
		expect(types.ADMIN_CREATE_COLLECTION).toBe(`ADMIN_CREATE_COLLECTION`)
		expect(types.ADMIN_CREATE_CONTENT).toBe(`ADMIN_CREATE_CONTENT`)
		expect(types.ADMIN_ERROR).toBe(`ADMIN_ERROR`)
		expect(types.ADMIN_GET_COLLECTION_CONTENT).toBe(`ADMIN_GET_COLLECTION_CONTENT`)
		expect(types.ADMIN_SEARCH).toBe(`ADMIN_SEARCH`)
		expect(types.ADMIN_SEARCH_PROFESSORS).toBe(`ADMIN_SEARCH_PROFESSORS`)
		expect(types.ADMIN_SET_PROFESSOR).toBe(`ADMIN_SET_PROFESSOR`)
		expect(types.ADMIN_SEARCH_COLLECTIONS).toBe(`ADMIN_SEARCH_COLLECTIONS`)
	})

	// reducers and actions
	it(`adminStart`, () => {
		const result = store.dispatch(adminServiceConstructor.actions.adminStart())
		expect(store.getState().loading).toBe(true)
		expect(result.type).toBe(`ADMIN_START`)
	})

	it(`adminAbort`, () => {
		const result = store.dispatch(adminServiceConstructor.actions.adminAbort())
		expect(store.getState().loading).toBe(false)
		expect(store.getState().data).toBe(null)
		expect(result.type).toBe(`ADMIN_ABORT`)
	})

	it(`adminClean`, () => {
		// use toBe for primitive, use toEqual for other things
		const result = store.dispatch(adminServiceConstructor.actions.adminClean())
		expect(store.getState().data).toBe(null)
		expect(store.getState().cache).toEqual({})
		expect(result.type).toBe(`ADMIN_CLEAN`)
	})

	it(`adminCreateCollection`, () => {
		const result = store.dispatch(adminServiceConstructor.actions.adminCreateCollection())
		expect(store.getState().professorCollections).toBe(null)
		expect(store.getState().profCollectionContent).toBe(null)
		expect(store.getState().loading).toBe(false)
		expect(store.getState().professor).toEqual({})
		expect(result.type).toBe(`ADMIN_CREATE_COLLECTION`)
	})

	it(`adminCreateContent`, () => {
		// check null object before create content
		expect(store.getState().profCollectionContent).toBe(null)

		const result = store.dispatch(adminServiceConstructor.actions.adminCreateContent(content))
		expect(store.getState().loading).toBe(false)
		expect(result.type).toBe(`ADMIN_CREATE_CONTENT`)
		expect(Object.keys(store.getState().profCollectionContent).length).toBe(1)
	})

	it(`adminError`, () => {
		const result = store.dispatch(adminServiceConstructor.actions.adminError(`ADMIN_ERROR test error message`))
		expect(store.getState().data).toBe(null)
		expect(store.getState().loading).toEqual(false)
		expect(result.type).toBe(`ADMIN_ERROR`)
		expect(result.payload.error).toBe(`ADMIN_ERROR test error message`)
	})

	it(`adminGetCollectionContent`, () => {
		// check null object before create content
		expect(store.getState().profCollectionContent).toBe(null)

		const result = store.dispatch(adminServiceConstructor.actions.adminGetCollectionContent(content))
		expect(result.type).toBe(`ADMIN_GET_COLLECTION_CONTENT`)
		expect(Object.keys(store.getState().profCollectionContent).length).toBe(2)
	})

	it(`adminSearch`, () => {
		// check empty and null before updating store
		expect(store.getState().data).toEqual(null)
		expect(store.getState().cache).toEqual({})

		// updating store
		const result = store.dispatch(adminServiceConstructor.actions.adminSearch(searchResults))
		expect(store.getState().data).toEqual(searchResults)
		expect(store.getState().cache[0]).toEqual(searchResults[0])
		expect(result.type).toBe(`ADMIN_SEARCH`)
	})

	it(`adminSearchProfessors`, () => {
		// check empty and null before updating store
		expect(store.getState().professors).toEqual([])

		// updating store
		const result = store.dispatch(adminServiceConstructor.actions.adminSearchProfessors(searchResults))
		expect(store.getState().professors).toEqual(searchResults)
		expect(result.type).toBe(`ADMIN_SEARCH_PROFESSORS`)
	})

	it(`adminSetProfessor`, () => {
		// check empty and null before updating store
		expect(store.getState().professor).toEqual({})

		// updating store
		const result = store.dispatch(adminServiceConstructor.actions.adminSetProfessor(searchResults[0]))
		expect(store.getState().professor).toEqual(searchResults[0])
		expect(store.getState().loading).toBe(false)
		expect(result.type).toBe(`ADMIN_SET_PROFESSOR`)
	})

	it(`adminSearchCollections`, () => {
		// check empty and null before updating store
		expect(store.getState().professorCollections).toEqual(null)

		// updating store
		const result = store.dispatch(adminServiceConstructor.actions.adminSearchCollections(searchResults[0]))
		expect(store.getState().professorCollections).toEqual(searchResults[0])
		expect(store.getState().loading).toBe(false)
		expect(result.type).toBe(`ADMIN_SEARCH_COLLECTIONS`)
	})

	it(`adminCollectionEdit`, () => {
		// check empty and null before updating store
		expect(store.getState().professorCollections).toEqual(null)

		// updating store
		const result = store.dispatch(adminServiceConstructor.actions.adminCollectionEdit(searchResults[0]))
		expect(store.getState().professorCollections).toEqual({22: searchResults[0]})
		expect(store.getState().loading).toBe(false)
		expect(result.type).toBe(`ADMIN_COLLECTION_EDIT`)
	})

	// thunk
	// TODO: need to figure out how to check actions to be called
	it(`search`, async() => {
		proxies.apiProxy.admin.search.get = jest.fn()
		proxies.apiProxy.admin.search.get.mockImplementationOnce(() => {
			return Promise.resolve(searchResults)
		})

		expect(store.getState().data).toEqual(null)
		expect(store.getState().cache).toEqual({})
		// TODO: need to write other cases for collection and content
		// user
		await adminServiceConstructor.search(`user`, `testusername`, true)(dispatch, getState, { apiProxy })
		const expected = new User(searchResults[0])
		expect(store.getState().data).toEqual([expected])
		expect(store.getState().cache).toEqual({0: expected})
		// collection
		// content

		// default
		await adminServiceConstructor.search(`error`, `testusername`, true)(dispatch, getState, { apiProxy })
		await adminServiceConstructor.search(`user`, `testusername`, false)(dispatch, getState, { apiProxy })
	})

	it(`search: catch error`, async() => {
		console.error = jest.fn() // eslint-disable-line no-console
		proxies.apiProxy.admin.search.get = jest.fn()
		proxies.apiProxy.admin.search.get.mockImplementationOnce(() => {
			return Promise.reject(`error`)
		})
		await adminServiceConstructor.search(`user`, `testusername`, true)(dispatch, getState, { apiProxy })
		expect(console.error).toHaveBeenCalledWith(`error`) // eslint-disable-line no-console
	})

	it(`searchPublicCollection`, async() => {
		proxies.apiProxy.admin.search.public.collection.get = jest.fn()
		proxies.apiProxy.admin.search.public.collection.get.mockImplementationOnce(() => {
			return Promise.resolve([collection])
		})
		const result = {}
		const contentResult = []
		if(collection.content){
			collection.content.forEach((item) => {
				contentResult.push(new Content(item))
			})
		}
		collection.content = contentResult
		result[collection.id]= collection

		expect(store.getState().professors).toEqual([])
		await adminServiceConstructor.searchPublicCollection(`testusername`, true)(dispatch, getState, { apiProxy })
		expect(store.getState().publicCollections).toEqual(result)
		await adminServiceConstructor.searchProfessors(`testusername`, false)(dispatch, getState, { apiProxy })
	})

	it(`searchPublicCollection: catch error`, async() => {
		console.error = jest.fn() // eslint-disable-line no-console
		proxies.apiProxy.admin.search.public.collection.get = jest.fn()
		proxies.apiProxy.admin.search.public.collection.get.mockImplementationOnce(() => {
			return Promise.reject(`error`)
		})
		await adminServiceConstructor.searchPublicCollection(`testusername`, true)(dispatch, getState, { apiProxy })
		expect(console.error).toHaveBeenCalledWith(`error`) // eslint-disable-line no-console
		await adminServiceConstructor.searchPublicCollection(`testusername`, false)(dispatch, getState, { apiProxy })
	})

	it(`searchProfessors`, async() => {

		proxies.apiProxy.admin.search.get = jest.fn()
		proxies.apiProxy.admin.search.get.mockImplementationOnce(() => {
			return Promise.resolve(searchResults)
		})

		expect(store.getState().professors).toEqual([])
		expect(store.getState().professor).toEqual({})
		await adminServiceConstructor.searchProfessors(`testusername`, true)(dispatch, getState, { apiProxy })
		expect(store.getState().professors).toEqual([new User(searchResults[0])])
		await adminServiceConstructor.searchProfessors(`testusername`, false)(dispatch, getState, { apiProxy })
	})

	it(`searchProfessors: catch error`, async() => {
		console.error = jest.fn() // eslint-disable-line no-console
		proxies.apiProxy.admin.search.get = jest.fn()
		proxies.apiProxy.admin.search.get.mockImplementationOnce(() => {
			return Promise.reject(`error`)
		})
		await adminServiceConstructor.searchProfessors(`testusername`, true)(dispatch, getState, { apiProxy })
		expect(console.error).toHaveBeenCalledWith(`error`) // eslint-disable-line no-console
	})

	it(`setProfessor`, async() => {

		proxies.apiProxy.admin.user.get = jest.fn()
		proxies.apiProxy.admin.user.get.mockImplementationOnce(() => {
			return Promise.resolve(searchResults[0])
		})

		expect(store.getState().professor).toEqual({})
		await adminServiceConstructor.setProfessor(22, true)(dispatch, getState, { apiProxy })
		expect(store.getState().professor).toEqual(new User(searchResults[0]))
	})

	it(`setProfessor: catch error`, async() => {
		console.error = jest.fn() // eslint-disable-line no-console
		proxies.apiProxy.admin.user.get = jest.fn()
		proxies.apiProxy.admin.user.get.mockImplementationOnce(() => {
			return Promise.reject(`error`)
		})
		await adminServiceConstructor.setProfessor(22, true)(dispatch, getState, { apiProxy })
		expect(console.error).toHaveBeenCalledWith(`error`) // eslint-disable-line no-console
	})

	it(`getCollectionContent`, async() => {

		proxies.apiProxy.admin.collection.content.get = jest.fn()
		proxies.apiProxy.admin.collection.content.get.mockImplementationOnce(() => {
			return Promise.resolve({content})
		})

		expect(store.getState().profCollectionContent).toEqual(null)
		await adminServiceConstructor.getCollectionContent(0, true)(dispatch, getState, { apiProxy })
		expect(store.getState().profCollectionContent).toEqual({content})
		await adminServiceConstructor.getCollectionContent(0, false)(dispatch, getState, { apiProxy })

	})

	it(`getCollectionContent: catch error`, async() => {
		console.error = jest.fn() // eslint-disable-line no-console
		proxies.apiProxy.admin.collection.content.get = jest.fn()
		proxies.apiProxy.admin.collection.content.get.mockImplementationOnce(() => {
			return Promise.reject(`error`)
		})
		await adminServiceConstructor.getCollectionContent(0, true)(dispatch, getState, { apiProxy })
		expect(console.error).toHaveBeenCalledWith(`error`) // eslint-disable-line no-console
	})

	it(`createContent`, async() => {
		proxies.apiProxy.content.post = jest.fn()
		proxies.apiProxy.content.post.mockImplementationOnce(() => {
			return Promise.resolve({
				status: 200,
			})
		})
		await adminServiceConstructor.createContent(`content`)(dispatch, getState, { apiProxy })
	})

	it(`createContent: catch error`, async() => {
		console.error = jest.fn() // eslint-disable-line no-console
		proxies.apiProxy.content.post = jest.fn()
		proxies.apiProxy.content.post.mockImplementationOnce(() => {
			return Promise.reject(`error`)
		})
		await adminServiceConstructor.createContent(`content`)(dispatch, getState, { apiProxy })
		expect(console.error).toHaveBeenCalledWith(`error`) // eslint-disable-line no-console
	})

	it(`createContentFromResource`, async() => {

		proxies.apiProxy.admin.collection.content.createFromResource = jest.fn()
		proxies.apiProxy.admin.collection.content.createFromResource.mockImplementationOnce(() => {
			return Promise.resolve({
				data: testutil.content[0],
			})
		})

		await adminServiceConstructor.createContentFromResource(0, 0)(dispatch, getState, { apiProxy })
	})

	it(`createContentFromResource: catch error`, async() => {
		console.error = jest.fn() // eslint-disable-line no-console
		proxies.apiProxy.admin.collection.content.createFromResource = jest.fn()
		proxies.apiProxy.admin.collection.content.createFromResource.mockImplementationOnce(() => {
			return Promise.reject(`error`)
		})

		await adminServiceConstructor.createContentFromResource(0, 0)(dispatch, getState, { apiProxy })
		expect(console.error).toHaveBeenCalledWith(`error`) // eslint-disable-line no-console
	})

	it(`searchCollections`, async() => {
		proxies.apiProxy.admin.collection.get = jest.fn()
		proxies.apiProxy.admin.collection.get.mockImplementationOnce(() => {
			return Promise.resolve({data: searchResults})
		})

		expect(store.getState().professorCollections).toEqual(null)
		await adminServiceConstructor.searchCollections(`testusername`, true)(dispatch, getState, { apiProxy })
		// console.log(store.getState())
		expect(store.getState().professorCollections).toEqual({22: searchResults[0]})

		// when force = false
		await adminServiceConstructor.searchCollections(`testusername`, false)(dispatch, getState, { apiProxy })
	})

	it(`searchCollections: catch error`, async() => {
		console.error = jest.fn() // eslint-disable-line no-console
		proxies.apiProxy.admin.collection.get = jest.fn()
		proxies.apiProxy.admin.collection.get.mockImplementationOnce(() => {
			return Promise.reject(`error`)
		})

		await adminServiceConstructor.searchCollections(`testusername`, true)(dispatch, getState, { apiProxy })
		expect(console.error).toHaveBeenCalledWith(`error`) // eslint-disable-line no-console
	})

	it(`updateCollectionStatus`, async() => {

		proxies.apiProxy.collection.edit = jest.fn()
		proxies.apiProxy.collection.edit.mockImplementationOnce(() => {
			return Promise.resolve({
				status: 200,
			})
		})

		// publish
		await adminServiceConstructor.updateCollectionStatus(22, `publish`)(dispatch, getState, { apiProxy })
		expect(store.getState().adminStore.professorCollections[22].published).toBe(true)

		// unpublish
		await adminServiceConstructor.updateCollectionStatus(22, `unpublish`)(dispatch, getState, { apiProxy })
		expect(store.getState().adminStore.professorCollections[22].published).toBe(false)

		// archive
		await adminServiceConstructor.updateCollectionStatus(22, `archive`)(dispatch, getState, { apiProxy })
		expect(store.getState().adminStore.professorCollections[22].archived).toBe(true)

		// unarchive
		await adminServiceConstructor.updateCollectionStatus(22, `unarchive`)(dispatch, getState, { apiProxy })
		expect(store.getState().adminStore.professorCollections[22].archived).toBe(false)

		// default
		await adminServiceConstructor.updateCollectionStatus(22, `error`)(dispatch, getState, { apiProxy })
	})

	it(`updateCollectionStatus: catch error`, async() => {
		console.error = jest.fn() // eslint-disable-line no-console
		proxies.apiProxy.collection.edit = jest.fn()
		proxies.apiProxy.collection.edit.mockImplementationOnce(() => {
			return Promise.reject(`error`)
		})

		await adminServiceConstructor.updateCollectionStatus(22, `publish`)(dispatch, getState, { apiProxy })
		expect(console.error).toHaveBeenCalledWith(`error`) // eslint-disable-line no-console
	})

	// TODO: need to update when it's updated
	it(`deleteCollection`, async() => {

		proxies.apiProxy.admin.collection.delete = jest.fn()
		proxies.apiProxy.admin.collection.delete.mockImplementationOnce(() => {
			return Promise.resolve(searchResults[0])
		})

		await adminServiceConstructor.deleteCollection(22)(dispatch, getState, { apiProxy })
	})

	it(`deleteCollection: catch error`, async() => {
		console.error = jest.fn() // eslint-disable-line no-console
		proxies.apiProxy.admin.collection.delete = jest.fn()
		proxies.apiProxy.admin.collection.delete.mockImplementationOnce(() => {
			return Promise.reject(`error`)
		})

		await adminServiceConstructor.deleteCollection(22)(dispatch, getState, { apiProxy })
		expect(console.error).toHaveBeenCalledWith(`error`) // eslint-disable-line no-console
	})

	it(`deleteContent`, async() => {

		// get content
		proxies.apiProxy.admin.collection.content.get = jest.fn()
		proxies.apiProxy.admin.collection.content.get.mockImplementationOnce(() => {
			return Promise.resolve({content})
		})

		expect(store.getState().profCollectionContent).toEqual(null)
		await adminServiceConstructor.getCollectionContent(0, true)(dispatch, getState, { apiProxy })
		expect(store.getState().profCollectionContent).toEqual({content})
		// delete content not as an admin
		proxies.apiProxy.admin.content.delete = jest.fn()
		proxies.apiProxy.admin.content.delete.mockImplementationOnce(() => {
			return Promise.resolve(searchResults[0])
		})

		expect(store.getState().profCollectionContent).toEqual({content})
		await adminServiceConstructor.deleteContent(22)(dispatch, getState, { apiProxy })
		expect(store.getState().profCollectionContent).toEqual({})

		// delete content as an admin
		await adminServiceConstructor.getCollectionContent(0, true)(dispatch, getState, { apiProxy })
		await adminServiceConstructor.deleteContent(22, true)(dispatch, getState, { apiProxy })
	})

	it(`deleteContent: catch error`, async() => {
		console.error = jest.fn() // eslint-disable-line no-console
		// get content
		proxies.apiProxy.admin.collection.content.get = jest.fn()
		proxies.apiProxy.admin.collection.content.get.mockImplementationOnce(() => {
			return Promise.resolve({content})
		})

		await adminServiceConstructor.getCollectionContent(0, true)(dispatch, getState, { apiProxy })
		proxies.apiProxy.admin.content.delete = jest.fn()
		proxies.apiProxy.admin.content.delete.mockImplementationOnce(() => {
			return Promise.reject(`error`)
		})

		await adminServiceConstructor.deleteContent(22)(dispatch, getState, { apiProxy })
		expect(console.error).toHaveBeenCalledWith(`error`) // eslint-disable-line no-console
	})

	it(`deleteUser`, async() => {
		proxies.apiProxy.admin.search.get = jest.fn()
		proxies.apiProxy.admin.search.get.mockImplementationOnce(() => {
			return Promise.resolve(searchResults)
		})

		expect(store.getState().data).toEqual(null)
		expect(store.getState().cache).toEqual({})
		await adminServiceConstructor.search(`user`, `testusername`, true)(dispatch, getState, { apiProxy })

		const expected = new User(searchResults[0])
		expect(store.getState().data).toEqual([expected])
		expect(store.getState().cache).toEqual({0: expected})

		// proxies.apiProxy.admin.user.delete = jest.fn()
		// proxies.apiProxy.admin.user.delete.mockImplementationOnce(()=>{
		// 	return Promise.resolve(searchResults[0])
		// })
		// expect(store.getState().data).not.toEqual([])
		// await adminServiceConstructor.deleteUser(22)(dispatch, getState, { apiProxy })
		// expect(store.getState().data).toEqual([])
	})

	// it(`deleteUser: catch error`, async() => {
	// 	console.error = jest.fn()
	// 	proxies.apiProxy.admin.search.get = jest.fn()
	// 	proxies.apiProxy.admin.search.get.mockImplementationOnce(()=>{
	// 		return Promise.resolve(searchResults)
	// 	})

	// 	await adminServiceConstructor.search(`user`, `testusername`, true)(dispatch, getState, { apiProxy })

	// 	proxies.apiProxy.admin.user.delete = jest.fn()
	// 	proxies.apiProxy.admin.user.delete.mockImplementationOnce(()=>{
	// 		return Promise.reject('error')
	// 	})
	// 	await adminServiceConstructor.deleteUser(22)(dispatch, getState, { apiProxy })
	// 	expect(console.error).toHaveBeenCalledWith('error')
	// })

	it(`clean`, async() => {
		await adminServiceConstructor.clean()(dispatch, getState, { apiProxy })
	})
})