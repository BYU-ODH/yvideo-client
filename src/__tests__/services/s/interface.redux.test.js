// import * as testutil from '../../testutil/testutil'
import InterfaceService from '../../../services/s/interface.redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import proxies, { browserStorage } from 'proxy'
import CreateContentContainer from '../../../components/modals/containers/CreateContentContainer'

const modal = { component: CreateContentContainer, collectionId: 0, isLabAssistantRoute: false }

describe(`content service test`, () => {

	let interfaceServiceConstructor
	let store
	let dispatch
	let getState
	let apiProxy

	// reset store
	beforeEach(() => {
		interfaceServiceConstructor = new InterfaceService()

		// TODO: good to fix: when getState().adminStore is used, this mock store has to have adminStore object,
		// is there any way to combine these duplicated stores?
		store = createStore(
			interfaceServiceConstructor.reducer,
			{
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
				error: ``,
				jsonResponse: undefined,
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
					lost: false,
					editorStyle: false,
					events: [],
					languageCodes : {
						spanish: `es`,
					},
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

	proxies.apiProxy.translation.getTranslation = jest.fn()
	proxies.apiProxy.email.postNoAttachment = jest.fn()
	proxies.apiProxy.email.postWithAttachment = jest.fn()

	// types
	it(`should return correct types`, ()=> {
		const types = interfaceServiceConstructor.types

		expect(types.MENU_TOGGLE).toBe(`MENU_TOGGLE`)
		expect(types.MODAL_TOGGLE).toBe(`MODAL_TOGGLE`)
		expect(types.COLLECTIONS_DISPLAY_TOGGLE).toBe(`COLLECTIONS_DISPLAY_TOGGLE`)
		expect(types.SET_HEADER_BORDER).toBe(`SET_HEADER_BORDER`)
		expect(types.SET_LOST).toBe(`SET_LOST`)
		expect(types.SET_HEADER_BORDER).toBe(`SET_HEADER_BORDER`)
		expect(types.SET_EDITOR_STYLE).toBe(`SET_EDITOR_STYLE`)
		expect(types.SET_EVENTS).toBe(`SET_EVENTS`)
		expect(types.GET_EVENTS).toBe(`GET_EVENTS`)
		expect(types.GET_TRANSLATION).toBe(`GET_TRANSLATION`)
		expect(types.INTERFACE_ERROR).toBe(`INTERFACE_ERROR`)
		expect(types.SENT_EMAIL).toBe(`SENT_EMAIL`)

	})

	// reducers and actions
	it(`menuToggle`, () => {
		expect(store.getState().menuActive).toBe(false)
		const result = store.dispatch(interfaceServiceConstructor.actions.menuToggle())
		expect(store.getState().menuActive).toBe(true)
		expect(result.type).toBe(`MENU_TOGGLE`)
	})

	it(`modalToggle`, () => {
		expect(store.getState().modal.component).toEqual(null)
		const result = store.dispatch(interfaceServiceConstructor.actions.modalToggle(modal))
		expect(store.getState().modal.component).toEqual(CreateContentContainer)
		expect(result.type).toBe(`MODAL_TOGGLE`)
	})

	it(`collectionsDisplayToggle`, () => {
		expect(store.getState().displayBlocks).toBe(false)
		const result = store.dispatch(interfaceServiceConstructor.actions.collectionsDisplayToggle())
		expect(store.getState().displayBlocks).toBe(true)
		expect(result.type).toBe(`COLLECTIONS_DISPLAY_TOGGLE`)
	})

	it(`setHeaderBorder`, () => {
		expect(store.getState().headerBorder).toBe(false)
		const result = store.dispatch(interfaceServiceConstructor.actions.setHeaderBorder(true))
		expect(store.getState().headerBorder).toBe(true)
		expect(result.type).toBe(`SET_HEADER_BORDER`)
	})

	it(`setLost`, () => {
		expect(store.getState().lost).toBe(false)
		const result = store.dispatch(interfaceServiceConstructor.actions.setLost(true))
		expect(store.getState().lost).toBe(true)
		expect(result.type).toBe(`SET_LOST`)
	})

	it(`setEvents`, () => {
		expect(store.getState().events).toEqual([])
		const result = store.dispatch(interfaceServiceConstructor.actions.setEvents([`event`]))
		expect(store.getState().events).toEqual([`event`])
		expect(result.type).toBe(`SET_EVENTS`)
	})

	it(`getEvents`, () => {
		expect(store.getState().events).toEqual([])
		const result = store.dispatch(interfaceServiceConstructor.actions.getEvents([`event`]))
		expect(store.getState().events).toEqual([`event`])
		expect(result.type).toBe(`GET_EVENTS`)
	})

	it(`getTranslation`, () => {
		expect(store.getState().jsonResponse).toEqual(undefined)
		const result = store.dispatch(interfaceServiceConstructor.actions.getTranslation(`text`))
		expect(store.getState().jsonResponse).toEqual(`text`)
		expect(result.type).toBe(`GET_TRANSLATION`)
	})

	it(`interfaceError`, () => {
		expect(store.getState().error).toEqual(``)
		const result = store.dispatch(interfaceServiceConstructor.actions.interfaceError(`error!`))
		expect(result.payload.error).toBe(`error!`)
		expect(result.type).toBe(`INTERFACE_ERROR`)
	})

	// thunk
	// TODO: need to figure out how to check actions to be called
	it(`toggleMenu`, async() => {
		await interfaceServiceConstructor.toggleMenu()(dispatch)
	})

	it(`toggleModal`, async() => {
		expect(store.getState().modal.component).toEqual(null)
		await interfaceServiceConstructor.toggleModal(modal)(dispatch)
		expect(store.getState().modal.component).toEqual(CreateContentContainer)
	})

	it(`toggleCollectionsDisplay`, async() => {
		expect(store.getState().displayBlocks).toBe(true)
		await interfaceServiceConstructor.toggleCollectionsDisplay()(dispatch)
		expect(store.getState().displayBlocks).toBe(false)
	})

	it(`setHeaderBorder`, async() => {
		expect(store.getState().headerBorder).toBe(false)
		await interfaceServiceConstructor.setHeaderBorder(true)(dispatch)
		expect(store.getState().headerBorder).toBe(true)
	})

	it(`setLost`, async() => {
		expect(store.getState().lost).toBe(false)
		await interfaceServiceConstructor.setLost(true)(dispatch)
		expect(store.getState().lost).toBe(true)
	})

	it(`setEditorStyle`, async() => {
		expect(store.getState().editorStyle).toBe(false)
		await interfaceServiceConstructor.setEditorStyle(true)(dispatch)
		expect(store.getState().editorStyle).toBe(true)
	})

	it(`setEvents`, async() => {
		const testEvent = {id: `test`}
		expect(store.getState().events).toEqual([])
		await interfaceServiceConstructor.setEvents(testEvent)(dispatch)
		expect(store.getState().events).toEqual(testEvent)
	})

	it(`getTranslation`, async() => {
		const unTranslate = `manzana`
		const translate = `apple`
		const language = `spanish`

		proxies.apiProxy.translation.getTranslation.mockImplementationOnce(() => {
			return Promise.resolve(translate)
		})
		expect(store.getState().jsonResponse).toEqual(undefined)
		await interfaceServiceConstructor.getTranslation(unTranslate, language)(dispatch, getState, { apiProxy })
		expect(store.getState().jsonResponse).toEqual(`apple`)
	})

	it(`checkTranslation: find match language`, async() => {
		const language = `spanish`
		const translate = `apple`

		proxies.apiProxy.translation.getTranslation.mockImplementationOnce(() => {
			return Promise.resolve(translate, language)
		})
		const json = await interfaceServiceConstructor.checkTranslation(translate, language)(dispatch, getState, { apiProxy })
		expect(json).toEqual({ "json": `apple`, "success": true})
	})

	it(`checkTranslation: can't find match language`, async() => {
		const language = `english`
		const translate = `apple`

		proxies.apiProxy.translation.getTranslation.mockImplementationOnce(() => {
			return Promise.resolve(translate, language)
		})
		const json = await interfaceServiceConstructor.checkTranslation(translate, language)(dispatch, getState, { apiProxy })
		expect(json).toEqual({ "json": {}, "success": false})
	})

	it(`sendNoAttachment`, async() => {
		const success = 200
		const emailObject = {
			"sender-email": `email`,
			"subject": `title`,
			"message": `body`,
		}

		proxies.apiProxy.email.postNoAttachment.mockImplementationOnce(() => {
			return Promise.resolve(success)
		})

		await interfaceServiceConstructor.sendNoAttachment(emailObject)(dispatch, getState, { apiProxy })
	})

	it(`sendNoAttachment`, async() => {
		const attachment = {
			name: `test.jpg`,
			size: 4377,
			type: `image/jpeg`,
			webkitRelativePath: ``,
		}
		const formData = new FormData()
		formData.append(`attachment`, attachment)
		formData.append(`sender-email`, `test#byu.edu`)
		formData.append(`subject`, `title`)
		formData.append(`message`, `body`)

		proxies.apiProxy.email.postWithAttachment.mockImplementationOnce(() => {
			return Promise.resolve(200)
		})

		await interfaceServiceConstructor.sendWithAttachment(formData)(dispatch, getState, { apiProxy })
	})

})