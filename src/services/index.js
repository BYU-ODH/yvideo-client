import AuthService from './s/auth.redux'
import InterfaceService from './s/interface.redux'
import CollectionService from './s/collections.redux'

export const authService = new AuthService()
export const interfaceService = new InterfaceService()
export const collectionService = new CollectionService()

const services = {
	authService,
	interfaceService,
	collectionService,
}

export default services
