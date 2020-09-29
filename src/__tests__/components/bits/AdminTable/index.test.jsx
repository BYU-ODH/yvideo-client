import React from 'react'
import { shallow, mount, render } from 'enzyme'
import AdminTable from '../../../../components/bits/AdminTable/index'
import { BrowserRouter} from 'react-router-dom'
import { Link } from 'react-router-dom'

const viewstate = {
	data:[
		{
			email: `test@email.com`,
			id: 22,
			lastLogin: `2020-05-14T19:53:02.807Z`,
			linked: `-1`,
			name: `testname`,
			roles: [`admin`],
			username: `testusername`,
			owner: 'owner',
			collectionId: '23',
			contentType: 'contentType',
			expired: new Date(),
			resourceId: '123',
		},
	],
	searchCategory: `Users`,
	menuActive: true,
	mousePos: 0,
	menuItemInfo: {
		id:"2323",
		owner: "owner"
	}
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
		expect(wrapper.contains(<button onClick={handlers.handleConfirmDelete}>Delete</button>)).toEqual(true)


		viewstate.searchCategory = 'Collections'

		wrapper = mount(
			<BrowserRouter>
				<AdminTable viewstate={viewstate} handlers={handlers}/>
			</BrowserRouter>,
		)

		expect(wrapper.contains(<Link to={`/lab-assistant-manager/owner/2323`} target='_blank'>View/Edit</Link>)).toEqual(true)
		expect(wrapper.contains(<button onClick={handlers.handleConfirmDelete}>Delete</button>)).toEqual(true)


		viewstate.searchCategory = 'Content'

		wrapper = mount(
			<BrowserRouter>
				<AdminTable viewstate={viewstate} handlers={handlers}/>
			</BrowserRouter>,
		)

		expect(wrapper.contains(<Link to={`/player/2323`} target='_blank'>View</Link>)).toEqual(true)
		expect(wrapper.contains(<Link to={`/trackeditor/2323`}>Edit</Link>)).toEqual(true)
		expect(wrapper.contains(<button>Disable</button>)).toEqual(true)
		expect(wrapper.contains(<button onClick={handlers.handleConfirmDelete}>Delete</button>)).toEqual(true)
	})
})