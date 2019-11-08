import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
	LandingContainer,
	DashboardContainer,
	HeaderContainer,
	MenuContainer,
} from 'containers'

import { Load } from 'components'

class RootComponent extends PureComponent {

	render() {

		const {
			user,
			loading,
			// modal,
		} = this.props.viewstate

		return (
			<Router>
				{user ?
					<>
						<HeaderContainer />
						<MenuContainer />
						<Switch>

							<Route exact path='/' >
								<DashboardContainer />
							</Route>

							<Route path='/collections'>
								<span style={{ position: `relative`, top: `10rem` }}>Collections</span>
								{/* <Collections /> */}
							</Route>

							<Route path='player/:id'>
								<span style={{ position: `relative`, top: `10rem` }}>Player</span>
								{/* <Player /> */}
							</Route>

							<Route path='/manager/:id?'>
								<span style={{ position: `relative`, top: `10rem` }}>Manager</span>
								{/* <Manager /> */}
							</Route>

							<Route path='/admin/:page'>
								<span style={{ position: `relative`, top: `10rem` }}>Admin</span>
								{/* <Admin /> */}
							</Route>

							<Route path='/success'>
								<PostMessage />
							</Route>

							<Route>
								<span style={{ position: `relative`, top: `10rem` }}>Error</span>
								{/* <Error error='404' message={`You've wandered too far`} /> */}
							</Route>

						</Switch>
					</>
					:
					<LandingContainer />
				}

				<Load loading={loading} />
				{/* <Modal active={modal.active} /> */}
			</Router>
		)
	}
}

const PostMessage = () => {
	window.postMessage(`done`, window.location.origin)
	return <span style={{ position: `relative`, top: `10rem` }}>Success</span>
}

export const Root = RootComponent
