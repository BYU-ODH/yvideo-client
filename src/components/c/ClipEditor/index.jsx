import React, { useState, useEffect } from 'react'

import { useCallbackPrompt } from '../../../hooks/useCallbackPrompt'
import { VideoContainer, SkipLayer } from 'components'
import { ClipLayer, SwitchToggle } from 'components/bits'
import { DndProvider } from 'react-dnd'
import { Rnd } from 'react-rnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { convertSecondsToMinute, convertToSeconds } from '../../common/timeConversion'
import { handleScrollFactor, debouncedOnDrag, handleZoomEandD, getParameters } from '../../common/editorCommon'

import zoomIn from 'assets/te-zoom-in.svg'
import zoomOut from 'assets/te-zoom-out.svg'
import trashIcon from 'assets/trash_icon.svg'
import plus from 'assets/plus-circle.svg'

// ICONS FOR THE EVENTS CAN BE FOUND AT https://feathericons.com/
// TRASH ICON COLOR IS: #eb6e79. OTHER ICON STROKES ARE LIGHT BLUE VAR IN CSS: #0582ca

import Style, { Timeline, AnnotationMessage, SideEditor, Icon, Button } from './styles'

const ClipEditor = props => {
	const {
		currentContent,
		eventsArray,
	} = props.viewstate

	const {
		toggleTip,
		handleShowTip,
		handleNavigation,
		updateContent,
	} = props.handlers
	const layers = [{0: `Skip`}]

	const [videoLength, setVideoLength] = useState(0)
	const [allEvents, setAllEvents] = useState(eventsArray)
	const [elapsed, setElapsed] = useState(0)
	const [videoCurrentTime, setCurrentTime] = useState(0)
	const [layerWidth, setWidth] = useState(0)
	const [annotationsSaved, setSaved] = useState(false)
	const [scrollBarWidth, setScrollBar] = useState(100)
	const [clipList, setClipList] = useState([])
	const [activeItem, setActiveItem] = useState(``)
	const [activeIndex, setActiveIndex] = useState(``)
	const [savedClips, setSavedClips] = useState([])
	const clipsToDelete = {}
	const [blockLeave, setBlock] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [clipIndex, setClipIndex] = useState(0)
	const [disableSave, setDisableSave] = useState(false)
	const [allowEvents, setAllowEvents] = useState(false)
	const [isReady, setIsReady] = useState(false)
	const [eventSeek, setEventSeek] = useState(false)
	const [eventPosition, setEventPosition] = useState(0)
	const [showPrompt, confirmNavigation, cancelNavigation] =
		useCallbackPrompt(blockLeave)

	const [activeCensorPosition, setActiveCensorPosition] = useState(-1)

	const [clipItemIsDelete, setClipItemIsDelete] = useState([{}])
	const [clipItemTimeChange, setClipItemTimeChange] = useState([{}])

	useEffect(() => {
		if (showPrompt)
			handleNavigation(confirmNavigation, cancelNavigation)
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showPrompt])

	useEffect(() => {
		// setScrollWidth(document.getElementsByClassName(`zoom-scroll-container`)[0].clientWidth)
		const handleResize = () => {
			setWidth(0)
			setWidth(1)
		}
		window.addEventListener(`resize`, handleResize)
		setAllEvents(eventsArray)
		getParameters(videoLength, setWidth, videoCurrentTime, setScrollBar, document.getElementsByClassName(`clip-box`))

		const largestLayer = 0
		// SORTING THE ARRAYS TO HAVE A BETTER WAY TO HANDLE THE EVENTS
		// Find the largets layer number
		const initialLayers = []

		if(clipList.length === 0) {
			if(Object.keys(currentContent).length !== 0 && currentContent[`clips`] !== ``){
				const clips = JSON.parse(currentContent[`clips`])
				clips?.sort((a, b) => a.start !== b.start ? a.start - b.start : a.end - b.end)
				setClipList(clips)
				const saved = []
				for (const clip in clips)
					saved.push(clip)
				setSavedClips(saved)
			}
		}

		for(let i = 0; i < largestLayer + 1; i++)
			initialLayers.push([i])

		if(annotationsSaved){
			setTimeout(() => {
				setSaved(false)
			}, 3000)
		}

		if(blockLeave)
			window.onbeforeunload = () => true
		else
			window.onbeforeunload = undefined

		return () => {
			window.onbeforeunload = undefined
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventsArray, blockLeave, videoLength])

	useEffect(() => {
		initDeleteArray()
		initChangeTimeArray()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clipList])

	const handleEventPosition = (position) => {
		setEventPosition(position)
	}

	const initDeleteArray = () =>{
		if (clipList){
			let tempArray = []
			for(let i = 0; i < clipList.length; i++)
				tempArray = [...tempArray, {id : clipList[i], trueFalse: false}]
			setClipItemIsDelete(tempArray)
		}
	}

	const toggleDeleteItem = (index, boolean) => {
		for(let i = 0; i < Object.entries(clipItemIsDelete).length; i++){
			if(parseInt(Object.keys(clipItemIsDelete)[i]) === index){
				index = index.toString()
				setClipItemIsDelete({...clipItemIsDelete, [index]: {id : clipList[i], trueFalse: boolean}})
			}
		}
	}
	const initChangeTimeArray = () => {
		if (clipList){
			let tempArray = []
			for(let i = 0; i < clipList.length; i++)
				tempArray = [...tempArray, {id: clipList[i], trueFalse: false}]
			setClipItemTimeChange(tempArray)
		}
	}

	const toggleItemTimeChange = (index, boolean, startOrEnd) => {
		for(let i = 0; i < Object.entries(clipItemTimeChange).length; i++){
			if(parseInt(Object.keys(clipItemTimeChange)[i]) === index){
				index = index.toString()
				setClipItemTimeChange({...clipItemTimeChange, [index]: {id: clipList[i], trueFalse: boolean, startOrEnd}})
			}
		}
	}

	const handleInputChange = (index, item, startOrEnd) => {
		for (let i = 0; i < clipList.length; i++){
			if(clipList[i] === item){
				const title = clipList[index].title
				const end = clipList[index].end
				const start = clipList[index].start
				const clips = [...clipList]
				if(startOrEnd === `start`){
					clips.splice(index, 1, {start: elapsed, end, title})
					setClipList(clips)
					setBlock(true)
				}else{
					clips.splice(index, 1, {start, end: elapsed, title})
					setClipList(clips)
					setBlock(true)
				}
			}
		}
	}

	const setCurrentTimePercentage = (time) => {
		const seconds = time * videoLength
		setCurrentTime(seconds)
	}
	const getVideoDuration = (duration) => {
		setVideoLength(duration)
	}

	const titleSet = (value) => {
		const clips = [...clipList]
		clips[activeIndex].title = value
		setClipList(clips)
		setBlock(true)
	}

	const setStartTime = (value, type, index) => {
		const input = value
		if(type === `input` || type === `onBlur`) {
			if(value.match(/^\d{2}:\d{2}\.\d{2}/) !== null || value.match(/\d{1}:\d{2}:\d{2}\.?\d{2}/) || type === `onBlur`)
				value = convertToSeconds(value, videoLength)
			else
				value = input
		}
		const clips = [...clipList]
		if(value > videoLength)
			clips[index][`start`] = videoLength - 30
		else if(value < 0)
			clips[index][`start`] = 0
		else {
			clips[index][`start`] = value
			if (value > clips[index][`end`]) {
				if(document.getElementById(`clipMessage`)) {
					document.getElementById(`clipMessage`).style.color=`red`
					document.getElementById(`clipMessage`).innerHTML=`Please enter a number smaller than the end time`
					setDisableSave(true)
				}
			} else {
				if(document.getElementById(`clipMessage`))
					document.getElementById(`clipMessage`).innerHTML=``
				setDisableSave(false)
			}
		}

		if(type === `input` || type === `onBlur`) {
			if((input.match(/\d{2}:\d{2}\.\d{2}/) === null || input.match(/\d{1}:\d{2}:\d{2}\.?\d{2}/) === null) && type !== `onBlur`)
				clips[index][`start`] = input
		}

		setClipList(clips)
		setBlock(true)
	}
	const setEndTime = (value, type, index) => {
		const input = value
		if(type === `input` || type === `onBlur`) {
			if(value.match(/^\d{2}:\d{2}\.\d{2}/) !== null || value.match(/^\d{1}:\d{2}:\d{2}\.\d{2}/) !== null || type === `onBlur`)
				value = convertToSeconds(value, videoLength)
			else
				value = input
		}
		const clips = [...clipList]
		if(value > videoLength)
			clips[index][`end`] = videoLength
		else if(value < 0)
			clips[index][`end`] = 30
		else {
			clips[index][`end`] = value
			if (value < clips[index][`start`]) {
				if(document.getElementById(`clipMessage`)) {
					document.getElementById(`clipMessage`).style.color=`red`
					document.getElementById(`clipMessage`).innerHTML=`Please enter a number bigger than the start time`
					setDisableSave(true)
				}
			} else {
				if(document.getElementById(`clipMessage`))
					document.getElementById(`clipMessage`).innerHTML=``
				setDisableSave(false)
			}
		}

		if(type === `input` || type === `onBlur`) {
			if((input.match(/\d{2}:\d{2}\.\d{2}/) === null || input.match(/\d{1}:\d{2}:\d{2}\.?\d{2}/) === null) && type !== `onBlur`)
				clips[index][`end`] = input
		}

		setClipList(clips)
		setBlock(true)
	}

	const createClip = (startPercentage) => {
		const id = clipList.length === 0 ?
			`0`
			:
			`${parseInt(Object.keys(clipList).sort((a, b) => parseFloat(b) - parseFloat(a))[0]) + 1}`
		const clip = {
			start: 0,
			end: 60,
			title: ``,
		}

		const portionOfBarToFill = 1/30 // one thirtieth of the bar
		const scrollBarWidthRatio = 100 // scroll bar width at normal zoom is 100 so we need to divide by 100 to get the ratio as we zoom in

		clip.start = Number(startPercentage)
		clip.end = Number(startPercentage) + videoLength * portionOfBarToFill * (scrollBarWidth / scrollBarWidthRatio)

		const clips = [...clipList]
		clips[id] = clip
		setClipList(clips)
		setBlock(true)
	}
	const deleteClip = (index) => {
		setActiveItem(``)
		setActiveIndex(``)
		const clips = [...clipList]
		clips.splice(index, 1)
		clips.sort((a, b) => a.start !== b.start ? a.start - b.start : a.end - b.end)
		const content = {...currentContent}
		content[`clips`] = JSON.stringify(clips)
		setClipList(clips)
		updateContent(content)
		setBlock(true)
		return savedClips.includes(activeItem)
	}
	const saveClips = () => {
		setActiveItem(``)
		setIsLoading(true)
		if (clipList.length === 0 && Object.keys(clipsToDelete).length === 0)
			return
		const clips = [...clipList]
		clips.sort((a, b) => a.start !== b.start ? a.start - b.start : a.end - b.end)
		const content = {...currentContent}
		content[`clips`] = JSON.stringify(clips)
		setClipList(clips)
		updateContent(content)
		setBlock(false)
		setIsLoading(false)
	}

	const handleEditClip = (item, index) => {
		setActiveItem(item)
		setActiveIndex(index)
		setClipIndex(index)
	}

	const handleAllowEvents = () => {
		setAllowEvents(!allowEvents)
	}

	return (
		<Style>
			<DndProvider backend={HTML5Backend}>
				<span style={{ zIndex: 0 }}>
					<VideoContainer
						className='video'
						isReady ={isReady}
						setIsReady={setIsReady}
						url={props.viewstate.url}
						getDuration={getVideoDuration}
						getVideoTime={setCurrentTimePercentage} // set current time
						setActiveCensorPosition = {setActiveCensorPosition}
						handleLastClick = {null}
						handleScroll = {handleScrollFactor}
						events = {allowEvents ? allEvents : null}
						updateEvents={null}
						eventToEdit={null}
						activeCensorPosition = {activeCensorPosition}
						editorType='clip'
						eventSeek={eventSeek}
						setEventSeek={setEventSeek}
						eventPosition={eventPosition}
						handleShowTip={handleShowTip}
						toggleTip={toggleTip}
						elapsed={elapsed}
						setElapsed={setElapsed}
					>
					</VideoContainer>
					<Timeline zoom={scrollBarWidth}>
						<div className={`layer`} style={{paddingBottom: `40px`}}>
							<div>
								{layers?.map((layer, index) => (
									<div className={`flex`} key={index}>
										<div className={`skip-handle`}>
											<p>Allow Skip</p>

											<div className={`allow-event`}>
												<SwitchToggle on={allowEvents} setToggle={handleAllowEvents} data_key='`allow-event`' className={`allow-event-button`} />
											</div>
										</div>
										<SkipLayer
											videoLength={videoLength}
											width={layerWidth}
											events={allEvents}
										/>
									</div>
								))}
								{clipList?.map((clip, index) => (
									<div className={`flex`} key={index}>
										<div
											className='handle'
											style={activeIndex === index ?
												{backgroundColor:`var(--navy-blue)`, color:`#fff`}
												:
												{backgroundColor: `#fff`, color: `#000`}}
										>
											<p style={{color: `inherit`}}>{clipList?.[index]?.title}</p>
										</div>
										<ClipLayer
											events={allEvents}
											clipList={clipList}
											setStart={setStartTime}
											setEnd={setEndTime}
											width={layerWidth}
											videoLength={videoLength}
											activeIndex={activeIndex}
											index={index}
											handleEditClip={handleEditClip}
											handleEventPosition={handleEventPosition}
											setEventSeek={setEventSeek}
										/>
									</div>
								),

								)}

							</div>

						</div>
						<section>
						</section>
						<div className='zoom-controls'>
							<div className='zoom-factor'>
								<img src={zoomOut} alt='' style={{ width: `20px` }}/>
								<Rnd
									className='zoom-indicator'
									bounds='parent'
									enableResizing={
										{
											top: false,
											right: false,
											bottom: false,
											left: false,
											topRight: false,
											bottomRight: false,
											bottomLeft: false,
											topLeft: false,
										}
									}
									dragAxis='x'
									onDrag={(e, d) => {
										handleZoomEandD(e, d)
										debouncedOnDrag()
									}}
									onMouseEnter={e => handleShowTip(`te-zoom`,
										{
											x: e.target.getBoundingClientRect().x,
											y: e.target.getBoundingClientRect().y - 100,
											width: e.currentTarget.offsetWidth,
										})
									}
									onMouseLeave={() => toggleTip()}
								></Rnd>
								<img src={zoomIn} alt='' style={{ float: `right`, width: `20px` }}/>
							</div>
							<div className='zoom-scroll'>
								<div style={{ width: `100%`, height: `100%`, display: `flex` }}>
									<div id={`zoom-scroll-container`} className={`zoom-scroll-container`}>
										<Rnd
											className= 'zoom-scroll-indicator'
											size={{width: scrollBarWidth !== 0 ? `${scrollBarWidth}%` : `100%`, height: `100%`}}
											enableResizing={
												{
													top: false,
													right: false,
													bottom: false,
													left: false,
													topRight: false,
													bottomRight: false,
													bottomLeft: false,
													topLeft: false,
												}
											}
											bounds = 'parent'
											onDrag = {(e, d) => {
												handleScrollFactor(d.x, false)
											}}
										>
										</Rnd>
									</div>
								</div>
								<div id={`time-indicator-container`}>
									<div id={`layer-time-indicator`}>
										<span id={`layer-time-indicator-line`}></span>
										<span id={`layer-time-indicator-line-shadow`}></span>
									</div>
								</div>
							</div>
						</div>
					</Timeline>
				</span>
				<SideEditor minimized={false}>
					<header>
						<div className='side-button'>
							{disableSave ?
								<button className={`disable`}>
									<span>Save</span>
								</button>
								:
								<button onClick={saveClips}>
									{blockLeave ?
										null
										:
										isLoading ?
											<i className='fa fa-refresh fa-spin'/>
											:
											<Icon className='fa fa-check'></Icon>
									}
									<span>Save</span>
								</button>
							}
						</div>
					</header>
					<div className='clipItems'>
						<p id={`clipMessage`}></p>
						<table className='table-header'>
							<thead>
								<tr>
									<th align='center'>Title</th>
									<th align='center'>Start</th>
									<th align='center'>Stop</th>
									<th align='center'>&nbsp;</th>
								</tr>
							</thead>
						</table>
						<div className='clipList'>
							<table>
								{
									clipList?.sort((a, b) => parseFloat(a) > parseFloat(b) ? -1 : 1).map((item, i) => (

										<tbody key={i} className={`singleClip ${i === clipIndex && `clipActive`}`}>
											<tr className={`${activeCensorPosition === item && `censor-active`}`} key={i} >
												{clipItemTimeChange.length !== 0 && clipItemTimeChange[i]?.trueFalse ?
													<>
														<td className='deleteTd'>Change start time to current player time?</td>
														{clipItemTimeChange[i].startOrEnd === `start` ?
															<td className='deleteTd'><Button className='content-cancel' onClick={() => handleInputChange(i, item, `start`)}>Yes</Button></td>
															:
															<td className='deleteTd'><Button className='content-cancel' onClick={() => handleInputChange(i, item, `end`)}>Yes</Button></td>
														}
														<td className='deleteTd'><Button className='content-delete'onClick={() => toggleItemTimeChange(i, false)}>No</Button></td>
													</> :
													<>
														{clipItemIsDelete.length !== 0 && clipItemIsDelete[i]?.trueFalse ?
															<>
																<td className='deleteTd'>Are you sure you want to delete this clip?</td>
																<td className='deleteTd'><Button className='content-cancel' onClick={() => deleteClip(i)}>Yes</Button></td>
																<td className='deleteTd'><Button className='content-delete'onClick={() => toggleDeleteItem(i, false)}>No</Button></td>
															</> :
															<>
																<td className='clipTd'><input onKeyUp={e => e.stopPropagation()} onClick={() => handleEditClip(item, i)} type='text' value={`${clipList?.[i]?.title}`} onChange={e => titleSet(e.target.value)}/></td>
																<td className='clipTd'>

																	<input
																		type='text'
																		id={`timeInput-${i}`}
																		value={`${convertSecondsToMinute(clipList?.[i]?.start, videoLength)}`}
																		onKeyUp={e => e.stopPropagation()}
																		onClick={() => handleEditClip(item, i)}
																		onChange={(e) => setStartTime(e.target.value, `input`, i)}
																		onBlur={(e) => setStartTime(e.target.value, `onBlur`, i)}
																	/>
																	{clipItemTimeChange.length !== 0 && !clipItemTimeChange[i]?.trueFalse &&
																	<i className='fa fa-clock' onClick={() => toggleItemTimeChange(i, true, `start`)}></i>}
																</td>
																<td className='clipTd'>
																	{clipItemTimeChange.length !== 0 && !clipItemTimeChange[i]?.trueFalse &&
																	<i className='fa fa-clock' onClick={() => toggleItemTimeChange(i, true, `end`)}></i>}
																	<input
																		type='text'
																		value={`${convertSecondsToMinute(clipList?.[i]?.end, videoLength)}`}
																		onKeyUp={e => e.stopPropagation()}
																		onClick={() => handleEditClip(item, i)}
																		onChange={(e) => setEndTime(e.target.value, `input`, i)}
																		onBlur={(e) => setEndTime(e.target.value, `onBlur`, i)}
																	/>

																</td>
															</>}
													</>}
												{/* </>} */}
											</tr>
											<tr>
												{
													// eslint-disable-next-line no-mixed-operators
													clipItemTimeChange.length !== 0 && clipItemTimeChange[i]?.trueFalse ||
													// eslint-disable-next-line no-mixed-operators
													clipItemIsDelete.length !== 0 && !clipItemIsDelete[i]?.trueFalse &&
														<td className='clipTd'>
															<img className={`trashIcon`} alt={`trashIcon`} src={`${trashIcon}`} onClick={() => toggleDeleteItem(i, true)}/>
														</td>
												}
											</tr>
										</tbody>
									))
								}
							</table>
							<div id='loader' style={{visibility: `hidden`}}>Loading</div><br/>
							<div id='table-bottom' style={{ width: `90%`, marginLeft: `0px` }}></div>
						</div>
						<Icon id='add-button' src={plus} onClick={() => createClip(elapsed)} />
					</div>
				</SideEditor>
			</DndProvider>
			<>
				<AnnotationMessage style={
					{
						visibility: `${annotationsSaved ? `visible` : `hidden`}`,
						opacity: `${annotationsSaved ? `1` : `0`}`,
					}
				}>
					<h2>Clip saved successfully</h2>
				</AnnotationMessage>
				{/* <Prompt
					when={blockLeave}
					message='If you leave you will lose all your changes. Are you sure to leave without saving?'
				/> */}
			</>
		</Style>
	)
}

export default ClipEditor
