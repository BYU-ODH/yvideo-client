import React from 'react'
import { mount } from 'enzyme'
import Transcript from '../../../../components/bits/Transcript/index'
import { BrowserRouter } from 'react-router-dom'
import { Help } from '../../../../components/bits/Transcript/styles'
import * as testutil from '../../../testutil/testutil'
import { Provider } from 'react-redux'

const handlers = {
	toggleTip: jest.fn,
	handleShowHelp: jest.fn,
	handleSeekChange: jest.fn,
	handleToggleTranscript: jest.fn,
	handleShowTip: jest.fn,
}

const viewstate = {
	displaySubtitles: {
		language: `english`,
		words: ``,
		content: [
			{
				end: 20.227533345404066,
				start: 0,
				text: `First Line`,
			},
		],
	},
	content: {
		settings: {
			targetLanguage: `english`,
		},
	},
	subtitleText: `a`,
}

const props = {
	handlers,
	viewstate,
	jsonResponse: {} ,
	translate: ``,
	languageCodes: {},
}

describe(`Transcript test`, () => {
	let wrapper
	beforeEach(() => {
		wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Transcript {...props} />
				</BrowserRouter>
			</Provider>,
		)
	})
	it(`toggle-transcript simulate action`, () => {
		let item = wrapper.find(`.toggle-transcript`).at(0).simulate(`click`)
		expect(item).toBeDefined()
		item = wrapper.find(`.toggle-transcript`).at(0).simulate(`mouseEnter`)
		expect(item).toBeDefined()
		item = wrapper.find(`.toggle-transcript`).at(0).simulate(`mouseLeave`)
		expect(item).toBeDefined()
	})
	it(`Help simulate action`, () => {
		let item = wrapper.find(Help).simulate(`click`)
		expect(item).toBeDefined()
		item = wrapper.find(Help).simulate(`mouseEnter`)
		expect(item).toBeDefined()
		item = wrapper.find(Help).simulate(`mouseLeave`)
		expect(item).toBeDefined()
	})
	it(`toggle-transcript simulate action 2`, () => {
		let item = wrapper.find(`.toggle-transcript`).at(1).simulate(`click`)
		expect(item).toBeDefined()
		item = wrapper.find(`.toggle-transcript`).at(1).simulate(`mouseEnter`)
		expect(item).toBeDefined()
		item = wrapper.find(`.toggle-transcript`).at(1).simulate(`mouseLeave`)
		expect(item).toBeDefined()
	})
	it(`displaySubtitles simulate action`, () => {
		let item = wrapper.find(`.transcript-row`).at(0).simulate(`click`)
		expect(item).toBeDefined()
		item = wrapper.find(`.transcript-row`).at(0).simulate(`mouseEnter`)
		expect(item).toBeDefined()
		item = wrapper.find(`.transcript-row`).at(0).simulate(`mouseLeave`)
		expect(item).toBeDefined()
	})
	it(`words display`, () => {
		expect(wrapper.contains(<h2>Quick Translation</h2>)).toEqual(true)
		expect(wrapper.contains(<label>Translation: No matches found </label>)).toEqual(false)
		expect(wrapper.contains(<label>Meaning: <b>0.</b>meaning </label>)).toEqual(true)
	})
	it(`transcript-row simulate action`, () => {
		let item = wrapper.find(`p`).at(0).simulate(`click`)
		expect(item).toBeDefined()
		item = wrapper.find(`.arrow`).at(0).simulate(`click`)
		expect(item).toBeDefined()
		item = wrapper.find(`.arrow`).at(0).simulate(`mouseEnter`)
		expect(item).toBeDefined()
		item = wrapper.find(`.arrow`).at(0).simulate(`mouseLeave`)
		expect(item).toBeDefined()
	})

	it(`jsonResponse is empty`, () => {
		wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<BrowserRouter>
					<Transcript {...props} />
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper.contains(<label>Translation: No matches found</label>)).toEqual(true)
	})
})