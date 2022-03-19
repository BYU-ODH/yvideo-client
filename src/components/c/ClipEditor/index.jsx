import React, { useState, useEffect } from 'react'

import { Prompt } from 'react-router'
import { VideoContainer, SkipLayer } from 'components'
import {ClipLayer, SwitchToggle} from 'components/bits'
import { DndProvider } from 'react-dnd'
import { Rnd } from 'react-rnd'
import Backend from 'react-dnd-html5-backend'
import { convertSecondsToMinute, convertToSeconds } from '../../common/timeConversion'

// import * as Subtitle from 'subtitle'
import zoomIn from 'assets/te-zoom-in.svg'
import zoomOut from 'assets/te-zoom-out.svg'
import trashIcon from 'assets/trash_icon.svg'
import plus from 'assets/plus-circle.svg'

// ICONS FOR THE EVENTS CAN BE FOUND AT https://feathericons.com/
// TRASH ICON COLOR IS: #eb6e79. OTHER ICON STROKES ARE LIGHT BLUE VAR IN CSS: #0582ca

import Style, { Timeline, AnnotationMessage, SideEditor, Icon} from './styles'

const ClipEditor = props => {
	const {
		currentContent,
		url,
		eventsArray,
		subs,
		allSubs,
	} = props.viewstate

	const {
		toggleTip,
		handleShowTip,
	} = props.handlers

	const updateContent = props.updateContent
	const layers = [{0: `Skip`}]

	// const parseSub = Subtitle.parse(testingSubtitle)

	// for (let i = 0; i < parseSub.length; i++){
	// 	parseSub[i].start = parseSub[i].start/1000
	// 	parseSub[i].end = parseSub[i].end/1000
	// }
	const [videoLength, setVideoLength] = useState(0)
	const [allEvents, setAllEvents] = useState(eventsArray)

	const [videoCurrentTime, setCurrentTime] = useState(0)
	const [layerWidth, setWidth] = useState(0)
	const [zoomFactor, setZoomFactor] = useState(0)
	const [scrollFactor, setScrollFactor] = useState(0)
	const [scrollWidth, setScrollWidth] = useState(0)
	const [annotationsSaved, setSaved] = useState(false)
	const [scrollBarWidth, setScrollBar] = useState(0)
	const [start, setStart] = useState(0)
	const [end,setEnd] = useState(60)
	const [title,setTitle] = useState(``)
	const [clipList,setClipList] = useState({})
	const [active, setActive] = useState(``)
	const [savedClips, setSavedClips] = useState([])
	const [clipsToDelete,setClipsToDelete] = useState({})
	const [blockLeave, setBlock] = useState(false)
	const [isLoading,setIsLoading] = useState(false)
	const [clipIndex,setClipIndex] = useState(0)
	const [disableSave, setDisableSave] = useState(false)
	const [allowEvents, setAllowEvents] = useState(false)

	// const [usingSubtitles, setSubtitles] = useState(false)
	// const [subtitles, setSubs] = useState(subs)
	const [activeCensorPosition,setActiveCensorPosition] = useState(-1)
	useEffect(() => {
		// setScrollWidth(document.getElementsByClassName(`zoom-scroll-container`)[0].clientWidth)
		function handleResize() {
			setZoomFactor(0)
			setWidth(0)
			setZoomFactor(1)
			setWidth(1)
		}
		window.addEventListener(`resize`, handleResize)
		setAllEvents(eventsArray)

		const largestLayer = 0
		// SORTING THE ARRAYS TO HAVE A BETTER WAY TO HANDLE THE EVENTS
		// Find the largets layer number
		const initialLayers = []

		if(Object.keys(clipList).length ===0) {
			if(Object.keys(currentContent).length !== 0 && currentContent[`clips`] !== ``){
				const clips = JSON.parse(currentContent[`clips`])
				setClipList(clips)
				const saved = Object.keys(clips)
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
	}, [eventsArray, blockLeave])

	const getVideoDuration = (duration) => {
		setVideoLength(duration)
	}
	const handleZoomChange = (e, d) => {
		toggleTip()
		if(d.x < zoomFactor){
			if(d.x === 0){
				setZoomFactor(0)
				setWidth(0)
				handleScrollFactor(`start`)
			} else {
				setZoomFactor(d.x)
				setWidth(-(Math.abs(zoomFactor - d.x) * videoLength / 10))
			}
		} else if(d.x > zoomFactor) {
			setZoomFactor(d.x)
			setWidth(Math.abs(zoomFactor - d.x) * videoLength / 10)
		}
		if(document.getElementsByClassName(`layer-container`)[0]) setScrollBar(document.getElementsByClassName(`layer-container`)[0].clientWidth * 100 / document.getElementsByClassName(`events`)[0].clientWidth)
	}

	const handleScrollFactor = (direction) => {
		if(document.getElementsByClassName(`layer-container`) !== undefined){
			const scrubber = document.getElementById(`time-bar`)
			const timeIndicator = document.getElementById(`time-indicator-container`)
			const alllayers = Array.from(document.getElementsByClassName(`layer-container`))
			const currentLayerWidth = document.getElementsByClassName(`events`)[0] && document.getElementsByClassName(`events`)[0].clientWidth
			const scrollBarContainer = document.getElementsByClassName(`zoom-scroll-container`)[0].offsetWidth
			const scrollBar = document.getElementsByClassName(`zoom-scroll-indicator`)[0]

			const cLeft = parseInt(scrollBar.style.left)
			const scrollBarOffset = scrollBarContainer * 0.03
			const lastPossibleRight = document.getElementsByClassName(`zoom-scroll-container`)[0].clientWidth - document.getElementsByClassName(`zoom-scroll-indicator`)[0].clientWidth
			switch (direction) {
			case `start`:
				scrubber.scrollLeft = 0
				timeIndicator.scrollLeft = 0
				alllayers.forEach((element, i) => {
					alllayers[i].scrollLeft = 0
				})
				scrollBar.style.left = `0px`

				break
			case `left`:
				scrubber.scrollLeft -= currentLayerWidth * 0.03
				timeIndicator.scrollLeft -= currentLayerWidth * 0.03
				alllayers.forEach((element, i) => {
					alllayers[i].scrollLeft -= currentLayerWidth * 0.03
				})
				// FIND 3 PERCENT OF PARENT
				// CURRENT LEFT MINUS NEW LEFT
				if(isNaN(cLeft) === false && cLeft - scrollBarOffset > -1)
					scrollBar.style.left = `${cLeft - scrollBarOffset}px`
				else if (cLeft - scrollBarOffset < 0)
					scrollBar.style.left = `0px`

				break
			case `right`:
				scrubber.scrollLeft += currentLayerWidth * 0.03
				timeIndicator.scrollLeft += currentLayerWidth * 0.03
				alllayers.forEach((element, i) => {
					alllayers[i].scrollLeft += currentLayerWidth * 0.03
				})
				if(zoomFactor !== 0){
					if(isNaN(cLeft) === true)
						scrollBar.style.left = `${scrollBarOffset}px`
					else
						scrollBar.style.left = `${cLeft + scrollBarOffset}px`

				}

				if (cLeft + scrollBarOffset > lastPossibleRight)
					scrollBar.style.left = `${scrollBarContainer - scrollBar.clientWidth}px`

				break
			case `end`:
				scrubber.scrollLeft += currentLayerWidth
				timeIndicator.scrollLeft += currentLayerWidth
				alllayers.forEach((element, i) => {
					alllayers[i].scrollLeft += currentLayerWidth
				})
				scrollBar.style.left = `${scrollBarContainer - scrollBar.clientWidth}px`

				break

			default:
				break
			}
		}
	}
	const titleSet = (value) => {
		const clips = {...clipList}
		clips[active][`title`] = value
		setClipList(clips)
		setBlock(true)
	}
	const setStartTime = (value, type, name) => {
		// console.log(clipList,value,name)
		const input = value
		if(type === `input` || type === `onBlur`) {
			if(value.match(/^\d{2}:\d{2}\.\d{2}/) !== null || value.match(/\d{1}:\d{2}:\d{2}\.?\d{2}/) || type === `onBlur`)
				value = convertToSeconds(value, videoLength)
			else
				value = input
		}
		const clips = {...clipList}
		if(value > videoLength)
			clips[name][`start`] = videoLength - 30
		else if(value < 0)
			clips[name][`start`] = 0
		else {
			clips[name][`start`] = value
			if (value > clips[name][`end`]) {
				if(document.getElementById(`clipMessage`)) {
					document.getElementById(`clipMessage`).style.color=`red`
					document.getElementById(`clipMessage`).innerHTML=`Please, enter a number smaller than end time`
					setDisableSave(true)
				}
			} else {
				if(document.getElementById(`clipMessage`))
					document.getElementById(`clipMessage`).innerHTML=``
				setDisableSave(false)
			}
		}

		if(type === `input` || type === `onBlur`) {
			if((input.match(/\d{2}:\d{2}\.\d{2}/) === null || input.match(/\d{1}:\d{2}:\d{2}\.?\d{2}/) === null ) && type !== `onBlur`)
				clips[name][`start`] = input
		}

		setClipList(clips)
		setBlock(true)
	}
	const setEndTime = (value, type, name) => {
		const input = value
		if(type === `input` || type === `onBlur`) {
			if(value.match(/^\d{2}:\d{2}\.\d{2}/) !== null || value.match(/^\d{1}:\d{2}:\d{2}\.\d{2}/) !== null || type === `onBlur`)
				value = convertToSeconds(value, videoLength)
			else
				value = input

		}
		const clips = {...clipList}
		if(value > videoLength)
			clips[name][`end`] = videoLength
		else if(value < 0)
			clips[name][`end`] = 30
		else {
			clips[name][`end`] = value
			if (value < clips[name][`start`]) {
				if(document.getElementById(`clipMessage`)) {
					document.getElementById(`clipMessage`).style.color=`red`
					document.getElementById(`clipMessage`).innerHTML=`Please, enter a number bigger than start time`
					setDisableSave(true)
				}
			} else {
				if(document.getElementById(`clipMessage`))
					document.getElementById(`clipMessage`).innerHTML=``
				setDisableSave(false)
			}
		}

		if(type === `input` || type === `onBlur`) {
			if((input.match(/\d{2}:\d{2}\.\d{2}/) === null || input.match(/\d{1}:\d{2}:\d{2}\.?\d{2}/) === null ) && type !== `onBlur`)
				clips[name][`end`] = input
		}

		setClipList(clips)
		setBlock(true)
	}

	const createClip = () =>{
		const id = Object.keys(clipList).length === 0 ? `0` : `${parseInt(Object.keys(clipList).sort((a,b)=> parseFloat(b) - parseFloat(a))[0]) + 1}`
		const clip = {
			start: 0,
			end: 60,
			title: ``,
		}
		const clips = {...clipList}
		clips[id] = clip
		setClipList(clips)
		setBlock(true)
	}
	const deleteClip = (toDelete) =>{
		setActive(``)
		const clips = {...clipList}
		const del = clipsToDelete
		const clip = clipList[toDelete]
		del[toDelete] = clip
		delete clips[toDelete]
		// setClipList(clips)
		// setClipsToDelete(del)
		const content = {...currentContent}
		content[`clips`] = JSON.stringify(clips)
		setClipList(clips)
		updateContent(content)
		setBlock(true)
		return savedClips.includes(active)
	}
	const saveClips = () => {
		setIsLoading(true)
		if (Object.keys(clipList).length===0 && Object.keys(clipsToDelete).length ===0)
			return
		const clips = {...clipList}
		const content = {...currentContent}
		content[`clips`] = JSON.stringify(clips)
		updateContent(content)
		setBlock(false)
		setIsLoading(false)
	}

	const handleEditClip = (item, index) => {
		setActive(item)
		setClipIndex(index)
	}

	const handleAllowEvents = () => {
		setAllowEvents(!allowEvents)
	}

	return (
		<Style>
			<DndProvider backend={Backend}>
				<span style={{ zIndex: 0 }}>
					<VideoContainer
						className='video'
						url={props.viewstate.url}
						getDuration={getVideoDuration}
						getVideoTime={setCurrentTime} // set current time
						setActiveCensorPosition = {setActiveCensorPosition}
						handleLastClick = {null}
						handleScroll = {handleScrollFactor}
						events = {allowEvents ? allEvents : null}
						updateEvents={null}
						eventToEdit={null}
						activeCensorPosition = {activeCensorPosition}
						editorType={`clip`}
					>
					</VideoContainer>
					<Timeline zoom={scrollBarWidth}>

						<div className={`layer`} style={{paddingBottom:`40px`}}>
							<div>
								{layers.map((layer, index) => (
									<div className={`flex`} key={index}>
										<div className={`skip-handle`}>
											<p>Allow Skip</p>
											<div className={`allow-event`}
												onMouseEnter={e => handleShowTip(`allow-events`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
												onMouseLeave={e => toggleTip()}>
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
								{Object.keys(clipList).map((clip,index)=>(
									<div className={`flex`}>
										<div className={`handle`} style={active===clip?{backgroundColor:`#002e5d`,color:`#fff`}:{backgroundColor:`#fff`,color:`#000`}}>
											<p style={{color:`inherit`}}>{clipList[clip][`title`]}</p>
										</div>
										<ClipLayer
											clipName = {clip}
											start={clipList[clip][`start`]}
											setStart={setStartTime}
											end={clipList[clip][`end`]}
											setEnd={setEndTime}
											width={0}
											videoLength = {videoLength}
											active = {active}
											index = {index}
											handleEditClip = {handleEditClip}
										/>
									</div>
								),

								)}

							</div>

						</div>
						<section>
							{/* //TODO: Add delete logic */}
						</section>
						<div className='zoom-controls'>
							<div className='zoom-factor'>
								<img src={zoomOut} style={{ width: `20px` }}/>
								<Rnd
									className={`zoom-indicator`}
									bounds={`parent`}
									enableResizing={{top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}
									dragAxis='x'
									onDragStop={(e, d) => handleZoomChange(e, d)}
									onMouseEnter={e => handleShowTip(`te-zoom`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
									onMouseLeave={e => toggleTip()}
								></Rnd>
								<img src={zoomIn} style={{ float: `right`, width: `20px`}}/>
							</div>
							<div className='zoom-scroll'>
								<div style={{ width: `100%`, height: `100%`, display: `flex` }}>
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
						<div className='sideButton'>
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
											<i className='fa fa-check'></i>
									}
									<span>Save</span>
								</button>
							}
						</div>

					</header>
					<div className='clipItems'>
						<p id={`clipMessage`}></p>
						<table className='tableHeader'>
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
								<tbody>
									{
										Object.keys(clipList).sort((a, b) => parseFloat(a) > parseFloat(b) ? 1 : -1).map((item, i) => (
											<div className={`singleClip ${i === clipIndex ? `clipActive`:``}`}>
												<tr className={`${activeCensorPosition === item ? `censorActive` : ``}`} key={item} >
													<td><input onClick={(e)=>handleEditClip(item, i)} type='text' value={`${clipList[item].title}`} onChange={e => titleSet(e.target.value)}/></td>
													<td>
														<input onClick={(e)=>handleEditClip(item, i)} type='text' value={`${convertSecondsToMinute(clipList[item].start, videoLength)}`}
															onChange={(e) => setStartTime(e.target.value, `input`,item)}
															onBlur={(e) => setStartTime(e.target.value, `onBlur`,item)}
															onMouseEnter={e => handleShowTip(`${videoLength<3600 ? `MMSSMS`: `HMMSSMS`}`, {x: e.target.getBoundingClientRect().x-5, y: e.target.getBoundingClientRect().y + 5, width: e.currentTarget.offsetWidth+20})}
															onMouseLeave={e => toggleTip()}
														/>
													</td>
													<td><input onClick={(e)=>handleEditClip(item, i)} type='text' value={`${convertSecondsToMinute(clipList[item].end, videoLength)}`}
														onChange={(e) => setEndTime(e.target.value, `input`,item)}
														onBlur={(e) => setEndTime(e.target.value, `onBlur`,item)}
														onMouseEnter={e => handleShowTip(`${videoLength<3600 ? `MMSSMS`: `HMMSSMS`}`, {x: e.target.getBoundingClientRect().x+35, y: e.target.getBoundingClientRect().y + 5, width: e.currentTarget.offsetWidth+20})}
														onMouseLeave={e => toggleTip()}
													/>
													</td>
												</tr>
												<img className={`trashIcon`} alt={`trashIcon`} src={`${trashIcon}`} onClick={() => deleteClip(item)}/>
											</div>
										))
									}
								</tbody>
							</table>
							<div id='loader' style={{visibility: `hidden`}}>Loading</div><br/>
							<div id='tableBottom' style={{ width: `90%`, marginLeft: `0px` }}></div>
						</div>
						<Icon src={plus} onClick={createClip} />
					</div>
				</SideEditor>
			</DndProvider>
			<>
				<AnnotationMessage style={{ visibility: `${annotationsSaved ? `visible` : `hidden`}`, opacity: `${annotationsSaved ? `1` : `0`}` }}>
					<h2>Clip saved successfully</h2>
				</AnnotationMessage>
				<Prompt
					when={blockLeave}
					message='If you leave you will lose all your changes. Are you sure to leave without saving?'
				/>
			</>
		</Style>
	)
}

export default ClipEditor
