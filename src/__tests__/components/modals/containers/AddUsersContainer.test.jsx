import React from 'react'
import { shallow } from 'enzyme'
import Container from '../../../../components/modals/containers/AddUsersContainer'
import * as testutil from '../../../testutil/testutil'

const props = {
	updateMany: jest.fn(),
	toggleModal: jest.fn(),
	setIsLoading: jest.fn(),
	handleIdChange: jest.fn(),
}

describe(`AddUsersContainer test`, () => {
	it(`should get viewstate correctly`, ()=> {
		shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()
	})

})