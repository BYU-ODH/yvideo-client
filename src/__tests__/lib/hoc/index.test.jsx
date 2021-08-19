import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Component from '../../../lib/hoc/withLogs'

const props = {
	test: ''
}

describe(`AccordionMenu test`, () => {
	it(`wrapper`, ()=> {
		let wrapper = shallow(<Component {...props} showLogs={true} />);
		expect(wrapper).toBeDefined();
	})
})
