import React, { useState, useEffect } from 'react'

import trashIcon from 'assets/trash_icon.svg'
import closeIcon from 'assets/close_icon.svg'

import plus from 'assets/plus-circle.svg'

import Style, {Icon} from './styles.js'
import { convertSecondsToMinute } from '../../common/timeConversion'

const TrackEditorSideMenu = props => {

	const {
		singleEvent,
		index,
		updateEvents,
		videoLength,
		closeSideEditor,
		handleEditCensor,
		handleCensorRemove,
		handleAddCensor,
		activeCensorPosition,
		setActiveCensorPosition,
		toggleTip,
		handleShowTip,
	} = props

	const timeInputConstrain = /^[0-9,.,:\b]+$/
	const [event, setEvent] = useState(singleEvent)
	const [editComment, setEditComment] = useState({})
	useEffect(() => {
		setEvent(singleEvent)
	}, [index, event, singleEvent])

	const handleEditEventBTimeChange = (e) => {
		// document.getElementById(`sideTabMessage`).style.color=`red`
		const cEvent = event
		const layer = cEvent.layer

		if (e.target.value === `` || timeInputConstrain.test(e.target.value)) {
			cEvent.start = e.target.value
			setEvent(cEvent)
			updateEvents(index, cEvent, layer, `beg`)
		}
	}

	const handleEditEventBTimeFinalChange = (e) => {
		// document.getElementById(`sideTabMessage`).style.color=`red`
		const cEvent = event
		const layer = cEvent.layer

		if (e.target.value === `` || timeInputConstrain.test(e.target.value)) {
			cEvent.start = e.target.value
			setEvent(cEvent)
			updateEvents(index, cEvent, layer, `beg`, `onBlur`)
		}
	}

	const handleEditEventETimeChange = (e) => {
		// document.getElementById(`sideTabMessage`).style.color=`red`
		const cEvent = event
		const layer = cEvent.layer

		if (e.target.value === `` || timeInputConstrain.test(e.target.value)) {
			cEvent.end = e.target.value
			setEvent(cEvent)
			updateEvents(index, cEvent, layer, `end`)
		}
	}

	const handleEditEventETimeFinalChange = (e) => {
		// document.getElementById(`sideTabMessage`).style.color=`red`
		const cEvent = event
		const layer = cEvent.layer

		if (e.target.value === `` || timeInputConstrain.test(e.target.value)) {
			cEvent.end = e.target.value
			setEvent(cEvent)
			updateEvents(index, cEvent, layer, `end`, `onBlur`)
		}
	}

	const handleSaveComment = () => {
		const ind = index
		const cEvent = event
		const layer = cEvent.layer
		cEvent.position = editComment.position === undefined ? cEvent.position : editComment.position
		cEvent.comment = editComment.comment === undefined ? cEvent.comment : editComment.comment

		updateEvents(ind, cEvent, layer, `null`)
	}

	const handleEditComment = (value, cEvent, int) => {

		switch (int) {
		case 1:
			if(editComment.position !== undefined)
				setEditComment({...editComment, position: { x: parseInt(value), y: editComment.position.y }})
			else
				setEditComment({...cEvent, position: { x: parseInt(value), y: cEvent.position.y }})

			break
		case 2:
			if(editComment.position !== undefined)
				setEditComment({...editComment, position: { x: editComment.position.x, y: parseInt(value) }})
			else
				setEditComment({...cEvent, position: { x: cEvent.position.x, y: parseInt(value) }})

			break
		case 3:
			if(editComment.position !== undefined)
				setEditComment({...editComment, comment: value })
			else
				setEditComment({...cEvent, comment: value })

			break

		default:
			break
		}
	}

	const start = event.start
	const end = event.end

	return (
		<Style>
			<div className='event-content'>
				<div>
					<p id={`sideTabMessage`}></p>
					<p id={`sideTabExplanation`}></p>
					{event !== undefined ?
						<>
							<img alt={`closeEditor`} className={`closeEditor`} src={`${closeIcon}`} onClick={closeSideEditor}/>
							<>
								<div className='center'>
									<label>Start</label>
									<label>End</label>
								</div>
								<div className='center'>
									<input type='text' className='sideTabInput' value={`${convertSecondsToMinute(start, videoLength)}`} onKeyUp={e => {e.stopPropagation()}}
										onChange={e => handleEditEventBTimeChange(e)}
										onBlur={e => handleEditEventBTimeFinalChange(e)}
										onMouseEnter={e => handleShowTip(`${videoLength<3600 ? `MMSSMS`: `HMMSSMS`}`, {x: e.target.getBoundingClientRect().x-15, y: e.target.getBoundingClientRect().y + 20, width: e.currentTarget.offsetWidth+20})}
										onMouseLeave={e => toggleTip()}
									/>
									<input type='text' className='sideTabInput' value={`${convertSecondsToMinute(end, videoLength)}`} onKeyUp={e => {e.stopPropagation()}}
										style={{ visibility: `${event.type === "Pause" ? (`hidden`) : (`visible`)}` }}
										onChange={e => handleEditEventETimeChange(e)}
										onBlur={e => handleEditEventETimeFinalChange(e)}
										onMouseEnter={e => handleShowTip(`${videoLength<3600 ? `MMSSMS`: `HMMSSMS`}`, {x: e.target.getBoundingClientRect().x-15, y: e.target.getBoundingClientRect().y + 20, width: e.currentTarget.offsetWidth+20})}
										onMouseLeave={e => toggleTip()}
									/>
								</div>
								<br/>
							</>
						</>
						:
						<></>
					}
				</div>
				{
					event.type === `Comment` ? (
						<div>
							<div className='center'>
								<label>X</label>
								<label>Y</label>
							</div>
							<div className='center'>
								<input type='number' className='sideTabInput' placeholder={event.position.x.toFixed(2)} onChange={e => handleEditComment(e.target.value, event, 1)}/>
								<input type='number' className='sideTabInput' placeholder={event.position.y.toFixed(2)} onChange={e => handleEditComment(e.target.value, event, 2)}/>
							</div>
							<div className='center' style={{ flexDirection: `column`}}>
								<label style={{ textAlign: `left`, margin: `15px 5px 5px 5px` }}>Type a comment</label>
								<textarea style={{ margin: `5%`, width: `90%`}} rows='4' cols='50' placeholder={event.comment} onChange={e => handleEditComment(e.target.value, event, 3)}></textarea>
								<p><i>Save is only required when changing the X, Y, or comment values</i></p>
								<button onClick={handleSaveComment} className='sideButton'>Save Comment</button>
							</div>
						</div>
					) : null
				}

				{
					event.type === `Censor` ? (
						<div className='censorMenu'>
							<label>Censor Times</label><br/><br/>
							<table className='tableHeader'>
								<thead>
									<tr>
										<th align='center'>Time</th>
										<th align='center'>X</th>
										<th align='center'>Y</th>
										<th align='center'>Width</th>
										<th align='center'>Height</th>
										<th align='center'>&nbsp;</th>
									</tr>
								</thead>
								<tbody className={"censorList"}>
										{event.type === `Censor`?
											Object.keys(event.position).sort((a, b) => parseFloat(event.position[a][0]) - parseFloat(event.position[b][0])).map((item, i) => (
												<tr className={`${activeCensorPosition === item ? `censorActive` : ``}`} key={item} >
													<td><input onClick={()=>setActiveCensorPosition(item)} className='censorRow' type='number' placeholder={`${event.position[item][0]}`} onChange={(e) => handleEditCensor(e, item, 1)}/></td>
													<td><input disabled onClick={()=>setActiveCensorPosition(item)} type='number' placeholder={`${event.position[item][1]}`} onChange={(e) => handleEditCensor(e, item, 1)}/></td>
													<td><input disabled onClick={()=>setActiveCensorPosition(item)} type='number' placeholder={`${event.position[item][2]}`} onChange={(e) => handleEditCensor(e, item, 2)}/></td>
													<td><input onClick={()=>setActiveCensorPosition(item)} type='number' placeholder={`${event.position[item][3]}`} onChange={(e) => handleEditCensor(e, item, 3)}/></td>
													<td><input onClick={()=>setActiveCensorPosition(item)} type='number' placeholder={`${event.position[item][4]}`} onChange={(e) => handleEditCensor(e, item, 4)}/></td>
													<td><img className={`trashIcon`} src={`${trashIcon}`} onClick={() => handleCensorRemove(item)}/></td>
												</tr>
											))
											:``}
								</tbody>
							</table>
							<div id='loader' style={{visibility: `hidden`}}>Loading</div><br/><br/>
							<div id='tableBottom' style={{ width: `90%`, marginLeft: `0px` }}></div>

							<button className='addCensor' onClick={handleAddCensor}><Icon src={plus}/></button>
						</div>
					) : null
				}
			</div>
		</Style>
	)
}

export default TrackEditorSideMenu