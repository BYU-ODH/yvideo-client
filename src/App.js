import React, { Component, memo } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { getUser, getUserInfo, load, loaded, getAuthCookie } from 'redux/actions'

import Load from 'components/load/Load'

import Modal from 'components/modal/Modal'

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

import {
	// objectIsEmpty,
	diff
} from 'js/util'

class App extends Component {

	log = true

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.log) console.groupCollapsed(`App: shouldComponentUpdate`)

		const propsDiff = diff(this.props, nextProps)
		const stateDiff = diff(this.state, nextState)

		if (this.log) console.log(`props changes:`, propsDiff)
		if (this.log) console.log(`state changes:`, stateDiff)

		const authorizedChanged = propsDiff.hasOwnProperty(`authorized`)
		const loadingChanged = propsDiff.hasOwnProperty(`loading`)
		const modalChanged = propsDiff.hasOwnProperty(`modal`)

		if (this.log) {
			console.table({
				authorizedChanged: {
					value: authorizedChanged
				},
				loadingChanged: {
					value: loadingChanged
				},
				modalChanged: {
					value: modalChanged
				}
			})
		}

		const changed = authorizedChanged
			|| loadingChanged
			|| modalChanged

		if (this.log) console.log(`%c ${changed ? `RENDER` : `NO RENDER`} `, `background: ${changed ? `Maroon` : `Teal`}`)

		if (this.log) console.groupEnd(`App: shouldComponentUpdate`)

		return changed
	}

	render = () => {

		if (this.log) console.error(`App: render`)

		const { authorized, loading, done, modal } = this.props
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
				{modal.active && <Modal active={modal.active} />}
			</MainBody>
		)
	}

	componentDidMount = async () => {
		if (this.log) console.warn(`App: componentDidMount`)

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

}

const mapStateToProps =
	({ authorized, loading, done, modal }) =>
		({ authorized, loading, done, modal })

const mapDispatchToProps = {
	getUser,
	getUserInfo,
	load,
	loaded,
	getAuthCookie
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(App))
