import AuthService from './s/auth'
import UserService from './s/user'
import InterfaceService from './s/interface'

export const authService = new AuthService()
export const userService = new UserService()
export const interfaceService = new InterfaceService()

const services = {
	authService,
	userService,
	interfaceService,
}

export default services