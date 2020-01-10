import axios from 'axios'
import User from 'models/User'

const apiProxy = {
	admin: {
		search: {
			/**
			 * Retrieves an array of users, collections, or content depending on the category and search word
			 */
			get: async (searchCategory, searchQuery) => await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/admin/${searchCategory}/${searchQuery}`, { withCredentials: true }).then(res => res.data),
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
		 */
		post: async (id, name) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/collection/${id}`, { name }, { withCredentials: true }),
		/**
		 * Publishes, Unpublishes, Archives, or Unarchives a collection
		 *
		 * @param id The ID of the collection
		 * @param action The action to perform, must be one of `archive`, `unarchive`, `publish`, `unpublish`
		 */
		edit: async (id, action) => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/collection/${id}/${action}`, { withCredentials: true }).then(res => res.data),
		permissions: {
			/**
			 * Gets the current roles/permissions for the specified collection
			 *
			 * @param id the ID of the collection
			 *
			 * @returns a set of roles for a collection
			 */
			get: async id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}/permissions`, { withCredentials: true }),
			/**
			 * Edits a collections roles/permissions
			 *
			 * @param id the ID of the collection
			 * @param endpoint which permissions endpoint you want to change, can be one of: ['linkCourses', 'addTA', 'addException', 'unlinkCourses', 'removeTA', 'removeException']
			 * @param body contains the data which will overwrite the old data
			 *
			 * @returns nothing, idk
			 */
			post: async (id, endpoint, body) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/collection/${id}/${endpoint}`, JSON.stringify(body), {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
				},
			}),
		},
	},
	content: {
		/**
		 * Retrieves content from a list of content IDs
		 *
		 * @param ids the set of IDs of content you wish to retrieve
		 *
		 * @returns a map of the content, where the key is the content's ID
		 */
		get: async ids => {

			const results = await Promise.all(ids.map(id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${id}`, { withCredentials: true }).then(res => res.data)))

			return results.reduce((map, item) => {
				map[item.id] = item
				return map
			}, {})
		},
		addView: {
			/**
			 * Increments number of views from a content ID
			 *
			 * @param id the ID of the content you wish to increment the number of views for
			 */
			get: async id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${id}/addview`, { withCredentials: true }),
		},
		metadata: {
			post: async (id, metadata) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/content/${id}/metadata`, JSON.stringify(metadata), {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
				},
			}),
		},
		settings: {
			post: async (id, settings) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/content/${id}/settings`, JSON.stringify(settings), {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
				},
			}),
		},
	},
	resources: {
		/**
		 * Retrieves a single resource from a resource ID
		 *
		 * @param id the resource ID of the requested resource
		 *
		 * @returns a resource object
		 */
		get: id => axios(`${process.env.REACT_APP_RESOURCE_LIB}/resources/${id}?${Date.now().toString(36)}`),
	},
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
			/**
			 * Retrieves the collections for the current user
			 *
			 * @returns a map of the collections, where the key is the collection's ID
			 */
			get: async () => {

				const result = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/collections`, { withCredentials: true }).then(res => res.data)

				return result.reduce((map, item) => {
					map[item.id] = item
					return map
				}, {})
			},
		},
	},
}

export default apiProxy
