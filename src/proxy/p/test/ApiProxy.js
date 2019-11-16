import User, { roles } from 'models/User'

export const testuser = new User({
	email: `clevergrant@gmail.com`,
	id: 14,
	lastLogin: new Date().toISOString(),
	linked: -1,
	name: `Grant Perdue`,
	roles: [roles.admin],
	username: `zgrant12`,
})

const apiProxy = {
	user: {

		/**
		 * endpoint: /api/user
		 * @param broken if true, will throw an error
		 * @returns a User object
		 */
		get: async (broken = false) => {
			console.warn(`Warning: You are using the a mock version of apiProxy. To see actual data, change the export in src/proxy/index.js from: './p/test/ApiProxy' to './p/ApiProxy'`)
			if (broken) throw new Error(`No User Logged In`)
			else {
				console.log(`fake:`, testuser)
				return testuser
			}
		},
	},
}

export default apiProxy
