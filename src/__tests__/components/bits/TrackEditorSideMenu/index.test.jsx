import React from 'react'
import { shallow, mount } from 'enzyme'
import TrackEditorSideMenu from '../../../../components/bits/TrackEditorSideMenu'
import Style, { Icon } from '../../../../components/bits/TrackEditorSideMenu/styles'
import sinon from "sinon";
import { BrowserRouter } from 'react-router-dom'

let singleEvent = {
	type: "",
	comment: "",
	icon: "/static/media/event_skip.cbe8f9bf.svg",
	start: 10,
	end: 20,
	layer: 1,
	position:
	{
		x: 0,
		y: 0
	}
}
const subLayer = 0

const subs = [
	{
		content : [
			{
				end: 5,
				start: 1,
				text: `text`,
			},
		],
		contentId:1,
		id: "123",
		language: "",
		title: "title",
	}
]

const props = {
	isSub: false,
	singleEvent,
	subLayer,
	subs,
	index: 2,
	videoLength:189,
	updateTitle: jest.fn(),
	updateLanguage: jest.fn(),
	changeSubIndex: jest.fn(),
	updateEvents: jest.fn(),
	updateSubs: jest.fn(),
	minimized: true,
	src: "src",
}

describe(`TrackEditorSideMenu test`, () => {
	it(`TrackEditorSideMenu onChange`, ()=> {
		props.singleEvent.type = "Comment"
		let handleClick = sinon.spy();
		let wrapper = shallow(<TrackEditorSideMenu closeSideEditor={handleClick} {...props}/>)
		wrapper.find('img').prop('onClick')()
		expect(handleClick.calledOnce).toBe(true)

		expect(wrapper.contains(<label >Start</label>)).toEqual(true)
		expect(wrapper.contains(<label style={{ visibility: `${singleEvent.type !== `Pause` ? `visible` : `hidden`}`}}>End</label>)).toEqual(true)
		expect(wrapper.contains(<label >X</label>)).toEqual(true)
		expect(wrapper.contains(<label >Y</label>)).toEqual(true)
		expect(wrapper.contains(<label style={{ textAlign: `left`, margin: `15px 5px 5px 5px` }}>Type a comment</label>)).toEqual(true)

		wrapper.find('.sideTabInput').at(2).simulate('change', { target: { value: 10 } })
		let checked = wrapper.find('[value=10]').first();
		expect(checked).toBeDefined()
		wrapper.find('.sideTabInput').at(3).simulate('change', { target: { value: 10 } })
		checked = wrapper.find('[value=10]').first()
		expect(checked).toBeDefined()
		wrapper.find('textarea').simulate('change', { target: { value: 10 } })
		checked = wrapper.find('[value=10]').first()
  	expect(checked).toBeDefined()
		wrapper.find('.sideButton').simulate('click')
	})

	it(`TrackEditorSideMenu onChange`, ()=> {
		const mElement = { style: {color: "red"} }
		const color = document.getElementById = jest.fn().mockReturnValueOnce(mElement)
		let wrapper = shallow(<TrackEditorSideMenu  {...props}/>,{ attachTo: color })

		wrapper.find('.sideTabInput').at(0).simulate('change', { target: { value: 10 } })
		let checked = wrapper.find('[value=10]').first()
  	expect(checked).toBeDefined()
	})

	it(`TrackEditorSideMenu onChange`, ()=> {
		const mElement = { style: {color: "red"} }
		const color = document.getElementById = jest.fn().mockReturnValueOnce(mElement)
		let wrapper = shallow(<TrackEditorSideMenu {...props}/>,{ attachTo: color })

		wrapper.find('.sideTabInput').at(1).simulate('change', { target: { value: 10 } })
		let checked = wrapper.find('[value=10]').first()
  	expect(checked).toBeDefined()
	})

	it(`TrackEditorSideMenu onChange`, ()=> {
		props.singleEvent.type = ""
		props.isSub = true
		let wrapper = shallow(<TrackEditorSideMenu {...props}/>)

		expect(wrapper.contains(<p className="subTitleCard">All Subtitles</p>)).toEqual(true)
		expect(wrapper.contains(<label >Start</label>)).toEqual(true)
		expect(wrapper.contains(<label >End</label>)).toEqual(true)
		expect(wrapper.contains(<label >Text</label>)).toEqual(true)

		wrapper.find('input').at(0).simulate('click')
		wrapper.find('input').at(0).simulate('change', { target: { value: 10 } })
		wrapper.find('input').at(1).simulate('click')
		wrapper.find('input').at(1).simulate('change', { target: { value: 10 } })
		wrapper.find('input').at(2).simulate('click')
		wrapper.find('input').at(2).simulate('change', { target: { value: 10 } })
	})

	it(`TrackEditorSideMenu onChange`, ()=> {
		const mockCallBack = jest.fn();
		const button = shallow(<Icon onClick={mockCallBack}/>);

		button.find('StyledComponent').simulate('click');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	})

	it(`TrackEditorSideMenu onChange`, ()=> {
		props.singleEvent.type = "Comment"
		props.isSub = true
		let handleClick = sinon.spy();
		let wrapper = shallow(<TrackEditorSideMenu closeSideEditor={handleClick} {...props}/>)

		expect(wrapper.contains(<label >Title</label>)).toEqual(true)
		expect(wrapper.contains(<label >Language</label>)).toEqual(true)
		wrapper.find('input').at(0).simulate('change', { target: { value: "title" } })
		wrapper.find('input').at(0).simulate('change', { target: { value: "language" } })
	})
	it(`mount`, () => {
		let wrapper = mount(
			<BrowserRouter>
				<TrackEditorSideMenu {...props} />
			</BrowserRouter>
		)
		expect(wrapper.contains(<label >Title</label>)).toEqual(true)

	})

})
