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

export const apiProxy = {
	user: {

		/**
		 * endpoint: /api/user
		 * @returns a user object
		 */
		get: async () => {
			console.warn(`Warning: You are using the a mock version of apiProxy. To see actual data, change the export in src/proxy/index.js from: './p/test/ApiProxy' to './p/ApiProxy'`)
			console.log(`fake:`, testuser)
			return testuser
		},
		get_broken: async () => {
			console.warn(`Warning: You are using the a mock version of apiProxy. To see actual data, change the export in src/proxy/index.js from: './p/test/ApiProxy' to './p/ApiProxy'`)
			throw new Error(`No User Logged In`)
		},
	},
}
