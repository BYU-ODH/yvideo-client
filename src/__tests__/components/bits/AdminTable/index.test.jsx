import React from 'react'
import { shallow, mount } from 'enzyme'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import '@testing-library/dom'
import AdminTable from '../../../../components/bits/AdminTable/index'
import { ItemEdit, Sort, ItemMenu } from '../../../../components/bits/AdminTable/styles'
import { Link, BrowserRouter} from 'react-router-dom'
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers'

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
			owner: `owner`,
			collectionId: `23`,
			contentType: `contentType`,
			expired: false,
			resourceId: `123`,
		},
		{
			email: `btest1@email.com`,
			id: 23,
			lastLogin: `2020-06-14T19:53:02.807Z`,
			linked: `-2`,
			name: `testname1`,
			roles: [`admin`],
			username: `testusername1`,
			owner: `owner1`,
			collectionId: `24`,
			contentType: `contentType1`,
			expired: false,
			resourceId: `234`,
		},
	],
	isEdit: false,
	searchCategory: `Users`,
	menuActive: true,
	mousePos: 0,
	menuItemInfo: {
		id:`2323`,
		owner: `owner`,
	},
}

const handlers = {
	handleEdit: jest.fn(),
	handleConfirmDelete: jest.fn(),
	toggleMenu: jest.fn(),
	userRoleSave: jest.fn(),
}

const tipHandlers = {
	handleShowTip: jest.fn(),
	toggleTip: jest.fn(),
}

const wrapper =
	<BrowserRouter>
		<AdminTable viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers} />
	</BrowserRouter>

describe(`Admin Table test`, () => {
	describe(`User menu Options`, () => {
		beforeEach(() => {
			render(wrapper)
		})
		afterEach(() => {
			jest.clearAllMocks()
			cleanup()
		})
		it(`Test ellipsis menu`, async () => {
			const sortMock = jest.fn()

			// viewstate.searchCategory is `Users`
			const user = userEvent.setup()
			const collectionLink = screen.getByRole(`link`)
			const edit = screen.getByText(/Edit/)
			const deleteButton = screen.getByText(/Delete/)
			const sampleSort = screen.getAllByTestId(`sorting-button`)[0]

			expect(collectionLink).toBeVisible()
			expect(edit).toBeVisible()
			expect(deleteButton).toBeVisible()
			const menuButtons = screen.getAllByTestId(`item-edit`)

			await waitFor(() => {
				user.click(menuButtons[0])
				user.click(menuButtons[1])
			})
			// because there is another toggle call to close the last menu
			expect(handlers.toggleMenu).toHaveBeenCalledTimes(3)

			await user.click(edit)
			expect(handlers.handleEdit).toHaveBeenCalledTimes(1)

			await user.click(deleteButton)
			expect(handlers.handleConfirmDelete).toHaveBeenCalledTimes(1)

			await user.click(edit)
		})
	})
	describe(`Edit mode`, () => {
		beforeEach(() => {
			viewstate.isEdit = true
			render(wrapper)
		})
		afterEach(() => {
			jest.clearAllMocks()
			cleanup()
		})
		it(`Roles content`, async () => {
			const user = userEvent.setup()

			const select1 = screen.getAllByRole(`combobox`)[0]
			const select2 = screen.getAllByRole(`combobox`)[1]
			const options = screen.getAllByText(/[0-3]:/) //match all 4 options * 2 because there are 2 menus
			const save = screen.getAllByText(/Save/)

			for (const i in options)
				expect(options[i]).toBeVisible()

			expect((options[0] && options[4]).selected).toBeTruthy() //admin is selected


			await waitFor(() => {
				user.selectOptions(select1, `1: lab assistant`)
				user.selectOptions(select2, `2: instructor / professor`)
				expect((options[1] && options[6]).selected).toBeTruthy()
			})
			expect((options[1] && options[6]).selected).toBeTruthy()

			await user.click(save[0])
			expect(handlers.userRoleSave).toHaveBeenCalledTimes(1)

		})

		it(`Other content still present`, async () => {
			const user = userEvent.setup()
			const NetIds = screen.getAllByText(/testuser/i)
			const names = screen.getAllByText(/testname/i)
			const emails = screen.getAllByText(/@email.com/i)
			const lastLogins = screen.getAllByText(/2020/)

			for (const i in NetIds) {
				expect(NetIds[i]).toBeVisible()
				expect(names[i]).toBeVisible()
				expect(emails[i]).toBeVisible()
				expect(lastLogins[i]).toBeVisible()
			}

			// expect(options[0].selected).toBeTruthy() // test version
			// expect(screen.getByText(/test version/)).toBeVisible()

			// expect(options[0].selected).toBeFalsy() // test version
			// expect(options[1].selected).toBeFalsy() // lang1
			// expect(options[2].selected).toBeTruthy() // lang2
			// expect(screen.getByText(/lang2/)).toBeVisible()
			// expect(options[3].selected).toBeFalsy() // lang3

			// expect(screen.getByText(/Save/i)).toBeVisible()

		})

	})


			// expect(wrapper.contains(<Link to={`/lab-assistant-manager/2323`} target='_blank'>Collections</Link>)).toEqual(true)
			// expect(wrapper.contains(<button className='userDelete' onClick={handlers.handleConfirmDelete}>Delete</button>)).toEqual(true)
			// expect(wrapper.contains(<td>testusername</td>)).toEqual(true)
			// expect(wrapper.contains(<td>testname</td>)).toEqual(true)
			// expect(wrapper.contains(<td>admin</td>)).toEqual(true)
			// expect(wrapper.contains(<td>atest@email.com</td>)).toEqual(true)
			// // expect(wrapper.contains(<td>Thu May 14 2020</td>)).toEqual(true)
			// expect(wrapper.contains(<td>testusername1</td>)).toEqual(true)
			// expect(wrapper.contains(<td>testname1</td>)).toEqual(true)
			// expect(wrapper.contains(<td>btest1@email.com</td>)).toEqual(true)
			// // expect(wrapper.contains(<td>Sun Jun 14 2020</td>)).toEqual(true)

			// expect(wrapper.contains(`NetID`)).toEqual(true)
			// expect(wrapper.contains(`Name`)).toEqual(true)
			// expect(wrapper.contains(`Roles`)).toEqual(true)
			// expect(wrapper.contains(`Email`)).toEqual(true)
			// expect(wrapper.contains(`Last Login`)).toEqual(true)

			// let button = shallow(<AdminTable viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers}/>)
			// button.find(`.sorting-button`).forEach(button => {
			// 	button.simulate(`click`)
			// })
			// button.find(ItemEdit).at(0).simulate(`click`)
			// button.find(ItemEdit).at(1).simulate(`click`)
			// button.find(ItemMenu).simulate(`click`)
			// button.find(ItemMenu).simulate(`mouseEnter`, { target: { x: 3, y: 4, width: 10 } })
			// button.find(ItemMenu).simulate(`mouseLeave`)

			// wrapper.find({"to": `/lab-assistant-manager/2323`}).simulate(`click`)
			// wrapper.find({"className": `userDelete`}).simulate(`click`)

			// viewstate.searchCategory = `Collections`

			// wrapper = mount(
			// 	<BrowserRouter>
			// 		<AdminTable viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers}/>
			// 	</BrowserRouter>,
			// )

			// expect(wrapper.contains(<Link to={`/lab-assistant-manager/owner/2323`} target='_blank'>View/Edit</Link>)).toEqual(true)
			// expect(wrapper.contains(<button className='collectionsDelete' onClick={handlers.handleConfirmDelete}>Delete</button>)).toEqual(true)
			// expect(wrapper.contains(<td>testname</td>)).toEqual(true)
			// expect(wrapper.contains(<td>testusername1</td>)).toEqual(true)
			// expect(wrapper.contains(<td>testname</td>)).toEqual(true)
			// // expect(wrapper.contains(<td>owner</td>)).toEqual(true)

			// expect(wrapper.contains(`Name`)).toEqual(true)
			// expect(wrapper.contains(`Owner`)).toEqual(true)

			// button = shallow(<AdminTable viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers}/>)
			// button.find(`.sorting-button`).forEach(button => {
			// 	button.simulate(`click`)
			// })
			// button.find(ItemEdit).at(0).simulate(`click`)
			// button.find(ItemEdit).at(1).simulate(`click`)
			// button.find(ItemMenu).simulate(`click`)

			// wrapper.find({"to": `/lab-assistant-manager/owner/2323`}).simulate(`click`)
			// wrapper.find({"className": `collectionsDelete`}).simulate(`click`)

			// viewstate.searchCategory = `Content`

			// wrapper = mount(
			// 	<BrowserRouter>
			// 		<AdminTable viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers}/>
			// 	</BrowserRouter>,
			// )

			// // console.log(wrapper.debug())

			// expect(wrapper.contains(<Link to={`/player/2323`} target='_blank'>View</Link>)).toEqual(true)
			// expect(wrapper.contains(<Link to={`/videoeditor/2323`}>Edit</Link>)).toEqual(true)
			// expect(wrapper.contains(<button>Disable</button>)).toEqual(true)
			// expect(wrapper.contains(<button className='contentDelete' onClick={handlers.handleConfirmDelete}>Delete</button>)).toEqual(true)
			// expect(wrapper.contains(<td>testname</td>)).toEqual(true)
			// // expect(wrapper.contains(<td>23</td>)).toEqual(true)
			// expect(wrapper.contains(<td>contentType</td>)).toEqual(true)
			// expect(wrapper.contains(<td>false</td>)).toEqual(true)
			// expect(wrapper.contains(<td>123</td>)).toEqual(true)
			// expect(wrapper.contains(<td>testname1</td>)).toEqual(true)
			// // expect(wrapper.contains(<td>24</td>)).toEqual(true)
			// expect(wrapper.contains(<td>contentType1</td>)).toEqual(true)
			// expect(wrapper.contains(<td>false</td>)).toEqual(true)
			// expect(wrapper.contains(<td>234</td>)).toEqual(true)

			// expect(wrapper.contains(`Name`)).toEqual(true)
			// expect(wrapper.contains(`Collection`)).toEqual(true)
			// expect(wrapper.contains(`Type`)).toEqual(true)
			// expect(wrapper.contains(`Expired`)).toEqual(true)
			// expect(wrapper.contains(`ResourceID`)).toEqual(true)

			// button = shallow(<AdminTable viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers}/>)
			// // console.log(button.debug())

			// button.find(`.sorting-button`).forEach(button => {
			// 	button.simulate(`click`)
			// })
			// button.find(ItemEdit).at(0).simulate(`click`)
			// button.find(ItemEdit).at(1).simulate(`click`)
			// button.find(ItemMenu).simulate(`click`)
			// wrapper.find({"to": `/player/2323`}).simulate(`click`)
			// wrapper.find({"to": `/videoeditor/2323`}).simulate(`click`)
			// wrapper.find({"className": `contentDelete`}).simulate(`click`)

	// it(`Sort onClick`, ()=> {
	// 	const mockCallBack = jest.fn()
	// 	const button = shallow(<Sort onClick={mockCallBack}/>)
	// 	button.find(`StyledComponent`).simulate(`click`)
	// 	expect(mockCallBack.mock.calls.length).toEqual(1)
	// })
	// it(`ItemEdit onClick`, ()=> {
	// 	const mockCallBack = jest.fn()
	// 	const button = shallow(<ItemEdit onClick={mockCallBack}/>)
	// 	button.find(`StyledComponent`).simulate(`click`)
	// 	expect(mockCallBack.mock.calls.length).toEqual(1)
	// })
	// it(`ItemEdit onMouseEnter`, ()=> {
	// 	const mockCallBack = jest.fn()
	// 	const button = shallow(<ItemEdit onMouseEnter={mockCallBack}/>)
	// 	button.find(`StyledComponent`).simulate(`MouseEnter`)
	// 	expect(mockCallBack.mock.calls.length).toEqual(1)
	// })
	// it(`ItemEdit onMouseLeave`, ()=> {
	// 	const mockCallBack = jest.fn()
	// 	const button = shallow(<ItemEdit onMouseLeave={mockCallBack}/>)
	// 	button.find(`StyledComponent`).simulate(`MouseLeave`)
	// 	expect(mockCallBack.mock.calls.length).toEqual(1)
	// })
	// it(`ItemMenu onMouseLeave`, ()=> {
	// 	const mockCallBack = jest.fn()
	// 	const mockMousePos = jest.fn()
	// 	const button = shallow(
	// 		<ItemMenu mousePos={mockMousePos} onMouseLeave={mockCallBack}></ItemMenu>)

	// 	button.find(`StyledComponent`).simulate(`mouseLeave`)
	// 	expect(mockCallBack.mock.calls.length).toEqual(1)
	// })
	// it(`Sorting`, ()=> {
	// 	const wrapper = mount(
	// 		<BrowserRouter>
	// 			<AdminTable viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers}/>
	// 		</BrowserRouter>,
	// 	)

	// 	const buttons = wrapper.find({"className": `sorting-button`})
	// 	buttons.forEach(button => {
	// 		button.simulate(`click`)
	// 		button.simulate(`click`)
	// 	})
	// })

	// it(`headers`, ()=> {
	// 	let wrapper
	// 	let headers

	// 	viewstate.searchCategory = `Users`
	// 	wrapper = mount(
	// 		<BrowserRouter>
	// 			<AdminTable viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers}/>
	// 		</BrowserRouter>,
	// 	)
	// 	headers = wrapper.find({"className": `headers`}).at(0)
	// 	expect(headers.props().children[0]).toEqual(`NetID`)
	// 	headers = wrapper.find({"className": `headers`}).at(1)
	// 	expect(headers.props().children[0]).toEqual(`Name`)
	// 	headers = wrapper.find({"className": `headers`}).at(2)
	// 	expect(headers.props().children[0]).toEqual(`Roles`)
	// 	headers = wrapper.find({"className": `headers`}).at(3)
	// 	expect(headers.props().children[0]).toEqual(`Email`)
	// 	headers = wrapper.find({"className": `headers`}).at(4)
	// 	expect(headers.props().children[0]).toEqual(`Last Login`)

	// 	viewstate.searchCategory = `Collections`
	// 	wrapper = mount(
	// 		<BrowserRouter>
	// 			<AdminTable viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers}/>
	// 		</BrowserRouter>,
	// 	)
	// 	headers = wrapper.find({"className": `headers`}).at(0)
	// 	expect(headers.props().children[0]).toEqual(`Name`)
	// 	headers = wrapper.find({"className": `headers`}).at(1)
	// 	expect(headers.props().children[0]).toEqual(`Owner`)

	// 	viewstate.searchCategory = `Content`
	// 	wrapper = mount(
	// 		<BrowserRouter>
	// 			<AdminTable viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers}/>
	// 		</BrowserRouter>,
	// 	)
	// 	headers = wrapper.find({"className": `headers`}).at(0)
	// 	expect(headers.props().children[0]).toEqual(`Name`)
	// 	headers = wrapper.find({"className": `headers`}).at(1)
	// 	expect(headers.props().children[0]).toEqual(`Collection`)
	// 	headers = wrapper.find({"className": `headers`}).at(2)
	// 	expect(headers.props().children[0]).toEqual(`Type`)
	// 	headers = wrapper.find({"className": `headers`}).at(3)
	// 	expect(headers.props().children[0]).toEqual(`Expired`)
	// 	headers = wrapper.find({"className": `headers`}).at(4)
	// 	expect(headers.props().children[0]).toEqual(`ResourceID`)
	// })

})