import React from 'react'
import { shallow, mount } from 'enzyme'
import ContentSettings from '../../../../components/c/ContentSettings/index'
import * as testutil from '../../../testutil/testutil'

const content = testutil.content[0]

const viewstate = {
	content,
	editing: true,
	showing: true,
}

const handlers = {
	handleToggle: jest.fn(),
	handleDescription: jest.fn(),
	handleRatio: jest.fn(),
	addTag: jest.fn(),
	removeTag: jest.fn(),
	changeTag: jest.fn(),
}

const props = {
	getResources: jest.fn(),
	viewstate,
	handlers,
	updateContent: jest.fn(),
}

describe(`content settings container test`, () => {
	it(`mount`, ()=> {
		const wrapper = shallow(
			<ContentSettings {...props} />,
		)

		// match column title
		const titles = wrapper.find(`h4`)
		expect(titles.at(0).props().children).toBe(`General`)
		expect(titles.at(1).props().children).toBe(`Tags`)
		expect(titles.at(2).props().children).toBe(`Description`)

		// switch toggle is the components, switch behavior should be tested switchtoggle component test
		expect(titles.at(3).props().children[0]).toBe(`Notes`)
		expect(titles.at(3).props().children[1].type.name).toBe(`SwitchToggle`)
		expect(titles.at(4).props().children[0]).toBe(`Captions`)
		expect(titles.at(4).props().children[1].type.name).toBe(`SwitchToggle`)
		expect(titles.at(5).props().children).toBe(`Aspect Ratio`)

		// match strings
		const generalOptions = wrapper.find(`p`)
		expect(generalOptions.at(0).props().children).toBe(`Allow automatic definitions`)
		expect(generalOptions.at(1).props().children).toBe(`Show Word List`)

		// match radios
		const radios = wrapper.find(`AspectRadio`)
		expect(radios.at(0).props().children).toBe(`Standard`)
		expect(radios.at(1).props().children).toBe(`Widescreen`)
		expect(radios.at(2).props().children).toBe(`European Widescreen`)
		expect(radios.at(3).props().children).toBe(`US Widescreen`)
		expect(radios.at(4).props().children).toBe(`Lichtenberg`)
		expect(radios.at(5).props().children).toBe(`Classic Film`)
		expect(radios.at(6).props().children).toBe(`Credit Card`)
		expect(radios.at(7).props().children).toBe(`HD Video`)
		expect(radios.at(8).props().children).toBe(`Golden`)
	})
})