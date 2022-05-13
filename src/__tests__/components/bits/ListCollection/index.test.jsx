import React from 'react'
import { shallow, mount } from 'enzyme'
import ListCollection from '../../../../components/bits/ListCollection'
import { Link, BrowserRouter } from 'react-router-dom'

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
			clips: [`item`, `item1`],
		},
		{
			contentType: `video2`,
			id: 111,
			name: `testname2`,
			published: true,
			thumbnail: `test2@thumbnail`,
			views: 0,
			clips: [`item21`, `item22`],
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

describe(`List collection test`, () => {

	it(`test render ListCollection`, ()=> {
		const wrapper = mount(
			<BrowserRouter>
				<ListCollection {...props} />
			</BrowserRouter>,
		)

		collection.content[1].published = false
		const publishContent = collection.content.filter(item => item.published)
		expect(publishContent.length).toBe(1)
		expect(wrapper.contains(<p>2 items</p>)).toEqual(true)
	})

	it(`ListCollection togglePanel test`, ()=> {
		const wrapper = shallow(
			<ListCollection {...props} />,
		)

		const togglePanel = jest.spyOn(wrapper.instance(), `togglePanel`)
		wrapper.instance().forceUpdate()
		wrapper.find(`.list-header`).simulate(`click`)

		expect(togglePanel).toBeCalled()
	})

})
