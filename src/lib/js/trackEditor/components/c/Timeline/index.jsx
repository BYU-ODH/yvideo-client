import React, { PureComponent } from 'react'

import Style from './styles'
import { TrackHandlerContainer, TrackMediaContainer } from '../../../containers'

class Timeline extends PureComponent {
	render() {
		return (
			<Style>
				<TrackHandlerContainer />
				<TrackMediaContainer />
			</Style>
		)
	}
}

export default Timeline