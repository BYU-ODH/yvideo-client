import React from 'react'
import { shallow, mount } from 'enzyme'

import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import BlockItem from '../../../../components/bits/BlockItem/index'
import { Link, BrowserRouter } from 'react-router-dom'

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	disableLifecycleMethods: true,
})

const props = {
	data: {
		contentType: `video`,
		id: 110,
		name: `testname`,
		thumbnail: `test@thumbnail`,
		views: 0,
	},
}

const state = {
	img: `test@thumbbnail`,
	loaded: false,
}

describe(`BlockItem test`, () => {

	it(`test render BlockItem`, ()=> {
		const wrapper = shallow(
			<BlockItem {...props} state={state}/>,
		)

		expect(wrapper.find(Link).props().to).toBe(`/player/110`)
		expect(wrapper.contains(<h4>testname</h4>)).toEqual(true)
	})
})