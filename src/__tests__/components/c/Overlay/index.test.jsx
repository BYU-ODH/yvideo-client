import React from 'react'
import { shallow, mount } from 'enzyme'
import Overlay from '../../../../components/c/Overlay/index'
import { BrowserRouter} from 'react-router-dom'

describe(`Overlay test`, () => {
	it(`wrapper simulate click`, ()=> {
		const wrapper = mount(
			<BrowserRouter>
				<Overlay />
			</BrowserRouter>,
		)
		wrapper.find(`button`).simulate(`click`, {
			preventDefault: () => {
			},
		 })
	})
})