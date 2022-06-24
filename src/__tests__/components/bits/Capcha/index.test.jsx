import React from 'react'
import Captcha from '../../../../components/bits/Captcha/index'
import { render, cleanup } from '@testing-library/react'

const props = {
	handleCaptchaChange: jest.fn(),
}

const wrapper = <Captcha {...props} />

describe(`Captcha test`, () => {
	beforeEach(() => {
		render(wrapper)
	})
	afterEach(() => {
		cleanup()
	})
	it(`test wrapper`, () => {
		expect(wrapper).toBeDefined()
	})
})