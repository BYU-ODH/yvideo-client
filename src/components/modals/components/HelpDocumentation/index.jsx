import React, { PureComponent } from 'react'

import { Container, Back, CloseHelp, Header } from './styles'

import closeIcon from 'assets/x.svg'

export default class HelpDocumentation extends PureComponent {

	componentDidMount(){
		document.getElementById(`content`).innerHTML += this.props.viewstate.help.htmlInstruction
	}

	render() {
		// eslint-disable-next-line no-unused-vars
		const { name, help } = this.props.viewstate

		return (
			<>
				<Back
					onKeyUp={e => { e.code === `Escape` &&
						this.props.toggleModal()
					}}
					onClick={this.props.toggleModal}>
					<Container id='help-documentation-container' onClick={e => {
						e.stopPropagation()
					}} onScroll={this.handleScroll}>
						<Header><h1>{name} <CloseHelp onClick={this.props.toggleModal}><img alt='' src={closeIcon} /></CloseHelp></h1></Header>
						<div id='content'>
						</div>
						{
							name === `Manage Resource` ? (
								<>
									<div className='video-section'>
										<h2>Create Resource Video Tutorial</h2>
										<div>
											<video controls>
												<source src={`/videos/create-resource.webm`} type='video/webm'/>
											</video>
										</div>
									</div>
									<br/>
								</>
							) : null
						}
						<div className='video-section'>
							<h2>{name} Video Tutorial</h2>
							<div>
								<video controls>
									<source src={`/videos/${name.toLowerCase().replace(` `, `-`)}.webm`} type='video/webm'/>
								</video>
							</div>
						</div>
						<br/>
						{
							name === `Manage Collections` ? (
								<>
									<div className='video-section'>
										<h2>Manage Content Video Tutorial</h2>
										<div>
											<video controls>
												<source src={`/videos/manage-content.webm`} type='video/webm'/>
											</video>
										</div>
									</div>
									<div className='video-section'>
										<h2>Create Content From Online Video Tutorial</h2>
										<div>
											<video controls>
												<source src={`/videos/content-from-online.webm`} type='video/webm'/>
											</video>
										</div>
									</div>
									<div className='video-section'>
										<h2>Create Content From Resource Video Tutorial</h2>
										<div>
											<video controls>
												<source src={`/videos/content-from-resource.webm`} type='video/webm'/>
											</video>
										</div>
									</div>
								</>
							) : null
						}
						<br/>
					</Container>
				</Back>
			</>
		)
	}
}
