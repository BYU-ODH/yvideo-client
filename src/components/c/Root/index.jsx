import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

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
	SearchPublicCollectionsContainer,
	PublicManagerContainer,
	ClipEditorContainer,
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

							<Route path='/player/:id/:clip?'>
								<PlayerContainer />
							</Route>

							<Route path='/trackeditor/:id'>
								<TrackEditorContainer />
							</Route>

							<Route path='/clipeditor/:id'>
								<ClipEditorContainer />
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
					(
						<>
							<Switch>
								<Route exact path='/'>
									<LandingContainer />
								</Route>
								<Route exact path='/search-public-collections' >
									{/* <MenuContainer /> */}
									<SearchPublicCollectionsContainer />
								</Route>
								<Route>
									<Error error='404' message={`You've wandered too far`} />
								</Route>
							</Switch>
						</>
					)
				}

				<Load loading={loading} />
				<Modal active={modal.active} />
				<Tooltip/>
			</Router>
		)
	}
}

export default Root
