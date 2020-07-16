import axios from 'axios'
import User from 'models/User'
import Content from 'models/Content'

const apiProxy = {
	admin: {
		search: {
			/**
			 * Retrieves an array of users, collections, or content depending on the category and search word
			 */
			get: async (searchCategory, searchQuery) => await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/admin/${searchCategory}/${searchQuery}`, { withCredentials: true, headers: {'session-id': window.clj_session_id}, }).then(res => res.data),
		},
		collection: {
			get: async (id) => await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}`, { withCredentials: true, headers: {'session-id': window.clj_session_id,} }).then(res => res.data),
			/**
			 * Create a new collection
			 *
			 * @param name The name of the new collection
			 * @param ownerId The id of the owner of the collection (null if owner is the user, defined if the owner is someone other than user)
			 */
			delete: async (id) => await axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/admin/collections/${id}/delete`, { withCredentials: true }).then((response) => {
				console.log('Server response', response)
			}),
			/*
				* Deletes a collection using just the collection ID ^^
			*/
			create: async (name, ownerId) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/collection/create`, JSON.stringify({ name, ownerId }), {
				withCredentials: true ,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
				},
			}),
			content: {
				/**
				 * Get content for collection
				 *
				 * @param id The id of a collection
				 * @returns A map of { contentId: content } pairs for the collection
				 */
				get: async (id) => {
					const results = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}/content`, { withCredentials: true, headers: {'session-id': window.clj_session_id,} }).then(res => res.data)

					return results.reduce((map, item) => {
						map[item.id] = new Content(item)
						return map
					}, {})
				},
				/**
				 * Create content for collection
				 *
				 * @param data the content data
				 * @param collectionId the collection id
				 */
				post: async (data, collectionId) => await axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/content/create/url?collectionId=${collectionId}&annotations=false`, JSON.stringify(data), {
					withCredentials: true,
					headers: {
						'Content-Type': `application/json`,
						'session-id': window.clj_session_id,
					},
				}),
				/**
				 * Create content from resource id
				 *
				 * @param collectionId the collection id
				 * @param resourceId the resource id
				 */
				createFromResource: async (collectionId, resourceId) => await axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/content/create/resource?collectionId=${collectionId}`, JSON.stringify({ resourceId }), {
					withCredentials: true,
					headers: {
						'session-id': window.clj_session_id,
					}
				}),
				},
		},
		user: {
			delete: async (id) => await axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/admin/users/${id}/delete`, { withCredentials: true }).then(res => res.data),
			/* This is to delete a user by just getting the user ID  ^^ */
		},
		content: {
			delete: async (id) => await axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/content/${id}/delete`, { withCredentials: true }).then(res => res.data),
			/* This is to delete a piece of content by just getting the content ID  ^^ */
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
		 * Create a new collection
		 *
		 * @param name The name of the new collection
		 */
		create: async (obj) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection`, obj, {
			withCredentials: true ,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}),
		/**
		 * Changes the name of a specified collection
		 *
		 * @param id The ID of the collection
		 * @param name The new name of the collection
		 */
		post: async (id, name) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/collection/${id}`, { name }, { withCredentials: true, headers: {'session-id': window.clj_session_id,} }),
		/**
		 * Publishes, Unpublishes, Archives, or Unarchives a collection
		 *
		 * @param id The ID of the collection
		 * @param action The action to perform, must be one of `archive`, `unarchive`, `publish`, `unpublish`
		 */
		edit: async (id, state) => axios.patch(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}`, state, { withCredentials: true, headers: {'session-id': window.clj_session_id,},}).then(res => res.data),
		/**
		 * Removes a list of content ids from a collection
		 *
		 * @param id The ID of the collection
		 * @param contentIds List of content ids
		 */
		remove: async (id, contentIds) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/collection/${id}/removeContent`,
			JSON.stringify({ removeContent: contentIds}), {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
				},
			}),
		permissions: {
			/**
			 * Gets the current roles/permissions for the specified collection
			 *
			 * @param id the ID of the collection
			 *
			 * @returns a set of roles for a collection
			 */
			//get: async id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}/permissions`, { withCredentials: true }),
			get: async id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collections`, { withCredentials: true, headers: {'session-id': window.clj_session_id} }),
			/**
			 * Edits a collections roles/permissions
			 *
			 * @param id the ID of the collection
			 * @param endpoint which permissions endpoint you want to change, can be one of: ['linkCourses', 'addTA', 'addException', 'unlinkCourses', 'removeTA', 'removeException']
			 * @param body contains the data which will overwrite the old data
			 *
			 * @returns nothing, idk
			 */
			post: async (id, endpoint, body) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}/${endpoint}`, JSON.stringify(body), {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
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

			const results = await Promise.all(ids.map(id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${id}`,
				{
					withCredentials: true,
					headers: {
						'Content-Type': `application/json`,
						'session-id': window.clj_session_id,
					},
				}).then(res => res.data)))

			const returnMe = results.reduce((map, item) => {
				item = new Content(item)
				map[item.id] = item
				return map
			}, {})
			//console.log(returnMe)
			return returnMe
		},
		/**
		 * Create content for collection
		 *
		 * @param data the content data
		 * @param collectionId the collection id
		 */
		post: async (data, collectionId) => await axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content`, data, {
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}),
		addView: {
			/**
			 * Increments number of views from a content ID
			 *
			 * @param id the ID of the content you wish to increment the number of views for
			 */
			get: async id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${id}/addview`, { withCredentials: true, headers: {'session-id': window.clj_session_id,} }),
		},
		metadata: {
			post: async (id, metadata) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/content/${id}/metadata`, JSON.stringify(metadata), {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
				},
			}),
		},
		settings: {
			post: async (id, settings) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/content/${id}/settings`, JSON.stringify(settings), {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
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
				//CALL TO GET SESSION ID FROM CLOJURE BACK END
				const res = await axios.get(`${process.env.REACT_APP_YVIDEO_SERVER}/api/get-session-id/esdras/868a60ef-1bc3-440c-a4a8-70f4c89844ca`)
				window.clj_session_id = res.data['session-id']
				//CALL TO GET THE USER ONCE THE SESSION ID HAS BEEN SET
				const url = `${process.env.REACT_APP_YVIDEO_SERVER}/api/user`
				const result = await axios.get(url, {
					withCredentials: true,
					headers: {
					'Content-Type': `application/json`,
					'session-id': res.data['session-id'],
					},
				})
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

				// const result = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/collections`, { withCredentials: true }).then(res => res.data)
				const result = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collections`, { withCredentials: true, headers: {'session-id': window.clj_session_id} }).then(res => res.data)


				return result.reduce((map, item) => {
					item['name'] = item['collection-name']

					let temp = []
					item['content'].forEach(element => {
						temp.push(new Content(element))
					});

					item['content'] = temp

					delete item['collection-name']
					//console.log(item)
					map[item.id] = item
					return map
				}, {})
			},
		},
	},
}

export default apiProxy

