import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
	AdminContainer,
	CollectionsContainer,
	HeaderContainer,
	FeedbackContainer,
	LabAssistantContainer,
	LabAssistantManagerContainer,
	LandingContainer,
	MenuContainer,
	ManagerContainer,
	PlayerContainer,
	TrackEditorContainer,
	ManageResourceContainer,
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

		// TODO: route has to be touched mirroring with backend
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

							<Route path='/admin'>
								<AdminContainer />
							</Route>

							<Route path='/collections'>
								<CollectionsContainer />
							</Route>

							<Route path='/lab-assistant'>
								<LabAssistantContainer />
							</Route>

							{/* <Route path='/lab-assistant-resource/:professorId'>
								<ManageResourceContainer />
							</Route> */}

							<Route path='/manage-resource'>
								<ManageResourceContainer />
							</Route>

							<Route path='/lab-assistant-manager/:professorId/:collectionId?'>
								<LabAssistantManagerContainer />
							</Route>

							<Route path='/manager/:id?'>
								<ManagerContainer />
							</Route>

							<Route path='/player/:id'>
								<PlayerContainer />
							</Route>

							<Route path='/trackeditor/:id'>
								<TrackEditorContainer />
							</Route>

							<Route path='/feedback'>
								<FeedbackContainer />
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
