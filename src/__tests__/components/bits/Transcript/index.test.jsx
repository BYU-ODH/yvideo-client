import React from 'react'
import { shallow, mount } from 'enzyme'
import Transcript from '../../../../components/bits/Transcript/index'
import { BrowserRouter } from 'react-router-dom'
import { Style, Help } from '../../../../components/bits/Transcript/styles'
import * as testutil from '../../../testutil/testutil'
import { Provider } from 'react-redux'

const handlers = {
	toggleTip: jest.fn,
	handleShowHelp: jest.fn,
	handleSeekChange: jest.fn,
	handleToggleTranscript: jest.fn,
	handleShowTip: jest.fn,
	toggleTip: jest.fn,
}


const viewstate = {
	displaySubtitles: {
		language: 'english',
		words: '',
		content: [
			{
				end: 20.227533345404066,
				start: 0,
				text: "First Line",
			}
		]
	},
	content: {
		settings: {
			targetLanguages: 'english'
		}
	},
	subtitleText: 'a'
}

const props = {
	handlers,
	viewstate,
}

describe(`Subtitles Layer test`, () => {
	let wrapper
	// beforeEach(() => {
	// 	wrapper = mount(
	// 		<Provider store={testutil.store}>
	// 			<BrowserRouter>
	// 				<Transcript {...props} />
	// 			</BrowserRouter>
	// 		</Provider>,
	// 	)
	// })
	it(`toggle-transcript simulate action`, () => {
		console.log(1+1);
		// let item = wrapper.find('.toggle-transcript').at(0).simulate('click');
		// expect(item).toBeDefined();
		// item = wrapper.find('.toggle-transcript').at(0).simulate('mouseEnter');
		// expect(item).toBeDefined();
		// item = wrapper.find('.toggle-transcript').at(0).simulate('mouseLeave');
		// expect(item).toBeDefined();
	})
	// it(`Help simulate action`, () => {
	// 	let item = wrapper.find(Help).simulate('click');
	// 	expect(item).toBeDefined();
	// 	item = wrapper.find(Help).simulate('mouseEnter');
	// 	expect(item).toBeDefined();
	// 	item = wrapper.find(Help).simulate('mouseLeave');
	// 	expect(item).toBeDefined();
	// })
	// it(`toggle-transcript simulate action 2`, () => {
	// 	let item = wrapper.find('.toggle-transcript').at(1).simulate('click');
	// 	expect(item).toBeDefined();
	// 	item = wrapper.find('.toggle-transcript').at(1).simulate('mouseEnter');
	// 	expect(item).toBeDefined();
	// 	item = wrapper.find('.toggle-transcript').at(1).simulate('mouseLeave');
	// 	expect(item).toBeDefined();
	// })
	// it(`displaySubtitles simulate action`, () => {
	// 	let item = wrapper.find('.transcript-row').at(0).simulate('click');
	// 	expect(item).toBeDefined();
	// 	item = wrapper.find('.transcript-row').at(0).simulate('mouseEnter');
	// 	expect(item).toBeDefined();
	// 	item = wrapper.find('.transcript-row').at(0).simulate('mouseLeave');
	// 	expect(item).toBeDefined();
	// })

	// it(`words display`, () => {
	// 	expect(wrapper.contains(<h1>Transcript</h1>)).toEqual(true)
	// 	expect(wrapper.contains(<h2>Video Audio - </h2>)).toEqual(true)
	// 	expect(wrapper.contains(<h2>Caption Language - english</h2>)).toEqual(true)
	// 	expect(wrapper.contains(<h2>Quick Translation</h2>)).toEqual(true)
	// 	expect(wrapper.contains(<label>Translation: </label>)).toEqual(true)
	// 	expect(wrapper.contains(<label>Meaning: </label>)).toEqual(true)
	// })
	// it(`words display`, () => {
	// 	let item = wrapper.find('p').at(0).simulate('click');
	// 	expect(item).toBeDefined()
	// 	item = wrapper.find('div').at(0).simulate('click');
	// 	expect(item).toBeDefined()
	// 	item = wrapper.find('div').at(0).simulate('mouseEnter');
	// 	expect(item).toBeDefined()
	// 	item = wrapper.find('div').at(0).simulate('mouseLeave');
	// 	expect(item).toBeDefined()
	// })
})