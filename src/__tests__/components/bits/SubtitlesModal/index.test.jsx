import React from 'react'
import { shallow, mount } from 'enzyme'
import SubtitlesModal from '../../../../components/bits/SubtitlesModal'
import Style from '../../../../components/bits/SubtitlesModal/styles'
import { BrowserRouter } from 'react-router-dom'
import sinon from "sinon";

const mode = 'create'
const visible = false
const handleAddSubLayer = jest.fn()

const props = {
	mode, visible, handleAddSubLayer,
}

describe(`Subtitles Modal test`, () => {


	it(`mount`, () => {
		let wrapper = mount(
			<BrowserRouter>
				<SubtitlesModal {...props} />
			</BrowserRouter>
		)
		expect(wrapper.contains(<h1>Choose an Option</h1>)).toEqual(true)
		expect(wrapper.contains(<p>Start from scratch</p>)).toEqual(true)
	})

	it(`modalButton1 onClick`, ()=> {
		const mockCallBack = jest.fn();
		const button = shallow(<Style onClick={mockCallBack}/>);
		button.find('StyledComponent').simulate('click');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	})

	it(`modalButton2 onClick`, ()=> {
		const mockCallBack = jest.fn();
		const imgButton = shallow(<img alt="close" className="closeModal" src="close_icon.svg" onClick={mockCallBack}/>);
		imgButton.find('img').simulate('click');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	})

	it('renders modal when open flag is true', () => {
		const mockCallBack = jest.fn();
		const button = shallow(<button style={{margin:`10px`}} className="modalButton" onClick={mockCallBack}>Submit</button>);
		button.find('button').simulate('click');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	});
	it('renders modal when open flag is true', () => {
		const handleClick = sinon.spy();
		let wrapper = shallow(<SubtitlesModal setModalVisible={handleClick} {...props}/>);
		wrapper.find('.visible').prop('onClick')()
		expect(handleClick.calledOnce).toBe(true);
	});
	// it('renders modal when open flag is true', () => {
	// 	const handleClick = sinon.spy();
	// 	let wrapper = shallow(<SubtitlesModal fromScratch={handleClick} {...props}/>);
	// 	console.log(wrapper)
	// 	wrapper.find('.closeModal').prop('onClick')()
	// 	expect(handleClick.calledOnce).toBe(true);
	// });

	afterEach(() => {
    jest.resetAllMocks();
  });
	it('renders modal when open flag is true', () => {
		const mElement = { files: "file" };
    const file = document.getElementById = jest.fn().mockReturnValueOnce(mElement);
		const handleClick = sinon.spy();
		let wrapper = shallow(<SubtitlesModal handleAddSubLayerFromFile={handleClick} {...props}/>,{ attachTo: file });
		wrapper.find('.modalButton').at(1).prop('onClick')()
		expect(handleClick.calledOnce).toBe(true);
	});

	it('renders modal when open flag is true', () => {
		const wrapper = mount(
			<BrowserRouter>
				<SubtitlesModal {...props} />
			</BrowserRouter>,
		)

		wrapper.find({"id" : `subFileInput`}).simulate('change', { target: { files: 'path' } });
		let checked = wrapper.find('[files="path"]').first();
		expect(checked).toBeDefined();
	});

})