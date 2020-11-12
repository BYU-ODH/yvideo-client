import React from 'react'
import { shallow, mount, render } from 'enzyme'
import AdminTable from '../../../../components/bits/AdminTable/index'
import Style, { Table, ItemEdit, Filter, Sort, ItemMenu } from '../../../../components/bits/AdminTable/styles'
import { BrowserRouter} from 'react-router-dom'
import { Link } from 'react-router-dom'

const viewstate = {
	data:[
		{
			email: `atest@email.com`,
			id: 22,
			lastLogin: `2020-05-14T19:53:02.807Z`,
			linked: `-1`,
			name: `testname`,
			roles: [`admin`],
			username: `testusername`,
			owner: 'owner',
			collectionId: '23',
			contentType: 'contentType',
			expired: false,
			resourceId: '123',
		},
		{
		email: `btest1@email.com`,
			id: 23,
			lastLogin: `2020-06-14T19:53:02.807Z`,
			linked: `-2`,
			name: `testname1`,
			roles: [`admin`],
			username: `testusername1`,
			owner: 'owner1',
			collectionId: '24',
			contentType: 'contentType1',
			expired: false,
			resourceId: '234',
		},
	],
	searchCategory: `Users`,
	menuActive: true,
	mousePos: 0,
	menuItemInfo: {
		id:'2323',
		owner: 'owner',
	},
}

const handlers = {
	handleConfirmDelete: jest.fn(),
	toggleMenu: jest.fn(),
}


describe(`admin table test`, () => {
	it(`menu options`, ()=> {
		viewstate.searchCategory = 'Users'

		let wrapper = mount(
			<BrowserRouter>
				<AdminTable viewstate={viewstate} handlers={handlers}/>
			</BrowserRouter>,
		)

		expect(wrapper.contains(<Link to={`/lab-assistant-manager/2323`} target='_blank'>Collections</Link>)).toEqual(true)
		expect(wrapper.contains(<button className="userDelete" onClick={handlers.handleConfirmDelete}>Delete</button>)).toEqual(true)
		expect(wrapper.contains(<td>testusername</td>)).toEqual(true)
		expect(wrapper.contains(<td>testname</td>)).toEqual(true)
		expect(wrapper.contains(<td>admin</td>)).toEqual(true)
		expect(wrapper.contains(<td>atest@email.com</td>)).toEqual(true)
		// expect(wrapper.contains(<td>Thu May 14 2020</td>)).toEqual(true)
		expect(wrapper.contains(<td>testusername1</td>)).toEqual(true)
		expect(wrapper.contains(<td>testname1</td>)).toEqual(true)
		expect(wrapper.contains(<td>btest1@email.com</td>)).toEqual(true)
		// expect(wrapper.contains(<td>Sun Jun 14 2020</td>)).toEqual(true)

		expect(wrapper.contains("NetID")).toEqual(true)
		expect(wrapper.contains("Name")).toEqual(true)
		expect(wrapper.contains("Roles")).toEqual(true)
		expect(wrapper.contains("Email")).toEqual(true)
		expect(wrapper.contains("Last Login")).toEqual(true)

		let button = shallow(<AdminTable viewstate={viewstate} handlers={handlers}/>);
		button.find(".sorting-button").forEach(button => {
			button.simulate("click")
		})
		button.find(ItemEdit).at(0).simulate('click');
		button.find(ItemEdit).at(1).simulate('click');
		button.find(ItemMenu).simulate('click');

		wrapper.find({"to": "/lab-assistant-manager/2323"}).simulate('click');
		wrapper.find({"className": "userDelete"}).simulate('click');

		viewstate.searchCategory = 'Collections'

		wrapper = mount(
			<BrowserRouter>
				<AdminTable viewstate={viewstate} handlers={handlers}/>
			</BrowserRouter>,
		)

		expect(wrapper.contains(<Link to={`/lab-assistant-manager/owner/2323`} target='_blank'>View/Edit</Link>)).toEqual(true)
		expect(wrapper.contains(<button className="collectionsDelete" onClick={handlers.handleConfirmDelete}>Delete</button>)).toEqual(true)
		expect(wrapper.contains(<td>testname</td>)).toEqual(true)
		expect(wrapper.contains(<td>owner1</td>)).toEqual(true)
		expect(wrapper.contains(<td>testname</td>)).toEqual(true)
		expect(wrapper.contains(<td>owner</td>)).toEqual(true)

		expect(wrapper.contains("Name")).toEqual(true)
		expect(wrapper.contains("Owner")).toEqual(true)

		button = shallow(<AdminTable viewstate={viewstate} handlers={handlers}/>);
		button.find(".sorting-button").forEach(button => {
			button.simulate("click")
		})
		button.find(ItemEdit).at(0).simulate('click');
		button.find(ItemEdit).at(1).simulate('click');
		button.find(ItemMenu).simulate('click');

		wrapper.find({"to": "/lab-assistant-manager/owner/2323"}).simulate('click');
		wrapper.find({"className": "collectionsDelete"}).simulate('click');

		viewstate.searchCategory = 'Content'

		wrapper = mount(
			<BrowserRouter>
				<AdminTable viewstate={viewstate} handlers={handlers}/>
			</BrowserRouter>,
		)

		expect(wrapper.contains(<Link to={`/player/2323`} target='_blank'>View</Link>)).toEqual(true)
		expect(wrapper.contains(<Link to={`/trackeditor/2323`}>Edit</Link>)).toEqual(true)
		expect(wrapper.contains(<button>Disable</button>)).toEqual(true)
		expect(wrapper.contains(<button className="contentDelete" onClick={handlers.handleConfirmDelete}>Delete</button>)).toEqual(true)
		expect(wrapper.contains(<td>testname</td>)).toEqual(true)
		expect(wrapper.contains(<td>23</td>)).toEqual(true)
		expect(wrapper.contains(<td>contentType</td>)).toEqual(true)
		expect(wrapper.contains(<td>false</td>)).toEqual(true)
		expect(wrapper.contains(<td>123</td>)).toEqual(true)
		expect(wrapper.contains(<td>testname1</td>)).toEqual(true)
		expect(wrapper.contains(<td>24</td>)).toEqual(true)
		expect(wrapper.contains(<td>contentType1</td>)).toEqual(true)
		expect(wrapper.contains(<td>false</td>)).toEqual(true)
		expect(wrapper.contains(<td>234</td>)).toEqual(true)

		expect(wrapper.contains("Name")).toEqual(true)
		expect(wrapper.contains("Collection")).toEqual(true)
		expect(wrapper.contains("Type")).toEqual(true)
	  expect(wrapper.contains("Expired")).toEqual(true)
		expect(wrapper.contains("ResourceID")).toEqual(true)

		button = shallow(<AdminTable viewstate={viewstate} handlers={handlers}/>);
		console.log(button.debug())

		button.find(".sorting-button").forEach(button => {
			button.simulate("click")
		})
		button.find(ItemEdit).at(0).simulate('click');
		button.find(ItemEdit).at(1).simulate('click');
		button.find(ItemMenu).simulate('click');
		wrapper.find({"to": "/player/2323"}).simulate('click');
		wrapper.find({"to": "/trackeditor/2323"}).simulate('click');
		wrapper.find({"className": "contentDelete"}).simulate('click');

		
	}),

	it(`Sort onClick`, ()=> {
		const mockCallBack = jest.fn();
		const button = shallow(<Sort onClick={mockCallBack}/>);
    button.find('StyledComponent').simulate('click');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	})
	it(`ItemEdit onClick`, ()=> {
		const mockCallBack = jest.fn();
		const button = shallow(<ItemEdit onClick={mockCallBack}/>);
    button.find('StyledComponent').simulate('click');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	})
	it(`ItemMenu onMouseLeave`, ()=> {
		const mockCallBack = jest.fn();
		const mockMousePos = jest.fn();
		const button = shallow(
		<ItemMenu mousePos={mockMousePos} onMouseLeave={mockCallBack}></ItemMenu>);

    button.find('StyledComponent').simulate('mouseLeave');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	})
	it(`Sorting`, ()=> {
		const wrapper = mount(
			<BrowserRouter>
				<AdminTable viewstate={viewstate} handlers={handlers}/>
			</BrowserRouter>,
		)

		const buttons = wrapper.find({"className": "sorting-button"})
		buttons.forEach(button => {
			button.simulate("click")
			let firstRow = viewstate.data[0]
			button.simulate("click")
		})
	})

	it(`headers`, ()=> {
		let wrapper
		let headers

		viewstate.searchCategory = 'Users'
		wrapper = mount(
			<BrowserRouter>
				<AdminTable viewstate={viewstate} handlers={handlers}/>
			</BrowserRouter>,
		)
		headers = wrapper.find({"className": "headers"}).at(0)
		expect(headers.props().children[0]).toEqual("NetID")
		headers = wrapper.find({"className": "headers"}).at(1)
		expect(headers.props().children[0]).toEqual("Name")
		headers = wrapper.find({"className": "headers"}).at(2)
		expect(headers.props().children[0]).toEqual("Roles")
		headers = wrapper.find({"className": "headers"}).at(3)
		expect(headers.props().children[0]).toEqual("Email")
		headers = wrapper.find({"className": "headers"}).at(4)
		expect(headers.props().children[0]).toEqual("Last Login")


		viewstate.searchCategory = 'Collections'
		wrapper = mount(
			<BrowserRouter>
				<AdminTable viewstate={viewstate} handlers={handlers}/>
			</BrowserRouter>,
		)
		headers = wrapper.find({"className": "headers"}).at(0)
		expect(headers.props().children[0]).toEqual("Name")
		headers = wrapper.find({"className": "headers"}).at(1)
		expect(headers.props().children[0]).toEqual("Owner")


		viewstate.searchCategory = 'Content'
		wrapper = mount(
			<BrowserRouter>
				<AdminTable viewstate={viewstate} handlers={handlers}/>
			</BrowserRouter>,
		)
		headers = wrapper.find({"className": "headers"}).at(0)
		expect(headers.props().children[0]).toEqual("Name")
		headers = wrapper.find({"className": "headers"}).at(1)
		expect(headers.props().children[0]).toEqual("Collection")
		headers = wrapper.find({"className": "headers"}).at(2)
		expect(headers.props().children[0]).toEqual("Type")
		headers = wrapper.find({"className": "headers"}).at(3)
		expect(headers.props().children[0]).toEqual("Expired")
		headers = wrapper.find({"className": "headers"}).at(4)
		expect(headers.props().children[0]).toEqual("ResourceID")
	})


})