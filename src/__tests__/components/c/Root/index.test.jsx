import React from 'react'
import { shallow } from 'enzyme'
import Root from '../../../../components/c/Root/index'
import { Route } from 'react-router-dom'

import {
	AdminContainer,
	CollectionsContainer,
	FeedbackContainer,
	LabAssistantContainer,
	LabAssistantManagerContainer,
	LandingContainer,
	ManagerContainer,
	PlayerContainer,
	ManageResourceContainer,
	SearchPublicCollectionsContainer,
	PublicManagerContainer,
	VideoEditorContainer,
	SubtitleEditorContainer,
	ClipEditorContainer,
} from 'containers'

const viewstate = {
	loading: false,
	user: {
		email: `test@test.com`,
		id: 22,
		lastLogin: `last login`,
		name: `test user`,
		roles: 0,
		username: `testusername`,
	},
	modal: {
		active: false,
		collectionId: -1,
		components: null,
		isLabAssistantRoute: false,
	},
	adminEndpoints: [ // 0
		{ endpoints: [`/admin`], element: <AdminContainer /> },
		{ endpoints: [`/public-manager`, `:id`], element: <PublicManagerContainer /> },
	],
	labAssistantEndpoints: [ // 1
		{ endpoints: [`/lab-assistant`], element: <LabAssistantContainer /> },
		{ endpoints: [`/manage-resource`], element: <ManageResourceContainer /> },
		{ endpoints: [`/lab-assistant-manager`, `:professorId`, `:collectionId`], element: <LabAssistantManagerContainer /> },
	],
	instructorEndpoints: [ // 2
		{ endpoints: [`/manager`, `:id`], element: <ManagerContainer /> },
		{ endpoints: [`/videoeditor`, `:id`], element: <VideoEditorContainer /> },
		{ endpoints: [`/subtitleeditor`, `:id`], element: <SubtitleEditorContainer /> },
		{ endpoints: [`/clipeditor`, `:id`], element: <ClipEditorContainer /> },
	],
	studentEndpoints: [ // 3
		{ endpoints: [`/`], element: <CollectionsContainer /> },
		{ endpoints: [`/search-public-collections`], element: <SearchPublicCollectionsContainer /> },
		{ endpoints: [`/player`, `:id`, `:clip`], element: <PlayerContainer /> },
		{ endpoints: [`/feedback`], element: <FeedbackContainer /> },
	],
	unauthEndpoints: [ // no user
		{ endpoints: [`/`], element: <LandingContainer /> },
		{ endpoints: [`/search-public-collections`], element: <SearchPublicCollectionsContainer /> },
	],
}
// routeProps.children.props.children.props.
describe(`root route paring test`, () => {
	it(`should be true`, () => {
		const root = shallow(<Root viewstate={viewstate}/>)
		const pathMap = root.find(Route).reduce((pathMap, route) => {
			const routeProps = route.props()
			if (routeProps.children === undefined) {
				pathMap[routeProps.path] =
					routeProps.element.type.WrappedComponent.name
			} else {
				if (routeProps.children.props.children === undefined) {
					pathMap[`${routeProps.path}/${routeProps.children.props.path}`] =
						routeProps.element.type.WrappedComponent.name
				} else {
					pathMap[`${routeProps.path}/${routeProps.children.props.path}/${routeProps.children.props.children.props.path}`] =
							routeProps.element.type.WrappedComponent.name
				}
			}
			return pathMap

		}, {})

		expect(pathMap[`/`]).toBe(`CollectionsContainer`)
		expect(pathMap[`/admin`]).toBe(`AdminContainer`)
		expect(pathMap[`/lab-assistant`]).toBe(`LabAssistantContainer`)
		expect(pathMap[`/manage-resource`]).toBe(`ManageResourceContainer`)
		expect(pathMap[`/lab-assistant-manager/:professorId/:collectionId`]).toBe(`LabAssistantManagerContainer`)
		expect(pathMap[`/manager/:id`]).toBe(`ManagerContainer`)
		expect(pathMap[`/public-manager/:id`]).toBe(`PublicManagerContainer`)
		expect(pathMap[`/player/:id/:clip`]).toBe(`PlayerContainer`)
		expect(pathMap[`/videoeditor/:id`]).toBe(`VideoEditorContainer`)
		expect(pathMap[`/subtitleeditor/:id`]).toBe(`SubtitleEditorContainer`)
		expect(pathMap[`/clipeditor/:id`]).toBe(`ClipEditorContainer`)
		expect(pathMap[`/feedback`]).toBe(`FeedbackContainer`)
		expect(pathMap[`/search-public-collections`]).toBe(`SearchPublicCollectionsContainer`)
	})
})