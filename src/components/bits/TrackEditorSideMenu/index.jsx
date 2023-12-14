import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'

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
	const [startInputHighlight, setStartInputHighlight] = useState(false);
  const [endInputHighlight, setEndInputHighlight] = useState(false);
	const [blurInputHighlight, setBlurInputHighlight] = useState(false);
	const [trIndex, setTrIndex] = useState(0)

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
		}
		else if (startOrEnd === `end`){
			const displayTime = convertSecondsToHMS(videoCurrentTime)
			setConfirmationMessage(`Change end time to current time? (${displayTime})`)
			setStartOrEnd(`end`)
			setEvent(event)
			setStartInputHighlight(false)
			setEndInputHighlight(true)
		}
    setShowConfirmation(true);
  };

	const handleShowBlurConfirmation = (e, item) => {
		setShowConfirmation(true);
		setCurrentTime(videoCurrentTime)
		const displayTime = secondsToTime(videoCurrentTime)
		setConfirmationMessage(`Change blur time to current time? (${displayTime})`)
		setStartOrEnd(`blur`)
		setTrIndex(parseInt(e.target.id.split("-")[1]))
		setEvent(event)
		setBlurInputHighlight(true)
		setStartInputHighlight(false)
		setEndInputHighlight(false)
	}

  const handleConfirm = (e, time) => {
		if (startOrEnd === `start`){
			handleEventBeginTimeChangeByButton(e, time, `start`)
		}
		else if (startOrEnd === `end`){
			handleEventEndTimeChangeByButton(e,time, `end`)
		}
    setShowConfirmation(false);
  };

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
  };

	const handleEventBeginTimeChangeByButton = (e, time, type) => {
		// document.getElementById(`sideTabMessage`).style.color=`red`
		const currentEvent = {...event}
		const layer = currentEvent.layer
		const formattedTime = convertSecondsToHMS(videoCurrentTime)
		setCurrentTime(formattedTime)
		currentEvent.start = videoCurrentTime
		setEvent(currentEvent)
			// updateEvents(index, currentEvent, layer, `end`)
		editEvent(`beg`, currentEvent.start, null, layer, index, type)
	}

	const handleEventEndTimeChangeByButton = (e, time, type) => {
		// document.getElementById(`sideTabMessage`).style.color=`red`
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
		// document.getElementById(`saveComment`).disabled = true
	}

	const handleEditComment = (value, currentEvent, int) => {
    // document.getElementById(`saveComment`).disabled = false
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
										className={`sideTabInput ${startInputHighlight ? 'blue-highlight' : ''}`}
										style={{ padding: event.type === `Pause` ? `0 50px 0 10px` : `0 10px`}}
										value={`${convertSecondsToHMS(start, videoLength)}`}
										onKeyUp={e => e.stopPropagation()}
										onChange={e => handleEditEventBeginTimeChange(e, `onChange`)}
										onBlur={e => handleEditEventBeginTimeChange(e, `onBlur`)}
										onMouseEnter={e => handleShowTip(`${videoLength < 3600 ? `MMSSMS`: `HMMSSMS`}`,
											{
												x: e.target.getBoundingClientRect().x - 15,
												y: e.target.getBoundingClientRect().y + 20,
												width: e.currentTarget.offsetWidth + 20,
											})
										}
										onMouseLeave={() => toggleTip()}
									/>
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
									<input
										type='text'
										className= {`sideTabInput endInput ${endInputHighlight ? 'blue-highlight' : ''}`}
										value={`${convertSecondsToMinute(end, videoLength)}`}
										style={{ display: `${event.type === `Pause` ? `none` : `block`}` }}
										onKeyUp={e => e.stopPropagation()}
										onChange={e => handleEditEventEndTimeChange(e, `onChange`)}
										onBlur={e => handleEditEventEndTimeChange(e, `onBlur`)}
										onMouseEnter={e => handleShowTip(`${videoLength < 3600 ? `MMSSMS` : `HMMSSMS`}`,
											{
												x: e.target.getBoundingClientRect().x - 15,
												y: e.target.getBoundingClientRect().y + 20,
												width: e.currentTarget.offsetWidth + 20,
											})
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
												style={{ display: `${event.type === `Pause` ? `none` : `block`}` }}
										></i>
										</div>
									}
									{event.type === `Pause` ? (
										<textarea style={{ margin: `5%`, width: `90%`}} rows='4' cols='50' className='sideTabInput' value={event.message}
											placeholder = 'Enter message'
											onChange={e => editPauseMessage(e)}/>
									) : <></>
									}
								</div>
								{showConfirmation && startOrEnd==`start` && (
										<StartEndTimeConfirm
											message={confirmationMessage}
											onConfirm={handleConfirm}
											onCancel={handleCancel}
										/>
									)}
								{showConfirmation && startOrEnd==`end` && (
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
											<>
											<tr className={`${activeCensorPosition === item && `censorActive`}`} key={item} >
												<td id={`time-td-${item}`} className={`tdOne`}>
												<span className={`flexbox`}>
													<input
													id={`censorTimeInput-${item}`}
													className={`censorRow ${blurInputHighlight ? 'blue-highlight' : ''} `}
													type='text'
													defaultValue={`${convertSecondsToMinute(parseFloat(event.position[item][0]), videoLength)}`}
													onKeyUp={e => e.stopPropagation()}
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
												/>
													<i className={`fa fa-clock blurClock`}
														id={`clock-${item}`}
														onClick={(e) => handleShowBlurConfirmation(e, item, 0, `onBlur`)}
														onMouseEnter={e => handleShowTip(`changetime`,
														{
															x: e.target.getBoundingClientRect().x - 320,
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
													{showConfirmation && trIndex==item && startOrEnd===`blur` && (
														<StartEndTimeConfirm
															message={confirmationMessage}
															onConfirm={handleConfirmBlur}
															onCancel={handleCancel}
														/>
													)}
												</td>
											</tr>
											</>
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
