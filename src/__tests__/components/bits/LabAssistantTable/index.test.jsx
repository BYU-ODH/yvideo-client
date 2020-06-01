import React from 'react'
import { shallow, mount } from 'enzyme'
import LabAssistantTable from '../../../../components/bits/LabAssistantTable'

import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { BrowserRouter } from 'react-router-dom'

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	disableLifecycleMethods: true,
})

const data = [
	{
		email: `test@email.com`,
		id: 22,
		lastLogin: `2020-05-14T19:53:02.807Z`,
		linked: `-1`,
		name: `professor testname`,
		roles: [`admin`],
		username: `testusername`,
	},
	{
		email: `test2@email.com`,
		id: 23,
		lastLogin: `2020-05-14T19:53:02.807Z`,
		linked: `-1`,
		name: `professor testname2`,
		roles: [`admin`],
		username: `testusername2`,
	},
]

describe(`LabAssistantTable dashboard test`, () => {
	it(`should be true`, ()=> {
		const wrapper = mount(
			<BrowserRouter>
				<LabAssistantTable data={data}/>
			</BrowserRouter>,
		)

		wrapper.find(`.styled-link`).forEach((node, index) => {
			if(node.to !== undefined){
				expect(node.text()).toEqual(`View Collections`)
				expect(node.prop(`to`)).toEqual(`/lab-assistant-manager/${data[index].id}`)
			}
		})
	})
})