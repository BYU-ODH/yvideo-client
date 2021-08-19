import React from 'react'
import { shallow, mount, render } from 'enzyme'
import AccordionMenu from '../../../../components/bits/Accordion/index'
import { Container, List, Arrow } from '../../../../components/bits/Accordion/styles'
import { BrowserRouter} from 'react-router-dom'

const props = {
	active: true,
}

describe(`AccordionMenu test`, () => {
	it(`simulate onClick`, ()=> {
		const wrapper = shallow(<AccordionMenu {...props}/>)
		wrapper.find(".accordion").simulate('click', {
			preventDefault: () => {
			}
		 })
	})
})