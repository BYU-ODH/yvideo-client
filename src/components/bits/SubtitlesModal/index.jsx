import React from 'react'
import Style, { Button } from './styles'
import closeIcon from 'assets/close_icon.svg'

// TODO: Separate or move this so that it doesn't break the container pattern

const SubtitlesModal = props => {

	const {
		mode,
		handleAddSubLayer,
		handleAddSubLayerFromFile,
		visible, setModalVisible,
		handleDeleteSubLayer,
		deleteTitle,
	} = props

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
		<Style visible={visible} mode={mode}>
			<div >
				{mode === `create`?
					<div className={`inner`}>
						<div className={`setModalVisible`} onClick={() => setModalVisible(false)}>
							<img alt={`close`} className={`closeModal`} src={`${closeIcon}`} onClick={()=>setModalVisible(false)}/>
						</div>
						<div>
							<h1>Choose an Option</h1>
							<table style={{width: `100%`}}>
								<tr>
									<td className={`modalSection`}>
										<div className={`modalSection modalButton`} onClick={()=>createLayer.fromScratch()}><p>Start from scratch</p></div>
									</td>
									<td className={`modalSectionRight`}>
										<h4 style={{margin:`10px`}}>Import Srt or Vtt File</h4>
										<input style={{margin:`10px`,width: `100%`}} type={`file`} accept={`.srt,.vtt`} id={`subFileInput`}/>
										<button className={`create-button modalButton`} style={{margin:`10px`}} onClick={()=>createLayer.fromFile()}>Submit</button>
									</td>
								</tr>
							</table>
						</div>
					</div>
					:``}
				{
					mode === `delete` &&
					<div className={`delete`}>
						<h2>Are you sure to delete subtitle: {deleteTitle}?</h2>
						<div className={`delete-button`}>
							<Button className='url-content-cancel' type='button' onClick={()=>setModalVisible(false)}>Cancel</Button>
							<Button className='url-content-delete' type='submit' onClick={handleDeleteSubLayer} color={`#ff4c4c`}>Delete</Button>
						</div>
					</div>
				}
			</div>
		</Style>
	)
}
export default SubtitlesModal

