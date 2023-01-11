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
		const breadcrumbs = {
			home: screen.getByText(/Home/i),
			manage: screen.getByText(/Manage Collections/i),
			editor: screen.getByText(/Video Editor/i),
		}
		Object.values(breadcrumbs).forEach(breadcrumb => {
			expect(breadcrumb).not.toBeNull()
		})
		expect(breadcrumbs.home).toHaveAttribute(`href`, `/`)
		expect(breadcrumbs.manage).toHaveAttribute(`href`, `/manager/collectionId`)
		expect(breadcrumbs.editor).not.toHaveAttribute(`href`, `/videoEditor/contentId`)

		expect(screen.queryAllByText(/\//)).toHaveLength(3)
		expect(screen.queryAllByRole(`button`)).toHaveLength(3)
		expect(screen.queryAllByRole(`link`)).toHaveLength(2)
	})

	it(`BreadcrumbContainer 2`, () => {
		render(diffWrapper)
		// all of these breadcrumbs come from testutil.store2.breadcrumbs
		const breadcrumbs = {
			home: screen.getByText(/Home/i),
			feedback: screen.getByText(/Feedback/i),
			labManager: screen.getByText(/Lab Assistant Manager/i),
			adminDash: screen.getByText(/Admin Dashboard/i),
			labDash: screen.getByText(/Lab assistant Dashboard/i),
			manageResource: screen.getByText(/Manage Resource/i),
			managePub: screen.getByText(/Manage Public Collections/i),
			player: screen.getByText(/Player/i),
			subEditor: screen.getByText(/Subtitle Editor/i),
			clipManager: screen.getByText(/Clip Manager/i),
			manageColl: screen.getByText(/Manage Collections/i),
		}
		Object.values(breadcrumbs).forEach(breadcrumb => {
			expect(breadcrumb).not.toBeNull()
		})

		expect(breadcrumbs.home).toHaveAttribute(`href`, `/`)
		expect(breadcrumbs.feedback).toHaveAttribute(`href`, `/feedback`)
		expect(breadcrumbs.labManager).toHaveAttribute(`href`, `/lab-assistant-manager/collectionId`)
		expect(breadcrumbs.adminDash).toHaveAttribute(`href`, `/admin`)
		expect(breadcrumbs.labDash).toHaveAttribute(`href`, `/`)
		expect(breadcrumbs.manageResource).toHaveAttribute(`href`, `/manage-resource`)
		expect(breadcrumbs.managePub).toHaveAttribute(`href`, `/public-manager/collectionId`)
		expect(breadcrumbs.player).toHaveAttribute(`href`, `/player/contentId`)
		expect(breadcrumbs.subEditor).toHaveAttribute(`href`, `/subtitleEditor`)
		expect(breadcrumbs.clipManager).toHaveAttribute(`href`, `/clipEditor/contentId`)
		expect(breadcrumbs.manageColl).not.toHaveAttribute(`href`, `/manager/collectionId`)

		expect(screen.queryAllByText(/\//)).toHaveLength(11)
		expect(screen.queryAllByRole(`button`)).toHaveLength(11)
		expect(screen.queryAllByRole(`link`)).toHaveLength(10)
	})

	it(`BreadcrumbContainer emptyStore`, () => {
		render(emptyWrapper)
		// all of these breadcrumbs, which is none, come from testutil.emptyStore.breadcrumbs
		expect(screen.getByText(/\//)).not.toBeVisible()
		expect(screen.getByRole(`button`)).not.toHaveTextContent()
		expect(screen.queryByRole(`link`)).toBeNull()
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
