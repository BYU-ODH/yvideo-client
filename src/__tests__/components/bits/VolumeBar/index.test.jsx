import React from 'react'
import { shallow, mount } from 'enzyme'
import Bar from '../../../../components/bits/VolumeBar/index'
import Style, { BarBall, BarCurrent, BarBackground }  from '../../../../components/bits/VolumeBar/styles'
import { BrowserRouter } from 'react-router-dom'

const props = {
	volume: "10",
	muted: true,
	handleClick: jest.fn(),
}

describe(`Bar test`, () => {
	it(`mount`, () => {
		const wrapper = mount(
			<BrowserRouter>
				<Bar {...props}/>
			</BrowserRouter>
		)

		console.log(wrapper.debug())

	})
})