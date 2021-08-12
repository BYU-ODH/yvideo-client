import React, { useState, useEffect } from 'react'

import { Prompt } from 'react-router'
import { Controller} from 'components'
import {ClipLayer} from 'components/bits'
import { DndProvider } from 'react-dnd'
import { Rnd } from 'react-rnd'
import Backend from 'react-dnd-html5-backend'
import { convertSecondsToMinute, convertToSeconds } from '../../common/timeConversion'

// import * as Subtitle from 'subtitle'
import zoomIn from 'assets/te-zoom-in.svg'
import zoomOut from 'assets/te-zoom-out.svg'
import llIcon from 'assets/te-chevrons-left.svg'
import rrIcon from 'assets/te-chevrons-right.svg'
import lIcon from 'assets/te-chevron-left.svg'
import rIcon from 'assets/te-chevron-right.svg'
import captions from 'assets/captions.svg'
import helpIcon from 'assets/te-help-circle-white.svg'
import trashIcon from 'assets/trash_icon.svg'
import closeIcon from 'assets/close_icon.svg'
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
	// const parseSub = Subtitle.parse(testingSubtitle)

	// for (let i = 0; i < parseSub.length; i++){
	// 	parseSub[i].start = parseSub[i].start/1000
	// 	parseSub[i].end = parseSub[i].end/1000
	// }
	const [videoLength, setVideoLength] = useState(0)
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

		// new Array(largestLayer+1).fill(0)

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
		const tempSubs = subs
		for (let i = 0; i < tempSubs.length; i++)
			tempSubs[i][`content`] = JSON.parse(tempSubs[i][`content`])

		// setSubs(tempSubs)
		// setAllSubs(tempSubs)
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
		setScrollBar(document.getElementsByClassName(`layer-container`)[0].clientWidth * 100 / document.getElementsByClassName(`events`)[0].clientWidth)
	}

	const handleScrollFactor = (direction) => {
		if(document.getElementsByClassName(`layer-container`) !== undefined){
			const scrubber = document.getElementById(`time-bar`)
			const timeIndicator = document.getElementById(`time-indicator-container`)
			const alllayers = Array.from(document.getElementsByClassName(`layer-container`))
			const currentLayerWidth = document.getElementsByClassName(`events`)[0].clientWidth
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
	const setStartTime = (value, type) => {
		const input = value
		if(type === `input` || type === `onBlur`) {
			if(value.match(/^\d{1,2}:\d{1,2}.?\d{0,2}$/) || value.match(/\d{1}:\d{1,2}:\d{1,2}.?\d{0,2}/) || type === `onBlur`)
				value = convertToSeconds(value, videoLength)
		}
		const clips = {...clipList}
		if(value > videoLength)
			clips[active][`start`] = videoLength - 30
		else if(value < 0)
			clips[active][`start`] = 0
		else {
			clips[active][`start`] = value
			if (value > clips[active][`end`]) {
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
				clips[active][`start`] = input
		}

		setClipList(clips)
		setBlock(true)
	}
	const setEndTime = (value, type) => {
		const input = value
		if(type === `input` || type === `onBlur`) {
			if(value.match(/^\d{1,2}:\d{1,2}.?\d{0,2}$/) || value.match(/\d{1}:\d{1,2}:\d{1,2}.?\d{0,2}/) || type === `onBlur`)
				value = convertToSeconds(value, videoLength)
		}

		const clips = {...clipList}
		if(value > videoLength)
			clips[active][`end`] = videoLength
		else if(value < 0)
			clips[active][`end`] = 30
		else {
			clips[active][`end`] = value
			if (value < clips[active][`start`]) {
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
				clips[active][`end`] = input
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
		// window.location.href = `/manager`
	}

	const handleEditClip = (item, index) => {
		setActive(item)
		setClipIndex(index)
	}

	return (
		<Style>
			<DndProvider backend={Backend}>
				<span style={{ zIndex: 0 }}>
					<Controller className='video'
						url={props.viewstate.url}
						// handlers={togglendTimeline}
						getDuration={getVideoDuration}
						getVideoTime={setCurrentTime}
						// minimized={timelineMinimized}
						// togglendTimeline={togglendTimeline}
						// handleLastClick = {handleLastClick}
						events = {clipList}
						// updateEvents={updateEvents}
						// eventToEdit={eventToEdit}
						activeCensorPosition = {activeCensorPosition}
						setActiveCensorPosition = {setActiveCensorPosition}
						editorType={`clip`}
					>
					</Controller>
					<Timeline zoom={scrollBarWidth}>
						<div className={`layer`}>
							{active !== `` ? (
								<>
									<div className={`handle`}>
									</div>
									<ClipLayer
										start={clipList[active][`start`]}
										setStart={setStartTime}
										end={clipList[active][`end`]}
										setEnd={setEndTime}
										width={0}
										videoLength = {videoLength}
										active = {active}
									/>
								</>
							): <></>}

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

								<div style={{ width: `90%`, height: `100%`, display: `flex`, marginLeft: `5%` }}>
									<span onClick={ e => handleScrollFactor(`start`) } style={{ margin: `auto` }}
										onMouseEnter={e => handleShowTip(`te-scroll-start`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y + 10, width: e.currentTarget.offsetWidth})}
										onMouseLeave={e => toggleTip()}
									><img src={llIcon}/></span>
									<span onClick={ e => handleScrollFactor(`left`) } style={{ margin: `auto` }}
										onMouseEnter={e => handleShowTip(`te-scroll-left`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y + 10, width: e.currentTarget.offsetWidth})}
										onMouseLeave={e => toggleTip()}><img src={lIcon}/></span>

									<div className={`zoom-scroll-container`}>
										<div className={`zoom-scroll-indicator`}
											onMouseEnter={e => handleShowTip(`te-scroll`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y + 10, width: e.currentTarget.offsetWidth})}
											onMouseLeave={e => toggleTip()}></div>
									</div>

									<span onClick={ e => handleScrollFactor(`right`) } style={{ margin: `auto` }}
										onMouseEnter={e => handleShowTip(`te-scroll-right`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y+ 10, width: e.currentTarget.offsetWidth})}
										onMouseLeave={e => toggleTip()}><img src={rIcon}/></span>
									<span onClick={ e => handleScrollFactor(`end`) } style={{ margin: `auto` }}
										onMouseEnter={e => handleShowTip(`te-scroll-end`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y + 10, width: e.currentTarget.offsetWidth})}
										onMouseLeave={e => toggleTip()}><img src={rrIcon}/></span>
								</div>
								<div id={`time-indicator-container`} style={{visibility: active !== ``? `visible`: `hidden`}}>
									<div id={`layer-time-indicator`}>
										<span id={`layer-time-indicator-line`}></span>
									</div>
								</div>
							</div>
						</div>
					</Timeline>
				</span>
				<SideEditor minimized={false}>
					<header>
						<span className='headerTitle'>Clip Manager</span>
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
															onChange={(e) => setStartTime(e.target.value, `input`)}
															onBlur={(e) => setStartTime(e.target.value, `onBlur`)}
															onMouseEnter={e => handleShowTip(`${videoLength<3600 ? `MMSSMS`: `HMMSSMS`}`, {x: e.target.getBoundingClientRect().x-5, y: e.target.getBoundingClientRect().y + 5, width: e.currentTarget.offsetWidth+20})}
															onMouseLeave={e => toggleTip()}
														/>
													</td>
													<td><input onClick={(e)=>handleEditClip(item, i)} type='text' value={`${convertSecondsToMinute(clipList[item].end, videoLength)}`}
														onChange={(e) => setEndTime(e.target.value, `input`)}
														onBlur={(e) => setEndTime(e.target.value, `onBlur`)}
														onMouseEnter={e => handleShowTip(`${videoLength<3600 ? `MMSSMS`: `HMMSSMS`}`, {x: e.target.getBoundingClientRect().x+35, y: e.target.getBoundingClientRect().y + 5, width: e.currentTarget.offsetWidth+20})}
														onMouseLeave={e => toggleTip()}
													/>
													</td>
												</tr>
												<img className={`trashIcon`} alt={`trashIcon`} src={`${trashIcon}`} onClick={() => deleteClip(item)}/>
											</div>
										))
									}
									{
									// "foo: bar", "baz: 42"
										// Object.entries(event.position).forEach(([key, value]) => console.log(`${key}: ${value}`)) // "foo: bar", "baz: 42"
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
