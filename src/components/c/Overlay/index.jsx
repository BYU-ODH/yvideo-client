import React, { PureComponent } from 'react'
import { Wrapper } from './styles'

class Overlay extends PureComponent {

	state = {
		visible: false,
	}

	closeModal = e => {
		e.preventDefault()

		this.setState({
			visible: false,
		})

		setTimeout(() => {
			this.props.toggleOverlay()
		}, 250)

	}

	render() {
		return (
			<Wrapper visible={this.state.visible} out={!this.state.visible}>
				<div>
					<div>
						<h3>What is Y-video?</h3>
						<p>Y-video is a web-app for streaming video and audio content for courses you are enrolled in at BYU. It has several features especially helpful for watching films in a foreign language.</p>
					</div>
					<div>
						<h3>Text Helps</h3>
						<p>When set up by the instructor, additional aids are available, such as captions and annotations. A key feature of the site enables learners to directly interact with subtitle tracks to quickly skip to specific phrase. For some languages, automatic translations are also available.</p>
					</div>
					<div>
						<h3>For School</h3>
						<p>Teachers or course designers are able to aggregate media into a single location and set up specific conditions in order to optimize the learning experience. Y-video is specifically designed to be compliant with the Library of Congress' interpretations of the Fair Use Doctrine, so instructors can share media with their students with confidence.</p>
					</div>
					<button onClick={this.closeModal}>close</button>
				</div>
			</Wrapper>
		)
	}

	componentDidMount = () => {
		this.setState({
			visible: true,
		})
	}
}

export default Overlay
