import UserService from './s/user'
import InterfaceService from './s/interface'

const services = {
	userService: new UserService(),
	interfaceService: new InterfaceService(),
}

export default services