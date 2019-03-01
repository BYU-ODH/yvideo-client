import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { getUserAuth, load, loaded, login } from './redux/actions'

import Load from './components/load/Load'

import Login from './routes/Login'
import Dashboard from './views/Dashboard'
import Landing from './views/Landing'
import Collection from './views/Collection'

class App extends Component {

	componentWillMount = async () => {
		this.props.load()

		try {
			await this.props.getUserAuth(user => {
				console.log(user)
				this.props.login()
			})
		} catch (message) {
			console.log(message)
		}
	}

	render = () =>
		<div>
			<BrowserRouter>
				{
					this.props.authorized ?
						<Switch>
							<Route exact path={'/'} component={Dashboard} />
							<Route path={'/collection'} component={Collection} />
						</Switch>
						:
						<Switch>
							<Route exact path={'/'} component={Landing} />
							<Route exact component={Login} />
						</Switch>
				}
			</BrowserRouter>

			{this.props.loading && <Load loading={this.props.loading} done={this.props.done} />}
		</div>
}

const mapStateToProps = state => {
	return {
		authorized: state.authorized,
		loading: state.loading,
		done: state.done,
		userAuth: state.userAuth
	}
}

const actionCreators = {
	getUserAuth,
	load,
	loaded,
	login
}

export default connect(mapStateToProps, actionCreators)(App)
