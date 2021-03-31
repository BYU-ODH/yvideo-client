import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Container from '../../../containers/c/TrackEditorContainer'
import { Timeline, EventList, EventListCarat, NewLayer, Icon, AnnotationMessage, Help } from '../../../components/c/NewTrackEditor/styles'
import { interfaceService } from 'services'
import * as testutil from '../../testutil/testutil'
import ReactRouter from 'react-router'


let props = {
	setEvents: jest.fn(),
	getResources: jest.fn(),
	getContent: jest.fn(),
	getStreamKey: jest.fn(),
	updateContent: jest.fn(),
	getSubtitles: jest.fn(),
	setSubtitles: jest.fn(),
	deleteSubtitle: jest.fn(),
	updateSubtitle: jest.fn(),
	createSubtitle: jest.fn(),
	activeUpdate: jest.fn(),
	setContentId: jest.fn(),
	toggleModal: jest.fn(),
	toggleTip: jest.fn(),
}

// TODO: need to find how to pass match as a param, useParams.
describe(`Subtitles container test`, () => {
	const clientWidth = [ { clientWidth: 10, style: { width: 10} }  ]
	document.getElementsByClassName = jest.fn((tag) => {
		return clientWidth
	})
	const cElement =  { style: { color: 'red', width: 10} }
	document.getElementById = jest.fn((tag) => {
		return cElement
	})
	jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: 0 });

	it(`wrapper: TrackEditorContainer)`, () => {
		 const wrapper = shallow(
				<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		expect(wrapper).toBeDefined()
	})

	it(`wrapper: TrackEditor)`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
		// console.log(wrapper.debug())
		wrapper.find('SubtitlesModal').prop('handleAddSubLayer')()
		wrapper.find('SubtitlesModal').prop('handleAddSubLayerFromFile')('url')
		wrapper.find('SubtitlesModal').prop('setModalVisible')()
		wrapper.find('Controller').prop('togglendTimeline')()
		wrapper.find('Controller').prop('getDuration')(10)
		wrapper.find('Controller').prop('getVideoTime')()
		wrapper.find('Controller').prop('handleLastClick')(10, 10 ,1, 1,20)
		wrapper.find('Controller').prop('updateEvents')(10, { start: 10, end: 20 } ,0)
		wrapper.find('Controller').prop('setActiveCensorPosition')()
		wrapper.find(".handle").simulate('click')
		wrapper.find('TrackLayer').prop('onDrop')({id: "subtitle"}, 1)
		// wrapper.find('TrackLayer').prop('sideEditor')(1 ,1)
		// wrapper.find('TrackLayer').prop('updateEvents')(10, { start: 10, end: 20, events: { layer: 10}} ,0)
		wrapper.find('TrackLayer').prop('closeEditor')()
		wrapper.find(NewLayer).simulate('click')
		wrapper.find(NewLayer).simulate('mouseEnter')
		wrapper.find(NewLayer).simulate('mouseLeave')
		wrapper.find('SubtitlesLayer').prop('onDrop')()
		wrapper.find('SubtitlesLayer').prop('sideEditor')()
		wrapper.find('SubtitlesLayer').prop('updateSubs')(0, { start: 10, end: 20 } ,0)
		wrapper.find('SubtitlesLayer').prop('closeEditor')()
		wrapper.find('Rnd').prop('onDragStop')('', {x:10})
		// wrapper.find('Rnd').prop('onMouseEnter')()
		wrapper.find('Rnd').prop('onMouseLeave')()
	})
})