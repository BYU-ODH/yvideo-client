import React, { Component } from 'react'
import { connect } from 'react-redux'

import { logout, load } from '../../redux/actions'

import { LogoutButtonContainer } from './styles'

import { cookies } from './../../util'

import axios from 'axios'

class LogoutButton extends Component {

	logoutAxios = async () => {
		this.props.load()
		const url = process.env.REACT_APP_YVIDEO_SERVER + '/auth/logout'
		await axios(url, { withCredentials: true })
			.then(async result => {
				console.log(result)
				await this.logoutClient().then(() => {
					window.location.replace('/')
				})
			})
			.catch(() => {
				console.log('Couldn\'t logout.')
			})
	}

	logoutClient = async () => {
		await cookies.delete('auth')
		await this.props.logout()
	}

	logoutCas = () => {
		this.props.load()

		const url = process.env.REACT_APP_YVIDEO_SERVER + '/auth/logout/redirect' + window.location.origin + '/success'
		const name = 'Logging you out...'
		const popup = window.open(url, name, 'width=930,height=750')

		const popuppoll = setInterval(async () => {
			try {
				if (popup.location.origin === window.location.origin || popup.closed) {
					clearInterval(popuppoll)
					popup.close()
					await this.logoutClient().then(() => {
						window.location.replace('/')
					})
				}
			} catch (e) { }
		}, 500)
	}

	render() {
		const { children } = this.props
		return (
			<LogoutButtonContainer onClick={this.logoutCas}>{children}</LogoutButtonContainer>
		)
	}
}

const actionCreators = {
	logout,
	load
}

export default connect(null, actionCreators)(LogoutButton)
