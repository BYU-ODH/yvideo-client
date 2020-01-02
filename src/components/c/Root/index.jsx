import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
	AdminContainer,
	LandingContainer,
	CollectionsContainer,
	HeaderContainer,
	MenuContainer,
	ManagerContainer,
} from 'containers'

import {
	Load,
	Error,
} from 'components'

import {
	Modal,
} from 'components/bits'

class Root extends PureComponent {

	render() {

		const {
			user,
			loading,
			modal,
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

							<Route path='/player/:id'>
								<span style={{ position: `relative`, top: `10rem` }}>Player</span>
								{/* <PlayerContainer /> */}
							</Route>

							<Route path='/manager/:id?'>
								<ManagerContainer />
							</Route>

							<Route path='/admin/:page'>
								<AdminContainer />
							</Route>

							<Route>
								<Error error='404' message={`You've wandered too far`} />
							</Route>

						</Switch>
					</>
					:
					<LandingContainer />
				}

				<Load loading={loading} />
				<Modal active={modal.active} />
			</Router>
		)
	}
}

export default Root
