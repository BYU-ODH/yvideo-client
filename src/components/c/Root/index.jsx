import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
	AdminContainer,
	CollectionsContainer,
	HeaderContainer,
	LabAssistantContainer,
	LabAssistantManagerContainer,
	LandingContainer,
	MenuContainer,
	ManagerContainer,
	PlayerContainer,
	TrackEditorContainer,
	ManageResourceContainer,
	SearchPublicCollectionsContainer,
	PublicManagerContainer,
} from 'containers'

import {
	Load,
	Error,
} from 'components'

import {
	Modal,
	Tooltip,
} from 'components/bits'

class Root extends PureComponent {

	render() {

		const {
			user,
			loading,
			modal,
			tip,
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

							{/* TODO: need to double check */}
							<Route exact path='/search-public-collections' >
								<SearchPublicCollectionsContainer />
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

							<Route path='/public-manager/:id?'>
								<PublicManagerContainer />
							</Route>

							<Route path='/player/:id'>
								<PlayerContainer />
							</Route>

							<Route path='/trackeditor/:id'>
								<TrackEditorContainer />
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
				<Tooltip/>
			</Router>
		)
	}
}

export default Root
