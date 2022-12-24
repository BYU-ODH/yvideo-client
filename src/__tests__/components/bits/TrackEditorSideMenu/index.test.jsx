import React from 'react'
import { shallow, mount } from 'enzyme'
import TrackEditorSideMenu from '../../../../components/bits/TrackEditorSideMenu'
import { BrowserRouter } from 'react-router-dom'

const singleEvent = {
	type: `Skip`,
	comment: ``,
	icon: `/static/media/event_skip.cbe8f9bf.svg`,
	start: 10,
	end: 20,
	layer: 1,
	position: {"0": [`2320.0`, 50, 50, 30, 40]},
}

const props = {
	singleEvent,
	index: 0,
	updateEvents: jest.fn(),
	videoLength: 200,
	closeSideEditor: jest.fn(),
	handleEditCensor: jest.fn(),
	handleCensorRemove: jest.fn(),
	handleAddCensor: jest.fn(),
	activeCensorPosition: jest.fn(),
	setActiveCensorPosition: jest.fn(),
	toggleTip: jest.fn(),
	handleShowTip: jest.fn(),
	setEventSeek: jest.fn(),
	handleEventPosition: jest.fn(),
}

describe(`TrackEditorSideMenu test`, () => {
	// it(`TrackEditorSideMenu onChange`, ()=> {
	// 	props.singleEvent.type = `Comment`
	// 	const handleClick = sinon.spy()
	// 	const wrapper = shallow(<TrackEditorSideMenu closeSideEditor={handleClick} {...props}/>)
	// 	wrapper.find(`img`).prop(`onClick`)()
	// 	expect(handleClick.calledOnce).toBe(true)

	// 	expect(wrapper.contains(<label >Start</label>)).toEqual(true)
	// 	expect(wrapper.contains(<label >End</label>)).toEqual(true)
	// 	expect(wrapper.contains(<label >X</label>)).toEqual(true)
	// 	expect(wrapper.contains(<label >Y</label>)).toEqual(true)
	// 	expect(wrapper.contains(<label style={{ textAlign: `left`, margin: `15px 5px 5px 5px` }}>Type a comment</label>)).toEqual(true)

	// 	wrapper.find(`.side-tab-input`).at(2).simulate(`change`, { target: { value: 10 } })
	// 	let checked = wrapper.find(`[value=10]`).first()
	// 	expect(checked).toBeDefined()
	// 	wrapper.find(`.side-tab-input`).at(3).simulate(`change`, { target: { value: 10 } })
	// 	checked = wrapper.find(`[value=10]`).first()
	// 	expect(checked).toBeDefined()
	// 	wrapper.find(`textarea`).simulate(`change`, { target: { value: 10 } })
	// 	checked = wrapper.find(`[value=10]`).first()
	// 	expect(checked).toBeDefined()
	// 	wrapper.find(`.side-button`).simulate(`click`)
	// })

	it(`TrackEditorSideMenu onChange`, () => {
		const mElement = { style: {color: `red`} }
		const color = document.getElementById = jest.fn().mockReturnValueOnce(mElement)
		const wrapper = shallow(<TrackEditorSideMenu {...props}/>, { attachTo: color })

		wrapper.find(`.side-tab-input`).at(0).simulate(`change`, { target: { value: 10 } })
		const checked = wrapper.find(`[value=10]`).first()
		expect(checked).toBeDefined()
	})

	it(`TrackEditorSideMenu onChange`, () => {
		const wrapper = mount(
			<BrowserRouter>
				<TrackEditorSideMenu {...props}/>
			</BrowserRouter>,
		)
		const boundingMock = {x: 100, y: 50}

		wrapper.find(`.side-tab-input`).at(0).simulate(`change`, { target: { value: `` } })
		wrapper.find(`.side-tab-input`).at(0).prop(`onBlur`)( { target: { value: `` } } )
		wrapper.find(`.center`).at(0).simulate(`click`)
		wrapper.find(`.side-tab-input`).at(0).prop(`onKeyUp`)({stopPropagation: () => {
			return 1
		} })

		wrapper.find(`.side-tab-input`).at(0).prop(`onMouseEnter`)(
			{ target:
				{ getBoundingClientRect: () => {
					return boundingMock
				}}
			, currentTarget: {offsetWidth: 10},
			},
		)
		wrapper.find(`.side-tab-input`).at(0).prop(`onMouseLeave`)()

		wrapper.find(`.side-tab-input`).at(1).simulate(`change`, { target: { value: `` } })
		wrapper.find(`.side-tab-input`).at(1).prop(`onBlur`)( { target: { value: `` } } )
		wrapper.find(`.center`).at(0).simulate(`click`)
		wrapper.find(`.side-tab-input`).at(1).prop(`onKeyUp`)({stopPropagation: () => {
			return 1
		} })

		wrapper.find(`.side-tab-input`).at(1).prop(`onMouseEnter`)(
			{ target:
				{ getBoundingClientRect: () => {
					return boundingMock
				}}
			, currentTarget: {offsetWidth: 10},
			},
		)
		wrapper.find(`.side-tab-input`).at(1).prop(`onMouseLeave`)()
	})

	it(`TrackEditorSideMenu censor`, () => {
		props.singleEvent.type = `Censor`

		const wrapper = mount(
			<BrowserRouter>
				<TrackEditorSideMenu {...props}/>
			</BrowserRouter>,
		)
		wrapper.find(`.add-censor`).simulate(`click`)
		wrapper.find(`.censor-row`).at(0).simulate(`change`, { target: { value: `10` } })
		wrapper.find(`input`).at(2).simulate(`click`)
		wrapper.find(`input`).at(2).simulate(`change`, { target: { value: `10` } })
		wrapper.find(`input`).at(3).simulate(`click`)
		wrapper.find(`input`).at(3).simulate(`change`, { target: { value: `10` } })
		wrapper.find(`input`).at(4).simulate(`click`)
		wrapper.find(`input`).at(4).simulate(`change`, { target: { value: `10` } })
		wrapper.find(`input`).at(5).simulate(`click`)
		wrapper.find(`input`).at(5).simulate(`change`, { target: { value: `10` } })
		wrapper.find(`input`).at(6).simulate(`click`)
		wrapper.find(`input`).at(6).simulate(`change`, { target: { value: `10` } })
		wrapper.find(`.trashIcon`).simulate(`click`)
		wrapper.find(`.close-editor`).simulate(`click`)
	})

})
