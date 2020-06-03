import React from 'react'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Container from '../../../containers/c/LabAssistantManagerContainer'
import configureMockStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom'
import { objectIsEmpty } from 'lib/util'

const thunk = require(`redux-thunk`).default
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// const mockStore = configureMockStore()

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	disableLifecycleMethods: true,
})

// const dummy = () => {
// 	// Mock Ajax call
// 	// Note that you are not capturing any error in here and you are not
// 	// calling the reject method, so your *catch* clausule will never be
// 	// executed.
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => resolve({ data: true }), 200)
// 	})
// }

// const actionCreator = () => (dispatch) => {
// 	return dummy()
// 		.then(payload => dispatch({ type: `SET_HEADER_BORDER`, payload }))
// 		.catch(error => dispatch({ type: `FAILURE`, error }))
// }

// describe(`Redux Mock Store`, () => {
// 	it(`Test Dummy Ajax call`, () => {
// 		const setHeaderBorder = [{ type: `SET_HEADER_BORDER`, payload: { data: true } }]
// 		const store = mockStore({})
// 		return store.dispatch(actionCreator()).then(() => {
// 			expect(store.getActions()).toEqual(setHeaderBorder)
// 		})
// 	})
// })

describe(`lab assistant container test`, () => {
	const store = mockStore({
		authStore: {
			user:{
				roles: `admin`,
			},
		},
		adminStore: {
			professorCollections:{
				archived: false,
				content : [
					{
						contentType: `video`,
						id: 110,
						name: `testname`,
						thumbnail: `test@thumbnail`,
						views: 0,
					},
				],
				id: 65,
				name: `Collection 1`,
				owner: 22,
				published: true,
				thumbnail: `test@thumbnail`,
				collections: [
					{
						archived: false,
						content : [
							{
								contentType: `video`,
								id: 110,
								name: `testname`,
								thumbnail: `test@thumbnail`,
								views: 0,
							},
						],
						id: 65,
						name: `Collection 1`,
						owner: 22,
						published: true,
						thumbnail: `test@thumbnail`,
					},
				],
			},
			professors: [
				{
					email: `test1@email.com`,
					id: 22,
					lastLogin: `2020-05-14T19:53:02.807Z`,
					linked: `-1`,
					name: `testname professor1`,
					roles: [`admin`],
					username: `testusername`,
				},
				{
					email: `test2@email.com`,
					id: 23,
					lastLogin: `2020-05-14T19:53:02.807Z`,
					linked: `-1`,
					name: `testname professor2`,
					roles: [`admin`],
					username: `testusername2`,
				},
			],
		},
	})

	it(`test props should be true`, () => {
		const wrapper = shallow(
			<Container store={store}/>,
		).dive()

		const collections = wrapper.props().collections
		expect(collections.archived).toBe(false)
		expect(collections.id).toBe(65)
		expect(collections.name).toBe(`Collection 1`)
		expect(collections.owner).toBe(22)
		expect(collections.content[0].contentType).toBe(`video`)
		expect(collections.content[0].id).toBe(110)
		expect(collections.content[0].name).toBe(`testname`)
		expect(collections.content[0].thumbnail).toBe(`test@thumbnail`)
	})
})