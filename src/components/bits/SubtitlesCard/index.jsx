import React from 'react'

import { useDrag } from 'react-dnd'

import Style, { I } from './styles'
import captions from 'assets/captions.svg'

const SubtitlesCard = (props) => {

	const { title, updateTitle, isEdit, subLayer, index } = props
	return (
		<Style>
			<I src={captions}/>
			{
				isEdit ?
					subLayer === index ?
						<input type='text' className='sideTabInput' style={{margin: `0px`, width: `100%`}} value={title} onChange={e => {
							updateTitle(e.target.value)
						}}/>
						:
						title
					:
					title
			}
		</Style>
	)
}

export default SubtitlesCard
