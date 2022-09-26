import React, { Component } from 'react'
import Style, { Button } from './styles'
import closeIcon from 'assets/close_icon.svg'

export default class SubtitlesModal extends Component {

	constructor(props) {
		super(props)
		this.keyup = this.props.viewstate.keyup
	}

	componentDidMount = () => {
		window.onkeyup = null
	}

	componentWillUnmount() {
		window.onkeyup = this.keyup
	}

	render() {

		const {
			mode,
			deleteTitle,
		} = this.props.viewstate

		const {
			handleAddLayer,
			handleAddLayerFromFile,
			handleDeleteLayer,
			toggleModal,
			setIsReady,
		} = this.props.handlers

		const createLayer = {
			fromScratch: () => {
				handleAddLayer([])
			},
			fromFile: () => {
				const filePath = document.getElementById(`subFileInput`).files
				if (filePath?.length === 1) {
					handleAddLayerFromFile(filePath[0])
					setIsReady(false)
				}	else if (filePath.files.length > 1)
					alert(`Please select only one file`)
			},
		}
		return (
			<Style>
				{ mode === `create` &&
						<div className='inner'>
							<div>
								<div className='header'>
									<h1>Choose an Option</h1>
									<img
										alt='close'
										className='closeModal'
										src={`${closeIcon}`}
										onClick={toggleModal}/>
								</div>
								<table>
									<tbody>
										<tr>
											<td className='modalSection'>
												<div
													id='modalSection'
													data-testid='modalButton1'
													className='modalButton'
													onClick={ () => createLayer.fromScratch() }>
													<p>Start from scratch</p>
												</div>
											</td>
											<td className='modalSectionRight'>
												<h4 className='modalSectionRightTitle' >Import Srt or Vtt File</h4>
												<input
													type='file'
													accept='.srt,.vtt'
													id='subFileInput'
													data-testid='subFileInput'/>
												<button
													id='create-button'
													data-testid='modalButton2'
													className='modalButton'
													onClick={ () => createLayer.fromFile() }
												>Submit</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
				}
				{ mode === `delete` &&
						<div className='delete-div'>
							<h2>Are you sure you want to delete the subtitle track: <u>{deleteTitle}</u>?</h2>
							<div className='delete-buttons'>
								<Button className='url-content-cancel' type='button' onClick={toggleModal}>Cancel</Button>
								<Button className='url-content-delete' type='submit' onClick={handleDeleteLayer}>Delete</Button>
							</div>
						</div>
				}
			</Style>
		)
	}
}
