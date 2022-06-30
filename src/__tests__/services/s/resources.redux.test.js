import * as testutil from '../../testutil/testutil'
import ResourceService from '../../../services/s/resources.redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import proxies from 'proxy'
import ResourceObject from '../../../models/ResourceObject'

const resource = testutil.resource

const resource2 = testutil.resource2

const resources = testutil.resources

const resources2 = testutil.resources2

const file1 = testutil.file1

const file1mod = testutil.file1mod

const file2 = testutil.file2

describe(`content service test`, () => {

	let resourcesServiceConstructor
	let store
	let dispatch
	let getState
	let apiProxy

	// reset store
	beforeEach(() => {
		resourcesServiceConstructor = new ResourceService()

		// TODO: good to fix: when getState().adminStore is used, this mock store has to have adminStore object,
		// is there any way to combine these duplicated stores?
		store = createStore(
			resourcesServiceConstructor.reducer,
			{
				cache: {},
				loading: false,
				lastFetched: 0,
				resourceStore: {
					cache: {
						"resourceId2" : resource2,
						loading: false,
						lastFetched: 0},
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

	proxies.apiProxy.resources.get = jest.fn()
	proxies.apiProxy.resources.search = jest.fn()
	proxies.apiProxy.resources.edit = jest.fn()
	proxies.apiProxy.resources.get = jest.fn()
	proxies.apiProxy.resources.post = jest.fn()
	proxies.apiProxy.resources.delete = jest.fn()
	proxies.apiProxy.resources.files = jest.fn()
	proxies.apiProxy.media.getKey = jest.fn()

	// types
	it(`should return correct types`, ()=> {
		const types = resourcesServiceConstructor.types

		expect(types.RESOURCE_START).toBe(`RESOURCE_START`)
		expect(types.RESOURCE_ABORT).toBe(`RESOURCE_ABORT`)
		expect(types.RESOURCE_CLEAN).toBe(`RESOURCE_CLEAN`)
		expect(types.RESOURCE_ERROR).toBe(`RESOURCE_ERROR`)
		expect(types.RESOURCE_GET).toBe(`RESOURCE_GET`)
	})

	// reducers and actions
	it(`resourcesStart`, () => {
		expect(store.getState().loading).toBe(false)
		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesStart())
		expect(store.getState().loading).toBe(true)
		expect(result.type).toBe(`RESOURCE_START`)
	})

	it(`resourcesAbort`, () => {
		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesAbort())
		expect(store.getState().loading).toBe(false)
		expect(result.type).toBe(`RESOURCE_ABORT`)
	})

	it(`resourcesClean`, () => {
		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesClean())
		expect(store.getState().cache).toEqual({})
		expect(result.type).toBe(`RESOURCE_CLEAN`)
	})

	it(`resourcesError`, () => {
		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesError(`RESOURCE_ERROR test error message`))
		expect(result.payload.error).toBe(`RESOURCE_ERROR test error message`)
		expect(result.type).toBe(`RESOURCE_ERROR`)
	})

	it(`resourcesGet`, () => {
		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesGet(resource))
		expect(store.getState().cache).toEqual({'resourceId': resource})
		expect(result.type).toBe(`RESOURCE_GET`)
	})

	it(`resourcesAdd`, () => {
		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesAdd(resource))
		expect(store.getState().cache).toEqual({'resourceId': resource})
		expect(result.type).toBe(`RESOURCE_ADD`)
	})

	it(`resourcesFiles`, () => {
		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesFiles(`resourceId`))
		expect(result.type).toBe(`RESOURCE_FILES`)
	})

	// TODO: need to fix later when it is actually using
	it(`resourcesFileDelete`, () => {
		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesFileDelete(`resourceId`, `fileId`))
		expect(result.type).toBe(`RESOURCE_FILE_DELETE`)
	})

	it(`resourcesFilesEdit`, () => {
		// resource add before edit file
		store.dispatch(resourcesServiceConstructor.actions.resourcesAdd(resource))

		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesFilesEdit(`resourceId`, [file1]))
		expect(result.type).toBe(`RESOURCE_FILES_EDIT`)
		expect(store.getState().cache[`resourceId`].files).toEqual([file1])
	})

	it(`resourceSearch`, () => {
		// resource add before edit resource
		store.dispatch(resourcesServiceConstructor.actions.resourcesAdd(resource))

		expect(store.getState().cache).toEqual({'resourceId': resource})
		const result = store.dispatch(resourcesServiceConstructor.actions.resourceSearch(resource2))
		expect(result.type).toBe(`RESOURCE_SEARCH`)
		expect(store.getState().cache).toEqual(resource2)
	})

	it(`resourceEdit`, () => {
		// resource add before edit resource
		store.dispatch(resourcesServiceConstructor.actions.resourcesAdd(resource))

		expect(store.getState().cache).toEqual({'resourceId': resource})
		const result = store.dispatch(resourcesServiceConstructor.actions.resourceEdit(resource2))
		expect(result.type).toBe(`RESOURCE_EDIT`)
		expect(store.getState().cache).toEqual({
			'resourceId': resource,
			'resourceId2': resource2,
		})
	})

	it(`resourceDelete`, () => {
		// resource add before delete resource
		store.dispatch(resourcesServiceConstructor.actions.resourcesAdd(resource))
		store.dispatch(resourcesServiceConstructor.actions.resourcesAdd(resource2))
		expect(store.getState().cache).toEqual({
			'resourceId': resource,
			'resourceId2': resource2,
		})

		// resource is filtered one, not deleted one
		const result = store.dispatch(resourcesServiceConstructor.actions.resourceDelete(resource))
		expect(result.type).toBe(`RESOURCE_DELETE`)
		expect(store.getState().cache).toEqual(resource)
	})

	it(`resourceStream`, () => {
		// resource add before getting resourceStream
		store.dispatch(resourcesServiceConstructor.actions.resourcesAdd(resource))
		expect(store.getState().cache).toEqual({'resourceId': resource})

		// resource is filtered one, not deleted one
		const result = store.dispatch(resourcesServiceConstructor.actions.resourceStream(`resourceId`, `file-version`))
		expect(result.type).toBe(`RESOURCE_STREAM`)
	})

	// thunk
	// TODO: check this later
	it(`getResources`, async() => {
		proxies.apiProxy.resources.get.mockImplementationOnce(()=>{
			return Promise.resolve(
				{
					data: {
						resource: {
							resource,
							resources: {
								resources,
							},
							relations: [
								{
									type: `resourceId`,
								},
							],
						},
					},
				},
			)
		})

		expect(store.getState().cache).toEqual({})
		await resourcesServiceConstructor.getResources(`resourceId`, true)(dispatch, getState, { apiProxy })
		expect(store.getState().cache).not.toEqual({})
	})

	it(`search`, async() => {
		proxies.apiProxy.resources.search.mockImplementationOnce(()=>{
			return Promise.resolve(resources2)
		})

		expect(store.getState().cache).toEqual({})
		await resourcesServiceConstructor.search(`resourceId2`, true)(dispatch, getState, { apiProxy })
		expect(store.getState().cache).toEqual({[resource2.id]: new ResourceObject(resource2)})
	})

	it(`editResource`, async() => {
		proxies.apiProxy.resources.edit.mockImplementationOnce(()=>{
			return Promise.resolve(resources2)
		})

		expect(store.getState().cache).toEqual({})
		await resourcesServiceConstructor.editResource(resource2, true)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[`resourceId2`]).toEqual(resource2)
	})

	it(`updateFileVersion`, async() => {
		proxies.apiProxy.resources.edit.mockImplementationOnce(()=>{
			return Promise.resolve(resources2)
		})

		await resourcesServiceConstructor.editResource(resource2, true)(dispatch, getState, { apiProxy })

		expect(store.getState().cache[`resourceId2`].files.length).toEqual(1)
		await resourcesServiceConstructor.updateFileVersion(resource2, [file1, file2])(dispatch, getState, { apiProxy })
		expect(store.getState().cache[`resourceId2`].files.length).toEqual(2)
	})

	it(`editFile`, async() => {
		proxies.apiProxy.resources.get.mockImplementationOnce(()=>{
			return Promise.resolve(resource2)
		})

		await resourcesServiceConstructor.getResource(`resourceId2`, true)(dispatch, getState, { apiProxy })

		// it is actually stored in getState().resourceStore.cache[resourceId].files
		await resourcesServiceConstructor.editFile(`resourceId2`, file1mod)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[`resourceId2`].files[1][`file-version`]).toEqual(`test version mod`)
	})

	it(`getResource`, async() => {
		proxies.apiProxy.resources.get.mockImplementationOnce(()=>{
			return Promise.resolve(resource2)
		})

		expect(store.getState().cache).toEqual({})
		await resourcesServiceConstructor.getResource(`resourceId2`, true)(dispatch, getState, { apiProxy })
		expect(store.getState().cache).toEqual({[`resourceId2`] : resource2})
	})

	it(`addResource`, async() => {
		proxies.apiProxy.resources.post.mockImplementationOnce(()=>{
			return Promise.resolve(resource2)
		})

		expect(store.getState().cache).toEqual({})
		await resourcesServiceConstructor.addResource(resource2, resource2)(dispatch, getState, { apiProxy })
		expect(store.getState().cache).toEqual({[`resourceId2`] : resource2})
	})

	// TODO: need to check this again. Files length need to be changed 1 to 2.
	it(`getFiles`, async() => {
		proxies.apiProxy.resources.post.mockImplementationOnce(()=>{
			return Promise.resolve(resource2)
		})

		proxies.apiProxy.resources.files.mockImplementationOnce(()=>{
			return Promise.resolve([file1, file2])
		})

		await resourcesServiceConstructor.addResource(resource2, resource2)(dispatch, getState, { apiProxy })

		await resourcesServiceConstructor.getFiles(`resourceId2`)(dispatch, getState, { apiProxy })
		expect(store.getState().cache).toEqual({[`resourceId2`] : resource2})
	})

	it(`removeResource`, async() => {
		proxies.apiProxy.resources.post.mockImplementationOnce(()=>{
			return Promise.resolve(resource2)
		})

		proxies.apiProxy.resources.delete.mockImplementationOnce(()=>{
			return Promise.resolve(resource2)
		})
		await resourcesServiceConstructor.addResource(resource2, resource2)(dispatch, getState, { apiProxy })
		expect(store.getState().cache).toEqual({[`resourceId2`] : resource2})

		await resourcesServiceConstructor.removeResource(`resourceId2`)(dispatch, getState, { apiProxy })
		expect(store.getState().cache).toEqual(
			{
				"lastFetched": 0,
				"loading": false,
			})
	})

	it(`getStreamKey`, async() => {
		proxies.apiProxy.resources.files.mockImplementationOnce(()=>{
			return Promise.resolve([file1, file2])
		})

		proxies.apiProxy.media.getKey.mockImplementationOnce(()=>{
			return Promise.resolve({
				"file-key" : `stream key`,
			})
		})

		expect(store.getState().streamKey).toEqual(undefined)
		await resourcesServiceConstructor.getStreamKey(`resourceId2`, `test version`)(dispatch, getState, { apiProxy })
		expect(store.getState().streamKey).toEqual(`stream key`)
	})
})