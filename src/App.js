import React, { Component } from 'react'

import { Switch, Route, withRouter } from 'react-router-dom'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			auth: false
		}

		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
	}

	componentDidMount = () => {
	}

	login() {
		window.open('https://api.yvideobeta.byu.edu/auth/cas/redirect' + window.location.origin + '/login-success', 'BYU CAS Login')

		// listen for the storage event and update the localStorage from the new window
	}

	logout() {
		this.setState({ auth: false })
	}

	render() {
		return (
			<div>
				{this.state.auth ?
					<button onClick={this.logout}>Log Out</button>
					:
					<button onClick={this.login}>Log In</button>
				}
				<Switch>
					{this.state.auth ?
						<Route path={'/'} component={Test} />
						:
						<Route path={'/'} component={Landing} />
					}
				</Switch>
				<Route exact path={'/login-success'} component={LoginSuccess} />
			</div>
		)
	}
}

export default withRouter(App)

const Test = props => {
	return (
		<div>
			This is the test page.
		</div>
	)
}

const Landing = props => {
	return (
		<div>
			This is the landing page.
		</div>
	)
}

const LoginSuccess = () => {
	// window.self.close()
	console.log('wowee')
	return null
}