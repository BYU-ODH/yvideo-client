import React from 'react'
import { shallow, mount } from 'enzyme'
import Collections from '../../../../components/c/Collections/index'
import BlockCollectionContainer from '../../../../containers/c/BlockCollectionContainer'
import { interfaceService } from 'services'
import { Link, BrowserRouter } from 'react-router-dom'
import * as testutil from '../../../testutil/testutil'
import { Provider } from 'react-redux'

const user = testutil.user

const collection1 = {
	archived: false,
	content : [
		{
			contentType: `video`,
			id: 110,
			name: `testname`,
			thumbnail: `test@thumbnail`,
			views: 0,
		},
		{
			contentType: `video`,
			id: 111,
			name: `testname1`,
			thumbnail: `test1@thumbnail`,
			views: 0,
		},
		{
			contentType: `video`,
			id: 112,
			name: `testname2`,
			thumbnail: `test2@thumbnail`,
			views: 0,
		},
		{
			contentType: `video`,
			id: 113,
			name: `testname3`,
			thumbnail: `test3@thumbnail`,
			views: 0,
		},
		{
			contentType: `video`,
			id: 114,
			name: `testname4`,
			thumbnail: `test4@thumbnail`,
			views: 0,
		},
		{
			contentType: `video`,
			id: 115,
			name: `testname5`,
			thumbnail: `test5@thumbnail`,
			views: 0,
		},
	],
	id: 65,
	name: `Collection 1`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
}
const collection2 = {
	archived: false,
	content : [
		{
			contentType: `video2`,
			id: 110,
			name: `testname2`,
			thumbnail: `test2@thumbnail`,
			views: 0,
		},
	],
	id: 66,
	name: `Collection 2`,
	owner: 22,
	published: true,
	thumbnail: `test2@thumbnail`,
}

const viewstate = {
	collections: [
		collection1,
		collection2,
	],
	contentIds: [110],
	user,
	allPublic: [{ isSubscribed: true }],
	publicCollections: [
		collection1,
		collection2,
	],
}

const collectionsProps = {
	viewstate,
	handlers: interfaceService.toggleCollectionsDisplay,
}

const props = {
	collection: collection1,
	contentIds: [110],
}

describe(`collections test`, () => {
	it(`Link pair with manage collections`, ()=> {
		const wrapper = shallow(
			<Collections {...collectionsProps}/>,
		)

		const linkMap = wrapper.find(Link).reduce((linkMap, link) => {
			const linkProps = link.props()
			linkMap[linkProps.to] = linkProps.children
			return linkMap
		}, {})

		expect(linkMap[`/manager`]).toBe(`Manage Collections`)
	})

	it(`test render BlockCollection`, ()=> {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<BlockCollectionContainer {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		const elem = wrapper.find(`h4`)
		expect(elem.length).toBe(0)

		const arrowLeft = wrapper.find({"className" : `left`})
		const arrowRight = wrapper.find({"className" : `right`})
		expect(arrowLeft).toHaveLength(1)
		expect(arrowRight).toBeDefined()
	})
})