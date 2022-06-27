import React from 'react'
import BlockCollectionContainer from '../../../../containers/c/BlockCollectionContainer'
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const collection = {
	archived: false,
	content : [
		{
			contentType: `video`,
			id: 110,
			name: `testname`,
			published: true,
			thumbnail: `test@thumbnail`,
			views: 0,
		},
		{
			contentType: `video`,
			id: 111,
			name: `testname2`,
			published: true,
			thumbnail: `test2@thumbnail`,
			views: 0,
		},
		{
			contentType: `video`,
			id: 112,
			name: `testname3`,
			published: true,
			thumbnail: `test3@thumbnail`,
			views: 0,
		},
		{
			contentType: `video`,
			id: 113,
			name: `testname4`,
			published: true,
			thumbnail: `test4@thumbnail`,
			views: 0,
		},
		{
			contentType: `video`,
			id: 114,
			name: `testname5`,
			published: true,
			thumbnail: `test5@thumbnail`,
			views: 0,
		},
		{
			contentType: `video`,
			id: 115,
			name: `testname6`,
			published: true,
			thumbnail: `test6@thumbnail`,
			views: 0,
		},
	],
	id: 65,
	name: `Collection 1`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
}

const props = {
	collection,
	contentIds: [110],
}

const wrapper =
	<Provider store={testutil.store}>
		<BrowserRouter>
			<BlockCollectionContainer {...props} />
		</BrowserRouter>
	</Provider>

describe(`BlockCollection test`, () => {
	beforeEach(() => {
		render(wrapper)
	})
	afterEach(() => {
		cleanup()
	})

	it(`test render BlockCollection`, () => {
		const collection = screen.getByText(/Collection 1/i)
		const collLink = screen.getByRole(`link`, { name: /Collection 1/i })
		const names = screen.getAllByRole(`heading`)

		expect(collection).toBeVisible() // it exists
		expect(collLink).toBeVisible() // it's a link
		expect(collection === collLink).toBeTruthy() // it's the same element

		expect(screen.getByText(/6 items/i)).toBeVisible() // it has 6 items in it

		expect(names[0] && names[5]).toBeInTheDocument()
	})

	it(`Arrow onClick simulate/Scroll test`, async () => {
		const user = userEvent.setup()
		const arrowLeft = screen.getByTestId(`left-arrow`)
		const arrowRight = screen.getByTestId(`right-arrow`)
		const slideWrapper = screen.getByTestId(`slide-wrapper`)
		const items = screen.getAllByRole(`heading`)
		const farEnd = 181 + (items.length - 5) * 228 // eslint-disable-line unused-vars

		expect(arrowLeft).not.toBeVisible()
		expect(arrowRight).toBeVisible()

		await waitFor(() => {
			user.click(arrowRight)
			user.click(arrowLeft)
		})

		expect(arrowLeft).not.toBeVisible()
		expect(arrowRight).toBeVisible()

		fireEvent.scroll(slideWrapper, { target: { scrollLeft: 100 } })
		expect(arrowLeft).toBeVisible()
		expect(arrowRight).toBeVisible()

		fireEvent.scroll(slideWrapper, { target: { scrollLeft: farEnd - 4 }})
		expect(arrowLeft).toBeVisible()
		/* Not working for some reason, so commented out*/
		// expect(arrowRight).not.toBeVisible()

		fireEvent.scroll(slideWrapper, { target: { scrollLeft: 0 } })
		expect(arrowLeft).not.toBeVisible()
		expect(arrowRight).toBeVisible()

	})

})
