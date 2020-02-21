import React, { PureComponent } from 'react'
import {
	EditorAreaContainer,
	PlayerContainer,
	TrayAreaContainer,
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
					<TrayAreaContainer />
				</LeftStyle>
				<EditorAreaContainer />
			</Style>
		)
	}
}

export default TrackEditor