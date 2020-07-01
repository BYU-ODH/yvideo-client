import React, { useState, } from 'react'

import trashIcon from 'Assets/trash_icon.svg'
import closeIcon from 'Assets/close_icon.svg'

import Style from './styles.js'

const TrackEditorSideMenu = props => {

	const {
		singleEvent,
		index,
		deleteEvent,
		updateEvents,
		videoLength,
		closeSideEditor,
	} = props

	const [event, setEvent] = useState(singleEvent)
	const [editComment, setEditComment] = useState({})

	const handleEditEventBTimeChange = (e) => {

		document.getElementById('sideTabMessage').style.color='red'
		let number = parseFloat(e.target.value)
		let cEvent = event
		let layer = cEvent.layer

		if(isNaN(number)){
			number = 0
		}

		number = (number / videoLength) * 100

		cEvent.start = number

		setEvent(cEvent)

		updateEvents(index, cEvent, layer)
	}

	const handleEditEventETimeChange = (e) => {
		document.getElementById('sideTabMessage').style.color='red'
		let number = parseFloat(e.target.value)
		let cEvent = event
		let layer = cEvent.layer

		if(isNaN(number)){
			number = 0
		}

		number = (number / videoLength) * 100
		//console.log(number)
		cEvent.end = number

		setEvent(cEvent)
		updateEvents(index, cEvent, layer)
	}

	const handleSaveComment = () => {
		let index = index
		let cEvent = event
		let layer = cEvent.layer
		cEvent = editComment

		//console.log(event)

		setEditComment({})
		updateEvents(index, cEvent, layer)
	}

	const handleEditComment = (value, cEvent, int) => {

		switch (int) {
			case 1:
					if(editComment.position !== undefined){
						setEditComment({...editComment, position: { x: parseInt(value), y: editComment.position.y, }})
					}
					else {
						setEditComment({...cEvent, position: { x: parseInt(value), y: cEvent.position.y, }})
					}
				break;
			case 2:
					if(editComment.position !== undefined){
						setEditComment({...editComment, position: { x: editComment.position.x, y: parseInt(value), }})
					}
					else {
						setEditComment({...cEvent, position: { x: cEvent.position.x, y: parseInt(value), }})
					}
				break;
			case 3:
					if(editComment.position !== undefined){
						setEditComment({...editComment, comment: value })
					}
					else {
						setEditComment({...cEvent, comment: value })
					}
				break;

			default:
				break;
		}
	}

	let start = (event.start / 100 * videoLength).toFixed(3)
	let end = (event.end / 100 * videoLength).toFixed(3)

	return (
		<Style>
			<div>
				<img className={'closeEditor'} src={`${closeIcon}`} onClick={closeSideEditor}/>
				<div className='center'>
					<label>Start</label>
					<label style={{ visibility: `${event.type !== 'Pause' ? ('visible') : ('hidden') }`}}>End</label>
				</div>
				<div className='center'>
					<input type='text' className='sideTabInput' value={`${parseFloat(start).toFixed(0)}`} onChange={e => handleEditEventBTimeChange(e)}/>
					<input type='text' className='sideTabInput' value={`${parseFloat(end).toFixed(0)}`} onChange={e => handleEditEventETimeChange(e)} style={{ visibility: `${event.type !== 'Pause' ? ('visible') : ('hidden') }`}}/>
				</div>
				<br/>
			</div>
			{ event.type === 'Comment' ? (
				<>
					<div className='center'>
						<label>X</label>
						<label>Y</label>
					</div>
					<div className='center'>
						<input type='number' className='sideTabInput' placeholder={event.position.x.toFixed(2)} onChange={e => handleEditComment(e.target.value, event, 1)}/>
						<input type='number' className='sideTabInput' placeholder={event.position.y.toFixed(2)} onChange={e => handleEditComment(e.target.value, event, 2)}/>
					</div>
					<div className='center' style={{ flexDirection: 'column'}}>
						<label style={{ textAlign: 'left', margin: '15px 5px 5px 5px' }}>Type a comment</label>
						<textarea style={{ margin: '5%', width: '90%'}} rows='4' cols='50' placeholder={event.comment} onChange={e => handleEditComment(e.target.value, event, 3)}></textarea>
						<button onClick={handleSaveComment} className='sideButton'>Save Comment</button>
					</div>
				</>
				) : (null)
			}
			{/* { event.type === 'Censor' ? (
				<div className='censorMenu'>
					<label>Censor Times</label><br/><br/>
					<table className='tableHeader'>
						<thead>
							<tr>
								<th align="center">Time</th>
								<th align="center">X</th>
								<th align="center">Y</th>
								<th align="center">Width</th>
								<th align="center">Height</th>
								<th align="center">&nbsp;</th>
							</tr>
						</thead>
					</table>
					<div className='censorList'>
						<table>
							<tbody>
							{
								Object.keys(editCensor).sort(((a, b) => (parseFloat(a) > parseFloat(b)) ? 1 : -1)).map((item, i) => (
									<tr key={item}>
										<td><input type='number' value={`${item}`}/></td>
										<td><input type='number' placeholder={`${editCensor[item][0]}`} onChange={(e) => handleEditCensor(e, item, 1)}/></td>
										<td><input type='number' placeholder={`${editCensor[item][1]}`} onChange={(e) => handleEditCensor(e, item, 2)}/></td>
										<td><input type='number' placeholder={`${editCensor[item][2]}`} onChange={(e) => handleEditCensor(e, item, 3)}/></td>
										<td><input type='number' placeholder={`${editCensor[item][3]}`} onChange={(e) => handleEditCensor(e, item, 4)}/></td>
										<td><img className={'trashIcon'} src={`${trashIcon}`} onClick={() => handleCensorRemove(item)}/></td>
									</tr>
								)) // "foo: bar", "baz: 42"
								//Object.entries(event.position).forEach(([key, value]) => console.log(`${key}: ${value}`)) // "foo: bar", "baz: 42"
							}
							</tbody>
						</table>
						<div id='loader' style={{visibility: 'hidden'}}>Loading</div><br/><br/>
						<div id='tableBottom' style={{ width: '90%', marginLeft: '0px' }}></div>
					</div>

					<NewLayer className='addCensor' onClick={handleAddCensor}><Icon src={plus}/></NewLayer><br/><br/><br/><br/>
					<button className='sideButton' onClick={handleSaveCensor}>Save Censor</button>
				</div>
				) : (null)
			} */}
			<p id='sideTabMessage'></p>
			<p id='sideTabExplanation'></p>
		</Style>
	)
}

export default TrackEditorSideMenu