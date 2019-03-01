import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { getUserAuth, load, loaded, login } from './redux/actions'

import Load from './components/load/Load'

import HeaderRoute from './routes/HeaderRoute'

import Login from './routes/Login'

import Dashboard from './views/dashboard/Dashboard'
import Landing from './views/landing/Landing'
import Collection from './views/Collection'

import Error from './views/error/Error'

class App extends Component {

	componentWillMount = async () => {
		this.props.load()
		try {
			await this.props.getUserAuth(user => {
				console.log('userAuth:\t', user)
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
						<HeaderRoute>
							<Switch>
								<Route exact path={'/'} component={Dashboard} />
								<Route path={'/collections'} component={Collection} />

								<Route render={() => <Error error='404' message={'You\'ve wandered too far'} />} />
							</Switch>
						</HeaderRoute>
						:
						<Switch>
							<Route exact path={'/'} component={Landing} />
							<Route component={Login} />
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
