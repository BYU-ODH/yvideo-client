import React from 'react'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Container from '../../../containers/c/CollectionsContainer'
import Collection from '../../../components/c/Collections/index'
import configureMockStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom'

const mockStore = configureMockStore()

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	disableLifecycleMethods: true,
})

describe(`collection container test`, () => {
	const store = mockStore({
		authStore: {
			user:{
				roles: `admin`,
			},
		},
		interfaceStore: {
			displayBlocks: true,
		},
		collectionStore: {
			cache: {
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
		},
		contentStore: {
			lastFetched: 1590620684487,
			loading: false,
			cache: [
				{
					authKey: `d43e0f636e7e14ebe816f2ced66350c8`,
					collectionId: 65,
					contentType: `video`,
					dateValidated: ``,
					expired: true,
					fullVideo: true,
					id: 110,
					isCopyrighted: false,
					name: `testname`,
					physicalCopyExists: false,
					published: true,
					requester: ``,
					resourceId: `5ebdaef333e57c17198b4583`,
					settings:{
						allowDefinitions: false,
						annotationDocument: [],
						aspectRatio: `1.77`,
						captionTrack: [],
						description: ``,
						showAnnotations: false,
						showCaptions: false,
						showTranscripts: false,
						showWordList: false,
						targetLanguages: [],
					},
					thumbnail: `test@thumbnail`,
					views: 0,
				},
			],
		},
	})

	it(`test props should be true`, () => {
		const wrapper = shallow(
			<Container store={store}/>,
		).dive()

		const props = wrapper.props()
		expect(props.isAdmin).toBe(true)
		expect(props.isProf).toBe(false)
		expect(props.displayBlocks).toBe(true)
		expect(props.collections.archived).toBe(false)
		expect(props.collections.id).toBe(65)
		expect(props.collections.published).toBe(true)
		expect(props.collections.owner).toBe(22)
		expect(props.collections.thumbnail).toBe(`test@thumbnail`)
		expect(props.collections.content[0].name).toBe(`testname`)
		expect(props.collections.content[0].thumbnail).toBe(`test@thumbnail`)
	})

	it(`collections container check viewstate`, () => {

		const wrapper = shallow(
			<Container store={store}/>,
		).childAt(0).dive()

		// console.log(wrapper.find(`Collections`).props().viewstate)
		const viewstate = wrapper.find(`Collections`).props().viewstate

		expect(viewstate.isProf).toBe(false)
		expect(viewstate.isAdmin).toBe(true)
		expect(viewstate.displayBlocks).toBe(true)

		expect(viewstate.collections.archived).toBe(false)
		expect(viewstate.collections.id).toBe(65)
		expect(viewstate.collections.name).toBe(`Collection 1`)
		expect(viewstate.collections.owner).toBe(22)
		expect(viewstate.collections.published).toBe(true)
		expect(viewstate.collections.thumbnail).toBe(`test@thumbnail`)
	})
})