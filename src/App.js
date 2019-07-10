import React, { Component, memo } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { getUser, getUserInfo, load, loaded, getAuthCookie } from 'redux/actions'

import Load from 'components/load/Load'

import Modal from 'components/modal/Modal'
import CreateCollection from 'components/forms/CreateCollection'

import HeaderRoute from 'routes/HeaderRoute'

import Login from 'routes/Login'

import Dashboard from 'views/dashboard/Dashboard'
import Landing from 'views/landing/Landing'
import Collections from 'views/collections/Collections'
import VideoPage from 'views/player/VideoPage'
import Admin from 'views/admin/Admin'
import Manager from 'views/manager/Manager'

import Error from 'views/error/Error'

import { MainBody } from './styles'

class App extends Component {

	componentDidMount = async () => {
		const { load, getUserInfo, getUser, getAuthCookie } = this.props
		load()
		try {
			await getUserInfo(async () => {
				await getUser()
				await getAuthCookie()
			})
		} catch (message) {
			console.log(message)
		}
	}

	render = () => {
		const { authorized, loading, done, modalActive } = this.props
		return (
			<MainBody>
				<Router>
					{
						authorized ?
							<HeaderRoute>
								<Switch>
									<Route exact path={`/`} component={Dashboard} />
									<Route path={`/collections`} component={Collections} />
									<Route path={`/player/:videoId`} component={VideoPage} />

									<Route path={`/admin/:page`} component={Admin} />

									<Route path={`/manager/:id?`} component={Manager} />

									<Route render={() => <Error error='404' message={`You've wandered too far`} />} />
								</Switch>
							</HeaderRoute>
							:
							<Switch>
								<Route exact path={`/`} component={Landing} />
								<Route component={Login} />
							</Switch>
					}
				</Router>

				{loading && <Load loading={loading} done={done} />}
				{modalActive && <Modal active={modalActive} component={CreateCollection} />}
			</MainBody>
		)
	}
}

const mapStateToProps = ({ authorized, loading, done, userInfo, modalActive }) =>
	({ authorized, loading, done, userInfo, modalActive })

const mapDispatchToProps = {
	getUser,
	getUserInfo,
	load,
	loaded,
	getAuthCookie
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(App))
