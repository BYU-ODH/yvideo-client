import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Captcha from '../../../../components/bits/Captcha/index'

describe(`Captcha test`, () => {
	it(`test wrapper`, ()=> {
		const wrapper = shallow(<Captcha />)
		expect(wrapper).toBeDefined()
	})
})