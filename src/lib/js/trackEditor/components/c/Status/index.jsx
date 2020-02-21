import React, { PureComponent } from 'react'

import { Controls, TimeBar } from '../../bits'

import Style, { ToggleButton } from './styles'

class Status extends PureComponent {
	render() {
		return (
			<Style >
				<Controls />
				<TimeBar />
				<ToggleButton />
			</Style>
		)
	}
}

export default Status