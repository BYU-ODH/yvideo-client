import { browserStorage } from 'proxy'
import Swal from 'sweetalert2'
export default class InterfaceService {

	// types

	types = {
		MENU_TOGGLE: `MENU_TOGGLE`,
		MODAL_TOGGLE: `MODAL_TOGGLE`,
		COLLECTIONS_DISPLAY_TOGGLE: `COLLECTIONS_DISPLAY_TOGGLE`,
		SET_HEADER_BORDER: `SET_HEADER_BORDER`,
		SET_EDITOR_STYLE: `SET_EDITOR_STYLE`,
		SET_LOST: `SET_LOST`,
		SET_EVENTS: `SET_EVENTS`,
		GET_EVENTS: `GET_EVENTS`,
		SENT_EMAIL: `SENT_EMAIL`,
		INTERFACE_ERROR: `INTERFACE_ERROR`,
		// SUCCESS: `SUCCESS`,
	}

	// action creators

	actions = {
		menuToggle: () => ({ type: this.types.MENU_TOGGLE }),
		modalToggle: (payload = { component: null, collectionId: -1, isLabAssistantRoute:false }) => ({ type: this.types.MODAL_TOGGLE, payload }),
		collectionsDisplayToggle: () => ({ type: this.types.COLLECTIONS_DISPLAY_TOGGLE }),
		setHeaderBorder: active => ({ type: this.types.SET_HEADER_BORDER, payload: { active }}),
		setEditorStyle: active => ({ type: this.types.SET_EDITOR_STYLE, payload: { active }}),
		setLost: lost => ({ type: this.types.SET_LOST, payload: { lost }}),
		setEvents: events => ({ type: this.types.SET_EVENTS, payload: { events }}),
		getEvents: events => ({ type: this.types.GET_EVENTS, payload: { events }}),
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
		displayBlocks: browserStorage.displayBlocks,
		headerBorder: false,
		editorStyle: false,
		lost: false,
		events: [],
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

	sendNoAttachment = (emailObject) => {
		return async (dispatch, getState, { apiProxy }) => {

			try {
				const results = await apiProxy.email.postNoAttachment(emailObject)
				if(results.status == 200) {
					Swal.fire({
						icon: 'success',
						title: 'You have successfully submitted the form',
						showConfirmButton: false,
						timer: 3000,
						width: 500,
						})
				}
			} catch (error) {
				dispatch(this.actions.interfaceError(error))
				Swal.fire({
					title: 'There is something wrong, Please try again',
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
						icon: 'success',
						title: 'You have successfully submitted the form',
						showConfirmButton: false,
						timer: 3000,
						width: 500,
						})
				}
			} catch (error) {
				dispatch(this.actions.interfaceError(error))
				Swal.fire({
					title: 'There is something wrong, Please try again',
					showConfirmButton: true,
					width: 500,
				})
			}
		}
	}
}
