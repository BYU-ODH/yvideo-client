import axios from 'axios'
import User from 'models/User'

export const apiProxy = {
	user: {
		get: async () => {

			try {

				const url = `${process.env.REACT_APP_YVIDEO_SERVER}/api/user`
				const result = await axios.get(url, { withCredentials: true })

				// console.clear()

				return new User(result.data)

			} catch (error) {
				console.error(error)
			}
		},
	},
	auth: {
		cas: async () => {

			// TODO: Check to see if session cookie is already set
			// If so, I think you just return the user from the cookie

			return new Promise((resolve, reject) => {

				const url = `${process.env.REACT_APP_YVIDEO_SERVER}/auth/cas/redirect${window.location.origin}/success`
				const name = `BYU CAS Secure Login`
				const popup = window.open(url, name, `width=700,height=1030`)

				const popuppoll = setInterval(() => {
					try {

						// TODO: Make sure the session cookie has been set from the backend
						// The session cookie should have user in it, which we can send into resolve()
						// If the user closes the window without logging in, there will be no cookie

						if (popup.location.origin === window.location.origin || popup.closed) {

							popup.postMessage(`test`, window.location.origin)

							// clearInterval(popuppoll)
							// popup.close()
							resolve(null)
						}
					} catch (error) {
						reject(error)
					}
				}, 300)

				window.addEventListener(`message`, event => {
					if (event.origin.startsWith(window.location.origin)) {
						// popup.close()
						console.log(`pathname:`, event.source.location.pathname)
						console.log(event)
					}
				})

			})
		},
		logout: async () => {
			return new Promise((resolve, reject) => {

				const url = `${process.env.REACT_APP_YVIDEO_SERVER}/auth/logout/redirect${window.location.origin}/success`
				const name = `Logging you out...`
				const popup = window.open(url, name, `width=700,height=1030`)

				const popuppoll = setInterval(() => {
					try {
						if (popup.location.origin === window.location.origin || popup.closed) {

							// TODO: Delete the session cookie

							clearInterval(popuppoll)
							popup.close()
							resolve()

						}
					} catch (error) {
						reject(error)
					}
				}, 300)

			})
		},
	},
}
