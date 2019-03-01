import { Component } from 'react'
import { connect } from 'react-redux'

import { login, getUserAuth } from './../redux/actions'

import cookies from './../cookies'

export class Login extends Component {
	componentWillMount = () => {
		if (cookies.get('auth') !== 'true')
			this.caslogin()
	}

	caslogin = () => {
		const url = process.env.REACT_APP_YVIDEO_SERVER + '/auth/cas/redirect' + window.location.origin + '/success'
		const name = 'BYU CAS Secure Login'
		const popup = window.open(url, name, 'width=930,height=750')

		const popuppoll = setInterval(() => {
			try {
				if (popup.location.origin === window.location.origin || popup.closed) {
					clearInterval(popuppoll)
					popup.close()
					this.checkAuth()
				}
			} catch (e) { }
		}, 500)
	}

	checkAuth = async () => {
		try {
			await this.props.getUserAuth(user => {
				console.log(this.props.userAuth)
				this.props.login()
				cookies.set('auth', true, 30)
				console.log(user)
			})
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return null
	}
}

const mapStateToProps = state => ({
	loading: state.loading
})

const actionCreators = {
	login,
	getUserAuth
}

export default connect(mapStateToProps, actionCreators)(Login)
