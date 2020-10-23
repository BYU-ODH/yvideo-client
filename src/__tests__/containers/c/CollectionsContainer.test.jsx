import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/CollectionsContainer'
import * as testutil from '../../testutil/testutil'
import store from 'services/store'
import ContentService from '../../../services/s/content.redux'
import AuthService from '../../../services/s/auth.redux'
import CollectionsService from '../../../services/s/collections.redux'
import proxies from 'proxy'

const content = testutil.content

const collections = testutil.collections

const props = {
	collections,
	content,
	displayBlocks: false,
	getCollections: jest.fn(),
	getContent: jest.fn(),
	isAdmin: true,
	isProf: false,
	setHeaderBorder: jest.fn(),
	toggleCollectionsDisplay: jest.fn(),
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

		const viewstate = wrapper.find(`Collections`).props().viewstate

		expect(viewstate.isProf).toBe(false)
		expect(viewstate.isAdmin).toBe(true)

		expect(viewstate.collections[0].archived).toBe(false)
		expect(viewstate.collections[0].id).toBe(0)
		expect(viewstate.collections[0].name).toBe(`Collection 1`)
		expect(viewstate.collections[0].owner).toBe(22)
		expect(viewstate.collections[0].published).toBe(true)
		expect(viewstate.collections[0].thumbnail).toBe(`test@thumbnail`)
	})

	it(`mount`, async() => {
		const wrapper = mount(
			<Provider store={store}>
				<BrowserRouter>
					<Container props={props}/>
				</BrowserRouter>
			</Provider>,
		)

		expect(wrapper.find({className: `list`}).props().children.props.children).toBe(`There are no collections to display`)

		// getcollection
		collectionsServiceCostructor = new CollectionsService()
		proxies.apiProxy.user.collections.get = jest.fn()
		proxies.apiProxy.user.collections.get.mockImplementationOnce(()=>{
			return Promise.resolve(collections)
		})
		await collectionsServiceCostructor.getCollections(true)(dispatch, getState, { apiProxy })

		// update after getCollectios
		wrapper.update()
	})
})