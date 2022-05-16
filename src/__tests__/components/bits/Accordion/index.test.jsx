import React from 'react'
import { shallow } from 'enzyme'
import AccordionMenu from '../../../../components/bits/Accordion/index'

const props = {
	active: true,
}

describe(`AccordionMenu test`, () => {
	it(`simulate onClick`, ()=> {
		const wrapper = shallow(<AccordionMenu {...props}/>)
		wrapper.find(`.accordion`).simulate(`click`, {
			preventDefault: () => {
			},
		})
	})
})