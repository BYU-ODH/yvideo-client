import React, { useState } from 'react'
import Style, { I } from './styles'
import captions from 'assets/captions.svg'

const SubtitlesCard = (props) => {

	const { title, updateTitle, isEdit, subLayer, index } = props
	const [value, setValue] = useState(title)

	const handleChange = e => {
		setValue(e.target.value)
		updateTitle(e.target.value, `onChange`)
	}
	return (
		<Style>
			<I src={captions}/>
			{
				isEdit ?
					subLayer === index ?
						<input data-testid='title-change' type='text' className='sideTabInput' style={{margin: `0px`, width: `100%`}} value={value}
							onKeyUp={e => e.stopPropagation()}
							onChange={handleChange}
							onKeyPress={event => {
								if (event.charCode === 13)
									updateTitle(event.target.value, `onKeyPress`)

							}}
						/>
						:
						title
					:
					title

			}
		</Style>
	)
}

export default SubtitlesCard
