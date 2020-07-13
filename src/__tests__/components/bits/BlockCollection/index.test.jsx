import React from 'react'
import { shallow, mount } from 'enzyme'
import BlockCollection from '../../../../components/bits/BlockCollection'
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

const props = {
	collection,
	contentIds: [110],
}

describe(`collections test`, () => {

	it(`test render BlockCollection`, ()=> {
		const wrapper = mount(
			<BrowserRouter>
				<BlockCollection {...props} />
			</BrowserRouter>,
		)

		// test header
		expect(wrapper.contains(<p>1 Videos</p>)).toEqual(true)

		wrapper.find(`.block-collection-link`).forEach((node, index) => {
			if(node.props().to !== undefined){
				expect(node.props().children).toEqual(`Collection 1`)
				expect(node.prop(`to`)).toEqual(`/`)
			}
		})

		// arrow onClick simulate
		const elemh4 = wrapper.find(`h4`)
		expect(elemh4.length).toBe(1)
		expect(wrapper.contains(<h4>testname</h4>)).toEqual(true)

		const arrowLeft = wrapper.find({"className" : `left`})
		const arrowRight = wrapper.find({"className" : `right`})
		expect(arrowLeft).toHaveLength(2)
		expect(arrowRight).toHaveLength(2)

		// link mapping test
		wrapper.find(`.slide-wrapper`).forEach((node, index) => {
			if(node.find(Link) !== undefined)
				expect(node.find(Link).props().to).toEqual(`/player/110`)
		})
	})

	it(`BlockCollection scroll test`, ()=> {
		const wrapper = shallow(
			<BlockCollection {...props} />,
		)

		const spyScrollListener = jest.spyOn(wrapper.instance(), `scrollListener`)
		const spyScrollLeft = jest.spyOn(wrapper.instance(), `scrollRight`)
		wrapper.instance().forceUpdate()

		wrapper.find(`.slide-wrapper`).forEach((node, index) => {
			node.props().onScroll({target: {scrollLeft: 5}})
		})
		expect(spyScrollListener).toBeCalled()
	})
})
