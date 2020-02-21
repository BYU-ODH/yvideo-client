import React, { PureComponent } from 'react'

import Style from './styles'
import { StatusContainer, SuperScrollbarContainer, TimelineContainer } from '../../../containers'

class TrayArea extends PureComponent {
	render() {
		return (
			<Style>
				<StatusContainer />
				<TimelineContainer />
				<SuperScrollbarContainer />
			</Style>
		)
	}
}

export default TrayArea