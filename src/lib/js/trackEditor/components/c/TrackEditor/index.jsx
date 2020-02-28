import React, { PureComponent } from 'react'
import {
	EventEditor,
	Player,
	TimelineEditor,
} from './../..'

import Style, { LeftStyle } from './styles'

class TrackEditor extends PureComponent {
	render() {

		const {
			content,
		} = this.props.viewstate

		const playerViewstate = {
			content,

		}

		const timelineEditorViewstate = {

		}

		const eventEditorViewstate = {

		}

		return (
			<Style>
				<LeftStyle>
					<Player viewstate={playerViewstate} />
					<TimelineEditor viewstate={timelineEditorViewstate} />
				</LeftStyle>
				<EventEditor viewstate={eventEditorViewstate} />
			</Style>
		)
	}
}

export default TrackEditor