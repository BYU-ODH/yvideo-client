import React, { useState } from 'react'

import SwitchToggle from 'components/toggles/SwitchToggle'

import { Wrapper, Container, Column, Setting } from './styles'

const ContentSettings = props => {

	const [on, setToggle] = useState(false)

	const handleToggle = e => {
		e.preventDefault()
		setToggle(!on)
	}

	return (
		<Wrapper active={props.active}>
			<Container>
				<Column>
					<h4>General</h4>
					<Setting>
						<p>Allow automatic definitions</p>
						<SwitchToggle on={on} setToggle={handleToggle} />
					</Setting>
				</Column>

				<Column>
					<h4>Labels</h4>
				</Column>

				<Column>
					<h4>Description</h4>
					<p>description</p>
					<textarea hidden defaultValue={`description`} />
				</Column>

				<Column>
					<h4>Transcripts
					<SwitchToggle on={on} setToggle={handleToggle} />
					</h4>
				</Column>

				<Column>
					<h4>
						Captions
					<SwitchToggle on={on} setToggle={handleToggle} />
					</h4>
				</Column>

				<Column>
					<h4>Aspect Ratio</h4>
				</Column>
			</Container>
		</Wrapper>
	)
}

export default ContentSettings
