export default class User {

	id
	username
	name
	email
	roles
	lastLogin
	accountName

	constructor(obj) {

		// type checking
		// if (typeof obj.id !== `number`) console.error(`Error: id must be of type 'number'`)
		// if (typeof obj.username !== `string`) console.error(`Error: username must be of type 'string'`)
		// if (typeof obj.name !== `string`) console.error(`Error: name must be of type 'string'`)
		// if (typeof obj.email !== `string`) console.error(`Error: email must be of type 'string'`)
		// if (typeof obj.roles !== `number`) console.error(`Error: roles must be a number`)
		// if (typeof obj.lastLogin !== `string`) console.error(`Error: lastLogin must be of type 'string'`)
		// if (typeof obj.accountName !== `string`) console.error(`Error: lastLogin must be of type 'string'`)

		this.id = obj['id']
		this.username = obj['username']
		this.name = obj['account-name']
		this.email = obj['email']
		this.roles = obj['account-type']
		this.lastLogin = obj['last-login']
	}
}
