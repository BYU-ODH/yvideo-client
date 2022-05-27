import React from 'react'
import { mount } from 'enzyme'
import SubtitlesCard from '../../../../components/bits/SubtitlesCard/index'
import { BrowserRouter} from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
// import { screen, render, fireEvent } from 'testing-library/react'

describe(`event card`, () => {
	it(`mock useDrag`, ()=> {
		const	wrapper = mount(
			<BrowserRouter>
				<DndProvider backend={Backend}>
					<SubtitlesCard />
				</DndProvider>
			</BrowserRouter>,
		)
		expect(wrapper).toBeDefined()
	})
})