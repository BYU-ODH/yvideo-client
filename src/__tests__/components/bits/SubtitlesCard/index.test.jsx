import React from 'react'
import { mount } from 'enzyme'
import SubtitlesCard from '../../../../components/bits/SubtitlesCard/index'
import { BrowserRouter} from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

describe(`event card`, () => {
	it(`mock useDrag`, ()=> {
		const	wrapper = mount(
			<BrowserRouter>
				<DndProvider backend={HTML5Backend}>
					<SubtitlesCard />
				</DndProvider>
			</BrowserRouter>,
		)
		expect(wrapper).toBeDefined()
	})
})