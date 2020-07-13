import * as testutil from '../../testutil/testutil'
import InterfaceService from '../../../services/s/interface.redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import proxies from 'proxy'
import { browserStorage } from 'proxy'
import CreateContentContainer from '../../../components/modals/containers/CreateContentContainer'

const modal = { component: CreateContentContainer, collectionId: 0, isLabAssistantRoute:false }

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
				lost: false,
				interfaceStore:{
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
		const types = interfaceServiceConstructor.types

		expect(types.MENU_TOGGLE).toBe(`MENU_TOGGLE`)
		expect(types.MODAL_TOGGLE).toBe(`MODAL_TOGGLE`)
		expect(types.COLLECTIONS_DISPLAY_TOGGLE).toBe(`COLLECTIONS_DISPLAY_TOGGLE`)
		expect(types.SET_HEADER_BORDER).toBe(`SET_HEADER_BORDER`)
		expect(types.SET_LOST).toBe(`SET_LOST`)
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

})