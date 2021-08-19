import { Component } from 'react'
import { connect } from 'react-redux'
import {
	authService,
} from 'services'

class LoginContainer extends Component {
	render() {
		return null
	}
}

const mapStoreToProps = ({ authStore, interfaceStore }) => ({
	user: authStore.user,
	loading: authStore.loading,
})

const mapDispatchToProps = {
	login: authService.login,
}

export default connect(mapStoreToProps, mapDispatchToProps)(LoginContainer)
