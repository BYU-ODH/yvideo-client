import React, { useState, useEffect } from 'react'

import trashIcon from 'assets/trash_icon.svg'
import closeIcon from 'assets/close_icon.svg'

import plus from 'assets/plus-circle.svg'

import Style, {Icon} from './styles.js'
import { convertSecondsToHMS } from '../../common/timeConversion'
import StartEndTimeConfirm from '../../modals/components/StartEndTImeConfirm'

const TrackEditorSideMenu = props => {

	const {
		singleEvent,
		index,
		updateEvents,
		videoLength,
		closeSideEditor,
		handleEditCensor,
		handleEditCensorFromTrackSideMenu,
		handleCensorRemove,
		handleAddCensor,
		activeCensorPosition,
		setActiveCensorPosition,
		toggleTip,
		handleShowTip,
		setEventSeek,
		handleEventPosition,
		videoCurrentTime,
	} = props

	const timeInputConstrain = /^[0-9,.,:\b]+$/
	const [event, setEvent] = useState(singleEvent)
	const [editComment, setEditComment] = useState({})
	const [currentTime, setCurrentTime] = useState(0)
	const [showConfirmation, setShowConfirmation] = useState(false)
	const [startOrEnd, setStartOrEnd] = useState(``)
	const [confirmationMessage, setConfirmationMessage] = useState(``)
	const [startInputHighlight, setStartInputHighlight] = useState(false)
	const [endInputHighlight, setEndInputHighlight] = useState(false)
	const [blurInputHighlight, setBlurInputHighlight] = useState(false)
	const [trIndex, setTrIndex] = useState(0)
	const [startTimeInputValue, setStartTimeInputValue] = useState(``)

	useEffect(() => {
		setEvent(singleEvent)
	}, [index, event, singleEvent])

	useEffect(() => {
		if (event.type === `Censor`){
			const startInputTimeValue = document.getElementsByClassName(`censor-time-input-0`)
			if (startInputTimeValue && startInputTimeValue[0] && startInputTimeValue[0].value!== null)
				setStartTimeInputValue(startInputTimeValue[0].value)
		}
	}, [setStartTimeInputValue, handleEditCensor, index, event.type])

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

	const handleEditEventBeginTimeChange = (e, type) => {
		const currentEvent = event
		const layer = currentEvent.layer

		if (e.target.value === `` || timeInputConstrain.test(e.target.value)) {
			currentEvent.start = e.target.value
			setEvent(currentEvent)
			editEvent(`beg`, currentEvent.start, null, layer, index, type)
		}
	}

	const handleEditEventEndTimeChange = (e, type) => {
		const currentEvent = event
		const layer = currentEvent.layer

		if (e.target.value === `` || timeInputConstrain.test(e.target.value)) {
			currentEvent.end = e.target.value
			setEvent(currentEvent)
			editEvent(`end`, currentEvent.end, null, layer, index, type)
		}
	}

	const handleShowConfirmation = (e, startOrEnd) => {
		setCurrentTime(videoCurrentTime)
		if (startOrEnd === `start`){
			const displayTime = convertSecondsToHMS(videoCurrentTime)
			setConfirmationMessage(`Change start time to current time? (${displayTime})`)
			setStartOrEnd(`start`)
			setEvent(event)
			setStartInputHighlight(true)
			setEndInputHighlight(false)
		}else if (startOrEnd === `end`){
			const displayTime = convertSecondsToHMS(videoCurrentTime)
			setConfirmationMessage(`Change end time to current time? (${displayTime})`)
			setStartOrEnd(`end`)
			setEvent(event)
			setStartInputHighlight(false)
			setEndInputHighlight(true)
		}
		setShowConfirmation(true)
	}

	// this function is specially made for blurs to make sure the correct item is grabbed
	const handleShowBlurConfirmation = (e, item) => {
		setShowConfirmation(true)
		setCurrentTime(videoCurrentTime)
		const displayTime = convertSecondsToHMS(videoCurrentTime, videoLength)
		setConfirmationMessage(`Change blur time to current time? (${displayTime})`)
		setStartOrEnd(`blur`)
		setTrIndex(e.target.id.split(`-`)[1]).toString()
		setEvent(event)
		setBlurInputHighlight(true)
		setStartInputHighlight(false)
		setEndInputHighlight(false)
	}

	const handleConfirm = (e, time) => {
		if (startOrEnd === `start`)
			handleEventBeginTimeChangeByButton(e, time, `start`)
		else if (startOrEnd === `end`)
			handleEventEndTimeChangeByButton(e, time, `end`)
		setShowConfirmation(false)
	}

	const handleConfirmBlur = () => {
		handleEditCensorFromTrackSideMenu(currentTime, trIndex, 5, `onBlur`)
		setShowConfirmation(false)
	}

	const handleCancel = () => {
	// Handle the cancellation action here
		setShowConfirmation(false)
		setStartInputHighlight(false)
		setEndInputHighlight(false)
		setBlurInputHighlight(false)
	}

	const handleEventBeginTimeChangeByButton = (e, time, type) => {
		const currentEvent = event
		const layer = currentEvent.layer
		const formattedTime = convertSecondsToHMS(videoCurrentTime)
		setCurrentTime(formattedTime)
		currentEvent.start = videoCurrentTime
		setEvent(currentEvent)
		// updateEvents(index, currentEvent, layer, `end`)
		editEvent(`beg`, currentEvent.start, null, layer, index, type)
	}

	const handleEventEndTimeChangeByButton = (e, time, type) => {
		const currentEvent = event
		const layer = currentEvent.layer
		const formattedTime = convertSecondsToHMS(videoCurrentTime)
		setCurrentTime(formattedTime)
		currentEvent.end = videoCurrentTime
		setEvent(currentEvent)
		// editEvent(index, currentEvent, layer, `beg`)
		editEvent(`end`, currentEvent.end, null, layer, index, type)
	}

	const handleSaveComment = () => {
		const ind = index
		const currentEvent = event
		const layer = currentEvent.layer
		currentEvent.position = editComment.position === undefined ?
			currentEvent.position
			:
			editComment.position
		currentEvent.comment = editComment.comment === undefined ?
			currentEvent.comment
			:
			editComment.comment

		updateEvents(ind, currentEvent, layer, `null`)
	}

	const handleEditComment = (value, currentEvent, int) => {
		switch (int) {
		case 1:
			if(editComment.position !== undefined)
				setEditComment({...editComment, position: { x: parseInt(value), y: editComment.position.y }})
			else
				setEditComment({...currentEvent, position: { x: parseInt(value), y: currentEvent.position.y }})

			break
		case 2:
			if(editComment.position !== undefined)
				setEditComment({...editComment, position: { x: editComment.position.x, y: parseInt(value) }})
			else
				setEditComment({...currentEvent, position: { x: currentEvent.position.x, y: parseInt(value) }})

			break
		case 3:
			if(editComment.position !== undefined)
				setEditComment({ ...editComment, comment: value })
			else
				setEditComment({ ...currentEvent, comment: value })

			break

		default:
			break
		}
	}
	const editPauseMessage = (e) => {
		const currentEvent = event
		const layer = currentEvent.layer
		currentEvent.message = e.target.value
		setEvent(currentEvent)
		updateEvents(index, currentEvent, layer)
	}
	const handleCensorActive = (e) => {
		setEventSeek(true)
		handleEventPosition(event.position[e][0])
		setActiveCensorPosition(e)
		setBlurInputHighlight(true)
	}
	const start = event.start
	const end = event.end
	return (
		<Style>
			<div className='event-content'>
				<div>
					<p id={`side-tab-message`}></p>
					<p id={`side-tab-explanation`}></p>
					{event !== undefined ?
						<>
							<img alt={`close-editor`} className={`close-editor`} src={`${closeIcon}`} onClick={closeSideEditor}/>
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
										className={`side-tab-input ${startInputHighlight ? `blue-highlight` : ``}`}
										style={{ padding: event.type === `Pause` ? `0 50px 0 10px` : `0 10px`}}
										value={event.type === `Censor` ? startTimeInputValue : convertSecondsToHMS(start, videoLength)}
										onKeyUp={e => e.stopPropagation()}
										onChange={e => handleEditEventBeginTimeChange(e, `onChange`)}
										onBlur={e => handleEditEventBeginTimeChange(e, `onBlur`)}
										onMouseEnter={e => handleShowTip(`only-sec`,
											{
												x: e.target.getBoundingClientRect().x - 15,
												y: e.target.getBoundingClientRect().y + 20,
												width: e.currentTarget.offsetWidth + 20,
											}, start)
										}
										onMouseLeave={() => toggleTip()}
										disabled={event.type === `Censor`}
									/>
									{event.type !== `Censor` && ( // Conditionally render the <i> element if event.type is not 'Censor'
										<div className={`clock`}
											onMouseEnter={e => handleShowTip(`startclock`,
												{
													x: e.target.getBoundingClientRect().x - 15,
													y: e.target.getBoundingClientRect().y + 20,
													width: e.currentTarget.offsetWidth + 40,
												})
											}
											onMouseLeave={() => toggleTip()}
											style={{ right: event.type === `Pause` ? `63px` : `30px`}}
										>
											<i className='fa fa-clock fa-lg' onClick={(e) => handleShowConfirmation(e, `start`)}></i>
										</div>
									)}
									<input
										type='text'
										className= {`side-tab-input end-input ${endInputHighlight ? `blue-highlight` : ``}`}
										value={`${convertSecondsToHMS(end, videoLength)}`}
										style={{ display: `${event.type === `Pause` ? `none` : `block`}` }}
										onKeyUp={e => e.stopPropagation()}
										onChange={e => handleEditEventEndTimeChange(e, `onChange`)}
										onBlur={e => handleEditEventEndTimeChange(e, `onBlur`)}
										onMouseEnter={e => handleShowTip(`only-sec`,
											{
												x: e.target.getBoundingClientRect().x - 15,
												y: e.target.getBoundingClientRect().y + 20,
												width: e.currentTarget.offsetWidth + 20,
											}, end)
										}
										onMouseLeave={() => toggleTip()}
									/>
									{event.type !== `Pause` &&
											<div
												className={`clock`}
												onMouseEnter={e => handleShowTip(`endclock`,
													{
														x: e.target.getBoundingClientRect().x - 15,
														y: e.target.getBoundingClientRect().y + 20,
														width: e.currentTarget.offsetWidth + 40,
													})
												}
												onMouseLeave={() => toggleTip()}>
												<i className='fa fa-clock fa-lg' onClick={(e) => handleShowConfirmation(e, `end`)}
													style={{ display: `${event.type === `Pause` ? `none` : `block`}` }}></i>
											</div>
									}
									{event.type === `Pause` ? (
										<textarea style={{ margin: `5%`, width: `90%`}} rows='4' cols='50' className='side-tab-input' value={event.message}
											placeholder = 'Enter message'
											onChange={e => editPauseMessage(e)}/>
									) : <></>
									}
								</div>
								{showConfirmation && startOrEnd === `start` && (
									<StartEndTimeConfirm
										message={confirmationMessage}
										onConfirm={handleConfirm}
										onCancel={handleCancel}
									/>
								)}
								{showConfirmation && startOrEnd === `end` && (
									<StartEndTimeConfirm
										message={confirmationMessage}
										onConfirm={handleConfirm}
										onCancel={handleCancel}
									/>
								)}
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
								<input type='number' className='side-tab-input' placeholder={event.position.x.toFixed(2)} onChange={e => handleEditComment(e.target.value, event, 1)}/>
								<input type='number' className='side-tab-input' placeholder={event.position.y.toFixed(2)} onChange={e => handleEditComment(e.target.value, event, 2)}/>
							</div>
							<div className='center' style={{ flexDirection: `column` }}>
								<label style={{ textAlign: `left`, margin: `15px 5px 5px 5px` }}>Type a comment</label>
								<textarea style={{ margin: `5%`, width: `90%` }} rows='4' cols='50' placeholder={event.comment} onChange={e => handleEditComment(e.target.value, event, 3)}></textarea>
								<p><i>Save is only required when changing the X, Y, or comment values</i></p>
								<button id='save-comment' onClick={handleSaveComment} className='side-button'>Save Comment</button>
							</div>
						</div>
					) : null
				}

				{
					event.type === `Censor` ? (
						<div className='censor-menu'>
							<table>
								<thead className={`table-header`}>
									<tr>
										<th align='center'>Time</th>
										<th align='center'>X</th>
										<th align='center'>Y</th>
										<th align='center'>Width</th>
										<th align='center'>Height</th>
										<th align='center'>&nbsp;</th>
									</tr>
								</thead>
								<tbody className={`censor-list`}>
									{event.type === `Censor` &&
										Object.keys(event.position).sort((a, b) => parseFloat(event.position[a][0]) - parseFloat(event.position[b][0])).map((item, i) => (
											<React.Fragment key={item}>
												<tr className={`${activeCensorPosition === item && `censor-active`}`} >
													<td id={`time-td-${item}`} className={`td-one`}>
														<span className={`flex-box`}>
															<input
																id={`censorTimeInput-${item}`}
																className={`censor-row ${blurInputHighlight ? `blue-highlight` : ``} censor-time-input-${i}`}
																type='text'
																defaultValue={`${convertSecondsToHMS(parseFloat(event.position[item][0]), videoLength)}`}
																onKeyUp={e => e.stopPropagation()}
																onClick={() => handleCensorActive(item)}
																onBlur={(e) => handleEditCensor(e, item, 0, `onBlur`)}
																onMouseEnter={e => handleShowTip(`only-sec`,
																	{
																		x: e.target.getBoundingClientRect().x - 125,
																		y: e.target.getBoundingClientRect().y - 25,
																		width: e.currentTarget.offsetWidth + 20,
																	}, parseFloat(event.position[item][0]))
																}
																onMouseLeave={() => toggleTip()}
															/>
															<i className={`fa fa-clock blur-clock`}
																id={`clock-${item}`}
																onClick={(e) => handleShowBlurConfirmation(e, item, 0, `onBlur`)}
																onMouseEnter={e => handleShowTip(`changetime`,
																	{
																		x: e.target.getBoundingClientRect().x - 160,
																		y: e.target.getBoundingClientRect().y - 30,
																		width: e.currentTarget.offsetWidth + 20,
																	})
																}
																onMouseLeave={() => toggleTip()}></i>
														</span>
													</td>
													<td><input disabled
														type='number'
														value={`${event.position[item][1]}`}
														onKeyUp={e => e.stopPropagation()}
														onClick={() => handleCensorActive(item)}
														onChange={(e) => handleEditCensor(e, item, 1)}
													/></td>
													<td><input disabled
														type='number'
														value={`${event.position[item][2]}`}
														onKeyUp={e => e.stopPropagation()}
														onClick={() => handleCensorActive(item)}
														onChange={(e) => handleEditCensor(e, item, 2)}
													/></td>
													<td><input
														id={`censor-width-input-${i}`}
														type='number'
														value={`${event.position[item][3]}`}
														onKeyUp={e => e.stopPropagation()}
														onClick={() => handleCensorActive(item)}
														onBlur={(e) => handleEditCensor(e, item, 3, `onBlur`)}
														onChange={(e) => handleEditCensor(e, item, 3, `onChange`)}
													/></td>
													<td><input
														id={`censor-height-input-${i}`}
														type='number'
														value={`${event.position[item][4]}`}
														onKeyUp={e => e.stopPropagation()}
														onClick={() => handleCensorActive(item)}
														onBlur={(e) => handleEditCensor(e, item, 4, `onBlur`)}
														onChange={(e) => handleEditCensor(e, item, 4, `onChange`)}
													/></td>
													<td><img className={`trashIcon`} src={`${trashIcon}`} alt='' onClick={() => handleCensorRemove(item)}/></td>
												</tr>
												<tr>
													<td colSpan={6}>
														{showConfirmation && trIndex===item && startOrEnd===`blur` && (
															<StartEndTimeConfirm
																message={confirmationMessage}
																onConfirm={handleConfirmBlur}
																onCancel={handleCancel}
															/>
														)}
													</td>
												</tr>
											</React.Fragment>
										))
									}
								</tbody>
							</table>
							<div id='loader' style={{visibility: `hidden`}}>Loading</div><br/><br/>
							<div id='table-bottom' style={{ width: `90%`, marginLeft: `0px` }}></div>

							<button className='add-censor' onClick={handleAddCensor}><Icon src={plus}/></button>
						</div>
					) : null
				}
			</div>
		</Style>
	)
}

export default TrackEditorSideMenu
