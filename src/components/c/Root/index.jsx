import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
	ManageResourceContainer,
	SearchPublicCollectionsContainer,
	PublicManagerContainer,
	ClipEditorContainer,
	VideoEditorContainer,
	SubtitlesEditorContainer,
} from 'containers'

import {
	Load,
	Error,
} from 'components'

import {
	Modal,
	Tooltip,
} from 'components/bits'

// const testPrint = () =>{
// 	const stuff = (
// 	<>
// 		<Routes>
// 			<Route path='/' element={<LandingContainer />} />
// 			<Route path='/search-public-collections' element={<SearchPublicCollectionsContainer />}/>
// 			<Route element={<Error error='404' message={`You've wandered too far`} />}/>
// 		</Routes>
// 	</>
// 	)
// 	return stuff
// }
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
						<Routes>

							<Route path='/' element={<CollectionsContainer />}/>
							<Route path='/search-public-collections' element={<SearchPublicCollectionsContainer />}/>

							{
								user.roles === 0 &&
								<Route path='/admin' element={<AdminContainer />}/>
							}

							{
								user.roles < 3 &&
							<Route path='/lab-assistant' element={<LabAssistantContainer />}/>
							}

							<Route path='/collections' element={<CollectionsContainer />}/>

							{
								user.roles < 3 &&
								<Route path='/manage-resource' element={<ManageResourceContainer />}/>
							}
							{
								user.roles < 3 &&
								<Route path='/lab-assistant-manager' element={<LabAssistantManagerContainer />}>
									<Route path=':professorId' element={<LabAssistantManagerContainer />}>
										<Route path=':collectionId' element={<LabAssistantManagerContainer />}/>
									</Route>
								</Route>
							}
							{
								user.roles < 3 &&
								<Route path='/manager' element={<ManagerContainer />}>
									<Route path =':id' element={<ManagerContainer />}/>
								</Route>
							}
							{
								user.roles < 3 &&
								<Route path='/public-manager' element={<PublicManagerContainer />}>
									<Route path=':id' element={<PublicManagerContainer />}/>
								</Route>
							}

							<Route path='/player' element={<PlayerContainer />}>
								<Route path=':id' element={<PlayerContainer />}>
									<Route path=':clip' element={<PlayerContainer />}/>
								</Route>
							</Route>
							{
								user.roles < 3 &&
								<Route path='/videoeditor' element={<VideoEditorContainer />}>
									<Route path=':id' element={<VideoEditorContainer />}/>
								</Route>
							}

							<Route path='/subtileeditor'>
								<Route path=':id' element={<SubtitlesEditorContainer />}/>
							</Route>

							<Route path='/clipeditor' element={<ClipEditorContainer />}>
								<Route path=':id' element={<ClipEditorContainer />}/>
							</Route>

							{
								user.roles < 3 &&
								<Route path='/clipeditor' element={<ClipEditorContainer />}>
									<Route path=':id' element={<ClipEditorContainer />}/>
								</Route>
							}
							<Route path='/feedback' element={<FeedbackContainer />}/>

							<Route element={<Error error='404' message={`You've wandered too far`} />}/>
						</Routes>
					</>
					:
					(
						<>
							<Routes>
								<Route path='/' element={<LandingContainer />} />
								<Route path='/search-public-collections' element={<SearchPublicCollectionsContainer />}/>
								<Route element={<Error error='404' message={`You've wandered too far`} />}/>
							</Routes>
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
