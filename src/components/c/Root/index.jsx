import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
	LandingContainer,
	CollectionsContainer,
	HeaderContainer,
	MenuContainer,
} from 'containers'

import { Load } from 'components'

class Root extends PureComponent {

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
								<CollectionsContainer />
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

export default Root
