import React, { useState, useEffect, useRef } from 'react'
import { Prompt } from 'react-router'
import Style, { Timeline, EventList, Icon } from './styles'
import { DndProvider } from 'react-dnd'
import { Rnd } from 'react-rnd'
import Backend from 'react-dnd-html5-backend'
import * as Subtitle from 'subtitle'
import { SubtitleEditorSideMenu, SubtitlesCard, SubtitlesLayer, SubtitlesModal } from 'components/bits'
import { VideoContainer } from 'components'
import { convertToSeconds } from '../../common/timeConversion'

// ICONS FOR THE EVENTS CAN BE FOUND AT https://feathericons.com/
// TRASH ICON COLOR IS: #eb6e79. OTHER ICON STROKES ARE LIGHT BLUE VAR IN CSS: #0582ca
import trashIcon from 'assets/trash_icon.svg'
import editIcon from 'assets/ca_tracks_edit.svg'
import saveIcon from 'assets/check.svg'
import zoomIn from 'assets/te-zoom-in.svg'
import zoomOut from 'assets/te-zoom-out.svg'
import llIcon from 'assets/te-chevrons-left.svg'
import rrIcon from 'assets/te-chevrons-right.svg'
import lIcon from 'assets/te-chevron-left.svg'
import rIcon from 'assets/te-chevron-right.svg'
import helpIcon from 'assets/te-help-circle-white.svg'

const SubtitleEditor = props => {

	const { setEvents, updateContent, createSub, setAllSubs, activeUpdate, deleteSubtitles } = props

	const {
		eventsArray,
		currentContent,
		subs,
	} = props.viewstate

	const { handleShowTip, toggleTip, handleShowHelp } = props.handlers

	const [isLoading,setIsLoading] = useState(false)
	const [allEvents, setAllEvents] = useState(eventsArray)
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [blockLeave, setBlock] = useState(false)
	const [showSideEditor, setSideEditor] = useState(false)
	const [videoLength, setVideoLength] = useState(0)
	const [videoCurrentTime, setCurrentTime] = useState(0)
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	const [eventListMinimized, setEventListMinimized] = useState(false)
	const [layerWidth, setWidth] = useState(0)
	const [zoomFactor, setZoomFactor] = useState(0)
	const [scrollWidth, setScrollWidth] = useState(0)
	const [annotationsSaved, setSaved] = useState(false)
	const [scrollBarWidth, setScrollBar] = useState(0)
	const [subtitles, setSubs] = useState(subs)
	const [subToEdit, setSubToEdit] = useState(0)
	const [subLayerToEdit, setSubLayerToEdit] = useState(0)
	const [subSelected, setSubSelected] = useState(false)
	const [subLayersToDelete, setSubLayersToDelete] = useState([])
	const [subModalVisible, setSubModalVisible] = useState(false)
	const [subModalMode, setSubModalMode] = useState(``)
	const [subChanges, setSubChanges] = useState(0)
	const [activeCensorPosition,setActiveCensorPosition] = useState(-1)
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	})
	const [focus, setFocus] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [disableSave, setDisableSave] = useState(false)
	const [deleteTitle, setDeleteTitle] = useState(``)

	// refs
	const controllerRef = useRef(null)
	const scrollRef = useRef()

	useEffect(() => {
		function handleResize() {
			setZoomFactor(0)
			setWidth(0)
			setZoomFactor(1)
			setWidth(1)
		}
		window.addEventListener(`resize`, handleResize)
		setAllEvents(eventsArray)

		let largestLayer = 0

		// SORTING THE ARRAYS TO HAVE A BETTER WAY TO HANDLE THE EVENTS
		if(eventsArray !== undefined && eventsArray.length > 0){
			eventsArray.sort((a, b) => a.layer > b.layer ? 1 : -1)
			largestLayer = eventsArray[eventsArray.length-1].layer
		}

		// Find the largets layer number
		const initialLayers = []

		for(let i = 0; i < largestLayer + 1; i++)
			initialLayers.push([i])

		setEvents(allEvents)

		if(blockLeave)
			window.onbeforeunload = () => true
		else
			window.onbeforeunload = undefined

		return () => {
			window.onbeforeunload = undefined
		}

	}, [eventsArray, blockLeave, isEdit])
	// end of useEffect

	if(shouldUpdate === true)

		setShouldUpdate(false)

	const getVideoDuration = (duration) => {
		setVideoLength(duration)
		const tempSubs = subs
		for (let i = 0; i < tempSubs.length; i++){
			try {
				tempSubs[i][`content`] = JSON.parse(tempSubs[i][`content`])
			} catch (e){
				tempSubs[i][`content`] = []
			}
		}

		setSubs(tempSubs)
		setAllSubs(tempSubs)
	}
	const deleteSub = (index) =>{
		const currentSubs = [...subtitles]
		currentSubs[subLayerToEdit][`content`].splice(index,1)
		setSubs(currentSubs)
		setAllSubs(currentSubs)

		if(currentSubs[subLayerToEdit][`content`].length === 0 || currentSubs[subLayerToEdit][`content`].length === 1)
			setSubToEdit(0)
		else if(currentSubs[subLayerToEdit][`content`].length === index)
			setSubToEdit(index-1)
		else
			setSubToEdit(index)

		checkSubError(currentSubs, `delete`, index)
		setBlock(true)
	}
	const openSubEditor = (layerIndex,subIndex) =>{
		setSubToEdit(subIndex)
		setSubLayerToEdit(layerIndex)
		activeUpdate(layerIndex)
		setSideEditor(true)
	}
	const closeSideEditor = () => {
		setSideEditor(false)
	}
	const handleSaveAnnotation = async () => {
		setIsLoading(true)
		const content = currentContent
		content.settings.annotationDocument = [...allEvents]
		await updateContent(content)
		await handleSaveSubtitles()
		deleteSubtitles(subLayersToDelete)
		setSubLayersToDelete([])
		setIsLoading(false)
		setBlock(false)
	}
	const handleSaveSubtitles = async() => {
		const rawSubs = subtitles
		createSub(rawSubs)
	}

	const handleZoomChange = (e, d) => {
		toggleTip()
		if(d.x < zoomFactor){
			if(d.x === 0){
				setZoomFactor(0)
				setWidth(0)
				handleScrollFactor(0)
			} else {
				setZoomFactor(d.x)
				setWidth(-(Math.abs(zoomFactor - d.x) * videoLength / 10))
			}
		} else if(d.x > zoomFactor) {
			setZoomFactor(d.x)
			setWidth(Math.abs(zoomFactor - d.x) * videoLength / 10)
		}
		handleScrollFactor(videoCurrentTime * .95 / videoLength, true)
	}

	const handleScrollFactor = (direction, zoom) => {
		if(document.getElementsByClassName(`layer-container`) !== undefined){
			const scrubber = document.getElementById(`time-bar`)
			const scrubberShadow = document.getElementById(`time-bar-shadow`)
			const timeIndicator = document.getElementById(`time-indicator-container`)
			const allLayers = Array.from(document.getElementsByClassName(`layer-container`))
			const currentLayerWidth = document.getElementsByClassName(`events`)[0].clientWidth

			if(!zoom){
				scrubber.scrollLeft = scrubber.scrollLeft + currentLayerWidth * direction
				timeIndicator.scrollLeft = timeIndicator.scrollLeft + currentLayerWidth * direction

				allLayers.forEach((element, i) => {
					allLayers[i].scrollLeft = allLayers[i].scrollLeft + currentLayerWidth * direction
				})
			} else {
				scrubber.scrollLeft = currentLayerWidth * direction
				timeIndicator.scrollLeft = currentLayerWidth * direction

				allLayers.forEach((element, i) => {
					allLayers[i].scrollLeft = currentLayerWidth * direction
				})
			}
		}
	}

	const updateSubs = (index, sub, subLayerIndex, side, type) => {
		const tempSubs = [...subtitles]
		const currentSubs = tempSubs[subLayerIndex]
		let needCheck = true
		let input = ``

		try {
			if(side === `beg`) {
				input = sub.start
				if(sub.start.match(/^\d{1,2}:\d{1,2}.?\d{0,2}$/) || sub.start.match(/\d{1}:\d{1,2}:\d{1,2}.?\d{0,2}/) || type === `onBlur`)
					sub.start = convertToSeconds(sub.start, videoLength)
				else {
					document.getElementById(`subStart${index}`).style.border=`2px solid red`
					needCheck = false
				}
			} else {
				input = sub.end
				if(sub.end.match(/^\d{1,2}:\d{1,2}.?\d{0,2}$/) || sub.end.match(/\d{1}:\d{1,2}:\d{1,2}.?\d{0,2}/) || type === `onBlur`)
					sub.end = convertToSeconds(sub.end, videoLength)
				else {
					document.getElementById(`subEnd${index}`).style.border=`2px solid red`
					needCheck = false
				}
			}
		} catch (e) {
			console.error(`updateSubs error`)
		}

		if(side===`beg` && needCheck === true) {
			if(sub.start===``){
				document.getElementById(`subStart${index}`).style.border=`2px solid red`
				needCheck=false
			} else {
				if(sub.start < 0) {
					document.getElementById(`subStart${index}`).style.border=`2px solid red`
					needCheck=false
				} else if(sub.start >= videoLength) {
					document.getElementById(`subStart${index}`).style.border=`2px solid red`
					needCheck=false
				} else if(sub.start >= sub.end) {
					document.getElementById(`subStart${index}`).style.border=`2px solid red`
					needCheck=false
				} else {
					if(index !==0) {
						if(sub.start < tempSubs[subLayerIndex][`content`][index-1].end){
							document.getElementById(`subStart${index}`).style.border=`2px solid red`
							needCheck=false
						}
					}
				}
			}
		} else if(side===`end` && needCheck === true) {
			// check end
			if(sub.end===``) {
				document.getElementById(`subEnd${index}`).style.border=`2px solid red`
				needCheck=false
			} else {
				if(needCheck ===true) {
					if(sub.end < 0){
						document.getElementById(`subEnd${index}`).style.border=`2px solid red`
						document.getElementById(`subStart${index}`).style.border=``
						needCheck=false
					} else if(sub.end >= videoLength) {
						document.getElementById(`subEnd${index}`).style.border=`2px solid red`
						document.getElementById(`subStart${index}`).style.border=``
						needCheck=false
					} else if(sub.end <= sub.start){
						document.getElementById(`subEnd${index}`).style.border=`2px solid red`
						document.getElementById(`subStart${index}`).style.border=``
						needCheck=false
					} else {
						if(index !== tempSubs[subLayerIndex][`content`].length-1) {
							if(sub.end > tempSubs[subLayerIndex][`content`][index+1].start){
								document.getElementById(`subEnd${index}`).style.border=`2px solid red`
								document.getElementById(`subStart${index}`).style.border=``
								needCheck=false
							}
						}
					}
				}
			}
		}

		if(needCheck){
			const updateSub = {sub, side}
			checkSubError(tempSubs, `update`, index, updateSub)
		} else
			setDisableSave(true)

		if(side === `beg`) {
			if((input.match(/\d{2}:\d{2}\.\d{2}/) === null || input.match(/\d{1}:\d{2}:\d{2}\.?\d{2}/) === null ) && type !== `onBlur`)
				sub.start = input

		} else if(side === `end`) {
			if((input.match(/\d{2}:\d{2}\.\d{2}/) === null || input.match(/\d{1}:\d{2}:\d{2}\.?\d{2}/) === null ) && type !== `onBlur`)
				sub.end = input
		}

		currentSubs[`content`][index] = sub
		tempSubs[subLayerIndex] = currentSubs

		setSubs(tempSubs)
		setAllSubs(tempSubs)
		setSubChanges(subChanges+1)
		setSubToEdit(index)
		setSubLayerToEdit(subLayerIndex)
		activeUpdate(subLayerIndex)
		setSubSelected(true)
		setBlock(true)
	}

	const addSubToLayer = (index, subIndex, position) => {
		const currentSubs = [...subtitles]
		let newSub = {}
		let subStart = 0
		let subEnd = 0
		let isError = false
		const addingTime = 2

		try{
			if(currentSubs[index][`content`].length ===0){
				newSub = {
					start: 0,
					end: addingTime,
					text: ``,
				}

				currentSubs[index][`content`].push(newSub)
				setSubToEdit(0)
			} else {
				if(position === `top`) {
					if(currentSubs[index][`content`][subIndex].start <= 0)
						isError = true
					else {
						if(currentSubs[index][`content`][subIndex].start <= 2) {
							subStart = 0
							subEnd = currentSubs[index][`content`][subIndex].start
						} else {
							subStart = currentSubs[index][`content`][subIndex].start - addingTime
							subEnd = currentSubs[index][`content`][subIndex].start
						}
					}

					newSub = {
						start: subStart,
						end: subEnd,
						text: ``,
					}
					if(!isError) {
						setSubToEdit(0)
						currentSubs[index][`content`].unshift(newSub)
					}

				} else {
					if(subIndex !== currentSubs[index][`content`].length-1) {
						const curEndTime = currentSubs[index][`content`][subIndex].end
						const nextStartTime = currentSubs[index][`content`][subIndex+1].start

						if(curEndTime === nextStartTime)
							isError = true
						else if(nextStartTime-curEndTime > addingTime){
							subStart = currentSubs[index][`content`][subIndex].end
							subEnd = currentSubs[index][`content`][subIndex].end + addingTime
						} else {
							subStart = currentSubs[index][`content`][subIndex].end
							subEnd = currentSubs[index][`content`][subIndex+1].start
						}
						newSub = {
							start: subStart,
							end: subEnd,
							text: ``,
						}
						if(!isError)
							currentSubs[index][`content`].splice(subIndex+1, 0, newSub)

					} else {
						const curEndTime = currentSubs[index][`content`][subIndex].end

						if(curEndTime >= videoLength)
							isError = true
						else if(curEndTime+addingTime >= videoLength){
							subStart = currentSubs[index][`content`][subIndex].end
							subEnd = videoLength
						} else {
							subStart = currentSubs[index][`content`][subIndex].end
							subEnd = currentSubs[index][`content`][subIndex].end + addingTime
						}

						newSub = {
							start: subStart,
							end: subEnd,
							text: ``,
						}
						if(!isError) {
							setSubToEdit(subIndex+1)
							currentSubs[index][`content`].push(newSub)
							setSubToEdit(subIndex+1)
							scrollToMyRef()
						}
					}
				}
			}

			setSubLayerToEdit(index)
			activeUpdate(index)
			setSubs(currentSubs)
			setAllSubs(currentSubs)
			setBlock(true)
		}catch(error) {
			alert(`there was an error adding the subtitle`)
			console.error(error)
		}

	}
	const handleAddSubLayer = () => {
		if (subtitles === [] || !subtitles){
			const tempSubList = []
			const tempSub = {
				title : ``,
				language: ``,
				content: [{start: 0, end: 2, text: ``}],
				id: ``,
			}
			tempSubList.push(tempSub)
			setSubs(tempSubList)
			setAllSubs(tempSubList)
		}else {
			const tempSubList = [...subtitles]
			const tempSub = {
				title : ``,
				language: ``,
				content: [{start: 0, end: 2, text: ``}],
				id: ``,
			}
			tempSubList.push(tempSub)
			setSubs(tempSubList)
			setAllSubs(tempSubList)
		}
		openSubEditor(subtitles.length, 0)
		setSideEditor(true)
		setSubModalVisible(false)
		setSubModalMode(``)
		setBlock(true)
	}
	const handleAddSubLayerFromFile = (url) => {
		try{
			const reader = new FileReader()
			reader.onload = (e) =>{
				const temp = Subtitle.parse(e.target.result)
				for (let i = 0; i < temp.length; i++){
					temp[i].start = temp[i].start /1000/videoLength * 100
					temp[i].end = temp[i].end /1000/videoLength * 100
				}
				let removeArray = 0
				const filtered = temp.filter(item => {
					if(item.start > 100){
						removeArray++
					}
					return item.start < 100
				})
				const filtered1 = filtered.filter(item => {
					if(item.end > 100){
						removeArray++
					}
					return item.end < 100
				})
				if (removeArray > 0)
					alert(`Some subtitles had to be cut because the subtitles are longer than the video`)
				if (subtitles === [] || !subtitles){
					const tempSubList = []
					const tempSub = {
						title : ``,
						language: ``,
						content: filtered1,
						id: ``,
						type: ``,
					}
					tempSubList.push(tempSub)
					setSubs(tempSubList)
					setAllSubs(tempSubList)
				}else {
					const tempSubList = [...subtitles]
					const tempSub = {
						title : ``,
						language: ``,
						content: filtered1,
						id: ``,
						type: ``,
					}
					tempSubList.push(tempSub)
					setSubs(tempSubList)
					setAllSubs(tempSubList)

				}
				setSideEditor(false)
				setSubModalVisible(false)
				setSubModalMode(``)
				openSubEditor(subtitles.length, 0)
				setBlock(true)
			}
			reader.readAsText(url)
		}catch(error){
			console.log(error)
			alert(`There was an error importing subtitles`)
		}
		setSubModalVisible(false)
		setSubModalMode(``)

	}
	const handleDeleteSubLayer = () =>{
		setSubModalVisible(false)

		const index = subLayerToEdit
		closeSideEditor()
		setSideEditor(false)
		const tempSubs = [...subtitles]
		if (tempSubs[index][`id`] !== `` && tempSubs[index][`id`] !== undefined){
			const deleteSub = subLayersToDelete
			deleteSub.push(tempSubs[index][`id`])
			setSubLayersToDelete(deleteSub)
		}
		tempSubs.splice(index, 1)
		setSubs(tempSubs)
		setAllSubs(tempSubs)
		setBlock(true)
	}
	const updateSubLayerTitle = (title, fun) =>{
		if(fun === `onKeyPress`)
			setIsEdit(false)

		const temp = [...subtitles]
		temp[subLayerToEdit][`title`] = title
		setSubs(temp)
		setAllSubs(temp)
		setBlock(true)
	}
	const checkSub = () => {
		if(subLayerToEdit === subtitles[subLayerToEdit].length-1)
			return subtitles[0][`content`][0]
		else
			return subtitles[subLayerToEdit][`content`][subToEdit]

	}
	const handleChangeSubIndex = (index,subLayer) =>{
		setSubToEdit(index)
		setFocus(false)
	}
	const handleEditSubTitle = (index) => {
		setIsEdit(true)
		setSubLayerToEdit(index)
	}
	const handleFocus = (index) => {
		setSubLayerToEdit(index)
		openSubEditor(index, 0)
	}
	const checkSubError = (subs, checking, index, updateSub) => {
		let disable = true
		for (let i = 0; i < subs[subLayerToEdit][`content`].length; i++) {
			let checkError = false
			let curStart = 0
			let curEnd = 0
			let nextStart = 0
			if(checking===`update` && i===index) {
				if(updateSub.side ===`beg`) {
					curStart = updateSub.sub.start
					curEnd = subs[subLayerToEdit][`content`][i].end
				} else {
					curStart =subs[subLayerToEdit][`content`][i].start
					curEnd = updateSub.sub.end
				}
			} else {
				curStart =subs[subLayerToEdit][`content`][i].start
				curEnd = subs[subLayerToEdit][`content`][i].end
			}

			if(curStart > curEnd || curStart < 0 || curStart >= videoLength || curEnd<=0 || curEnd>videoLength) {
				checkError = true
				disable = false
				if(checking===`delete` && i>=index) {
					if(	document.getElementById(`subStart${i+1}`).style.border===`2px solid red`) {
						document.getElementById(`subStart${i}`).style.border=`2px solid red`
						document.getElementById(`subStart${i+1}`).style.border=``
					} else if(document.getElementById(`subEnd${i+1}`).style.border===`2px solid red`) {
						document.getElementById(`subEnd${i}`).style.border=`2px solid red`
						document.getElementById(`subEnd${i+1}`).style.border=``
					}
				}
			} else if(i !== subs[subLayerToEdit][`content`].length-1){
				if(i===index-1 && checking===`update`)
					nextStart = updateSub.sub.start
				else
					nextStart = subs[subLayerToEdit][`content`][i+1].start

				if(curEnd > nextStart) {
					checkError = true
					disable = false
					if(checking===`delete` && i>=index) {
						if(	document.getElementById(`subEnd${i+1}`).style.border===`2px solid red`) {
							document.getElementById(`subEnd${i}`).style.border=`2px solid red`
							document.getElementById(`subEnd${i+1}`).style.border=``
						} else if(	document.getElementById(`subStart${i+1}`).style.border===`2px solid red`) {
							document.getElementById(`subStart${i}`).style.border=`2px solid red`
							document.getElementById(`subStart${i+1}`).style.border=``
						} else if(i === subs[subLayerToEdit][`content`].length-2)
							document.getElementById(`subStart${i+1}`).style.border=`2px solid red`
					}
				}
			}
			if(!checkError) {
				if(document.getElementById(`subStart${i}`) && document.getElementById(`subStart${i}`).style){
					document.getElementById(`subStart${i}`).style.border=``
					document.getElementById(`subEnd${i}`).style.border=``
				}
				setDisableSave(false)
			}
		}
		if(!disable)
			setDisableSave(true)

	}
	const scrollToMyRef = () => {
		setTimeout(() => {
			const scroll = scrollRef.current.scrollHeight - scrollRef.current.clientHeight
			scrollRef.current.scrollTo(0, scroll)
		}, 50)
	}

	return (
		<Style>
			<span style={{ zIndex: 0 }}>
				<VideoContainer
					className='video'
					url={props.viewstate.url}
					getDuration={getVideoDuration}
					getVideoTime={setCurrentTime} // set current time
					setActiveCensorPosition = {setActiveCensorPosition}
					handleLastClick = {null}
					handleScroll = {handleScrollFactor}
					events = {allEvents}
					updateEvents={null}
					eventToEdit={null}
					activeCensorPosition = {activeCensorPosition}
					editorType={`subtitle`}
				>
				</VideoContainer>
				<SubtitlesModal
					mode = {subModalMode}
					handleAddSubLayer = {handleAddSubLayer}
					handleAddSubLayerFromFile = {handleAddSubLayerFromFile}
					visible = {subModalVisible}
					setModalVisible = {setSubModalVisible}
					handleDeleteSubLayer={handleDeleteSubLayer}
					deleteTitle={deleteTitle}
				/>
				<Timeline minimized={timelineMinimized} zoom={scrollBarWidth}>

					<section>
						<div className='event-layers'>
							{subtitles.map((sub, index) => (
								<div className={`layer`} key={index}>
									<div className={`handle`}>
										<div className={`handleFocus`} onClick={()=>handleFocus(index)}>
											<SubtitlesCard
												title={sub.title !== `` ? sub.title : isEdit ? `` : `No Language`}
												updateTitle={updateSubLayerTitle}
												isEdit={isEdit}
												subLayer={subLayerToEdit}
												index={index}
											/>
											{
												subLayerToEdit === index && isEdit ?
													<Icon className={`saveIcon`} src={saveIcon} onClick={() => setIsEdit(false)}></Icon>
													:
													<Icon className={`editIcon`} src={editIcon} onClick={() => handleEditSubTitle(index)}></Icon>
											}
										</div>
										<Icon className={`trashIcon`} src={trashIcon} onClick={()=>{
											setSubModalVisible(true)
											setSubModalMode(`delete`)
											setDeleteTitle(sub.title !== `` ? sub.title : `No Language`)
											setSubLayerToEdit(index)
										}}/>
									</div>
									<SubtitlesLayer
										videoLength={videoLength}
										minimized={eventListMinimized}
										width={layerWidth}
										subs={sub[`content`]}
										activeEvent={subToEdit}
										layer={index}
										index={subToEdit}
										sideEditor={openSubEditor}
										updateSubs={updateSubs}
										closeEditor={closeSideEditor}
										displayLayer={subLayerToEdit}
									/>
								</div>
							))}
							<div style={{color:`#ffffff`,backgroundColor:`#0582ca`,borderRadius:`0.6rem`,width:`130px`, margin:`10px`,textAlign:`center`,padding:`5px`,cursor:`pointer`}} className={`setSubModalVisible`} onClick={()=>{
								setSubModalVisible(true)
								setSubModalMode(`create`)
								}}>
								<p id={`editIcon`} style={{fontWeight:700}}>Add Subtitle Track +</p>
							</div>
						</div>

					</section>
					<div className='zoom-controls'>
						{/* ADD ZOOM ICON */}
						<div className='zoom-factor' id="zoom-factor">
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

			<EventList minimized={eventListMinimized}>
				<header>
					{/* <img alt={`helpIcon`} src={helpIcon} onClick={handleShowHelp} style={{marginLeft:10,marginTop:15}}/> */}
					<div className={`save`}>
						{disableSave ?
							<button className={`disable`}>
								<span>Save</span>
							</button>
							:
							<button onClick={handleSaveAnnotation}>
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

				<>
					{ showSideEditor !== false && (
						<SubtitleEditorSideMenu
							singleEvent={checkSub}
							index={subToEdit}
							videoLength={videoLength}
							closeSideEditor={closeSideEditor}
							updateSubs={updateSubs}
							subs={subtitles}
							changeSubIndex={handleChangeSubIndex}
							addSub={addSubToLayer}
							subLayer={subLayerToEdit}
							deleteSub = {deleteSub}
							focus={focus}
							disableSave={disableSave}
							scrollRef={scrollRef}
							handleShowTip={handleShowTip}
							toggleTip={toggleTip}
						></SubtitleEditorSideMenu>
					) }
				</>
			</EventList>
			<>
				<Prompt
					when={blockLeave}
					message='If you leave you will lose all your changes. Are you sure to leave without saving?'
				/>
			</>
		</Style>
	)
}

export default SubtitleEditor
