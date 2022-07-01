import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../../components/modals/containers/CreateCollectionContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	userId: `userId`,
	professorId: `profId`,
}

describe(`CreateCollectionContainer test`, () => {
	it(`should get viewstate correctly`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate // eslint-disable-line no-unused-vars
	})

	it(`should pass event handlers test`, async() =>  {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)

		wrapper.find(`#create-collection-input`).simulate(`change`, {target: {value: `new added collection`}})
		wrapper.find(`#create-collection-create`).at(0).simulate(`click`)

		// TODO: need to check to see if the thunk is initiated
		wrapper.find(`form`).simulate(`submit`, { preventDefault() {} })
	})
})