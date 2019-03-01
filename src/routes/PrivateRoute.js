import React from 'react'
import { connect } from 'react-redux'

import {
	login,
	logout,
	getUserAuth
} from '../redux/actions'

class PrivateRoute extends React.Component {

	caslogin = () => {
		const url = process.env.REACT_APP_YVIDEO_SERVER + '/auth/cas/redirect' + window.location.origin + '/login-success'
		const name = 'BYU CAS Secure Login'
		const popup = window.open(url, name, 'width=930,height=750')

		const popuppoll = setInterval(() => {
			try {
				if (popup.location.origin === window.location.origin || popup.closed) {
					clearInterval(popuppoll)
					popup.close()
					this.props.login()
					this.checkAuth()
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
					this.props.logout()
					// window.location.reload()
				}
			} catch (e) { }
		}, 500)
	}

	render = () => {
		if (this.props.authorized) {
			return (
				<div>
					<button onClick={this.caslogout}>Log Out</button>
					{this.props.children}
				</div>
			)
		} else
			return null
	}
}

const mapStateToProps = state => {
	return {
		authorized: state.authorized,
		userAuth: state.userAuth
	}
}

const actionCreators = {
	login,
	logout,
	getUserAuth
}

export default connect(mapStateToProps, actionCreators)(PrivateRoute)