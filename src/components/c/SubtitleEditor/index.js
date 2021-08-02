import React, { useState, useEffect, useRef } from 'react'
import { Prompt } from 'react-router'
import Style, { Timeline, EventList, Icon } from './styles'
import { DndProvider } from 'react-dnd'
import { Rnd } from 'react-rnd'
import Backend from 'react-dnd-html5-backend'
import * as Subtitle from 'subtitle'
import { SubtitleEditorSideMenu, SubtitlesCard, SubtitlesLayer, SubtitlesModal } from 'components/bits'
import { Controller } from 'components'

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
		setScrollWidth(document.getElementsByClassName(`zoom-scroll-container`)[0].clientWidth)
		function handleResize() {
			setZoomFactor(0)
			setWidth(0)
			setTimeout(() => {
				setDimensions({
					height: window.innerHeight,
					width: window.innerWidth,
				})
			}, 500)
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
	const updateSubs = (index, sub, subLayerIndex, side) => {
		const tempSubs = [...subtitles]
		const currentSubs = tempSubs[subLayerIndex]

		let needCheck = true
		const subStartTime = (sub.start/100 * videoLength).toFixed(0)
		const subEndTime = (sub.end/100 * videoLength).toFixed(0)
		if(side===`beg`) {
			if(sub.start===``){
				document.getElementById(`subStart${index}`).style.border=`2px solid red`
				needCheck=false
			} else {
				if(sub.start < 0) {
					document.getElementById(`subStart${index}`).style.border=`2px solid red`
					needCheck=false
				} else if(sub.start >= 100) {
					document.getElementById(`subStart${index}`).style.border=`2px solid red`
					needCheck=false
				// document.getElementById(`sideTabExplanation`).innerHTML=`Start time cannot be larger than videoLength:${videoLength} <br/> Changed values to match criteria`
				} else if(Number(subStartTime) >= Number(subEndTime)) {
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
		} else if(side===`end`) {
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
					} else if(sub.end > 100) {
						document.getElementById(`subEnd${index}`).style.border=`2px solid red`
						document.getElementById(`subStart${index}`).style.border=``
						needCheck=false
						// document.getElementById(`sideTabExplanation`).innerHTML=`Start time cannot be larger than videoLength:${videoLength} <br/> Changed values to match criteria`
					} else if(Number(sub.end/100 * videoLength).toFixed(0) <= Number((sub.start/100 * videoLength).toFixed(0))){
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
		// TODO: Change this to use real JS event objects and insert based on time
		const currentSubs = [...subtitles]
		let newSub = {}
		let subStart = 0
		let subEnd = 0
		let isError = false
		const addingTime = 2/videoLength*100

		try{
			if(currentSubs[index][`content`].length ===0){
				newSub = {
					start: 0,
					end: addingTime,
					text: ``,
				}

				currentSubs[index][`content`].push(newSub)
				// openSubEditor(index, subIndex)
				setSubToEdit(0)
			} else {
				if(position === `top`) {
					if(currentSubs[index][`content`][subIndex].start <= 0)
						isError = true
					else {
						if(currentSubs[index][`content`][subIndex].start <= 2/videoLength*100) {
							subStart = 0
							subEnd = currentSubs[index][`content`][subIndex].start - 0.001
						} else {
							subStart = currentSubs[index][`content`][subIndex].start - addingTime
							subEnd = currentSubs[index][`content`][subIndex].start - 0.001
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

						if(curEndTime === nextStartTime || curEndTime === nextStartTime+0.001)
							isError = true
						else if(nextStartTime-curEndTime > addingTime){
							subStart = currentSubs[index][`content`][subIndex].end + 0.001
							subEnd = currentSubs[index][`content`][subIndex].end + 0.001 + addingTime
						} else {
							subStart = currentSubs[index][`content`][subIndex].end + 0.001
							subEnd = currentSubs[index][`content`][subIndex+1].start - 0.001
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

						if(curEndTime === 100 || curEndTime === 100.001)
							isError = true
						else if(curEndTime+addingTime>100){
							subStart = currentSubs[index][`content`][subIndex].end + 0.001
							subEnd = 100
						} else {
							subStart = currentSubs[index][`content`][subIndex].end + 0.001
							subEnd = currentSubs[index][`content`][subIndex].end + 0.001 + addingTime
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
				content: [{start: 0, end: 2/videoLength*100, text: ``}],
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
				content: [{start: 0, end: 2/videoLength*100, text: ``}],
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
				console.log(temp)
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

			if(curStart > curEnd || curStart < 0 || curStart >= 100 || curEnd<=0 || curEnd>100) {
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
				document.getElementById(`subStart${i}`).style.border=``
				document.getElementById(`subEnd${i}`).style.border=``
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
			<DndProvider backend={Backend}>
				<SubtitlesModal
					mode = {subModalMode}
					handleAddSubLayer = {handleAddSubLayer}
					handleAddSubLayerFromFile = {handleAddSubLayerFromFile}
					visible = {subModalVisible}
					setModalVisible = {setSubModalVisible}
					handleDeleteSubLayer={handleDeleteSubLayer}
					deleteTitle={deleteTitle}
				/>
				<span style={{ zIndex: 0 }}>

					<Controller ref = {controllerRef}
						className='video'
						url={props.viewstate.url}
						getDuration={getVideoDuration}
						getVideoTime={setCurrentTime}
						minimized={timelineMinimized}
						setActiveCensorPosition = {setActiveCensorPosition}
						editorType={`subtitle`}
					>
					</Controller>
					<Timeline minimized={timelineMinimized} zoom={scrollBarWidth}>

						<section>
							<div className='event-layers'>
								{subtitles.map((sub, index) => (
									<div className={`layer`} key={index}>
										<div className={`handle`}>
											<div className={`handleFocus`} onClick={()=>handleFocus(index)}>
												<SubtitlesCard
													title={sub.title !== `` ? sub.title : isEdit ? `` : `No Title`}
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
												setDeleteTitle(sub.title !== `` ? sub.title : `No Title`)
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
								))
								}
								<div style={{color:`#ffffff`,backgroundColor:`#0582ca`,borderRadius:`0.6rem`,width:`130px`, margin:`10px`,textAlign:`center`,padding:`5px`,cursor:`pointer`}} className={`setSubModalVisible`} onClick={()=>{
									setSubModalVisible(true)
									setSubModalMode(`create`)
								}}>
									<p id={`editIcon`} style={{fontWeight:700}}>Add Subtitle Track +</p>
								</div>
								<br/><br/><br/><br/><br/><br/><br/>
							</div>

						</section>
						<div className='zoom-controls'>
							{/* ADD ZOOM ICON */}
							<div className='zoom-factor' style={{ visibility: `${timelineMinimized ? ` hidden` : `initial`}`}}>
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
							<div className='zoom-scroll' style={{ visibility: `${timelineMinimized ? ` hidden` : `initial`}`}}>

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
								<div id={`time-indicator-container`}>
									<div id={`layer-time-indicator`}>
										<span id={`layer-time-indicator-line`}></span>
									</div>
								</div>
							</div>
						</div>
					</Timeline>
				</span>

				<EventList minimized={eventListMinimized}>
					<header>
						<img alt={`helpIcon`} src={helpIcon} onClick={handleShowHelp} style={{marginLeft:10,marginTop:15}}/>
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
							></SubtitleEditorSideMenu>
						) }
					</>
				</EventList>
			</DndProvider>
			<>
				<Prompt
					when={blockLeave}
					message='Have you saved your changes already?'
				/>
			</>
		</Style>
	)
}

export default SubtitleEditor
