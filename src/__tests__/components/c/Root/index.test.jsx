import React from 'react'
import { shallow } from 'enzyme'
import Root from '../../../../components/c/Root/index'
import { Route } from 'react-router-dom'

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
		isLabAssistantRoute:false,
	},
}
// routeProps.children.props.children.props.
describe(`root route paring test`, () => {
	it(`should be true`, ()=> {
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
		expect(pathMap[`/collections`]).toBe(`CollectionsContainer`)
		expect(pathMap[`/lab-assistant`]).toBe(`LabAssistantContainer`)
		expect(pathMap[`/manage-resource`]).toBe(`ManageResourceContainer`)
		expect(pathMap[`/lab-assistant-manager/:professorId/:collectionId`]).toBe(`LabAssistantManagerContainer`)
		expect(pathMap[`/manager/:id`]).toBe(`ManagerContainer`)
		expect(pathMap[`/public-manager/:id`]).toBe(`PublicManagerContainer`)
		expect(pathMap[`/player/:id/:clip`]).toBe(`PlayerContainer`)
		expect(pathMap[`/videoeditor/:id`]).toBe(`VideoEditorContainer`)
		expect(pathMap[`/subtitleeditor/:id`]).toBe(`SubtitlesEditorContainer`)
		expect(pathMap[`/clipeditor/:id`]).toBe(`ClipEditorContainer`)
		expect(pathMap[`/feedback`]).toBe(`FeedbackContainer`)
		expect(pathMap[`/search-public-collections`]).toBe(`SearchPublicCollectionsContainer`)
	})
})