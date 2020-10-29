import React from 'react'
import { shallow, mount } from 'enzyme'
import TrackEditorSideMenu from '../../../../components/bits/TrackEditorSideMenu'
import Icon from '../../../../components/bits/TrackEditorSideMenu/styles'
import { BrowserRouter } from 'react-router-dom'
import sinon from "sinon";

let singleEvent = {
	type: "Comment",
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
}

describe(`TrackEditorSideMenu test`, () => {

	it(`test render TrackEditorSideMenu`, ()=> {
		singleEvent.type = "Skip"
		let wrapper = mount(
			<BrowserRouter>
				<TrackEditorSideMenu {...props} />
			</BrowserRouter>,
		)
		expect(wrapper.contains(<label>Start</label>)).toEqual(true)
		expect(wrapper.contains(<label style={{ visibility: `${singleEvent.type !== `Pause` ? `visible` : `hidden`}`}}>End</label>)).toEqual(true)

		singleEvent.type = "Skip"
		props.isSub = true
		wrapper = mount(
			<BrowserRouter>
				<TrackEditorSideMenu {...props} />
			</BrowserRouter>,
		)
		expect(wrapper.contains(<p className={`subTitleCard`} >All Subtitles</p>)).toEqual(true)
		expect(wrapper.contains(<label >Start</label>)).toEqual(true)
		expect(wrapper.contains(<label >End</label>)).toEqual(true)
		expect(wrapper.contains(<label >Text</label>)).toEqual(true)

		wrapper.find('.changeSubIndex').at(0).simulate('click', { target: { value: '10' } });
		let checked = wrapper.find('[value="10"]').first();
		expect(checked).toBeDefined();
		wrapper.find('.changeSubIndex').at(1).simulate('click', { target: { value: '20' } });
		checked = wrapper.find('[value="20"]').first();
		expect(checked).toBeDefined();
		wrapper.find('.changeSubIndex').at(2).simulate('click', { target: { value: 'text' } });
		checked = wrapper.find('[value="text"]').first();
		expect(checked).toBeDefined();
	})
	it(`TrackEditorSideMenu onChange`, ()=> {
		const handleClick = sinon.spy();
		let wrapper = shallow(<TrackEditorSideMenu closeSideEditor={handleClick} {...props}/>);
		console.log(wrapper.debug())
		wrapper.find('img').prop('onClick')()
		expect(handleClick.calledOnce).toBe(true);
	})
	it(`TrackEditorSideMenu onChange`, ()=> {
		const mockCallBack = jest.fn();
		const button = shallow(<Icon onClick={mockCallBack}/>);

    button.find('StyledComponent').simulate('click');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	})

	afterEach(() => {
    jest.resetAllMocks();
  });
	it('renders modal when open flag is true', () => {
		const mElement = { color: "red" };
    const color = document.getElementById = jest.fn().mockReturnValueOnce(mElement);
		const handleClick = sinon.spy();
		let wrapper = shallow(<TrackEditorSideMenu handleEditEventBTimeChange={handleClick} {...props}/>,{ attachTo: color });
		wrapper.find('.sideTabInput').at(0).simulate('change', { target: { value: '10' } });
		let checked = wrapper.find('[value="10"]').first();
		expect(checked).toBeDefined();
		wrapper.find('.sideTabInput').at(1).simulate('change', { target: { value: '20' } });
		checked = wrapper.find('[value="20"]').first();
		expect(checked).toBeDefined();
	});

	it('renders modal when open flag is true', () => {
		singleEvent.type = "Comment"
		props.isSub = true
    const wrapper = mount(
			<BrowserRouter>
				<TrackEditorSideMenu {...props} />
			</BrowserRouter>,
		)
		expect(wrapper.contains(<label>X</label>)).toEqual(true)
		expect(wrapper.contains(<label>Y</label>)).toEqual(true)
		expect(wrapper.contains(<label style={{ textAlign: `left`, margin: `15px 5px 5px 5px` }}>Type a comment</label>)).toEqual(true)

		wrapper.find('.sideTabInput').at(0).simulate('change', { target: { value: '10' } });
		let checked = wrapper.find('[value="10"]').first();
		expect(checked).toBeDefined();
		wrapper.find('.sideTabInput').at(1).simulate('change', { target: { value: '10' } });
		checked = wrapper.find('[value="10"]').first();
		expect(checked).toBeDefined();
		wrapper.find('textarea').at(0).simulate('change', { target: { value: '10' } });
		checked = wrapper.find('[value="10"]').first();
		expect(checked).toBeDefined();
	});

})
