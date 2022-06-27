import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/ListCollectionContainer'
import { PublicButton } from '../../../components/c/ListCollection/styles'
import * as testutil from '../../testutil/testutil'

const collection1 = testutil.collection1
const collection7 = testutil.collection7
const collection8 = testutil.collection8

describe(`ListCollectionContainer test`, () => {
	it(`wrapper: currentTime >= start && currentTime <= end)`, () => {
		const props = {
			isAdmin: true,
			collection: collection1,
			defaultSubscription: true,
		}
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
		expect(wrapper.contains(<h3>Collection 1</h3>))
		expect(wrapper.contains(<p>2 items</p>))
		// user.roles < 4, isOwner == true
		expect(wrapper.contains(<h3>You own this collection</h3>))
		expect(wrapper.contains(<h4>testname</h4>))

	})
	it(`not owner, isSubscribed == true`, () => {
		const props = {
			isAdmin: true,
			isOwner: false,
			collection: collection8,
			defaultSubscription: true,
		}
		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
		wrapper.find(PublicButton).simulate(`click`)
		expect(wrapper.contains(<h3>Unsubscribe</h3>))
		expect(wrapper.contains(<p>This collection has no content</p>))
	})
	it(`not owner, isSubscribed == false`, () => {
		const props = {
			isAdmin: true,
			collection: collection7,
			defaultSubscription: false,
		}
		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper.contains(<h3>Subscribe</h3>))
	})
})