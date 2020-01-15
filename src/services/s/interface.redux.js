import { browserStorage } from 'proxy'

export default class InterfaceService {

	// types

	types = {
		MENU_TOGGLE: `MENU_TOGGLE`,
		MODAL_TOGGLE: `MODAL_TOGGLE`,
		VIEW_COLLECTIONS_MODAL_TOGGLE: `VIEW_COLLECTIONS_MODAL_TOGGLE`,
		COLLECTIONS_DISPLAY_TOGGLE: `COLLECTIONS_DISPLAY_TOGGLE`,
		SET_HEADER_BORDER: `SET_HEADER_BORDER`,
		SET_LOST: `SET_LOST`,
	}

	// action creators

	actions = {
		menuToggle: () => ({ type: this.types.MENU_TOGGLE }),
		modalToggle: (payload = { component: null, id: -1 }) => ({ type: this.types.MODAL_TOGGLE, payload }),
		viewCollectionsModalToggle: ( payload = { component: null, user: null }) => ({ type: this.types.VIEW_COLLECTIONS_MODAL_TOGGLE, payload }),
		collectionsDisplayToggle: () => ({ type: this.types.COLLECTIONS_DISPLAY_TOGGLE }),
		setHeaderBorder: active => ({ type: this.types.SET_HEADER_BORDER, payload: { active }}),
		setLost: lost => ({ type: this.types.SET_LOST, payload: { lost }}),
	}

	// default store

	store = {
		menuActive: false,
		modal: {
			active: false,
			component: null,
			collectionId: -1,
			user: null,
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
				},
			}

		case this.types.VIEW_COLLECTIONS_MODAL_TOGGLE:
			return {
				...store,
				modal: {
					...store.modal,
					active: !store.modal.active,
					component: action.payload.component,
					user: action.payload.user,
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
		dispatch(this.actions.modalToggle(modal))
	}

	/**
	 * Toggles the View Collections Modal
	 *
	 * @param modal an object representing the modal you want to display. Takes the following properties: `component` (the component to display) and `user` (the professor whose collections the lab assistant is going to change)
	 */
	toggleViewCollectionsModal = (payload) => async dispatch => {
		dispatch(this.actions.viewCollectionsModalToggle(payload))
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
