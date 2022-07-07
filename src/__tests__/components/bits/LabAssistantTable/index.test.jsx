import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import LabAssistantTable from '../../../../components/bits/LabAssistantTable'
import { BrowserRouter } from 'react-router-dom'

const data = [
	{
		email: `test@email.com`,
		id: 22,
		lastLogin: `2020-05-14T19:53:02.807Z`,
		linked: `-1`,
		name: `professor testname`,
		roles: [`admin`],
		username: `testusername`,
	},
	{
		email: `test2@email.com`,
		id: 23,
		lastLogin: `2020-05-14T19:53:02.807Z`,
		linked: `-1`,
		name: `professor testname2`,
		roles: [`admin`],
		username: `testusername2`,
	},
]

const wrapper =
	<BrowserRouter>
		<LabAssistantTable data={data}/>
	</BrowserRouter>


describe(`LabAssistantTable dashboard test`, () => {
	beforeEach(() => {
		render(wrapper)
	})
	afterEach(() => {
		jest.resetAllMocks()
		cleanup()
	})
	it(`links render and are correct`, () => {
		const links = screen.getAllByText(/Collections/)
		expect(links).toHaveLength(2)

		links.forEach((link, index) => {
			expect(link).toHaveAttribute(`href`, `/lab-assistant-manager/${data[index].id}`)
		})
	})
	it(`names render and are correct`, () => {
		const names = screen.getAllByTestId(`name`)
		expect(names).toHaveLength(2)

		names.forEach((name, index) => {
			expect(name).toHaveTextContent(`${data[index].name}`)
		})
	})
})