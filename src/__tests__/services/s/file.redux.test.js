import * as testutil from '../../testutil/testutil'
import FileService from '../../../services/s/file.redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import proxies from 'proxy'

const file1 = testutil.file1

describe(`file service test`, () => {

	let fileServiceConstructor
	let store
	let dispatch
	let getState
	let apiProxy

	// reset store
	beforeEach(() => {
		fileServiceConstructor = new FileService()

		store = createStore(
			fileServiceConstructor.reducer,
			{
				data: {},
				cache: {},
				fileStore: {
					data: {},
					cache: {},
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
		const types = fileServiceConstructor.types

		expect(types.FILE_START).toBe(`FILE_START`)
		expect(types.FILE_ABORT).toBe(`FILE_ABORT`)
		expect(types.FILE_CLEAN).toBe(`FILE_CLEAN`)
		expect(types.FILE_ERROR).toBe(`FILE_ERROR`)
		expect(types.FILE_UPLOAD).toBe(`FILE_UPLOAD`)
		expect(types.FILE_UPDATE).toBe(`FILE_UPDATE`)
	})

	// reducers and actions
	it(`fileStart`, () => {
		const result = store.dispatch(fileServiceConstructor.actions.fileStart())
		expect(result.type).toBe(`FILE_START`)
	})

	it(`fileAbort`, () => {
		const result = store.dispatch(fileServiceConstructor.actions.fileAbort())
		expect(result.type).toBe(`FILE_ABORT`)
	})

	it(`fileClean`, () => {
		const result = store.dispatch(fileServiceConstructor.actions.fileClean())
		expect(result.type).toBe(`FILE_CLEAN`)
	})

	it(`fileError`, () => {

		console.error = jest.fn() // eslint-disable-line no-console
		const result = store.dispatch(fileServiceConstructor.actions.fileError(`test error message`))
		expect(result.type).toBe(`FILE_ERROR`)

		expect(console.error).toBeCalled() // eslint-disable-line no-console
		expect(result.payload.error).toBe(`test error message`)
	})

	it(`fileUpload`, () => {
		const result = store.dispatch(fileServiceConstructor.actions.fileUpload(file1))
		expect(result.type).toBe(`FILE_UPLOAD`)
	})

	it(`fileUpdate`, () => {
		const result = store.dispatch(fileServiceConstructor.actions.fileUpdate(file1))
		expect(result.type).toBe(`FILE_UPDATE`)
	})

	// thunk
	it(`upload`, async() => {

		proxies.apiProxy.file.post = jest.fn()
		proxies.apiProxy.file.post.mockImplementationOnce(() => {
			return Promise.resolve(file1)
		})

		expect(store.getState().cache).toEqual({})
		await fileServiceConstructor.upload(file1)(dispatch, getState, { apiProxy })
		expect(store.getState().cache).toEqual({[file1.id]: file1.id})
	})

	it(`delete`, async() => {

		proxies.apiProxy.file.post = jest.fn()
		proxies.apiProxy.file.post.mockImplementationOnce(() => {
			return Promise.resolve(file1)
		})

		proxies.apiProxy.file.delete = jest.fn()
		proxies.apiProxy.file.delete.mockImplementationOnce(() => {
			return Promise.resolve(file1)
		})

		// insert file before deleting
		await fileServiceConstructor.upload(file1)(dispatch, getState, { apiProxy })

		// delete file by id
		// TODO: check again, because it updates database and re-render and updates store from other thunk
		await fileServiceConstructor.delete(file1.id)(dispatch, getState, { apiProxy })
	})

	it(`update`, async() => {

		proxies.apiProxy.file.post = jest.fn()
		proxies.apiProxy.file.post.mockImplementationOnce(() => {
			return Promise.resolve(file1)
		})

		proxies.apiProxy.file.patch = jest.fn()
		proxies.apiProxy.file.patch.mockImplementationOnce(() => {
			return Promise.resolve(file1)
		})

		// insert file before updating
		await fileServiceConstructor.upload(file1)(dispatch, getState, { apiProxy })

		expect(store.getState().cache).toEqual({[file1.id]: file1.id})
		file1[`file-version`] = `file version updated`
		await fileServiceConstructor.update(file1.id, file1)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[file1.id][`file-version`]).toEqual(`file version updated`)
	})

})