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
		roles: [`admin`],
		username: `testusername`,
	},
	modal: {
		active: false,
		collectionId: -1,
		components: null,
		isLabAssistantRoute:false,
	},
}

describe(`root route paring test`, () => {
	it(`should be true`, ()=> {
		const root = shallow(<Root viewstate={viewstate}/>)
		const pathMap = root.find(Route).reduce((pathMap, route) => {
			const routeProps = route.props()
			pathMap[routeProps.path] = routeProps.children.type.WrappedComponent.name
			return pathMap
		}, {})

		expect(pathMap[`/`]).toBe(`CollectionsContainer`)
		expect(pathMap[`/admin`]).toBe(`AdminContainer`)
		expect(pathMap[`/collections`]).toBe(`CollectionsContainer`)
		expect(pathMap[`/lab-assistant`]).toBe(`LabAssistantContainer`)
		expect(pathMap[`/lab-assistant-manager/:professorId/:collectionId?`]).toBe(`LabAssistantManagerContainer`)
		expect(pathMap[`/manager/:id?`]).toBe(`ManagerContainer`)
		expect(pathMap[`/player/:id`]).toBe(`PlayerContainer`)
	})
})