import React from 'react'
import { shallow, mount } from 'enzyme'
import BlockCollection from '../../../../components/bits/BlockCollection'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

const collection = {
	archived: false,
	content : [
		{
			contentType: `video`,
			id: 110,
			name: `testname`,
			published: true,
			thumbnail: `test@thumbnail`,
			views: 0,
		},
		{
			contentType: `video2`,
			id: 111,
			name: `testname2`,
			published: true,
			thumbnail: `test2@thumbnail`,
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

		collection.content[1].published = false
		const publishContent = collection.content.filter(item => item.published)
		expect(publishContent.length).toBe(1)
		expect(wrapper.contains(<p>1 Videos</p>)).toEqual(false)

		wrapper.find(`.block-collection-link`).forEach((node, index) => {
			if(node.props().to !== undefined){
				expect(node.props().children).toEqual(`Collection 1`)
				expect(node.prop(`to`)).toEqual(`/`)
			}
		})

		// arrow onClick simulate
		const elemh4 = wrapper.find(`h4`)
		expect(elemh4.length).toBe(2)
		expect(wrapper.contains(<h4>testname</h4>)).toEqual(true)

		const arrowLeft = wrapper.find({"className" : `left`})
		const arrowRight = wrapper.find({"className" : `right`})
		expect(arrowLeft).toHaveLength(1)
		expect(arrowRight).toHaveLength(1)

		// link mapping test
		// TODO: find this again
		wrapper.find(`.slide-wrapper`).forEach((node, index) => {
			// if(node.find(Link) !== undefined)
			// expect(node.find(Link).props()[0].to).toEqual(`/player/110`)

		})
	})

	it(`BlockCollection scroll test`, ()=> {
		const wrapper = shallow(
			<BlockCollection {...props} />,
		)

		const spyScrollListener = jest.spyOn(wrapper.instance(), `scrollListener`)
		const spyScrollLeft = jest.spyOn(wrapper.instance(), `scrollRight`) // eslint-disable-line no-unused-vars
		wrapper.instance().forceUpdate()

		wrapper.find(`.slide-wrapper`).forEach((node, index) => {
			node.props().onScroll({target: {scrollLeft: 5}})
		})
		expect(spyScrollListener).toBeCalled()
	})

	it(`simulate onClick`, ()=> {
		const wrapper = shallow(<BlockCollection {...props}/>)
		wrapper.find(`.slide-wrapper`).simulate(`scroll`, { target: { scrollLeft: 0 } })
	})
})
