import React, { PureComponent } from 'react'

import Style from './styles'

import TrackItemHandler from '../TrackItemHandler'

class TrackHandler extends PureComponent {
	render() {
		return (
			<Style>
				{/* //TODO: Make for loop for each track */}
				<TrackItemHandler />
			</Style>
		)
	}
}

export default TrackHandler