import React from 'react'
import { mount } from 'enzyme'
import Container from '../../../../components/modals/containers/MorePublicCollectionsContainer'
import { Wrapper, Title, Button } from '../../../../components/modals/components/MorePublicCollections/styles'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

describe(`MorePublicCollectionsContainer test`, () => {
	it(`should pass event handlers test`, ()=> {
		const props = {
			toggleModal: jest.fn(),
			ownerName: `test owner`,
			publicCollections: {
				0: `content`,
			},
		}
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)
		expect(wrapper.contains(<Title><h4>More Public Collections from:</h4> test owner</Title>))
		wrapper.find(Button).simulate(`click`)
		wrapper.find(Wrapper).prop(`onSubmit`)()
	})
	it(`ownerName is null`, ()=> {
		const props = {
			toggleModal: jest.fn(),
			publicCollections: {
				0: `content`,
			},
		}
		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<Container {...props}/>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
	})
})