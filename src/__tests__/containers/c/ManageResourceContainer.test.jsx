import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/ManageResourceContainer'
import * as testutil from '../../testutil/testutil'
import store from 'services/store'
import ContentService from '../../../services/s/content.redux'
import AuthService from '../../../services/s/auth.redux'
import CollectionsService from '../../../services/s/collections.redux'
import proxies from 'proxy'

const content = testutil.content

const collections = testutil.collections

const props = {
	// searchResource,
	// resources,
	// user,
}

describe(`collection container test`, () => {
	let contentServiceConstructor
	let authServiceConstructor
	let collectionsServiceCostructor
	let dispatch
	let getState
	let apiProxy

	beforeEach(async() => {
		authServiceConstructor = new AuthService()
		contentServiceConstructor = new ContentService()

		dispatch = store.dispatch
		getState = store.getState
		apiProxy = proxies.apiProxy

		proxies.apiProxy.user.get = jest.fn()
		proxies.apiProxy.user.get.mockImplementationOnce(()=>{
			return Promise.resolve(testutil.user)
		})
		await authServiceConstructor.checkAuth()(dispatch, getState, { apiProxy })

		proxies.apiProxy.content.get = jest.fn()
		proxies.apiProxy.content.get.mockImplementationOnce(()=>{
			return Promise.resolve({0: content[0]})
		})
		await contentServiceConstructor.getContent([0], true)(dispatch, getState, { apiProxy })
	})

	it(`collections container check viewstate`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.find(`ManageResource`).props().viewstate

		expect(viewstate.user.email).toBe(`email@testemail.com`)
		expect(viewstate.user.name).toBe(`testname`)
		expect(viewstate.user.username).toBe(`testusername`)

		expect(viewstate.resources.resources[`resourceId`].id).toBe(`resourceId`)
		expect(viewstate.resources.resources[`resourceId`].title).toBe(`resource title`)
		expect(viewstate.resources.resources[`resourceId`].description).toBe(`description`)
	})

	it(`mount`, async() => {
		const wrapper = mount(
			<Provider store={store}>
				<BrowserRouter>
					<Container props={props}/>
				</BrowserRouter>
			</Provider>,
		)

		console.log(wrapper.debug())

		// expect(wrapper.find({className: `list`}).props().children.props.children).toBe(`There are no collections to display`)

		// // getcollection
		// collectionsServiceCostructor = new CollectionsService()
		// proxies.apiProxy.user.collections.get = jest.fn()
		// proxies.apiProxy.user.collections.get.mockImplementationOnce(()=>{
		// 	return Promise.resolve(collections)
		// })
		// await collectionsServiceCostructor.getCollections(true)(dispatch, getState, { apiProxy })

		// // update after getCollectios
		// wrapper.update()
	})
})