import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import Container from '../../../../components/modals/containers/SubtitlesModalContainer'
import Style from '../../../../components/modals/components/SubtitlesModal/styles'
import { BrowserRouter } from 'react-router-dom'
import sinon from 'sinon'
import * as testutil from '../../../testutil/testutil'

const props = {
	mode: `create`,
	handleAddSubLayer: jest.fn(),
}

describe(`Subtitles Modal test`, () => {
	it(`mount`, () => {
		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<BrowserRouter>
					<Container {...props} />
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper.contains(<h1>Choose an Option</h1>)).toEqual(true)
		expect(wrapper.contains(<p>Start from scratch</p>)).toEqual(true)
	})

	it(`modalButton1 onClick`, ()=> {
		const mockCallBack = jest.fn()
		const button = shallow(<Style onClick={mockCallBack}/>)
		button.find(`StyledComponent`).simulate(`click`)
		expect(mockCallBack.mock.calls.length).toEqual(1)
	})

	it(`modalButton2 onClick`, ()=> {
		const mockCallBack = jest.fn()
		const imgButton = shallow(<img alt='close' className='closeModal' src='close_icon.svg' onClick={mockCallBack}/>)
		imgButton.find(`img`).simulate(`click`)
		expect(mockCallBack.mock.calls.length).toEqual(1)
	})

	it(`simulate onClick`, ()=> {
		const mockCallBack = jest.fn()
		const button = shallow(<div className='modalSection modalButton' onClick={mockCallBack}/>)
		button.find(`div`).simulate(`click`)
		expect(mockCallBack.mock.calls.length).toEqual(1)
	})

	it(`simulate onClick`, () => {
		const mockCallBack = jest.fn()
		const button = shallow(<button style={{margin:`10px`}} className='modalButton' onClick={mockCallBack}>Submit</button>)
		button.find(`button`).simulate(`click`)
		expect(mockCallBack.mock.calls.length).toEqual(1)
	})

	afterEach(() => {
		jest.resetAllMocks()
	})
	it(`onClick createLayer.fromFile`, () => {
		const mElement = { files: `file` }
		const file = document.getElementById = jest.fn().mockReturnValueOnce(mElement)
		const handleClick = sinon.spy()
		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<Container handleAddSubLayerFromFile={handleClick} {...props} />
			</Provider>,
		)
		wrapper.find(`.modalButton`).at(1).prop(`onClick`)()
		expect(handleClick.calledOnce).toBe(true)
	})

	it(`simulate onChange files`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props} />
				</BrowserRouter>
			</Provider>,
		)
		wrapper.find({"id" : `subFileInput`}).simulate(`change`, { target: { files: `path` } })
		const checked = wrapper.find(`[files="path"]`).first()
		expect(checked).toBeDefined()
	})

	it(`simulate onClick`, ()=> {
		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<Container {...props}/>
			</Provider>,
		)
		wrapper.find(`.closeModal`).simulate(`click`)
		wrapper.find(`#modalSection`).simulate(`click`)
	})

})