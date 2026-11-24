import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { act } from 'react-dom/test-utils'
import configureMockStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom'
import Container, { RELEASE_BANNER_KEY, todayString } from '../../../containers/c/HeaderContainer'

const mockStore = configureMockStore([])

const makeStore = (roles, permissions = false) => mockStore({
	interfaceStore: {
		lost: false,
		headerBorder: false,
		editorStyle: false,
		breadcrumbs: { path: [], collectionId: `` },
	},
	authStore: {
		user: roles === null ? null : { username: `test`, roles },
		permissions,
	},
})

const render = store => mount(
	<Provider store={store}>
		<BrowserRouter>
			<Container />
		</BrowserRouter>
	</Provider>,
)

const hasBanner = wrapper => wrapper.find(`[data-testid='release-banner']`).exists()

describe(`Header Y-Video 2.0 release banner`, () => {
	beforeEach(() => {
		window.localStorage.clear()
	})

	it.each([
		[`admin`, 0],
		[`lab assistant`, 1],
		[`instructor`, 2],
	])(`shows for %s`, (_, roles) => {
		const wrapper = render(makeStore(roles))
		expect(hasBanner(wrapper)).toBe(true)
		expect(wrapper.find(`a[href='https://odh.byu.edu/blog/meet-the-new-y-video/']`).exists()).toBe(true)
		expect(wrapper.text()).toContain(`December 18`)
	})

	it(`shows for student TAs`, () => {
		const wrapper = render(makeStore(3, { 'ta-permission': true }))
		expect(hasBanner(wrapper)).toBe(true)
	})

	it(`does not show for students without a TA role`, () => {
		expect(hasBanner(render(makeStore(3)))).toBe(false)
		expect(hasBanner(render(makeStore(3, { 'ta-permission': false })))).toBe(false)
	})

	it(`does not show without a user`, () => {
		expect(hasBanner(render(makeStore(null)))).toBe(false)
	})

	afterEach(() => {
		jest.useRealTimers()
	})

	it(`hides when dismissed and stays dismissed for the rest of the day`, () => {
		const wrapper = render(makeStore(2))
		act(() => {
			wrapper.find(`button[data-testid='release-banner-dismiss']`).simulate(`click`)
		})
		wrapper.update()
		expect(hasBanner(wrapper)).toBe(false)
		expect(window.localStorage.getItem(RELEASE_BANNER_KEY)).toBe(todayString())

		expect(hasBanner(render(makeStore(2)))).toBe(false)
	})

	it(`shows again the next day after being dismissed`, () => {
		jest.useFakeTimers({ now: new Date(2026, 11, 10, 23, 30) })
		const wrapper = render(makeStore(2))
		act(() => {
			wrapper.find(`button[data-testid='release-banner-dismiss']`).simulate(`click`)
		})
		expect(hasBanner(render(makeStore(2)))).toBe(false)

		jest.setSystemTime(new Date(2026, 11, 11, 0, 30))
		expect(hasBanner(render(makeStore(2)))).toBe(true)
	})

	it(`shows again for a legacy permanent dismissal value`, () => {
		window.localStorage.setItem(RELEASE_BANNER_KEY, `true`)
		expect(hasBanner(render(makeStore(2)))).toBe(true)
	})
})
