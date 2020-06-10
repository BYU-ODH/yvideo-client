import { browserStorage } from 'proxy'

export default class InterfaceService {

	// types

	types = {
		MENU_TOGGLE: `MENU_TOGGLE`,
		MODAL_TOGGLE: `MODAL_TOGGLE`,
		COLLECTIONS_DISPLAY_TOGGLE: `COLLECTIONS_DISPLAY_TOGGLE`,
		SET_HEADER_BORDER: `SET_HEADER_BORDER`,
		SET_LOST: `SET_LOST`,
		// INTERFACE_ERROR: `ADMIN_ERROR`,
	}

	// action creators

	actions = {
		menuToggle: () => ({ type: this.types.MENU_TOGGLE }),
		modalToggle: (payload = { component: null, collectionId: -1, isLabAssistantRoute:false }) => ({ type: this.types.MODAL_TOGGLE, payload }),
		collectionsDisplayToggle: () => ({ type: this.types.COLLECTIONS_DISPLAY_TOGGLE }),
		setHeaderBorder: active => ({ type: this.types.SET_HEADER_BORDER, payload: { active }}),
		setLost: lost => ({ type: this.types.SET_LOST, payload: { lost }}),
		// interfaceError: error => ({ type: this.types.INTERFACE_ERROR, payload: { error } }),
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
		lost: false,
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

		case this.types.SET_LOST:
			return {
				...store,
				lost: action.payload.lost,
			}

			// case this.typesINTERFACE_ERROR:
			// 	console.error(action.payload.error)
			// 	return {
			// 		...store,
			// 		data: null,
			// 		loading: false,
			// 	}

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
	toggleModal = modal => async dispatch => {
		// dispatch(this.actions.modalToggle(modal))
		try {
			dispatch(this.actions.modalToggle(modal))
		} catch (error) {
			console.error(error.message)
			dispatch(this.actions.adminError(error))
		}
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
}
