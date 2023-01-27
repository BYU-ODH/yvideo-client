import React, { useLayoutEffect, useEffect } from 'react'

import { Back } from './styles'

import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

import closeIcon from 'assets/x.svg'

const HelpDocumentation = props => {

	const {
		name,
		help,
	} = props.viewstate
	const { htmlInstruction } = help

	const { toggleModal } = props.handlers

	useLayoutEffect(() => {
		document.getElementById(`content`).innerHTML += htmlInstruction
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div
			className="modal show"
			style={{ display: 'block', position: 'initial' }}
		>
			<Back
				onKeyUp={e => e.code === `Escape` && toggleModal()}
				onClick={toggleModal}>
				<Modal.Dialog id='help-documentation-container' onClick={e => e.stopPropagation()} >
					<Modal.Header closeButton onClick={toggleModal} className='helpModalHeader'><h1>{name}</h1></Modal.Header>
					<Modal.Body className='helpModalBody'>
						<Container>
							<Row>
									<Col>
									<div id='content'>
									</div>
								</Col>
							</Row>
					{
						name === `Manage Resource` ? (
							<Row className="mb-4">
								<Col>
								<div className='video-section'>
									<h2>Create Resource Video Tutorial</h2>
									<div>
										<video controls>
											<source src={`/videos/create-resource.webm`} type='video/webm'/>
										</video>
									</div>
								</div>
								</Col>
							</Row>
						) : null
					}
					<Row>
						<Col>
							<div className='video-section'>
								<h2>{name} Video Tutorial</h2>
								<div>
									<video controls>
										<source src={`/videos/${name.toLowerCase().replace(` `, `-`)}.webm`} type='video/webm'/>
									</video>
								</div>
							</div>
						</Col>
					</Row>
					<br/>
					{
						name === `Manage Collections` ? (
							<Row>
								<Col>
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
								</Col>
							</Row>
						) : null
					}
					</Container>
					<br/>
					</Modal.Body>
				</Modal.Dialog>
			</Back>
		</div>
	)
}

export default HelpDocumentation
