import React, { useState, useEffect } from 'react'
import Style from './styles'
import closeIcon from 'assets/close_icon.svg'

// TODO: Separate or move this so that it doesn't break the container pattern

const SubtitlesModal = props => {

	const {mode, setSubtitles, deleteSubtitles, handleAddSubLayer, handleAddSubLayerFromFile,visible, setModalVisible} = props

	const createLayer = {
		fromScratch: () => {
			handleAddSubLayer([])
		},
		fromFile: () => {
			const filePath = document.getElementById(`subFileInput`).files[0]
			handleAddSubLayerFromFile(filePath)
		},
	}
	return (
		<Style visible={visible}>
			<div className={`inner`}>
				<div className={`setModalVisible`} onClick={() => setModalVisible(false)}>
					<img alt={`close`} className={`closeModal`} src={`${closeIcon}`} onClick={()=>setModalVisible(false)}/>
				</div>
				{mode === `create`?
					<div>
						<h1>Choose an Option</h1>
						<table style={{width: `100%`}}>
							<tr>
								<td className={`modalSection`}>
									<div className={`modalSection modalButton`} onClick={()=>createLayer.fromScratch()}><p>Start from scratch</p></div>
								</td>
								<td className={`modalSectionRight`}>
									<h4 style={{margin:`10px`}}>Import Srt or Vtt File</h4>
									<input style={{margin:`10px`,width: `100%`}} type={`file`} accept={`.srt,.vtt`} id={`subFileInput`} onChange ={e => console.log(e.target.files)}/>
									<button style={{margin:`10px`}} className={`modalButton`} onClick={()=>createLayer.fromFile()}>Submit</button>
								</td>
							</tr>
						</table>
					</div>
					:``}
			</div>
		</Style>
	)
}
export default SubtitlesModal

