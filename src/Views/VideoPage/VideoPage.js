import React, { Component } from 'react'
import styled from 'styled-components'

import Player from './Player'

const StyledVideoPage = styled.div`

`

class VideoPageChild extends Component {
	render() {
		return (
			<StyledVideoPage>
				<Player videoId={this.props.videoId} />
			</StyledVideoPage>
		)
	}
}

const VideoPage = ({ match }) => {
	return <VideoPageChild videoId={match.params.id} />
}

export default VideoPage