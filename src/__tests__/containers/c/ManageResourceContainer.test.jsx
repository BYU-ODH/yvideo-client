import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/ManageResourceContainer'
import * as testutil from '../../testutil/testutil'
import store from 'services/store'
import AuthService from '../../../services/s/auth.redux'
import ResourceService from '../../../services/s/resources.redux'
import proxies from 'proxy'

const resources = testutil.resourcesNew

const props = {
	searchResource: jest.fn(),
	resources,
	user: testutil.user,
}

const resourcesResult = {
	"0b93692f-35ee-4c9b-a4c9-273197f681c5": {
		allFileVersions: `English;Spanish;Korean;`,
		copyrighted: true,
		dateValidated: ``,
		fullVideo: true,
		id: `0b93692f-35ee-4c9b-a4c9-273197f681c5`,
		metadata: `test3`,
		physicalCopyExists: true,
		published: true,
		requesterEmail: `test@email.com`,
		resourceName: `test with file3`,
		resourceType: `video`,
		views: 0,
	},
}

proxies.apiProxy.user.get = jest.fn()
proxies.apiProxy.user.get.mockImplementationOnce(() => {
	return Promise.resolve(testutil.user)
})

proxies.apiProxy.resources.search = jest.fn()
proxies.apiProxy.resources.search.mockImplementation(() => {
	return Promise.resolve(resourcesResult)
})

describe(`collection container test`, () => {
	let authServiceConstructor
	let dispatch
	let getState
	let apiProxy

	beforeEach(async() => {
		authServiceConstructor = new AuthService()
		dispatch = store.dispatch
		getState = store.getState
		apiProxy = proxies.apiProxy
		await authServiceConstructor.checkAuth()(dispatch, getState, { apiProxy })
	})

	it(`collections container check viewstate`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.find(`ManageResource`).props().viewstate

		expect(viewstate.user.email).toBe(`email@testemail.com`)
		expect(viewstate.user.name).toBe(`testname`)
		expect(viewstate.user.username).toBe(`testusername`)
		expect(viewstate.resources).toEqual(resources)
	})

	it(`mount`, async() => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container props={props}/>
				</BrowserRouter>
			</Provider>,
		)

		expect(wrapper.find(`ResourceOverviewContainer`).length).toBe(2)

		wrapper.find({id: `resource-search-input`}).simulate(`change`, {target: {value: `search text`}})
		expect(wrapper.find({id: `resource-search-input`}).props().value).toBe(`search text`)

		wrapper.find({id: `searchSubmit`}).at(0).simulate(`click`)
	})
})
