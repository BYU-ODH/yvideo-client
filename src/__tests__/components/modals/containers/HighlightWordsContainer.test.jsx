import React from 'react'
import { mount } from 'enzyme'
import Container from '../../../../components/modals/containers/HighlightWordsContainer'
import { Select, Button } from '../../../../components/modals/components/HighlightWords/styles'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	checkTranslation : jest.fn(),
	toggleModal: jest.fn(),
	contentId: 0,
	getSubtitles: jest.fn(),
	updateSubtitle: jest.fn(),
	subtitles: [],
	subtitlesContentId: 0,
	supportedLanguages: {},
}

describe(`HighlightWordsContainer test`, () => {
	it(`simulate click`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)
		let button = wrapper.find(`h2`).simulate(`click`)
		expect(button).toBeDefined()
		button = wrapper.find(Select).simulate(`change`, { target: { value: `0` } })
		expect(button).toBeDefined()
		button = wrapper.find(Select).simulate(`change`, { target: { value: `1` } })
		expect(button).toBeDefined()
		button = wrapper.find(`input`).at(0).simulate(`change`, { target: { value: `word` } })
		expect(button).toBeDefined()
		button = wrapper.find(`input`).at(1).simulate(`change`, { target: { value: `english` } })
		expect(button).toBeDefined()
		button = wrapper.find(Button).at(0).simulate(`click`)
		expect(button).toBeDefined()
		button = wrapper.find(`input`).at(2).simulate(`change`)
		expect(button).toBeDefined()
		button = wrapper.find(Button).at(1).simulate(`click`)
		expect(button).toBeDefined()
		button = wrapper.find(`Tag`).at(0).simulate(`click`)
		expect(button).toBeDefined()

	})
	test(`when subtitlesObjects is undefined`, () => {
		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<Container {...props}/>
			</Provider>,
		)
		const button = wrapper.find(Select).simulate(`change`)
		expect(button).toBeDefined()
	})
	test(`when wordlist is empty`, () => {
		const wrapper = mount(
			<Provider store={testutil.store2}>
				<Container {...props}/>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
	})
	test(`when handleCheckWord response is success `, () => {
		const wrapper = mount(
			<Provider store={testutil.store2}>
				<Container {...props}/>
			</Provider>,
		)

		expect(wrapper).toBeDefined()
	})

})