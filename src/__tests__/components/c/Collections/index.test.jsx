import React from 'react'
import { shallow, mount } from 'enzyme'
import Collections from '../../../../components/c/Collections/index'
import BlockCollection from '../../../../components/bits/BlockCollection'
import { interfaceService } from 'services'
import { Link, BrowserRouter } from 'react-router-dom'

const collection = {
	archived: false,
	content : [
		{
			contentType: `video`,
			id: 110,
			name: `testname`,
			thumbnail: `test@thumbnail`,
			views: 0,
		},
	],
	id: 65,
	name: `Collection 1`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
}

const viewstate = {
	collections: {
		collection,
	},
	contentIds: [110],
	displayBlocks: true,
	isAdmin: true,
	isProf: false,
}

const collectionsProps = {
	viewstate,
	handlers: interfaceService.toggleCollectionsDisplay,
}

const props = {
	collection,
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

	// it(`test render BlockCollection`, ()=> {
	// 	const wrapper = mount(
	// 		<BrowserRouter>
	// 			<BlockCollection {...props}/>
	// 		</BrowserRouter>,
	// 	)

	// 	const elem = wrapper.find(`h4`)
	// 	expect(elem.length).toBe(0)
	// 	expect(wrapper.contains(<h4>testname</h4>)).toEqual(true)

	// 	const arrowLeft = wrapper.find({"className" : `left`})
	// 	const arrowRight = wrapper.find({"className" : `right`})
	// 	expect(arrowLeft).toHaveLength(2)
	// 	expect(arrowRight).toHaveLength(2)
	// })
})