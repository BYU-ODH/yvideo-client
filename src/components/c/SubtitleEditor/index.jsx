import React, { useState, useEffect, useRef } from 'react'
// import { Prompt } from 'react-router'
import Style, { Timeline, EventList, Icon, PlusIcon } from './styles'
import { Rnd } from 'react-rnd'
import { SubtitleEditorSideMenu, SubtitlesCard, SubtitlesLayer, SwitchToggle } from 'components/bits'
// import * as Subtitle from 'subtitle'
import {parse} from 'subtitle'

import {useCallbackPrompt} from '../../../hooks/useCallbackPrompt'
import { VideoContainer, SkipLayer } from 'components'
import { convertToSeconds } from '../../common/timeConversion'
import { handleScrollFactor, debouncedOnDrag, handleZoomEandD, getParameters } from '../../common/editorCommon'

// ICONS FOR THE EVENTS CAN BE FOUND AT https://feathericons.com/
// TRASH ICON COLOR IS: #eb6e79. OTHER ICON STROKES ARE LIGHT BLUE VAR IN CSS: #0582ca
import trashIcon from 'assets/trash_icon.svg'
import editIcon from 'assets/ca_tracks_edit.svg'
import saveIcon from 'assets/check.svg'
import zoomIn from 'assets/te-zoom-in.svg'
import zoomOut from 'assets/te-zoom-out.svg'
import helpIcon from 'assets/te-help-circle-white.svg'

const SubtitleEditor = props => {
	const { setEvents, updateContent, createSub, setAllSubs, activeUpdate, deleteSubtitles } = props

	const {
		eventsArray,
		currentContent,
		subs,
		aspectRatio,
		showSideEditor,
	} = props.viewstate

	const { handleShowTip, toggleTip, handleShowHelp, openSubModal, setSideEditor, handleNavigation } = props.handlers
	const layers = [{0: `Skip`}]

	const [elapsed, setElapsed] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [allEvents, setAllEvents] = useState(eventsArray)
	const [blockLeave, setBlock] = useState(false)
	const [videoLength, setVideoLength] = useState(0)
	const [videoCurrentTime, setCurrentTime] = useState(0)
	// eslint-disable-next-line no-unused-vars
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [eventListMinimized, setEventListMinimized] = useState(false)
	const [isReady, setIsReady] = useState(false)
	const [layerWidth, setWidth] = useState(0)
	const [zoomFactor, setZoomFactor] = useState(0) // eslint-disable-line no-unused-vars
	const [scrollBarWidth, setScrollBar] = useState(0)
	const [subtitles, setSubs] = useState(subs)
	const [subToEdit, setSubToEdit] = useState(0)
	const [subLayerToEdit, setSubLayerToEdit] = useState(0)
	const [subLayersToDelete, setSubLayersToDelete] = useState([])
	const [subChanges, setSubChanges] = useState(0)
	const [activeCensorPosition, setActiveCensorPosition] = useState(-1)
	const [focus, setFocus] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [disableSave, setDisableSave] = useState(false)
	const [allowEvents, setAllowEvents] = useState(true)
	const [scrollSub, setScrollSub] = useState(null)
	const [eventSeek, setEventSeek] = useState(false)
	const [eventPosition, setEventPosition] = useState(0)
	const [newSub, setNewSub] = useState({trueFalse: false, index: null})
	const [invalidSubs, setInvalidSubs] = useState([])
	const [showPrompt, confirmNavigation, cancelNavigation] =
		useCallbackPrompt(blockLeave)
	const [isNameUnique, setIsNameUnique] = useState(false)
	const [titleNameRequired, setTitleNameRequired] = useState(false)
	const [titleName, seTititleName] = useState(``)
	// refs
	const scrollRef = useRef()

	useEffect(() => {
		if (showPrompt)
			handleNavigation(confirmNavigation, cancelNavigation)
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showPrompt])

	useEffect(() => {
		const handleResize = () => {
			setZoomFactor(0)
			setWidth(0)
			setZoomFactor(1)
			setWidth(1)
		}
		window.addEventListener(`resize`, handleResize)
		setAllEvents(eventsArray)
		getParameters(videoLength, setWidth, videoCurrentTime, setScrollBar, document.getElementsByClassName(`events-box`))

		let largestLayer = 0

		// SORTING THE ARRAYS TO HAVE A BETTER WAY TO HANDLE THE EVENTS
		if(eventsArray?.length > 0){
			eventsArray.sort((a, b) => a.layer > b.layer ? 1 : -1)
			largestLayer = eventsArray[eventsArray.length - 1].layer
		}
		// Find the largest layer number
		const initialLayers = []

		for(let i = 0; i < largestLayer + 1; i++)
			initialLayers.push([i])

		setEvents(allEvents)
		if(subtitles[0] && !showSideEditor){
			if(subtitles[0].content[0])
				openSubEditor(0, 0)
		}
		if(document.getElementById(`blankContainer`))
			document.getElementById(`blankContainer`).style.width = `100%`

		handleNewSub()
		handleInvalidSubs()

		if(blockLeave)
			window.onbeforeunload = () => true
		else
			window.onbeforeunload = undefined

		return () => {
			window.onbeforeunload = undefined
			document.onmousedown = null
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventsArray, blockLeave, isEdit, subtitles, subLayerToEdit, invalidSubs])
	// end of useEffect

	const getVideoDuration = (duration) => {
		setVideoLength(duration)
		const tempSubs = subs
		for (let i = 0; i < tempSubs.length; i++){
			try {
				tempSubs[i].content = JSON.parse(tempSubs[i].content)
			} catch (e){
				tempSubs[i].content = []
			}
		}

		setSubs(tempSubs)
		setAllSubs(tempSubs)
	}
	const deleteSub = (index) => {
		const currentSubs = [...subtitles]
		currentSubs[subLayerToEdit].content.splice(index, 1)
		setSubs(currentSubs)
		setAllSubs(currentSubs)

		if(currentSubs[subLayerToEdit].content.length === 0 || currentSubs[subLayerToEdit].content.length === 1)
			setSubToEdit(0)
		else if(currentSubs[subLayerToEdit].content.length === index)
			setSubToEdit(index - 1)
		else
			setSubToEdit(index)

		checkSubError(currentSubs, `delete`, index)
		setBlock(true)
	}
	const openSubEditor = (layerIndex, subIndex) => {
		setSubToEdit(subIndex)
		setSubLayerToEdit(layerIndex)
		activeUpdate(layerIndex)
		setSideEditor(true)
		const active = document.getElementById(`sub-${layerIndex}-${subIndex}`)
		const allSubsContainer = document.getElementById(`allSubs`)
		if(active)
			allSubsContainer.scrollTop = active.offsetTop - allSubsContainer.offsetHeight * 0.5

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

	const updateSubs = (index, sub, subLayerIndex, side, type, trackId) => {
		const tempSubs = [...subtitles]
		const currentSubs = tempSubs[subLayerIndex]
		let needCheck = true
		try {
			if(side === `beg`) {
				if(sub.start.match(/^\d{2}:\d{2}\.\d{2}/) !== null || sub.start.match(/^\d{1}:\d{2}:\d{2}\.\d{2}/) !== null || type === `onBlur`){
					sub.start = convertToSeconds(sub.start, videoLength)
					if(invalidSubs.length > 0) {
						invalidSubs.forEach(invalidSub => {
							if(invalidSub.trackId === trackId && invalidSub.index === index)
								invalidSub.invalidParts.start = false
						})
					}
				} else {
					needCheck = false

					let newNeeded = false
					if(invalidSubs.length > 0) {
						invalidSubs.forEach(invalidSub => {
							if(invalidSub.trackId === trackId && invalidSub.index === index) {
								invalidSub.invalidParts.start = true
								newNeeded = false
							} else
								newNeeded = true
						})
						if(newNeeded)
							setInvalidSubs([...invalidSubs, {trackId: currentSubs.id, index, invalidParts: {start: true, end: false, text: false}}])
					} else
						setInvalidSubs([{trackId: currentSubs.id, index, invalidParts: {start: true, end: false, text: false}}])
				}
			} else if(side === `end`) {
				if(sub.end.match(/^\d{2}:\d{2}\.\d{2}/) !== null || sub.end.match(/^\d{1}:\d{2}:\d{2}\.\d{2}/) !== null || type === `onBlur`){
					sub.end = convertToSeconds(sub.end, videoLength)
					if(invalidSubs.length > 0) {
						invalidSubs.forEach(invalidSub => {
							if(invalidSub.trackId === trackId && invalidSub.index === index)
								invalidSub.invalidParts.end = false
						})
					}
				} else {
					needCheck = false

					let newNeeded = false
					if(invalidSubs.length > 0) {
						invalidSubs.forEach(invalidSub => {
							if(invalidSub.trackId === trackId && invalidSub.index === index) {
								invalidSub.invalidParts.end = true
								newNeeded = false
							} else
								newNeeded = true
						})
						if(newNeeded)
							setInvalidSubs([...invalidSubs, {trackId: currentSubs.id, index, invalidParts: {start: false, end: true, text: false}}])
					} else
						setInvalidSubs([{trackId: currentSubs.id, index, invalidParts: {start: false, end: true, text: false}}])
				}
			}
			if(sub.text !== `` || undefined || null) {
				if(invalidSubs.length > 0) {
					invalidSubs.forEach(invalidSub => {
						if(invalidSub.trackId === trackId && invalidSub.index === index)
							invalidSub.invalidParts.text = false
					})
				}
			} else {
				needCheck = false

				let newNeeded = false
				if(invalidSubs.length > 0) {
					invalidSubs.forEach(invalidSub => {
						if(invalidSub.trackId === trackId && invalidSub.index === index) {
							invalidSub.invalidParts.text = true
							newNeeded = false
						} else
							newNeeded = true
					})
					if(newNeeded)
						setInvalidSubs([...invalidSubs, {trackId: currentSubs.id, index, invalidParts: {start: false, end: false, text: true}}])
				} else
					setInvalidSubs([{trackId: currentSubs.id, index, invalidParts: {start: false, end: false, text: true}}])
			}

		} catch (e) {
			console.error(`updateSubs error`, e) // eslint-disable-line no-console
		}
		if(side === `beg` && needCheck === true) {
			// check start
			let match = false
			let newNeeded = true
			let error = false

			if(sub.start === ``)
				error = true
			else {
				if(sub.start < 0)
					error = true
				else if(sub.start >= videoLength)
					error = true
				else if(sub.start >= sub.end)
					error = true
				else {
					if(index !== 0) {
						if(sub.start < tempSubs[subLayerIndex].content[index - 1].end)
							error = true
					}
				}
			}
			invalidSubs.forEach(invalidSub => {
				if(invalidSub.trackId === trackId && invalidSub.index === index) {
					match = true
					newNeeded = false
				} else
					newNeeded = true
				if(error && match)
					invalidSub.invalidParts.start = true
			})
			if(newNeeded && error)
				setInvalidSubs([...invalidSubs, {trackId: currentSubs.id, index, invalidParts: {start: true, end: false, text: false}}])
		} else if(side === `end` && needCheck === true) {
			// check end
			let match = false
			let newNeeded = true
			let error = false

			if(sub.end === ``)
				error = true
			else {
				if(sub.end < 0)
					error = true
				else if(sub.end >= videoLength)
					error = true
				else if(sub.end <= sub.start)
					error = true
				else {
					if(index !== tempSubs[subLayerIndex].content.length - 1) {
						if(sub.end > tempSubs[subLayerIndex].content[index + 1].start)
							error = true
					}
				}
			}

			invalidSubs.forEach(invalidSub => {
				if(invalidSub.trackId === trackId && invalidSub.index === index) {
					match = true
					newNeeded = false
				} else
					newNeeded = true

				if(error && match)
					invalidSub.invalidParts.end = true
			})
			if(newNeeded && error)
				setInvalidSubs([...invalidSubs, {trackId: currentSubs.id, index, invalidParts: {start: false, end: true, text: false}}])
		}

		currentSubs.content[index] = sub
		tempSubs[subLayerIndex] = currentSubs

		setSubs(tempSubs)
		setAllSubs(tempSubs)
		setSubChanges(subChanges + 1)
		setSubToEdit(index)
		setSubLayerToEdit(subLayerIndex)
		activeUpdate(subLayerIndex)
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
			if(currentSubs[index].content.length === 0){
				newSub = {
					start: 0,
					end: addingTime,
					text: ``,
				}

				currentSubs[index].content.push(newSub)
				setSubToEdit(0)
			} else {
				if(position === `top`) {

					if(currentSubs[index].content[subIndex].start <= 2) {
						subStart = 0
						subEnd = currentSubs[index].content[subIndex].start
					} else {
						subStart = currentSubs[index].content[subIndex].start - addingTime
						subEnd = currentSubs[index].content[subIndex].start
					}

					newSub = {
						start: subStart,
						end: subEnd,
						text: ``,
					}
					if(!isError) {
						setSubToEdit(0)
						currentSubs[index].content.unshift(newSub)
					}

				} else {
					if(subIndex !== currentSubs[index].content.length - 1) {
						const curEndTime = currentSubs[index].content[subIndex].end
						const nextStartTime = currentSubs[index].content[subIndex + 1].start

						if(curEndTime === nextStartTime)
							isError = true
						else if(nextStartTime-curEndTime > addingTime){
							subStart = currentSubs[index].content[subIndex].end
							subEnd = currentSubs[index].content[subIndex].end + addingTime
						} else {
							subStart = currentSubs[index].content[subIndex].end
							subEnd = currentSubs[index].content[subIndex + 1].start
						}
						newSub = {
							start: subStart,
							end: subEnd,
							text: ``,
						}
						if(!isError)
							currentSubs[index].content.splice(subIndex + 1, 0, newSub)

					} else {
						const curEndTime = currentSubs[index].content[subIndex].end

						if(curEndTime + addingTime >= videoLength){
							subStart = currentSubs[index].content[subIndex].end
							subEnd = videoLength
						} else {
							subStart = currentSubs[index].content[subIndex].end
							subEnd = currentSubs[index].content[subIndex].end + addingTime
						}

						newSub = {
							start: subStart,
							end: subEnd,
							text: ``,
						}
						if(!isError) {
							setSubToEdit(subIndex + 1)
							currentSubs[index].content.push(newSub)
							setSubToEdit(subIndex + 1)
							scrollToMyRef()
						}
					}
				}
			}

			newSubSetter(subIndex + 1)
			setInvalidSubs([...invalidSubs, {trackId: currentSubs[index].id, index: subIndex + 1, invalidParts: {start: false, end: false, text: true}}])

			setSubLayerToEdit(index)
			activeUpdate(index)

			setSubs(currentSubs)
			setAllSubs(currentSubs)
			setBlock(true)

		}catch(error) {
			alert(`there was an error adding the subtitle`)
			console.error(error) // eslint-disable-line no-console
		}
	}

	const handleNewSub = () => {
		if(newSub.trueFalse === false) {
			if(subs.length > 0 && subLayerToEdit) {
				for(const i in subs[subLayerToEdit].content) {
					if(document.getElementById(`subStart${i}`)) {
						document.getElementById(`subStart${i}`).style.border = null
						document.getElementById(`subEnd${i}`).style.border = null
						document.getElementById(`subText${i}`).style.border = null
					}
				}
			}
		}

		if(newSub.trueFalse === true)
			setNewSub({trueFalse: false, index: null})
	}

	const handleInvalidSubs = () => {
		let tempInvalidArray = []

		if (invalidSubs.length > 0) {
			invalidSubs.forEach((invalidSub, i) => {
				if(!Object.values(invalidSub.invalidParts).includes(true))
					setInvalidSubs(invalidSubs.filter((sub, j) => i !== j))
			})
		}
		invalidSubs.forEach(sub => {
			tempInvalidArray = [...tempInvalidArray, Object.entries(sub).map(([k, v]) => v)]
		})
		if(invalidSubs.length > 0) {
			for(const i in subs[subLayerToEdit].content) {
				for(const j in tempInvalidArray) {
					if(subs[subLayerToEdit].id === tempInvalidArray[j][0] && parseFloat(i) === tempInvalidArray[j][1]) {

						if(tempInvalidArray[j][2].start === true)
							document.getElementById(`subStart${tempInvalidArray[j][1]}`).style.border = `2px solid red`
						if(tempInvalidArray[j][2].end === true)
							document.getElementById(`subEnd${tempInvalidArray[j][1]}`).style.border = `2px solid red`
						if(tempInvalidArray[j][2].text === true)
							document.getElementById(`subText${tempInvalidArray[j][1]}`).style.border = `2px solid red`

					}
				}
			}
		}

		if(invalidSubs.length === 0 && !isNameUnique && !titleNameRequired)
			setDisableSave(false)
		else
			setDisableSave(true)
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
				content: [{start: 0, end: 2, text: `Sample Text`}],
				id: ``,
			}
			// handleSaveAnnotation()
			tempSubList.push(tempSub)
			setSubs(tempSubList)
			setAllSubs(tempSubList)
		}
		newSubSetter(0)
		openSubEditor(subtitles.length, 0)
		setSideEditor(true)
		setBlock(true)
		setDisableSave(true)
		setTitleNameRequired(true)
	}
	const handleAddSubLayerFromFile = (url) => {
		try{
			const reader = new FileReader()
			const nameSubTitle = url.name
			searchUniqueName(subtitles, titleName)
			reader.onload = (e) => {
				const temp = parse(e.target.result)
				for (let i = 0; i < temp.length; i++){
					temp[i].start = temp[i].start /1000
					temp[i].end = temp[i].end /1000
				}
				let removeArray = 0
				const filtered = temp.filter(item => {
					if(item.start > videoLength)
						removeArray++
					return item.start < videoLength
				})
				const filtered1 = filtered.filter(item => {
					if(item.end > videoLength)
						removeArray++
					return item.end < videoLength
				})
				if (removeArray > 0)
					alert(`Some subtitles had to be cut because the subtitles are longer than the video`)
				if (subtitles === [] || !subtitles){
					const tempSubList = []
					const tempSub = {
						title : nameSubTitle,
						language: ``,
						content: filtered1,
						id: ``,
						type: ``,
					}
					tempSubList.push(tempSub)
					setSubs(tempSubList)
					searchUniqueName(tempSubList, nameSubTitle)
				}else {
					const tempSubList = [...subtitles]
					const tempSub = {
						title : nameSubTitle,
						language: ``,
						content: filtered1,
						id: ``,
						type: ``,
					}
					tempSubList.push(tempSub)
					setSubs(tempSubList)
					setAllSubs(tempSubList)
					searchUniqueName(tempSubList, nameSubTitle)
				}
				setSideEditor(false)
				openSubEditor(subtitles.length, 0)
				setBlock(true)
			}
			reader.readAsText(url)
		}catch(error){
			console.log(error) // eslint-disable-line no-console
			alert(`There was an error importing subtitles`)
		}
	}
	const handleDeleteSubLayer = (index) => {
		closeSideEditor()
		setSideEditor(false)
		const tempSubs = [...subtitles]
		const indexId = tempSubs[index].id
		if (indexId && indexId !== ``){
			const deleteSub = subLayersToDelete
			deleteSub.push(indexId)
			setSubLayersToDelete(deleteSub)
		}
		tempSubs.splice(index, 1)
		setSubs(tempSubs)
		setAllSubs(tempSubs)
		setBlock(true)
	}
	const updateSubLayerTitle = (title, fun) => {
		if(fun === `onKeyPress`)
			setIsEdit(false)

		validateTitleSub(title)
		const temp = [...subtitles]
		temp[subLayerToEdit].title = title
		setSubs(temp)
		setAllSubs(temp)
		setBlock(true)
	}
	const checkSub = () => {
		if(subLayerToEdit === subtitles[subLayerToEdit].length - 1)
			return subtitles[0].content[0]
		else
			return subtitles[subLayerToEdit].content[subToEdit]
	}
	const handleChangeSubIndex = (index, subLayer) => {
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
		for (let i = 0; i < subs[subLayerToEdit].content.length; i++) {
			let checkError = false
			let curStart = 0
			let curEnd = 0
			let nextStart = 0
			if(checking === `update` && i === index) {
				if(updateSub.side === `beg`) {
					curStart = updateSub.sub.start
					curEnd = subs[subLayerToEdit].content[i].end
				} else {
					curStart =subs[subLayerToEdit].content[i].start
					curEnd = updateSub.sub.end
				}
			} else {
				curStart =subs[subLayerToEdit].content[i].start
				curEnd = subs[subLayerToEdit].content[i].end
			}

			if(curStart > curEnd || curStart < 0 || curStart >= videoLength || curEnd <= 0 || curEnd>videoLength) {
				checkError = true
				disable = false
				if(checking === `delete` && i >= index) {
					if(document.getElementById(`subStart${i + 1}`).style.border === `2px solid red`) {
						document.getElementById(`subStart${i}`).style.border = `2px solid red`
						document.getElementById(`subStart${i + 1}`).style.border = ``
					} else if(document.getElementById(`subEnd${i + 1}`).style.border === `2px solid red`) {
						document.getElementById(`subEnd${i}`).style.border = `2px solid red`
						document.getElementById(`subEnd${i + 1}`).style.border = ``
					}
				}
			} else if(i !== subs[subLayerToEdit].content.length - 1){
				if(i === index - 1 && checking === `update`)
					nextStart = updateSub.sub.start
				else
					nextStart = subs[subLayerToEdit].content[i + 1].start

				if(curEnd > nextStart) {
					checkError = true
					disable = false
					if(checking === `delete` && i >= index) {
						if(document.getElementById(`subEnd${i + 1}`).style.border === `2px solid red`) {
							document.getElementById(`subEnd${i}`).style.border = `2px solid red`
							document.getElementById(`subEnd${i + 1}`).style.border = ``
						} else if(document.getElementById(`subStart${i + 1}`).style.border === `2px solid red`) {
							document.getElementById(`subStart${i}`).style.border = `2px solid red`
							document.getElementById(`subStart${i + 1}`).style.border = ``
						} else if(i === subs[subLayerToEdit].content.length - 2)
							document.getElementById(`subStart${i + 1}`).style.border = `2px solid red`
					}
				}
			}
			if(!checkError) {
				if(document.getElementById(`subStart${i}`)?.style){
					document.getElementById(`subStart${i}`).style.border = ``
					document.getElementById(`subEnd${i}`).style.border = ``
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
	const handleAllowEvents = () => {
		setAllowEvents(!allowEvents)
	}
	const handleSubProgress = (currentTime) => {
		let sub
		if (subtitles.length !== 0){
			sub = subtitles[subLayerToEdit].content.findIndex((event) => currentTime > event.start && currentTime < event.end)
			if (sub !== -1){
				if (scrollSub !== sub){
					setScrollSub(sub)
					setSubToEdit(sub)
					const subcontainer = document.getElementById(`allSubs`)
					if(subcontainer)
						subcontainer.scrollTop = document.getElementById(`sub-${subLayerToEdit}-${sub}`).offsetTop - subcontainer.offsetHeight * 0.5
				}
			}
		}
	}

	const handleEventPosition = (position) => {
		setEventPosition(position)
	}

	const newSubSetter = (index) => {
		setNewSub({trueFalse: true, index})
	}

	const validateTitleSub = (nameTrack) => {
		subs[subLayerToEdit].title = nameTrack
		seTititleName(nameTrack)
		if (nameTrack === `` || nameTrack === null) {
			setTitleNameRequired(true)
			setDisableSave(true)
		} else {
			setTitleNameRequired(false)
			searchUniqueName(subs, nameTrack)
		}
	}

	const searchUniqueName = (subtitles, fileName) => {
		const filtered = subtitles.filter(entry => entry.title === fileName)
		if (filtered !== undefined && filtered !== null && filtered.length > 1) {
			setIsNameUnique(true)
			setDisableSave(true)
		} else {
			setIsNameUnique(false)
			setDisableSave(false)
		}
	}

	return (
		<Style>
			<span style={{ zIndex: 0 }}>
				<VideoContainer
					className='video'
					isReady={isReady}
					setIsReady={setIsReady}
					url={props.viewstate.url}
					getDuration={getVideoDuration}
					getVideoTime={setCurrentTime} // set current time
					setActiveCensorPosition={setActiveCensorPosition}
					handleLastClick={null}
					handleScroll={handleScrollFactor}
					events={allowEvents ? allEvents : null}
					updateEvents={null}
					eventToEdit={null}
					activeCensorPosition={activeCensorPosition}
					editorType={`subtitle`}
					handleSubProgress={handleSubProgress}
					aspectRatio={aspectRatio}
					eventSeek={eventSeek}
					setEventSeek={setEventSeek}
					eventPosition={eventPosition}
					handleShowTip={handleShowTip}
					toggleTip={toggleTip}
					elapsed={elapsed}
					setElapsed={setElapsed}
				>
				</VideoContainer>
				<Timeline minimized={timelineMinimized} zoom={scrollBarWidth}>

					<section id='event-section'>
						<div className='event-layers'>
							{layers.map((layer, index) => (
								<div id={`layer-${index}`} className={`layer`} key={index}>
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
							<div className={`layer`}>
								<div className={`addtrack`}>
									<div
										className={`setSubModalVisible`}
										onClick={ () => {
											openSubModal(isReady, setIsReady, `create`, ``, handleAddSubLayer, handleAddSubLayerFromFile, window.onkeyup)
										}}>
										<p id={`editIcon`} style={{ fontWeight: 400, color: `white`, fontSize: `14px`, display: `flex` }}>Add Subtitle Track <PlusIcon /></p>
									</div>
								</div>
							</div>

							{subtitles.map((sub, index) => (
								<div className={`layer`} key={index}>
									<div className={`handle`} >
										<div className={`handleFocus`} onClick={() => handleFocus(index)}>
											<SubtitlesCard
												title={sub.title !== `` ?
													sub.title
													:
													isEdit ?
														`` : `No Language`
												}
												updateTitle={updateSubLayerTitle}
												isEdit={isEdit}
												subLayer={subLayerToEdit}
												index={index}
											/>
											{
												subLayerToEdit === index && isEdit ?
													<Icon data-testid='editIcon' className={`saveIcon`} src={saveIcon} onClick={() => setIsEdit(false)}></Icon>
													:
													<Icon data-testid='editIcon' className={`editIcon`} src={editIcon} onClick={() => handleEditSubTitle(index)}></Icon>
											}
										</div>
										<Icon className={`trashIcon`} src={trashIcon}
											onClick={ () => {
												openSubModal(
													``,
													undefined,
													`delete`,
													sub.title !== `` ? sub.title : `No Language`,
													handleAddSubLayer,
													handleAddSubLayerFromFile,
													window.onkeyup,
													handleDeleteSubLayer,
													index,
												)
											}}/>
									</div>
									<SubtitlesLayer
										videoLength={videoLength}
										minimized={eventListMinimized}
										width={layerWidth}
										setIsReady={setIsReady}
										isReady={isReady}
										subs={sub.content}
										activeEvent={subToEdit}
										layer={index}
										index={subToEdit}
										sideEditor={openSubEditor}
										updateSubs={updateSubs}
										closeEditor={closeSideEditor}
										displayLayer={subLayerToEdit}
										handleEventPosition={handleEventPosition}
										setEventSeek={setEventSeek}
									/>
								</div>
							))
							}
							{subtitles.length === 0 &&
								<SubtitlesLayer
									videoLength={videoLength}
									minimized={eventListMinimized}
									width={layerWidth}
									isReady={isReady}
									setIsReady={setIsReady}
									subs={[]}
									activeEvent={subToEdit}
									layer={null}
									index={subToEdit}
									sideEditor={openSubEditor}
									updateSubs={updateSubs}
									closeEditor={closeSideEditor}
									displayLayer={subLayerToEdit}
									handleEventPosition={handleEventPosition}
									setEventSeek={setEventSeek}
								/>
							}

						</div>

					</section>

					<div className='zoom-controls'>
						{/* ADD ZOOM ICON */}
						<div className='zoom-factor' id='zoom-factor'>
							<img src={zoomOut} alt='' style={{ width: `20px` }}/>
							<Rnd
								className={`zoom-indicator`}
								bounds={`parent`}
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
										bounds = {`parent`}
										onDrag = {(e, d) => {
											handleScrollFactor(d.x)
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

			<EventList minimized={eventListMinimized}>
				<header>
					<img
						alt={`helpIcon`}
						src={helpIcon}
						onClick={handleShowHelp}
						style={{ marginLeft: 10, marginTop: 15 }}
						onMouseEnter={e => handleShowTip(`help`,
							{
								x: e.target.getBoundingClientRect().x,
								y: e.target.getBoundingClientRect().y + 10,
								width: e.currentTarget.offsetWidth,
							})
						}
						onMouseLeave={() => toggleTip()}
					/>
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
							deleteSub={deleteSub}
							focus={focus}
							disableSave={disableSave}
							scrollRef={scrollRef}
							handleShowTip={handleShowTip}
							toggleTip={toggleTip}
							validateTitleSub={validateTitleSub}
							isNameUnique={isNameUnique}
							titleNameRequired={titleNameRequired}
							titleName={titleName}
						></SubtitleEditorSideMenu>
					) }
				</>
			</EventList>
			<>
				{/* <Prompt
					when={blockLeave}
					message='If you leave you will lose all your changes. Are you sure to leave without saving?'
				/> */}
			</>
		</Style>
	)
}

export default SubtitleEditor
