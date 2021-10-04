
import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/SubtitlesEditorContainer'
// import { Timeline, EventList, EventListCarat, NewLayer, Icon, AnnotationMessage, Help } from '../../../components/c/NewTrackEditor/styles'
// import { interfaceService } from 'services'
import * as testutil from '../../testutil/testutil'
import ReactRouter from 'react-router'

const props = {
	contentCache: {},
	setEvents: jest.fn(),
	getContent: jest.fn(),
	updateContent: jest.fn(),
	activeUpdate: jest.fn(),
	getStreamKey: jest.fn(),
	toggleModal: jest.fn(),
	toggleTip: jest.fn(),
	contentError: jest.fn(),
	setBreadcrumbs: jest.fn(),

	streamKey: `000000-000000-000000-000000`,
	resourceIdStream:  `000000-000000-00000`,
}

describe(`Simulate Event`, () => {
	// const setState = jest.fn()
	// const useStateMock = (initState) => [initState, setState]
	let wrapper
	beforeEach(() => {
		wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
	})

	it(`TrackEditor wrapper`, () => {
		console.log(wrapper.debug())
		wrapper.find(`setSubModalVisible`).simulate(`click`)
	})

})