import React, { Component } from 'react'
import Style, { Button } from './styles'
import closeIcon from 'assets/close_icon.svg'

export default class SubtitlesModal extends Component {

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
		} = this.props.handlers

		
		const createLayer = {
			fromScratch: () => {
				handleAddLayer([])
			},
			fromFile: () => {
				const filePath = document.getElementById(`subFileInput`).files[0]
				handleAddLayerFromFile(filePath)
			},
		}
		return (
				<Style>
					{mode === `create`?
						<div className={`inner`}>
							<div>
								<div className={`header`}>
									<h1>Choose an Option</h1>
									<img alt={`close`} className={`closeModal`} src={`${closeIcon}`} onClick={toggleModal}/>
								</div>
								<table style={{width: `100%`}}>
									<tr>
										<td className={`modalSection`}>
											<div className={`modalSection modalButton`} onClick={ () => createLayer.fromScratch() }><p>Start from scratch</p></div>
										</td>
										<td className={`modalSectionRight`}>
											<h4 style={{margin: `10px`}}>Import Srt or Vtt File</h4>
											<input style={{margin: `35px 0px 25px 0px`, width: `100%`, display: `block`}} type={`file`} accept={`.srt,.vtt`} id={`subFileInput`}/>
											<button className={`create-button modalButton`} style={{margin: `10px`}} onClick={ () => createLayer.fromFile() }>Submit</button>
										</td>
									</tr>
								</table>
							</div>
						</div>
						: ``}
					{
						mode === `delete` &&
						<div className={`delete-div`}>
							<h2>Are you sure you want to delete the subtitle track: <u>{deleteTitle}</u>?</h2>
							<div className={`delete-buttons`}>
								<Button className='url-content-cancel' type='button' onClick={toggleModal}>Cancel</Button>
								<Button className='url-content-delete' type='submit' onClick={handleDeleteLayer}>Delete</Button>
							</div>
						</div>
					}
				</Style>
		)
	}
}