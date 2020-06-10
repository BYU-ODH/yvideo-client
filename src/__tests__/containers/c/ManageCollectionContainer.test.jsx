import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/ManageCollectionContainer'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../testutil/testutil'

describe(`manage collection container test`, () => {

	it(`container shallow render should be success`, ()=> {
		const wrapper = shallow(
			<Container store={testutil.store}/>,
		).dive()

		const content = wrapper.props().content[0]
		expect(content.id).toBe(115)
		expect(content.name).toBe(`testname`)
		expect(content.contentType).toBe(`video`)
		expect(content.collectionId).toBe(85)
		expect(content.thumbnail).toBe(`test@thumbnail.com`)
		expect(content.physicalCopyExists).toBe(false)
		expect(content.isCopyrighted).toBe(false)
		expect(content.expired).toBe(true)
		expect(content.resourceId).toBe(`5ebdaef833e57cec218b457c`)
	})

	// Child component does not render even though it is mounted.
	// TODO: need to find out how to test const variables
	it(`container mount should be success`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...testutil.props}/>
				</BrowserRouter>,
			</Provider>,
		)
		const content = wrapper.props().children[0].props.children.props.collection.content
		// console.log(wrapper.find(`ManageCollectionContainer`))
	})
})