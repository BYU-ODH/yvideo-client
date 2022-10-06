import React, { useEffect, useState } from 'react'
import { Wrapper } from './styles'

const Overlay = props => {

	const toggleOverlay = props.toggleOverlay
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		setVisible(true)
	}, [])

	const closeModal = e => {
		e.preventDefault()
		setVisible(false)

		setTimeout(() => {
			toggleOverlay()
		}, 250)

	}

	return (
		<Wrapper visible={visible} out={!visible}>
			<div>
				<div>
					<h3>What is Y-video?</h3>
					<p>Y-video is a web-app for streaming video and audio content for courses you are enrolled in at BYU. It has several features especially helpful for watching films in a foreign language.</p>
				</div>
				<div>
					<h3>Text Helps</h3>
					<p>When set up by the instructor, additional aids are available, such as captions and annotations. A key feature of the site enables learners to directly interact with subtitle tracks to quickly skip to specific phrases. For some languages, automatic translations are also available.</p>
				</div>
				<div>
					<h3>For School</h3>
					<p>Teachers or course designers are able to aggregate media into a single location and use a variety of tools to optimize the learning experience. We aim to be compliant with the Library of Congress' interpretations of Fair Use, so instructors can share media with their students with confidence.</p>
				</div>
				<button onClick={closeModal}>close</button>
			</div>
		</Wrapper>
	)
}

export default Overlay
