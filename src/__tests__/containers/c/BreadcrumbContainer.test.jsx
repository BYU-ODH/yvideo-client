import React from 'react'
import Container from '../../../containers/c/BreadcrumbContainer'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as testutil from '../../testutil/testutil'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const wrapper =
	<Provider store={testutil.store}>
		<BrowserRouter>
			<Container />
		</BrowserRouter>
	</Provider>

const diffWrapper =
	<Provider store={testutil.store2}>
		<BrowserRouter>
			<Container />
		</BrowserRouter>
	</Provider>

const emptyWrapper =
	<Provider store={testutil.emptyStore}>
		<BrowserRouter>
			<Container />
		</BrowserRouter>
	</Provider>

describe(`BreadcrumbContainer`, () => {
	afterEach(() => {
		jest.resetAllMocks()
		cleanup()
	})
	it(`BreadcrumbContainer`, () => {
		render(wrapper)
		// all of these breadcrumbs come from testutil.store.breadcrumbs
		// screen.getByText(/teehee/)
		const Home = screen.getByText(/Home/i)
		const Manage = screen.getByText(/Manage Collections/i)
		const Editor = screen.getByText(/Video Editor/i)

		expect(Home).not.toBeNull()
		expect(Manage).not.toBeNull()
		expect(Editor).not.toBeNull()

		expect(screen.queryAllByText(/\//)).toHaveLength(3)
		expect(screen.queryAllByRole(`button`)).toHaveLength(3)
		expect(screen.queryAllByRole(`link`)).toHaveLength(3)
	})

	it(`BreadcrumbContainer 2`, () => {
		render(diffWrapper)
		// const user = userEvent.setup()
		// all of these breadcrumbs come from testutil.store2.breadcrumbs
		expect(screen.queryByText(/Home/ && /FeedBack/i)).not.toBeNull()
		expect(screen.queryByText(/Lab Assistant Manager/i && /Admin Dashboard/i)).not.toBeNull()
		expect(screen.queryByText(/Lab assistant Dashboard/i && /Manage Resource/i)).not.toBeNull()
		expect(screen.queryByText(/Manage Public Collections/i)).not.toBeNull()
		expect(screen.queryByText(/Player/i && /Subtitle Editor/i)).not.toBeNull()
		expect(screen.queryByText(/Clip Manager/i && /Manage Collections/i)).not.toBeNull()
		expect(screen.queryAllByText(/\//)).toHaveLength(11)
		expect(screen.queryAllByRole(`button`)).toHaveLength(11)
		expect(screen.queryAllByRole(`link`)).toHaveLength(11)
	})

	it(`BreadcrumbContainer emptyStore`, async () => {
		render(emptyWrapper)
		// all of these breadcrumbs, which is none, come from testutil.emptyStore.breadcrumbs
		expect(screen.getByText(/\//)).not.toBeVisible()
		expect(screen.getByRole(`button`)).not.toHaveTextContent()
		expect(screen.getByRole(`link`)).not.toHaveTextContent()
	})

	it(`Onclick`, async () => {
		render(wrapper)

		const user = userEvent.setup()
		const Home = screen.getByText(/Home/i)
		const Manage = screen.getByText(/Manage Collections/i)
		const Editor = screen.getByText(/Video Editor/i)

		await waitFor(() => {
			user.click(Home)
			user.click(Manage)
			user.click(Editor)
		})
	})
})