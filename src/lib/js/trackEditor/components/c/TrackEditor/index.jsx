import React, { PureComponent } from 'react'
import {
	EditorAreaContainer,
	PlayerContainer,
	TimelineAreaContainer,
} from 'lib/js/trackEditor/containers'

import Style, { LeftStyle } from './styles'

class TrackEditor extends PureComponent {
	render() {

		const {
			contentId,
		} = this.props.viewstate

		return (
			<Style>
				<LeftStyle>
					<PlayerContainer contentId={contentId} />
					<TimelineAreaContainer />
				</LeftStyle>
				<EditorAreaContainer />
			</Style>
		)
	}
}

export default TrackEditor