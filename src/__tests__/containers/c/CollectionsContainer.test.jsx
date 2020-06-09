import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/CollectionsContainer'
import * as testutil from '../../testutil/testutil'

describe(`collection container test`, () => {
	it(`test props should be true`, () => {
		const wrapper = shallow(
			<Container store={testutil.store}/>,
		).dive()

		const props = wrapper.props()
		expect(props.isAdmin).toBe(true)
		expect(props.isProf).toBe(false)
		expect(props.displayBlocks).toBe(true)
		expect(props.collections.archived).toBe(false)
		expect(props.collections.id).toBe(65)
		expect(props.collections.published).toBe(true)
		expect(props.collections.owner).toBe(22)
		expect(props.collections.thumbnail).toBe(`test@thumbnail`)
		expect(props.collections.content[0].name).toBe(`testname`)
		expect(props.collections.content[0].thumbnail).toBe(`test@thumbnail`)
	})

	it(`collections container check viewstate`, () => {

		const wrapper = shallow(
			<Container store={testutil.store}/>,
		).childAt(0).dive()

		const viewstate = wrapper.find(`Collections`).props().viewstate

		expect(viewstate.isProf).toBe(false)
		expect(viewstate.isAdmin).toBe(true)
		expect(viewstate.displayBlocks).toBe(true)

		expect(viewstate.collections.archived).toBe(false)
		expect(viewstate.collections.id).toBe(65)
		expect(viewstate.collections.name).toBe(`Collection 1`)
		expect(viewstate.collections.owner).toBe(22)
		expect(viewstate.collections.published).toBe(true)
		expect(viewstate.collections.thumbnail).toBe(`test@thumbnail`)
	})
})