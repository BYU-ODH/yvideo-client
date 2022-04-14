import axios from 'axios'
import User from 'models/User'
import Content from 'models/Content'

const updateSessionId = (id) => {
	// console.log(`OLD => `, window.clj_session_id)
	// console.log(`NEW => `, id)
	if(id !== ``){
		if(id === `expired`){
			// console.log('got here')

			alert(`Your session has expired. Please, log back in`)
			apiProxy.auth.logout()
			// CAS LOGOUT https://cas.byu.edu/cas/logout
		}
		window.clj_session_id = id
	}
}

const apiProxy = {
	admin: {
		search: {
			/**
			 * Retrieves an array of users, collections, or content depending on the category and search word
			 */
			get: async (searchCategory, searchQuery) => await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/admin/${searchCategory}/${searchQuery}`,
				{
					withCredentials: true,
					headers: {'session-id': window.clj_session_id},
				}).then(res => {
				updateSessionId(res.headers[`session-id`])
				return res.data
			}),

			public: {
				collection: {
					get: async (term) => {
						const result = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/admin/public-collection/${term}`, { withCredentials: true})

						result.data.forEach(element => {
							element[`name`] = element[`collection-name`]
							delete element[`collection-name`]
						})

						return result.data
					},
				},
				content: {
					get: async (term) => {
						const result = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/admin/content/${term}`, {withCredentials: true})

						// result.data.forEach(element => {
						// 	element[`name`] = element[`collection-name`]
						// 	delete element[`collection-name`]
						// })

						return result
					},
				},
			},
		},
		collection: {
			get: async (id) => {

				const result = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/${id}/collections`, {
					withCredentials: true,
					headers: {'session-id': window.clj_session_id},
				})

				updateSessionId(result.headers[`session-id`])

				result.data.forEach(element => {
					element[`name`] = element[`collection-name`]
					delete element[`collection-name`]
				})

				return result
			},

			/**
			 * Create a new collection
			 *
			 * @param name The name of the new collection
			 * @param ownerId The id of the owner of the collection (null if owner is the user, defined if the owner is someone other than user)
			 */
			create: async (name, ownerId) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/collection/create`, JSON.stringify({ name, ownerId }), {
				withCredentials: true ,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
				},
			}).then(res => {
				updateSessionId(res.headers[`session-id`])
				return res.data
			}),
			/*
				* Deletes a collection using just the collection ID
			*/
			delete: async (id) => await axios.delete(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}`, { withCredentials: true, headers: {'session-id': window.clj_session_id }}).then(res => {
				updateSessionId(res.headers[`session-id`])
			}),
			content: {
				/**
				 * Get content for collection
				 *
				 * @param id The id of a collection
				 * @returns A map of { contentId: content } pairs for the collection
				 */
				get: async (id) => {
					const results = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}/contents`, { withCredentials: true, headers: {'session-id': window.clj_session_id} })

					updateSessionId(results.headers[`session-id`])

					return results.data.content.reduce((map, item) => {
						map[item.id] = new Content(item)
						return map
					}, {})
				},
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
					},
				}).then(res => {
					updateSessionId(res.headers[`session-id`])
				}),
			},
		},
		user: {
			delete: async (id) => await axios.delete(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/${id}`, { withCredentials: true, headers: {'session-id': window.clj_session_id }}).then(res => {
				updateSessionId(res.headers[`session-id`])
				return res.data
			}),
			deleteWithCollections: async (id) => await axios.delete(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/${id}/collections`, { withCredentials: true, headers: {'session-id': window.clj_session_id }}).then(res => {
				updateSessionId(res.headers[`session-id`])
				return res.data
			}),
			/* This is to delete a user by just getting the user ID  ^^ */
			get: async (id) => await axios.get(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/${id}`, { withCredentials: true, headers: {'session-id': window.clj_session_id }}).then(res => {
				updateSessionId(res.headers[`session-id`])
				return res.data
			}),
			edit: async (role, id) => await axios.patch(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/${id}`, { "account-type": role }, { withCredentials: true, headers: {'session-id': window.clj_session_id }}).then(res => {
				updateSessionId(res.headers[`session-id`])
				return res.data
			}),
		},
		content: {
			delete: async (id) => await axios.delete(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${id}`, { withCredentials: true, headers: {'session-id': window.clj_session_id }}).then(async res => {
				await updateSessionId(res.headers[`session-id`])
				return res.data
			}),
			/* This is to delete a piece of content by just getting the content ID  ^^ */
		},

	},
	auth: {
		/**
		 * Sets the current URL to the OAuth2 BYU CAS Login page, then redirects back to the original URL
		 */
		cas: () => {
			window.location.href = `${process.env.REACT_APP_YVIDEO_SERVER}/login`
			// window.location.href = `${process.env.REACT_APP_YVIDEO_SERVER}/auth/cas/redirect${window.location.href}`
		},
		/**
		 * Sets the current URL to the OAuth2 BYU CAS Logout page, then redirects back to the original URL
		 */
		logout: () => {
			window.location.href = `${process.env.REACT_APP_YVIDEO_SERVER}/logout`
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
		}).then(async res => {
			await updateSessionId(res.headers[`session-id`])
			return res.data
		}),
		/**
		 * Changes the name of a specified collection
		 *
		 * @param id The ID of the collection
		 * @param name The new name of the collection
		 */
		post: async (id, name) => axios.patch(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}`, { "collection-name": name }, { withCredentials: true, headers: {'session-id': window.clj_session_id} })
			.then(res => {
				updateSessionId(res.headers[`session-id`])
			}),
		/**
		 * Publishes, Unpublishes, Archives, or Unarchives a collection
		 *
		 * @param id The ID of the collection
		 * @param action The action to perform, must be one of `archive`, `unarchive`, `publish`, `unpublish`
		 */
		edit: async (id, state) => axios.patch(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}`, state, { withCredentials: true, headers: {'session-id': window.clj_session_id}})
			.then( async res => {
				await updateSessionId(res.headers[`session-id`])
				return res.data
			}),
		/**
		 * Removes a list of content ids from a collection
		 *
		 * @param id The ID of the collection
		 * @param contentIds List of content ids
		 */
		remove: async (id) => axios.delete(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${id}`, {
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
		}),
		permissions: {
			/**
			 * Gets the current users TA/Exception for the specified collection
			 *
			 * @param id the ID of the collection
			 *
			 * @returns an array of users for a collection
			 */
			// get: async id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}/permissions`, { withCredentials: true }),
			getUsers: async id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}/users`, { withCredentials: true, headers: {'session-id': window.clj_session_id} })
				.then(res => {
					updateSessionId(res.headers[`session-id`])
					return res.data
				}),
			/**
			 * Gets the current courses for the specified collection
			 *
			 * @param id the ID of the collection
			 *
			 * @returns an array of courses for a collection
			 */
			// get: async id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}/permissions`, { withCredentials: true }),
			getCourses: async id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}/courses`, { withCredentials: true, headers: {'session-id': window.clj_session_id} }).then(res => {
				updateSessionId(res.headers[`session-id`])

				return res.data
			}),
			/**
			 * Edits a collections roles/permissions
			 *
			 * @param id the ID of the collection
			 * @param endpoint which permissions endpoint you want to change, can be one of: ['linkCourses', 'addTA', 'addException', 'unlinkCourses', 'removeTA', 'removeException']
			 * @param body contains the data which will overwrite the old data
			 *
			 * @returns nothing, idk
			 */
			getContents: async id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}/contents`, { withCredentials: true, headers: {'session-id': window.clj_session_id} }).then(res => {
				updateSessionId(res.headers[`session-id`])

				return res.data
			}),
			post: async (id, endpoint, body) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}/${endpoint}`, body, {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
				},
			}).then(res => {
				updateSessionId(res.headers[`session-id`])
				return res
			}),
			postMany: async (id, body) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collection/${id}/add-users`, body, {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
				},
			}).then(res => {
				updateSessionId(res.headers[`session-id`])
				return res
			}),
		},
	},
	content: {
		getSingleContent: async id => await axios.get(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${id}`, {
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res.data
		}),
		/**
		 * Retrieves content from a list of content IDs
		 *
		 * @param ids the set of IDs of content you wish to retrieve
		 *
		 * @returns a map of the content, where the key is the content's ID
		 */
		get: async ids => {
			const results = await Promise.all(ids.map(id =>
				axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${id}`,
					{
						withCredentials: true,
						headers: {
							'Content-Type': `application/json`,
							'session-id': window.clj_session_id,
						},
					}).then(res => {
					updateSessionId(res.headers[`session-id`])
					return res.data
				}),
			))

			const returnMe = results.reduce((map, item) => {
				const newItem = new Content(item)
				map[item.id] = newItem
				return map
			}, {})
			return returnMe
		},
		/**
		 * Create content for collection
		 *
		 * @param data the content data
		 * @param collectionId the collection id
		 */
		post: async (data) => await axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content`, data, {
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res.data
		}),
		addView: {
			/**
			 * Increments number of views from a content ID
			 *
			 * @param id the ID of the content you wish to increment the number of views for
			 */
			get: async id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${id}/addview`, { withCredentials: true, headers: {'session-id': window.clj_session_id} }).then(res => {
				updateSessionId(res.headers[`session-id`])
			}),
		},
		metadata: {
			post: async (id, metadata) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/content/${id}/metadata`, JSON.stringify(metadata), {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
				},
			}).then(res => {
				updateSessionId(res.headers[`session-id`])
			}),
		},
		update: async (content) => axios.patch(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${content[`id`]}`, content, {
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res.data
		}),
		getSubtitles: async id => {
			// console.log(`here`)
			const results = await axios.get(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${id}/subtitles`,
				{
					withCredentials: true,
					headers: {
						'Content-Type': `application/json`,
						'session-id': window.clj_session_id,
					},
				}).then( async res => {

				await updateSessionId(res.headers[`session-id`])
				// console.log(`results are`,res)
				return res.data
			})
			return results
		},
	},
	resources: {
		post: async (resource) => await axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/api/resource`, resource, {
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res.data
		}),

		access: {
			add: async (resourceId, username) => await axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/api/resource/${resourceId}/add-access`, { username }, {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
				},
			}).then(res => {
				updateSessionId(res.headers[`session-id`])
				return res.data
			}),

			read: async (resourceId) => await axios.get(`${process.env.REACT_APP_YVIDEO_SERVER}/api/resource/${resourceId}/read-all-access`, {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
				},
			}).then(res => {
				updateSessionId(res.headers[`session-id`])
				return res.data
			}),

			// request needs body
			remove: async (resourceId, username) => await axios.delete(`${process.env.REACT_APP_YVIDEO_SERVER}/api/resource/${resourceId}/remove-access`, {
				headers: {
					'session-id': window.clj_session_id,
				},
				data: {
					username,
				},
			},
			).then(res => {
				updateSessionId(res.headers[`session-id`])
				return res.data
			}),
		},

		delete: async (resourceId) => await axios.delete(`${process.env.REACT_APP_YVIDEO_SERVER}/api/resource/${resourceId}`, {
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
		}),

		edit: async (resource, resourceId) => await axios.patch(`${process.env.REACT_APP_YVIDEO_SERVER}/api/resource/${resourceId}`, resource, {
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res.data
		}),
		/**
		 * Retrieves a single resource from a reso`urce ID
		 *
		 * @param id the resource ID of the requested resource
		 *
		 * @returns a resource object
		 */
		get: async (id) => await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/resource/${id}`, {
			withCredentials: true,
			headers: {
				'session-id': window.clj_session_id,
			},
		}).then(async res => {
			await updateSessionId(res.headers[`session-id`])
			return res.data
		}),

		search: async (searchQuery) => await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/admin/resource/${searchQuery}`,
			{
				withCredentials: true,
				headers: {
					'session-id': window.clj_session_id,
				},
			}).then( async res => {
			await updateSessionId(res.headers[`session-id`])

			return res.data
		}),

		files: async(id) => await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/resource/${id}/files`,
			{
				withCredentials: true,
				headers: {
					'session-id': window.clj_session_id,
				},

			}).then(async res => {

			await updateSessionId(res.headers[`session-id`])
			return res.data
		}),
	},
	user: {
		/**
		 * Retrieves the currently logged-in user from the API
		 *
		 * @returns a User object
		 */
		get: async () => {
			try {
				if (window.clj_session_id === `{{ session-id }}`) {
					// CALL TO GET SESSION ID FROM CLOJURE BACK END
					// console.log(`step 1`)
					const res = await axios.get(`${process.env.REACT_APP_YVIDEO_SERVER}/api/get-session-id/esdras/868a60ef-1bc3-440c-a4a8-70f4c89844ca`,{headers:{'Access-Control-Allow-Origin': `*`}}).then(async res => {
						// console.log(`%c From User 1` , `color: red;`)
						await updateSessionId(res.data[`session-id`])
					})
					// window.clj_session_id = res.data['session-id']
					// CALL TO GET THE USER ONCE THE SESSION ID HAS BEEN SET
				} else{
					const url = `${process.env.REACT_APP_YVIDEO_SERVER}/api/user`
					const result = await axios.get(url, {
						withCredentials: true,
						headers: {
							'Content-Type': `application/json`,
							'session-id': window.clj_session_id,
						},
					}).then(async res => {
						await updateSessionId(res.headers[`session-id`])
						return res
					})
					return new User(result.data)
				}
			} catch (error) {
				console.error(error)
			}
		},
		post: async (body) => {
			try {
				const url = `${process.env.REACT_APP_YVIDEO_SERVER}/api/user/byu/create`
				const result = await axios.post(url, body,{
					withCredentials: true,
					headers: {
						'Content-Type': `application/json`,
						'session-id': window.clj_session_id,
					},
				}).then(async res => {
					await updateSessionId(res.headers[`session-id`])
					return res
				})

				console.log(result)
				return result

			} catch (error) {
				return error
			}
		},
		getHasPermissions: async (username) => {
			const res = await axios.get(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/${username}/ta-permissions`,{headers:{'Access-Control-Allow-Origin': `*`}}).then(async res => {
				await updateSessionId(res.data[`session-id`])
			})
			return res.data
		},
		collections: {
			/**
			 * Retrieves the collections for the current user
			 *
			 * @returns a map of the collections, where the key is the collection's ID
			 */
			get: async () => {

				const collections_result = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/collections`, { withCredentials: true, headers: {'session-id': window.clj_session_id} })
					.then(async res => {
						await updateSessionId(res.headers[`session-id`])

						const articles = [`a`, `an`, `the`]
						const regex = new RegExp(`^(?:(${articles.join(`|`)}) )(.*)$`)
						const replacor = ($0, $1, $2) => {
							return `${$2}, ${$1}`
						}
						return res.data.sort((a, b) => {
							a = a[`collection-name`].toLowerCase().replace(regex, replacor)
							b = b[`collection-name`].toLowerCase().replace(regex, replacor)
							return a === b ? 0 : a < b ? -1 : 1
						})
					})

				return collections_result.reduce((map, collection) => {
					collection[`name`] = collection[`collection-name`]

					const temp = []

					if(collection[`content`].length > 0){
						collection[`content`].forEach(element => {
							temp.push(new Content(element))
						})
					}

					collection[`content`] = temp

					delete collection[`collection-name`]
					map[collection.id] = collection

					return map
				}, {})
			},
		},
		courses: {
			/**
			 * Retrieves the courses for the current user
			 *
			 * @returns an array of courses
			 */
			get: async (id) => {
				const result = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/${id}/courses`,
					{
						withCredentials: true,
						headers: {'session-id': window.clj_session_id},
					})
					.then(res => {
						updateSessionId(res.headers[`session-id`])
						return res.data
					})
				return result
			},
		},
	},
	language: {
		post: async (lang) => await axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/api/language`, lang, {
			withCredentials: true,
			headers: {
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res.data
		}),
		get: async () => await axios.get(`${process.env.REACT_APP_YVIDEO_SERVER}/api/language`, {
			withCredentials: true,
			headers: {
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res.data
		}),
		delete: async (lang) => await axios.delete(`${process.env.REACT_APP_YVIDEO_SERVER}/api/language`, lang, {
			withCredentials: true,
			headers: {
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res.data
		}),
	},
	file: {
		post: (formData, onUploadProgress) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/api/file`, formData, {
			withCredentials: true,
			headers: {
				'Content-Type': `multipart/form-data`,
				'session-id': window.clj_session_id,
			},
			onUploadProgress,
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res.data
		}),

		patch: async (fileId, file) => await axios.patch(`${process.env.REACT_APP_YVIDEO_SERVER}/api/file/${fileId}`, file,{
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res
		}),

		delete: async (fileId) => await axios.delete(`${process.env.REACT_APP_YVIDEO_SERVER}/api/file/${fileId}`, {
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res.data
		}),
	},
	media: {
		getKey: async (id) => await axios.get(`${process.env.REACT_APP_YVIDEO_SERVER}/api/media/get-file-key/${id}`, {
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res.data
		}),
	},
	subtitles: {
		post: async (data) => {
			const returnMe = await axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/api/subtitle`,data,{
				withCredentials: true,
				headers: {
					'Content-Type' : `application/json`,
					'session-id' : window.clj_session_id,
				},
			}).then(res => {

				updateSessionId(res.headers[`session-id`])

				return res.data.id
			})
			return returnMe
		},
		get: async ids => {
			const results = await Promise.all(ids.map(id => axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/subtitle/${id}`,
				{
					withCredentials: true,
					headers: {
						'Content-Type': `application/json`,
						'session-id': window.clj_session_id,
					},
				}).then(async res => {

				await updateSessionId(res.headers[`session-id`])

				return res.data
			})))
			return results
		},
		delete: async (ids) => {
			await Promise.all(ids.map(id =>axios.delete(`${process.env.REACT_APP_YVIDEO_SERVER}/api/subtitle/${id}`, {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
				},
			}).then(res => {
				updateSessionId(res.headers[`session-id`])
			})))
		},

		edit: async (sub, id) => {
			await axios.patch(`${process.env.REACT_APP_YVIDEO_SERVER}/api/subtitle/${id}`, sub, {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
				},
			}).then(res => {
				updateSessionId(res.headers[`session-id`])
			})
		},
	},
	courses: {
		getCollections: async (course) => {

			const result = await axios.get(`${process.env.REACT_APP_YVIDEO_SERVER}/api/course/${course.id}/collections`, {
				withCredentials: true,
				headers: {
					'Content-Type': `application/json`,
					'session-id': window.clj_session_id,
				},
			}).then(res => {
				updateSessionId(res.headers[`session-id`])
				return res.data
			})
			return result
			// return result.reduce((map, item) => {
			// 	if(item['collection-name'] !== undefined){
			// 		item[`name`] = item[`collection-name`]
			// 		item['name'] = item['name'] + ` ${course['department']} ${course['catalog-number']}`
			// 		item['content'] = []

			// 		delete item[`collection-name`]
			// 		map[item.id] = item
			// 	}

			// 	return map
			// }, {})
		},
	},
	email: {
		postNoAttachment: async (emailObject) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/api/email/no-attachment`, emailObject, {
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res
		}),

		postWithAttachment: async (emailObject) => axios.post(`${process.env.REACT_APP_YVIDEO_SERVER}/api/email/with-attachment`, emailObject, {
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
				'session-id': window.clj_session_id,
			},
		}).then(res => {
			updateSessionId(res.headers[`session-id`])
			return res
		}),
	},
	translation: {
		getTranslation: async (word, language) => {
			const result = await axios({
				method: `GET`,
				url: `/${language}/${word}`,
				baseURL: process.env.REACT_APP_YVIDEO_SERVER_DICT,
			})
			// const result = axios({
			// 		method: 'GET',
			// 		baseURL: 'http://yvideodev.byu.edu:5001',
			// 		url: `/translate/${language}/${word}`
			// 	}).then(response => {
			// 		// console.log(response)
			// 		return response
			// 	})
			// 	.catch(error => {
			// 		console.log(error)
			// 	});
			return result.data
		},
	},
}

export default apiProxy

