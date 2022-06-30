import React from 'react'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminTable from '../../../../components/bits/AdminTable/index'
import { BrowserRouter } from 'react-router-dom'

const viewstate = {
	data: [
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
		id: `2323`,
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
	describe(`User menu options`, () => {
		describe(`Not editing`, () => {
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
			})

			it(`Content visible`, async () => {
				const netIds = screen.getAllByText(/testuser/i)
				const names = screen.getAllByText(/testname/i)
				const roles = screen.getAllByText(/[0-4]/)
				const emails = screen.getAllByText(/@email.com/i)
				const lastLogins = screen.getAllByText(/2020/)

				for (const i in netIds) {
					expect(netIds[i]).toBeVisible()
					expect(names[i]).toBeVisible()
					expect(roles[i]).toBeVisible()
					expect(emails[i]).toBeVisible()
					expect(lastLogins[i]).toBeVisible()
				}
			})
		})

		describe(`User Edit mode`, () => {
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
				const options = screen.getAllByText(/[0-3]:/) // match all 4 options * 2 because there are 2 menus
				const save = screen.getAllByText(/Save/)

				for (const i in options)
					expect(options[i]).toBeVisible()

				expect((options[0] && options[4]).selected).toBeTruthy() // admin is selected

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
				const netIds = screen.getAllByText(/testuser/i)
				const names = screen.getAllByText(/testname/i)
				const emails = screen.getAllByText(/@email.com/i)
				const lastLogins = screen.getAllByText(/2020/)

				for (const i in netIds) {
					expect(netIds[i]).toBeVisible()
					expect(names[i]).toBeVisible()
					expect(emails[i]).toBeVisible()
					expect(lastLogins[i]).toBeVisible()
				}
			})
		})
	})

	describe(`Collections menu options`, () => {
		beforeEach(() => {
			viewstate.searchCategory = `Collections`
			render(wrapper)
		})
		afterEach(() => {
			jest.clearAllMocks()
			cleanup()
		})
		it(`Test ellipsis menu`, async () => {
			const sortMock = jest.fn()

			// viewstate.searchCategory is `Collections`
			const user = userEvent.setup()
			const collectionLink = screen.getByRole(`link`)
			const deleteButton = screen.getByText(/Delete/)
			const sampleSort = screen.getAllByTestId(`sorting-button`)[0]

			expect(collectionLink).toBeVisible()
			expect(deleteButton).toBeVisible()
			const menuButtons = screen.getAllByTestId(`item-edit`)

			await waitFor(() => {
				user.click(menuButtons[0])
				user.click(menuButtons[1])
			})
			// because there is another toggle call to close the last menu
			expect(handlers.toggleMenu).toHaveBeenCalledTimes(3)

			await user.click(deleteButton)
			expect(handlers.handleConfirmDelete).toHaveBeenCalledTimes(1)
		})

		it(`Content visible`, async () => {
			const names = screen.getAllByText(/testname/i)
			const owners = screen.getAllByText(/testuser/i)

			for (const i in names) {
				expect(names[i]).toBeVisible()
				expect(owners[i]).toBeVisible()
			}
		})
	})

	describe(`Content menu options`, () => {
		beforeEach(() => {
			viewstate.searchCategory = `Content`
			render(wrapper)
		})
		afterEach(() => {
			jest.clearAllMocks()
			cleanup()
		})
		it(`Test ellipsis menu`, async () => {
			const sortMock = jest.fn()

			// viewstate.searchCategory is `Content`
			const user = userEvent.setup()
			const viewLink = screen.getByText(/View/)
			const edit = screen.getByText(/Edit/)
			const deleteButton = screen.getByText(/Delete/)
			const sampleSort = screen.getAllByTestId(`sorting-button`)[0]

			expect(viewLink).toBeVisible()
			expect(edit).toBeVisible()
			expect(deleteButton).toBeVisible()
			const menuButtons = screen.getAllByTestId(`item-edit`)

			await waitFor(() => {
				user.click(menuButtons[0])
				user.click(menuButtons[1])
			})
			// because there is another toggle call to close the last menu
			expect(handlers.toggleMenu).toHaveBeenCalledTimes(3)

			await user.click(deleteButton)
			expect(handlers.handleConfirmDelete).toHaveBeenCalledTimes(1)
		})

		it(`Content visible`, async () => {
			const names = screen.getAllByText(/testname/i)
			const collections = screen.getAllByText(/23 || 24/)
			const types = screen.getAllByText(/contentType/)
			const expirations = screen.getAllByText(/false || true/i)
			const resourceIds = screen.getAllByText(/123 || 234/)

			for (const i in names) {
				expect(names[i]).toBeVisible()
				expect(collections[i]).toBeVisible()
				expect(types[i]).toBeVisible()
				expect(expirations[i]).toBeVisible()
				expect(resourceIds[i]).toBeVisible()
			}
		})
	})

})