import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
`,

	fadeOut = keyframes`
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	`,

	Container = styled.div`
		position: absolute;
		width: 100%;
		height: 100vh;

		visibility: ${props => props.out ? 'hidden' : 'visible'};
		animation: ${props => props.out ? fadeOut : fadeIn} .25s linear;
		transition: visibility .25s linear;

		background-color: rgba(0,0,0,0.25);

		display: flex;
		justify-content: center;
		align-items: center;

		& > div {
			background-color: white;
			box-shadow: 0px .4rem .7rem -.1rem rgba(0,0,0,0.25);

			min-width: 32rem;
			width: auto;
			padding: 6rem 15rem;

			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;

			/* display: grid; */
			/* grid-template-columns: 1fr 1fr 1fr; */
			/* grid-gap: 3rem; */

			& > button {
				background: transparent;
				border: none;
				font-size: 18px;
				color: #0582CA;
				flex-basis: 100%;
				margin-top: 5rem;
				outline: none;
				cursor: pointer;
			}

			& > div {
				width: 27.5rem;
				padding: 2rem;

				& > h3 {
					font-weight: bold;
					font-size: 1.8rem;
					text-justify: center;
					margin-bottom: 1.2rem;
				}
			}
		}
	`

export default class Overlay extends Component {
	constructor(props) {
		super(props)

		this.state = {
			visible: false
		}

		this.closeModal = this.closeModal.bind(this)
	}

	componentDidMount = () => {
		this.setState({
			visible: true
		})
	}

	closeModal = () => {
		this.setState({
			visible: false
		})
		setTimeout(() => {
			this.props.toggleAbout()
		}, 250)
	}

	render() {
		return (
			<Container visible={this.state.visible} out={!this.state.visible}>
				<div>
					<div>
						<h3>What is YVIDEO?</h3>
						<p>Y-Video is a web-based system for streaming video and audio content especially as it applies to learning a foreign language. It houses a collection of media all with the express purpose of helping you learn languages.</p>
					</div>
					<div>
						<h3>Text Helps</h3>
						<p>Additional aids are available to be used in conjunction with the media, such as captions and annotations. A key feature of the site enables learners to directly interact with subtitle tracks to quickly access translations for foreign words and phrases and view relevant annotations.</p>
					</div>
					<div>
						<h3>For School</h3>
						<p>Teachers or course designers are able to aggregate media into a single location and set up specific conditions in order to optimize the learning experience. Statistics and analytics are available to improve the learning experience.</p>
					</div>
					<button onClick={this.closeModal}>close</button>
				</div>
			</Container>
		)
	}
}