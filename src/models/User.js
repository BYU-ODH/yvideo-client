export default class User {

	id
	username
	name
	email
	roles
	lastLogin
	accountName

	constructor(obj) {

		this.id = obj[`id`]
		this.username = obj[`username`]
		this.name = obj[`account-name`]
		this.email = obj[`email`]

		/*
			account-type
			0 = admin
			1 = lab assistant
			2 = faculty / instructor
			3 = student
		*/
		this.roles = obj[`account-type`]
		this.lastLogin = obj[`last-login`]
	}
}
