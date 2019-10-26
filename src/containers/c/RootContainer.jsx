import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// import { getUser, getUserInfo, load, loaded, getAuthCookie } from 'redux/actions'

import { interfaceService } from 'services'

import {
	HeaderRoute,
	Login,
	// Load,
	// Modal,
} from 'components'

// import Dashboard from 'views/dashboard/Dashboard'
// import Landing from 'views/landing/Landing'
// import Collections from 'views/collections/Collections'
// import VideoPage from 'views/player/VideoPage'
// import Admin from 'views/admin/Admin'
// import Manager from 'views/manager/Manager'

// import Error from 'views/error/Error'
// import BasicError from 'views/error/BasicError'

// import { MainBody } from './styles'

import {
	diff,
} from 'lib/util'

class RootContainer extends Component {

	log = false

	shouldComponentUpdate = (nextProps, nextState) => {

		// return didChange(
		// 	this.log,
		// 	`[INFO: RootContainer] shouldComponentUpdate()`,
		// 	this.props,
		// 	nextProps,
		// 	[`authorized`, `loading`, `modal`]
		// )

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
					value: authorizedChanged,
				},
				loadingChanged: {
					value: loadingChanged,
				},
				modalChanged: {
					value: modalChanged,
				},
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

		// if (this.log) console.error(`App: render`)

		const {
			authorized,
			// loading,
			// done,
			// modal
		} = this.props

		return (
			// <MainBody>
			<main>
				<Router>
					{
						authorized ?
							<HeaderRoute>
								<Switch>
									{/* <Route exact path={`/`} component={Dashboard} />
									<Route path={`/collections`} component={Collections} />
									<Route path={`/player/:videoId`} component={VideoPage} />

									<Route path={`/admin/:page`} component={Admin} />

									<Route path={`/manager/:id?`} component={Manager} />

									<Route path='/error/:status' component={BasicError} />

									<Route render={() => <Error error='404' message={`You've wandered too far`} />} /> */}
								</Switch>
							</HeaderRoute>
							:
							<Switch>
								{/* <Route exact path={`/`} component={Landing} /> */}
								<Route component={Login} />
							</Switch>
					}
				</Router>

				{/* {loading && <Load loading={loading} done={done} />} */}
				{/* {modal.active && <Modal active={modal.active} />} */}
			</main>
			// </MainBody>
		)
	}

	componentDidMount = async () => {
		// if (this.log) console.warn(`App: componentDidMount`)

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

const mapStoreToProps = store => ({
	authorized: store.authorized,
	loading: store.loading,
	done: store.done,
	modal: store.modal,
})

const mapDispatchToProps = {
	startLoading: interfaceService.startLoading,
	stopLoading: interfaceService.stopLoading,
	// getUser,
	// getUserInfo,
	// getAuthCookie,
}

export default connect(mapStoreToProps, mapDispatchToProps)(RootContainer)
