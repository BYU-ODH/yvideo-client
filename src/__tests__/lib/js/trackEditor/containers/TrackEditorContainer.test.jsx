import React from 'react'
import { shallow, mount, render } from 'enzyme'
import TrackEditorContainer from '../../../../../lib/js/trackEditor/containers/TrackEditorContainer'

import routeData from 'react-router';

describe(`Controls test`, () => {
	const mockParams = {
		id: 12
	}
	beforeEach(() => {
		jest.spyOn(routeData, 'useParams').mockReturnValue(mockParams)
	});

	it(`wrapper`, ()=> {
		const wrapper = shallow(<TrackEditorContainer />).dive()
		// console.log(wrapper.debug())
	})
})