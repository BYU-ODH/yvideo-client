import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { getUser, getUserAuth, load, loaded, login } from './redux/actions'

import Load from './components/load/Load'

import HeaderRoute from './routes/HeaderRoute'

import Login from './routes/Login'

import Dashboard from './views/dashboard/Dashboard'
import Landing from './views/landing/Landing'
import Collections from './views/collections/Collections'

import Error from './views/error/Error'

class App extends Component {

	componentDidMount = async () => {
		const { load, getUserAuth, getUser, login } = this.props
		load()
		try {
			await getUserAuth(() => {
				login()
				getUser()
			})
		} catch (message) {
			console.log(message)
		}
	}

	render = () => {
		const { authorized, loading, done } = this.props
		return (
			<div>
				<BrowserRouter>
					{
						authorized ?
							<HeaderRoute>
								<Switch>
									<Route exact path={`/`} component={Dashboard} />
									<Route path={`/collections`} component={Collections} />

									<Route render={() => <Error error='404' message={`You've wandered too far`} />} />
								</Switch>
							</HeaderRoute>
							:
							<Switch>
								<Route exact path={`/`} component={Landing} />
								<Route component={Login} />
							</Switch>
					}
				</BrowserRouter>

				{loading && <Load loading={loading} done={done} />}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	authorized: state.authorized,
	loading: state.loading,
	done: state.done,
	userAuth: state.userAuth
})

const mapDispatchToProps = {
	getUser,
	getUserAuth,
	load,
	loaded,
	login
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
