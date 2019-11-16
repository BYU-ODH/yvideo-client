import axios from 'axios'
import User from 'models/User'

const apiProxy = {
	user: {
		/**
		 * Retrieves the currently logged-in user from the API
		 *
		 * @returns a User object
		 */
		get: async () => {
			try {
				const url = `${process.env.REACT_APP_YVIDEO_SERVER}/api/user`
				const result = await axios.get(url, { withCredentials: true })
				return new User(result.data)
			} catch (error) {
				console.error(error)
			}
		},
		collections: {
			get: async () => {

				console.log(`apiProxy.user.collections`)

				const result = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/collections`, { withCredentials: true })

				const data = result.data.reduce((map, item) => {
					map[item.id] = item
					return map
				}, {})

				console.log(data)
			},
		},
	},
	auth: {
		/**
		 * Sets the current URL to the OAuth2 BYU CAS Login page, then redirects back to the original URL
		 */
		cas: () => {
			window.location.href = `${process.env.REACT_APP_YVIDEO_SERVER}/auth/cas/redirect${window.location.href}`
		},
		/**
		 * Sets the current URL to the OAuth2 BYU CAS Logout page, then redirects back to the original URL
		 */
		logout: () => {
			window.location.href = `${process.env.REACT_APP_YVIDEO_SERVER}/auth/logout/redirect${window.location.href}`
		},
	},
	collection: {
		/**
		 * Changes the name of a specified collection
		 *
		 * @param id The ID of the collection
		 * @param name The new name of the collection
		 *
		 * @returns nothing yet
		 */
		post: async (id, name) => {
			try {
				const url = `${process.env.REACT_APP_YVIDEO_SERVER}/collection/${id}`
				const result = await axios.post(url, { name }, { withCredentials: true })
				console.log(result)
			} catch (error) {
				console.error(error)
			}
		},
	},
}

export default apiProxy
