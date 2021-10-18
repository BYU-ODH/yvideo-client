import React, { PureComponent } from 'react'

import { Container, Back, CloseHelp, Tutorial } from './styles'

import ReactPlayer from 'react-player'

import closeIcon from 'assets/x.svg'

export default class HelpDocumentation extends PureComponent {
	constructor(props){
		super(props)
	}

	componentDidMount(){
		document.getElementById(`content`).innerHTML += this.props.viewstate.help.htmlInstruction
	}

	render() {

		const { name, help } = this.props.viewstate

		return (
			<>
				<Back>
					<Container id='help-documentation-container' onScroll={this.handleScroll}>
						<h1>{name} <CloseHelp onClick={this.props.toggleModal}><img src={closeIcon} /></CloseHelp></h1>
						<div id='content'>
						</div>
						<div className="video-section">
							<h2>{name} Video Tutorial</h2>
							<div>
								<video controls>
									<source src={`/videos/${name.toLowerCase().replace(" ", "-")}.webm`} type="video/webm"/>
								</video>
							</div>
						</div>
						<br/>
						{
							name === "Manage Collections" ? (
							<div className="video-section">
								<h2>Manage Content Video Tutorial</h2>
								<div>
									<video controls>
										<source src={`/videos/manage-content.webm`} type="video/webm"/>
									</video>
								</div>
							</div>
							) : (null)
						}
						<br/>
					</Container>
				</Back>
			</>
		)
	}
}
