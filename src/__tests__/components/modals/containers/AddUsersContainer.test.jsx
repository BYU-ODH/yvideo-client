import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../../components/modals/containers/AddUsersContainer'
import { CancelButton, Form } from '../../../../components/modals/components/AddBatchNetids/styles'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	updateMany: jest.fn(),
	toggleModal: jest.fn(),
	setIsLoading: jest.fn(),
	handleIdChange: jest.fn(),
}

describe(`AddUsersContainer test`, () => {
	it(`should get viewstate correctly`, ()=> {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()
	})

})