import { browserStorage } from 'proxy'
import Swal from 'sweetalert2'
export default class InterfaceService {

	// types

	types = {
		MENU_TOGGLE: `MENU_TOGGLE`,
		MODAL_TOGGLE: `MODAL_TOGGLE`,
		TIP_TOGGLE: `TIP_TOGGLE`,
		COLLECTIONS_DISPLAY_TOGGLE: `COLLECTIONS_DISPLAY_TOGGLE`,
		SET_HEADER_BORDER: `SET_HEADER_BORDER`,
		SET_EDITOR_STYLE: `SET_EDITOR_STYLE`,
		SET_LOST: `SET_LOST`,
		SET_EVENTS: `SET_EVENTS`,
		GET_EVENTS: `GET_EVENTS`,
		SENT_EMAIL: `SENT_EMAIL`,
		GET_TRANSLATION: `GET_TRANSLATION`,
		SET_BREADCRUMB: `SET_BREADCRUMB`,
		GET_BREADCRUMB: `GET_BREADCRUMB`,
		INTERFACE_ERROR: `INTERFACE_ERROR`,
		// SUCCESS: `SUCCESS`,
	}

	// action creators

	actions = {
		menuToggle: () => ({ type: this.types.MENU_TOGGLE }),
		modalToggle: (payload = { component: null, collectionId: -1, isLabAssistantRoute:false }) => ({ type: this.types.MODAL_TOGGLE, payload }),
		tipToggle: (payload) => ({ type: this.types.TIP_TOGGLE, payload }),
		collectionsDisplayToggle: () => ({ type: this.types.COLLECTIONS_DISPLAY_TOGGLE }),
		setHeaderBorder: active => ({ type: this.types.SET_HEADER_BORDER, payload: { active }}),
		setEditorStyle: active => ({ type: this.types.SET_EDITOR_STYLE, payload: { active }}),
		setLost: lost => ({ type: this.types.SET_LOST, payload: { lost }}),
		setEvents: events => ({ type: this.types.SET_EVENTS, payload: { events }}),
		getEvents: events => ({ type: this.types.GET_EVENTS, payload: { events }}),
		getTranslation: json => ({ type: this.types.GET_TRANSLATION, payload: { json }}),
		setBreadcrumb: (breadcrumb, id) => ({ type: this.types.SET_BREADCRUMB, payload: { breadcrumb, id }}),
		getBreadcrumb: (breadcrumb, id) => ({ type: this.types.GET_BREADCRUMB, payload: { breadcrumb, id }}),
		interfaceError: error => ({ type: this.types.INTERFACE_ERROR, payload: { error } }),
		// success: error => ({ type: this.types.SUCCESS, payload: { error } }),
	}

	// default store

	store = {
		menuActive: false,
		modal: {
			active: false,
			component: null,
			collectionId: -1,
			isLabAssistantRoute: false,
			props: {},
		},
		tip: {
			active: false,
			component: null,
			props: {},
		},
		jsonResponse: {},
		displayBlocks: browserStorage.displayBlocks,
		headerBorder: false,
		editorStyle: false,
		lost: false,
		events: [],
		languageCodes: {
			// add language codes as needed
			spanish: `es`,
			german: `de`,
			russian: `ru`,
		},
		breadcrumb: [`Home`],
		id: ``,
	}

	// reducer

	reducer = (store = this.store, action) => {
		switch (action.type) {

		case this.types.MENU_TOGGLE:
			return {
				...store,
				menuActive: !store.menuActive,
			}

		case this.types.MODAL_TOGGLE:
			return {
				...store,
				modal: {
					...store.modal,
					active: !store.modal.active,
					component: action.payload.component,
					collectionId: action.payload.collectionId,
					isLabAssistantRoute: action.payload.isLabAssistantRoute,
					props: action.payload.props,
				},
			}

		case this.types.TIP_TOGGLE:
			if(action.payload == null){
				// console.log("IT IS NULL")
				// we need to set modal to false and then pass a null component
				return {
					...store,
					tip: {
						...store.tip,
						active: false,
						component: null,
						props: null,
					},
				}
			} else {
				return {
					...store,
					tip: {
						...store.tip,
						active: !store.tip.active,
						component: action.payload.component,
						props: action.payload.props,
					},
				}
			}

		case this.types.COLLECTIONS_DISPLAY_TOGGLE:
			browserStorage.displayBlocks = !store.displayBlocks
			return {
				...store,
				displayBlocks: !store.displayBlocks,
			}

		case this.types.SET_HEADER_BORDER:
			return {
				...store,
				headerBorder: action.payload.active,
			}

		case this.types.SET_EDITOR_STYLE:
			return {
				...store,
				editorStyle: action.payload.active,
			}

		case this.types.SET_LOST:
			return {
				...store,
				lost: action.payload.lost,
			}

		case this.types.SET_EVENTS:
			return {
				...store,
				events: action.payload.events,
			}

		case this.types.GET_EVENTS:
			return {
				...store,
				events: action.payload.events,
			}

		case this.types.GET_TRANSLATION:
			return {
				...store,
				jsonResponse: action.payload.json,
			}

		case this.types.SET_BREADCRUMB:
			return {
				...store,
				breadcrumb: action.payload.breadcrumb,
				id: action.payload.id,
			}

		case this.types.GET_BREADCRUMB:
			return {
				...store,
				breadcrumb: action.payload.breadcrumb,
			}

		case this.types.INTERFACE_ERROR:
			console.error(action.payload.error)
			return {
				...store,
				loading: false,
			}

		default:
			return store
		}
	}

	// thunks

	/**
	 * Toggles the side menu
	 */
	toggleMenu = () => async dispatch => {
		dispatch(this.actions.menuToggle())
	}

	/**
	 * Toggles the Modal
	 *
	 * @param modal an object representing the modal you want to display. Takes the following properties: `component` (the component to display) and `id` (the id of the collection)
	 */
	toggleModal = modal => async (dispatch, getState) => {
		dispatch(this.actions.modalToggle(modal))
	}

	/**
	 * @param tip an object representing a tooltip.
	 * to know more about a tip object check the interface store tip object.
	 * the tooltip will appear once the user hovers over an icon or button to display a tip about what such icon or botton does.
	 */
	toggleTip = tip => async (dispatch, getState) => {
		dispatch(this.actions.tipToggle(tip))
	}

	toggleCollectionsDisplay = () => async dispatch => {
		dispatch(this.actions.collectionsDisplayToggle())
	}

	setHeaderBorder = active => async dispatch => {
		dispatch(this.actions.setHeaderBorder(active))
	}

	setLost = lost => async dispatch => {
		dispatch(this.actions.setLost(lost))
	}

	setEditorStyle = active => async dispatch => {
		dispatch(this.actions.setEditorStyle(active))
	}

	setEvents = events => async dispatch => {
		// console.log('%c Updated Store', 'color: purple; font-weight: bold;')
		dispatch(this.actions.setEvents(events))
	}

	getTranslation = (word, language) => async (dispatch, getState, { apiProxy }) => {
		try {
			const json = await apiProxy.translation.getTranslation(word, language)
			// console.log(json)
			dispatch(this.actions.getTranslation(json))
		} catch (e) {
			dispatch(this.actions.getTranslation(``))
		}
	}

	setBreadcrumb = (breadcrumb, id) => async (dispatch, getState, { apiProxy }) => {
		try {
			dispatch(this.actions.setBreadcrumb(breadcrumb, id))
		} catch (e) {
			dispatch(this.actions.setBreadcrumb(`` , ``))
		}
	}

	checkTranslation = (word, language) => async (dispatch, getState, { apiProxy }) => {

		if(getState().interfaceStore.languageCodes[language] === null || getState().interfaceStore.languageCodes[language] === undefined){
			return {
				json: {},
				success: false,
			}
		}

		try {
			const json = await apiProxy.translation.getTranslation(word, getState().interfaceStore.languageCodes[language])
			// console.log(json)
			return {
				json,
				success: true,
			}
		} catch (e) {
			return {
				json: {},
				success: false,
			}
		}
	}

	sendNoAttachment = (emailObject) => {
		return async (dispatch, getState, { apiProxy }) => {

			try {
				const results = await apiProxy.email.postNoAttachment(emailObject)
				if(results.status == 200) {
					Swal.fire({
						icon: `success`,
						title: `You have successfully submitted the form`,
						showConfirmButton: false,
						timer: 3000,
						width: 500,
					})
				}
			} catch (error) {
				dispatch(this.actions.interfaceError(error))
				Swal.fire({
					title: `There is something wrong, Please try again`,
					showConfirmButton: true,
					width: 500,
				})
			}
		}
	}

	sendWithAttachment = (emailObject) => {
		return async (dispatch, getState, { apiProxy }) => {

			try {
				const results = await apiProxy.email.postWithAttachment(emailObject)
				if(results.status == 200) {
					Swal.fire({
						icon: `success`,
						title: `You have successfully submitted the form`,
						showConfirmButton: false,
						timer: 3000,
						width: 500,
					})
				}
			} catch (error) {
				dispatch(this.actions.interfaceError(error))
				Swal.fire({
					title: `There is something wrong, Please try again`,
					showConfirmButton: true,
					width: 500,
				})
			}
		}
	}
}
