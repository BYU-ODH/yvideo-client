import React, { Component } from 'react'
import styled from 'styled-components'

import Player from './Player'

const Container = styled.div`

`

class VideoPageChild extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<Container>
				<Player videoId={this.props.videoId} />
			</Container>
		)
	}
}

const VideoPage = ({ match }) => {
	return <VideoPageChild videoId={match.params.videoId} />
}

export default VideoPage
