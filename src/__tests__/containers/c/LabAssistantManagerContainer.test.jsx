import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/LabAssistantManagerContainer'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import CreateCollectionContainer from '../../../components/modals/containers/CreateCollectionContainer'
import * as testutil from '../../testutil/testutil'

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

describe(`lab assistant container test`, () => {

	it(`test props should be true`, () => {
		const wrapper = shallow(
			<Container store={testutil.store}/>,
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

	jest.mock(`react-router-dom`, () => ({
		...jest.requireActual(`react-router-dom`),
		useParams: jest.fn().mockReturnValue({ professorId: 10, collectionId:11 }),
	}))

	// it(`test props should be true`, () => {
	// 	const collections = testutil.collections
	// 	const professor = testutil.professor1
	// 	const props = {
	// 		admin: true,
	// 		collections,
	// 		professor,
	// 		searchCollections: jest.fn(),
	// 		setHeaderBorder: jest.fn(),
	// 		setProfessor: jest.fn(),
	// 		toggleModal: jest.fn(),
	// 	}

	// 	const wrapper = mount(
	// 		<BrowserRouter>
	// 			<Provider store={testutil.store}>
	// 				<Container {...props} />,
	// 			</Provider>
	// 		</BrowserRouter>,
	// 	)

	// 	console.log(wrapper.debug())
	// })

	// TODO: need to figure out how to test dispatch inside the react hook
	// it(`Test Dummy Ajax call`, () => {
	// 	const setHeaderBorder = [{ type: `SET_HEADER_BORDER`, payload: { data: true } }]

	// 	return testutil.store.dispatch(actionCreator()).then(() => {
	// 		expect(testutil.store.getActions()).toEqual(setHeaderBorder)
	// 	})
	// })
})