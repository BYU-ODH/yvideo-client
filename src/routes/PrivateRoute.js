import React from 'react'
import { connect } from 'react-redux'

import {
	login,
	logout,
	getUserAuth
} from '../redux/actions'

class PrivateRoute extends React.Component {

	componentDidMount = () => {
		this.checkAuth()
	}

	componentWillUnmount = () => {
		this.caslogout()
	}

	caslogin = () => {
		const url = process.env.REACT_APP_YVIDEO_SERVER + '/auth/cas/redirect' + window.location.origin + '/login-success'
		const name = 'BYU CAS Secure Login'
		const popup = window.open(url, name, 'width=930,height=750')

		const popuppoll = setInterval(() => {
			try {
				if (popup.location.origin === window.location.origin || popup.closed) {
					popup.close()
					this.props.login()
					this.checkAuth()
					clearInterval(popuppoll)
				}
			} catch (e) { }
		}, 500)
	}

	caslogout = async () => {
		const url = process.env.REACT_APP_YVIDEO_SERVER + '/auth/logout'
		const name = 'Logging you out...'
		const popup = window.open(url, name, 'width=930,height=750')

		const popuppoll = setInterval(() => {
			try {
				if (popup.location.origin === window.location.origin || popup.closed) {
					clearInterval(popuppoll)
					popup.close()
					window.location.reload()
				}
			} catch (e) { }
		}, 500)
	}

	checkAuth = async () => {
		try {
			await this.props.getUserAuth()
			console.log(this.props.userAuth)
		} catch (error) {
			this.caslogin()
		}
	}

	render = () => {
		return (
			<React.Fragment>
				{/* <Header /> */}
				{/* <Menu stateVars={rest.stateVars} /> */}
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		userAuth: state.userAuth
	}
}

const mapDispatchToProps = {
	login,
	logout,
	getUserAuth
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)