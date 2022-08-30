import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../../components/modals/containers/CreateContentContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'
import MutationObserver from 'mutation-observer'
import proxies from 'proxy'

const collections = testutil.collections

const content = testutil.content[0]

const modal = testutil.modal

const props = {
	adminContent: ``,
	adminCreateContent: jest.fn(),
	adminCreateContentFromResource: jest.fn(),
	createContent: jest.fn(),
	collections,
	modal,
	search: jest.fn(),
	toggleModal: jest.fn(),
	getCollections: jest.fn(),
}

global.MutationObserver = MutationObserver

proxies.apiProxy.admin.search.get = jest.fn()
proxies.apiProxy.admin.search.get.mockImplementation(() => {
	return Promise.resolve(`search`)
})

proxies.apiProxy.content.post = jest.fn()
proxies.apiProxy.content.post.mockImplementation(() => {
	return Promise.resolve(content)
})

describe(`CreateContentContainer test`, () => {

	it(`should get viewstate correctly`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		// test viewstate made correctly
		const viewstate = wrapper.props().viewstate
		expect(viewstate.adminContent[0].email).toBe(`test@email.com`)
		expect(viewstate.adminContent[0].name).toBe(`testname`)
		expect(viewstate.adminContent[0].roles).toBe(0)
		expect(viewstate.adminContent[0].username).toBe(`testusername`)
	})

	it(`test event handlers`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)

		// changes title changes
		wrapper.find({className: `url`}).at(0).simulate(`click`)
		expect(wrapper.find(`CreateContent`).props().viewstate.data.title).toBe(``)
		wrapper.find({className: `url-title-input`}).at(0).simulate(`change`, {target: { name: `title`, value: `title changed` }})
		expect(wrapper.find(`CreateContent`).props().viewstate.data.title).toBe(`title changed`)

		// changes button changes
		expect(wrapper.find(`CreateContent`).props().viewstate.data.contentType).toBe(`video`)
		wrapper.find({id: `url-type-audio`}).at(0).simulate(`click`)
		expect(wrapper.find(`CreateContent`).props().viewstate.data.contentType).toBe(`audio`)
		wrapper.find({id: `url-type-image`}).at(0).simulate(`click`)
		expect(wrapper.find(`CreateContent`).props().viewstate.data.contentType).toBe(`image`)
		wrapper.find({id: `url-type-text`}).at(0).simulate(`click`)
		expect(wrapper.find(`CreateContent`).props().viewstate.data.contentType).toBe(`text`)

		// changes url
		expect(wrapper.find(`CreateContent`).props().viewstate.data.url).toBe(``)
		wrapper.find({className: `url-content-url`}).at(0).simulate(`change`, {target: { name: `url`, value: `https://urlchanged` }})
		expect(wrapper.find(`CreateContent`).props().viewstate.data.url).toBe(`https://urlchanged`)

		// changes description
		expect(wrapper.find(`CreateContent`).props().viewstate.data.description).toBe(``)
		wrapper.find({id: `create-content-description`}).at(0).simulate(`change`, {target: { name: `description`, value: `description changed` }})
		expect(wrapper.find(`CreateContent`).props().viewstate.data.description).toBe(`description changed`)

		// TODO: this need to be checked again later
		// wrapper.find({className: `url-content-input-tag`}).at(0).simulate(`change`, {target: { name: `tag`, value: `description changed`}})

		wrapper.find(`form`).simulate(`submit`, { preventDefault() {} })

		// switch tab
		expect(wrapper.find(`CreateContent`).props().viewstate.tab).toBe(`url`)
		wrapper.find({className : `tab-search-resources`}).at(0).simulate(`click`)
		expect(wrapper.find(`CreateContent`).props().viewstate.tab).toBe(`resource`)

		// when typed, it should return list of the contents
		expect(wrapper.find({className : `table-container`})).toEqual({})
		wrapper.find({className: `resource-search-title`}).at(0).simulate(`change`, {target: { value: `searched` }})
		expect(wrapper.find({className : `table-container`}).at(0).props().height).toBe(2)

		expect(wrapper.find({className : `resource-content-title`}).props().value).toBe(`title changed`)
		wrapper.find({className: `resource-content-title`}).at(0).simulate(`change`, {target: { name: `title`, value: `title changed again` }})
		expect(wrapper.find({className : `resource-content-title`}).props().value).toBe(`title changed again`)

		// TODO: need to test handleSelectResourceChange
		// TODO: create new content target language need to be updated
		wrapper.find(`form`).simulate(`submit`, { preventDefault() {} })

		wrapper.find({id: `url-content-create`}).at(0).simulate(`click`)

		wrapper.find({id: `url-content-cancel`}).at(0).simulate(`click`)
	})

	it(`should rerender when new content is added`, () => {

		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)
		wrapper.find({className: `url`}).at(0).simulate(`click`)
		wrapper.find({className: `url-content-url`}).at(0).simulate(`change`, {target: { name: `url`, value: `https://urlchanged`}})
		wrapper.find(`form`).simulate(`submit`, { preventDefault () {} })
	})
})