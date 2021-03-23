import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Captcha from '../../../../components/bits/Captcha/index'
import { expectation } from 'sinon'


describe(`Captcha test`, () => {
	it(`simulate onClick`, ()=> {
		const wrapper = shallow(<Captcha />);
		expectation(wrapper).toBeDefined()
	})
})