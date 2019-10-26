export default class InterfaceService {

	types = {
		LOAD_START: `LOAD_START`,
		LOAD_STOP: `LOAD_STOP`,
	}

	store = {
		loading: true,
	}

	reducer = (store = this.store, action) => {
		switch (action.type) {
		case this.types.LOAD_START:
			return {
				...store,
				loading: true,
			}

		case this.types.LOAD_STOP:
			return {
				...store,
				loading: false,
			}

		default:
			return store
		}
	}

	startLoading = () => async dispatch => {
		dispatch({ type: this.types.LOAD_START })
	}

	stopLoading = () => async dispatch => {
		dispatch({ type: this.types.LOAD_STOP })
	}
}
