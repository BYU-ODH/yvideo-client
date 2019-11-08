export default class InterfaceService {

	types = {
		MENU_TOGGLE: `MENU_TOGGLE`,
	}

	actions = {
		menuToggle: () => ({ type: this.types.MENU_TOGGLE }),
	}

	store = {
		menuActive: false,
	}

	reducer = (store = this.store, action) => {
		switch (action.type) {

		case this.types.MENU_TOGGLE:
			return {
				...store,
				menuActive: !store.menuActive,
			}

		default:
			return store
		}
	}

	toggleMenu = () => async dispatch => {
		dispatch(this.actions.menuToggle())
	}
}
