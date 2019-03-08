import { Component } from 'react'
import { cookies } from '../util'
import { connect } from 'react-redux'

import { load, login, getUser, getUserAuth } from '../redux/actions'

export class Login extends Component {
	componentWillMount = () => {
		this.props.load()

		try {
			if (cookies.get('auth') !== 'true')
				this.caslogin()
		} catch (error) {
			console.error(error)
		}
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
					this.checkAuth().then(() => {
						this.props.history.push('/')
					})
				}
			} catch (e) { }
		}, 500)
	}

	checkAuth = async () => {
		try {
			await this.props.getUserAuth(user => {
				this.props.getUser()
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
	load,
	login,
	getUser,
	getUserAuth
}

export default connect(mapStateToProps, actionCreators)(Login)
