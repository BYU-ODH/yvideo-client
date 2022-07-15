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
		setEventSeek,
		handleEventPosition,
	} = props

	const timeInputConstrain = /^[0-9,.,:\b]+$/
	const [event, setEvent] = useState(singleEvent)
	const [editComment, setEditComment] = useState({})
	useEffect(() => {
		setEvent(singleEvent)
	}, [index, event, singleEvent])

	const editEvent = (side, time, value, layer, ind, type) => {
		const ev = {...event}
		if (side === `beg`) {
			ev.start = time
			ev.end = singleEvent.end
			ev.text = singleEvent.text

		} else if(side === `end`) {
			ev.start = singleEvent.start
			ev.end = time
		}

		try{
			if(!side) {
				ev.text = value.target.value
				ev.start = singleEvent.start
				ev.end = singleEvent.end
			}
		}catch(error){
			console.log(error) // eslint-disable-line no-console
		}
		setEvent(ev)
		updateEvents(ind, event, layer, side, type)
	}

	const handleEditEventBTimeChange = (e, type) => {
		// document.getElementById(`sideTabMessage`).style.color=`red`
		const cEvent = event
		const layer = cEvent.layer

		if (e.target.value === `` || timeInputConstrain.test(e.target.value)) {
			cEvent.start = e.target.value
			setEvent(cEvent)
			// editEvent(index, cEvent, layer, `beg`)
			editEvent(`beg`, cEvent.start, null, layer, index, type)
		}
	}

	const handleEditEventETimeChange = (e, type) => {
		// document.getElementById(`sideTabMessage`).style.color=`red`
		const cEvent = event
		const layer = cEvent.layer

		if (e.target.value === `` || timeInputConstrain.test(e.target.value)) {
			cEvent.end = e.target.value
			setEvent(cEvent)
			// updateEvents(index, cEvent, layer, `end`)
			editEvent(`end`, cEvent.end, null, layer, index, type)
		}
	}

	const handleSaveComment = () => {
		const ind = index
		const cEvent = event
		const layer = cEvent.layer
		cEvent.position = editComment.position === undefined ?
			cEvent.position
			:
			editComment.position
		cEvent.comment = editComment.comment === undefined ?
			cEvent.comment
			:
			editComment.comment

		updateEvents(ind, cEvent, layer, `null`)
		// document.getElementById(`saveComment`).disabled = true
	}

	const handleEditComment = (value, cEvent, int) => {
		// document.getElementById(`saveComment`).disabled = false
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
				setEditComment({ ...editComment, comment: value })
			else
				setEditComment({ ...cEvent, comment: value })

			break

		default:
			break
		}
	}
	const editPauseMessage = (e) => {
		const cEvent = event
		const layer = cEvent.layer
		cEvent.message = e.target.value
		setEvent(cEvent)
		updateEvents(index, cEvent, layer)
	}
	const handleCensorActive = (e) => {
		setEventSeek(true)
		handleEventPosition(event.position[e][0])
		setActiveCensorPosition(e)
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
									{event.type === `Pause` ?
										<label>Message: </label>
										:
										<label>End</label>
									}
								</div>
								<div className='center'>
									<input
										type='text'
										className='sideTabInput'
										value={`${convertSecondsToMinute(start, videoLength)}`}
										onKeyUp={e => e.stopPropagation()}
										onChange={e => handleEditEventBTimeChange(e, `onChange`)}
										onBlur={e => handleEditEventBTimeChange(e, `onBlur`)}
										onMouseEnter={e => handleShowTip(`${videoLength < 3600 ? `MMSSMS`: `HMMSSMS`}`,
											{
												x: e.target.getBoundingClientRect().x - 15,
												y: e.target.getBoundingClientRect().y + 20,
												width: e.currentTarget.offsetWidth + 20,
											})
										}
										onMouseLeave={() => toggleTip()}
									/>
									<input
										type='text'
										className='sideTabInput'
										value={`${convertSecondsToMinute(end, videoLength)}`}
										style={{ display: `${event.type === `Pause` ? `none` : `block`}` }}
										onKeyUp={e => e.stopPropagation()}
										onChange={e => handleEditEventETimeChange(e, `onChange`)}
										onBlur={e => handleEditEventETimeChange(e, `onBlur`)}
										onMouseEnter={e => handleShowTip(`${videoLength < 3600 ? `MMSSMS` : `HMMSSMS`}`,
											{
												x: e.target.getBoundingClientRect().x - 15,
												y: e.target.getBoundingClientRect().y + 20,
												width: e.currentTarget.offsetWidth + 20,
											})
										}
										onMouseLeave={() => toggleTip()}
									/>
									{event.type === `Pause` ? (
										<textarea style={{ margin: `5%`, width: `90%` }} rows='4' cols='50' className='sideTabInput' value={event.message}
											placeholder = 'Enter message'
											onChange={e => editPauseMessage(e)}/>
									) : <></>
									}
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
							<div className='center' style={{ flexDirection: `column` }}>
								<label style={{ textAlign: `left`, margin: `15px 5px 5px 5px` }}>Type a comment</label>
								<textarea style={{ margin: `5%`, width: `90%` }} rows='4' cols='50' placeholder={event.comment} onChange={e => handleEditComment(e.target.value, event, 3)}></textarea>
								<p><i>Save is only required when changing the X, Y, or comment values</i></p>
								<button id='saveComment' onClick={handleSaveComment} className='sideButton'>Save Comment</button>
							</div>
						</div>
					) : null
				}

				{
					event.type === `Censor` ? (
						<div className='censorMenu'>
							<label>Blur Times</label><br/><br/>
							<table>
								<thead className={`tableHeader`}>
									<tr>
										<th align='center'>Time</th>
										<th align='center'>X</th>
										<th align='center'>Y</th>
										<th align='center'>Width</th>
										<th align='center'>Height</th>
										<th align='center'>&nbsp;</th>
									</tr>
								</thead>
								<tbody className={`censorList`}>
									{event.type === `Censor` &&
										Object.keys(event.position).sort((a, b) => parseFloat(event.position[a][0]) - parseFloat(event.position[b][0])).map((item, i) => (
											<tr className={`${activeCensorPosition === item && `censorActive`}`} key={item} >
												{
													console.log(event.position[item])
												}
												<td id='time-td'><input
													id={`censorTimeInput-${i}`}
													className='censorRow'
													type='text'
													defaultValue={`${convertSecondsToMinute(parseFloat(event.position[item][0]), videoLength)}`}
													onClick={() => handleCensorActive(item)}
													onBlur={(e) => handleEditCensor(e, item, 0, `onBlur`)}
													onMouseEnter={e => handleShowTip(`${videoLength < 3600 ? `MMSSMS` : `HMMSSMS`}`,
														{
															x: e.target.getBoundingClientRect().x - 125,
															y: e.target.getBoundingClientRect().y - 25,
															width: e.currentTarget.offsetWidth + 20,
														})
													}
													onMouseLeave={() => toggleTip()}
												/></td>
												<td><input disabled
													type='number'
													value={`${event.position[item][1]}`}
													onClick={() => handleCensorActive(item)}
													onChange={(e) => handleEditCensor(e, item, 1)}
												/></td>
												<td><input disabled
													type='number'
													value={`${event.position[item][2]}`}
													onClick={() => handleCensorActive(item)}
													onChange={(e) => handleEditCensor(e, item, 2)}
												/></td>
												<td><input
													id={`censorWidthInput-${i}`}
													type='number'
													value={`${event.position[item][3]}`}
													onClick={() => handleCensorActive(item)}
													onBlur={(e) => handleEditCensor(e, item, 3, `onBlur`)}
													onChange={(e) => handleEditCensor(e, item, 3, `onChange`)}
												/></td>
												<td><input
													id={`censorHeightInput-${i}`}
													type='number'
													value={`${event.position[item][4]}`}
													onClick={() => handleCensorActive(item)}
													onBlur={(e) => handleEditCensor(e, item, 4, `onBlur`)}
													onChange={(e) => handleEditCensor(e, item, 4, `onChange`)}
												/></td>
												<td><img className={`trashIcon`} src={`${trashIcon}`} alt='' onClick={() => handleCensorRemove(item)}/></td>
											</tr>
										))
									}
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
