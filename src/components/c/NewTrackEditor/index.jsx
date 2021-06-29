import React, { useState, useEffect, useRef } from 'react'

import { Prompt } from 'react-router'

import Style, { Timeline, EventList, AnnotationMessage } from './styles'

import { DndProvider } from 'react-dnd'
import { Rnd } from 'react-rnd'

import Backend from 'react-dnd-html5-backend'

import * as Subtitle from 'subtitle'

import { EventCard, TrackEditorSideMenu, SubtitlesCard, SubtitlesLayer } from 'components/bits'

import { Controller, TrackLayer } from 'components'
import { SubtitlesModal } from 'components/bits'

import skipIcon from 'assets/event_skip.svg'
import muteIcon from 'assets/event_mute.svg'
import pauseIcon from 'assets/event_pause.svg'
import commentIcon from 'assets/event_comment.svg'
import censorIcon from 'assets/event_censor.svg'
import blankIcon from 'assets/event_blank.svg'
import trashIcon from 'assets/trash_icon.svg'
import closeIcon from 'assets/close_icon.svg'
import zoomIn from 'assets/te-zoom-in.svg'
import zoomOut from 'assets/te-zoom-out.svg'

import llIcon from 'assets/te-chevrons-left.svg'
import rrIcon from 'assets/te-chevrons-right.svg'
import lIcon from 'assets/te-chevron-left.svg'
import rIcon from 'assets/te-chevron-right.svg'
import captions from 'assets/captions.svg'

import helpIcon from 'assets/te-help-circle-white.svg'

// ICONS FOR THE EVENTS CAN BE FOUND AT https://feathericons.com/
// TRASH ICON COLOR IS: #eb6e79. OTHER ICON STROKES ARE LIGHT BLUE VAR IN CSS: #0582ca

const TrackEditor = props => {

	// console.log('%c Editor Component', 'color: red; font-weight: bolder; font-size: 12px;')

	const { setEvents, updateContent, createSub,setAllSubs,activeUpdate, deleteSubtitles } = props

	const {
		eventsArray,
		currentContent,
		subs,
		contentError,
		subtitleError,
	} = props.viewstate

	const { handleShowTip, toggleTip, handleShowHelp } = props.handlers

	const events = [
		{
			type: `Skip`,
			icon: skipIcon,
			start: 0,
			end: 10,
			layer: 0,
		},
		{
			type: `Mute`,
			icon: muteIcon,
			start: 0,
			end: 10,
			layer: 0,
		},
		{
			type: `Pause`,
			icon: pauseIcon,
			start: 0,
			end: 10,
			layer: 0,
		},
		{
			type: `Comment`,
			icon: commentIcon,
			start: 0,
			end: 10,
			layer: 0,
			comment: ``,
			position: {
				x: 0,
				y: 0,
			},
		},
		{
			type: `Censor`,
			icon: censorIcon,
			start: 0,
			end: 10,
			layer: 0,
			position: {

			},
		},
		{
			type: `Blank`,
			icon: blankIcon,
			start: 0,
			end: 10,
			layer: 0,
		},
	]
	const testingSubtitle = `1\n00:00:00,000 --> 00:00:20,500\nThis is a test\n\n2\n00:00:40,500 --> 00:01:20,700\nThis is another test`
	const parseSub = Subtitle.parse(testingSubtitle)
	for (let i = 0; i < parseSub.length; i++){
		parseSub[i].start = parseSub[i].start/1000
		parseSub[i].end = parseSub[i].end/1000
	}
	const [allEvents, setAllEvents] = useState(eventsArray)
	const [layers, setLayers] = useState([])
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [blockLeave, setBlock] = useState(false)
	const [showSideEditor, setSideEditor] = useState(false)
	const [eventToEdit, setEventToEdit] = useState(10000)
	const [displayLayer, setDisplayLayer] = useState(0)
	const [videoLength, setVideoLength] = useState(0)
	const [videoCurrentTime, setCurrentTime] = useState(0)

	const [tab, setTab] = useState(`events`)
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
	const [editCensor, setEditCensor] = useState({})
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	})
	const [activeCensorPosition,setActiveCensorPosition] = useState(-1)
	const [isLoading,setIsLoading] = useState(false)
	// refs
	const controllerRef = useRef(null)

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

		for(let i = 1; i < largestLayer + 1; i++)
			initialLayers.push([i])

		setLayers(initialLayers)
		setEvents(allEvents)

		if(blockLeave)
			window.onbeforeunload = () => true
		else
			window.onbeforeunload = undefined

		return () => {
			window.onbeforeunload = undefined
		}
	}, [eventsArray, blockLeave])

	// end of useEffect

	if(shouldUpdate === true)

		setShouldUpdate(false)

	const togglendTimeline = () => {

		setTimelineMinimized(!timelineMinimized)
	}

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

	const handleAddLayer = () => {
		const currentLayers = [...layers]

		const newLayer = currentLayers.length

		currentLayers.push(newLayer)
		setLayers(currentLayers)
		setSideEditor(false)
		setDisplayLayer(currentLayers.length-1)
		setBlock(true)
	}

	const handleRemoveLayer = (e, index) => {
		if(e !== null){
			const currentLayers = [...layers]
			const currentEvents = [...allEvents]
			const toDelete = []

			currentLayers.splice(index, 1)

			currentEvents.forEach((element, i) => {
				if(element.layer === index)
					toDelete.push(element)

			})

			// console.log('%c to delete', 'color: red;', toDelete)

			toDelete.forEach((element) => {
				currentEvents.splice(currentEvents.findIndex(item => item === element), 1)
			})

			// console.log('%c left Events', 'color: blue;', currentEvents)

			setLayers(currentLayers)
			setSideEditor(false)
			setDisplayLayer(currentLayers.length-1)
			setAllEvents(currentEvents)
			setEvents(currentEvents)
			setBlock(true)
		}
	}

	const eventDropHandler = (item, index) => {
		// TODO: Change this to use real JS event objects and insert based on time
		// CALCULATE THE CURRENT TIME IN RESPECT OF THE CURRENT PERCENTAGE OF THE LAYER
		// READ CURRENT TIME * 100 / VIDEO LENGTH WHICH YIELDS THE PERCENTAGE OF THE VIDEO PLAYED
		const newStart = videoCurrentTime * 100 / videoLength
		addEventToLayer(item, index, newStart)
		setBlock(true)
	}

	const addEventToLayer = (item, index, startPercentage) => {
		if (item.id === `subtitle`){
			handleAddSubLayer()
			return
		}
		// console.log(item)
		let currentEvents = []
		if(allEvents !== undefined)
			currentEvents = [...allEvents]

		// console.log('ADDING NEW EVENT')
		const matchingEvent = filterValue(events, `type`, item.id)

		const eventObj = {
			...matchingEvent,
			layer: index,
		}

		if(videoCurrentTime !== 0){
			eventObj.start = startPercentage
			eventObj.end = startPercentage + 10
		}

		currentEvents.push(eventObj)
		// console.log(currentEvents)
		setAllEvents(currentEvents)
		setDisplayLayer(index)
	}

	const updateEvents = (index, event, layerIndex) => {
		// console.log(`Update`, event)
		let canAccessDom = false
		if(showSideEditor && eventListMinimized === false){
			canAccessDom = true
			document.getElementById(`sideTabMessage`).style.color=`red`
		}

		const currentEvents = [...allEvents]

		// check start event times
		if(event.start < 0){
			event.start = 0
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerText=`Changed start time to 0`

		} else if(event.start >= 100) {
			event.start = 95
			event.end = 100
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerHTML=`Start time cannot be larger than ${videoLength} <br/> Changed values to match criteria`

		} else if(event.start > event.end){
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerHTML=`Start time cannot be larger than end time <br/> Change values to match criteria`

		}

		// check end event times
		if(event.end <= event.start){
			if(canAccessDom){
				document.getElementsByClassName(`sideTabInput`)[1].value=event.end
				document.getElementById(`sideTabMessage`).innerHTML=`Please, enter a number bigger than star time`
			}
		} else if(event.end > 100){
			// event.end = 100
			if(canAccessDom){
				document.getElementById(`sideTabMessage`).innerHTML=`Please, enter a number less than ${videoLength}`
				document.getElementById(`sideTabExplanation`).innerHTML=`End time cannot be larger than ${videoLength} <br/> Change value to ${videoLength} or less`
			}
		}

		if(event.start >= 0 && event.start < event.end && event.end <= 100){
			if(canAccessDom){
				document.getElementById(`sideTabMessage`).style.color=`green`
				document.getElementById(`sideTabMessage`).innerHTML=`Start and end times have been updated correctly`
				document.getElementById(`sideTabExplanation`).innerHTML=``
			}
		}

		currentEvents[index] = event

		setAllEvents(currentEvents)
		setEvents(currentEvents)
		setDisplayLayer(layerIndex)
		setEventToEdit(index)
		setSubSelected(false)
		setSideEditor(true)
		setBlock(true)
	}

	const deleteEvent = () => {
		const currentEvents = [...allEvents]
		currentEvents.splice(eventToEdit, 1)

		setAllEvents(currentEvents)
		setEvents(currentEvents)
		setEventToEdit(1000)
		setSideEditor(false)
		setBlock(true)
	}
	const deleteSub = () =>{
		const currentSubs = [...subtitles]
		currentSubs[subLayerToEdit][`content`].splice(subToEdit,1)
		setSubs(currentSubs)
		setAllSubs(currentSubs)
		setSideEditor(false)
		setBlock(true)
	}
	const handleCensorRemove = (item) => {
		const index = eventToEdit
		const cEvent = allEvents[index]
		const layer = cEvent.layer
		const posprev = Object.keys(cEvent[`position`]).filter(val => parseFloat(cEvent.position[val]) < parseFloat(cEvent.position[item])).sort((a,b)=>parseFloat(cEvent.position[b])-parseFloat(cEvent.position[a]))[0]
		const posnex = Object.keys(cEvent[`position`]).filter(val => parseFloat(cEvent.position[val]) > parseFloat(cEvent.position[item])).sort((a,b)=>parseFloat(cEvent.position[a])-parseFloat(cEvent.position[b]))[0]
		setActiveCensorPosition(posprev && posnex ? posprev? posprev:posnex:-1)
		delete cEvent.position[item]
		updateEvents(index, cEvent, layer)

	}

	const handleAddCensor = () => {
		const time = videoCurrentTime
		// console.log(controllerRef)
		if(eventToEdit < allEvents.length && allEvents[eventToEdit].type === `Censor`){
			// console.log('%c Added position', 'color: red; font-weight: bold; font-size: 1.2rem;')
			const index = eventToEdit
			const cEvent = allEvents[index]
			const layer = cEvent.layer
			const pos = cEvent.position
			const id = Object.keys(pos).length === 0 ? `0` : `${parseInt(Object.keys(pos).sort((a,b)=> parseFloat(b) - parseFloat(a))[0]) + 1}`
			let exists = false
			Object.keys(pos).forEach((val)=>{
				if (pos[val][0].toString() === parseFloat(time).toFixed(1).toString()) exists = true
			})
			if(exists) return
			const value = Object.keys(cEvent.position).find(item => item >= time)

			// cEvent.position[time] = [((x / width) * 100) - (((x / width) * 100)*.5), (((y-86) / height) * 100) - ((((y-86) / height) * 100)*.5)]
			cEvent.position[id] = [`${parseFloat(time).toFixed(1)}`,50, 50, 30, 40]

			// console.log(cEvent.position)
			updateEvents(index, cEvent, layer)
		}
	}

	const handleEditCensor = (e, item, int) => {
		const object = editCensor
		const index = eventToEdit
		const cEvent = allEvents[index]
		const layer = cEvent.layer
		const pos = cEvent.position
		const value = parseFloat(e.target.value).toFixed(1)

		switch (int) {
		case 1:
			pos[item][0] = value
			break
		case 2:
			pos[item][1] = value
			break
		case 3:
			pos[item][2] = value
			break
		case 4:
			pos[item][3] = value
			break
		case 5:
			pos[item][3] = value
			break
		default:
			break
		}
		cEvent.position = pos
		updateEvents(index, cEvent, layer)
		setEditCensor(object)
	}

	const handleSaveCensor = () => {
		const index = eventToEdit
		const cEvent = allEvents[index]
		const layer = cEvent.layer

		cEvent.position = editCensor

		// setEditCensor({})
		updateEvents(index, cEvent, layer)
	}
	// THIS IS PART OF CENSOR
	const handleLastClick = (height, width, x, y, time) => {
		// console.log(height, width)

		if(eventToEdit < allEvents.length && allEvents[eventToEdit].type === `Censor`){
			// console.log('%c Added position', 'color: red; font-weight: bold; font-size: 1.2rem;')
			const index = eventToEdit
			const cEvent = allEvents[index]
			const layer = cEvent.layer

			const value = Object.keys(cEvent.position).find(item => item >= time)
			const pos = cEvent.position
			const id = Object.keys(pos).length === 0 ? `0` : `${parseInt(Object.keys(pos).sort((a,b)=> parseFloat(b) - parseFloat(a))[0]) + 1}`

			// cEvent.position[time] = [((x / width) * 100) - (((x / width) * 100)*.5), (((y-86) / height) * 100) - ((((y-86) / height) * 100)*.5)]
			let exists = false
			Object.keys(pos).forEach((val)=>{
				if (pos[val][0].toString() === time.toFixed(1).toString()) exists = true
			})
			if(exists){
				const existId = Object.keys(cEvent.position).find(val => cEvent.position[val][0] === `${time.toFixed(1)}`)
				cEvent.position[`${existId}`] = [`${time.toFixed(1)}`,x / width * 100, (y-86) / height * 100, cEvent.position[`${existId}`][3], cEvent.position[`${existId}`][4]]
			} else
				cEvent.position[`${id}`] = [`${time.toFixed(1)}`,x / width * 100, (y-86) / height * 100, 30, 40]

			updateEvents(index, cEvent, layer)
		}
	}

	const openSideEditor = (layerIndex, eventIndex) => {
		if(eventIndex !== eventToEdit)
			setActiveCensorPosition(-1)

		setEventToEdit(eventIndex)
		setDisplayLayer(layerIndex)
		setSideEditor(true)
	}
	const openSubEditor = (layerIndex,subIndex) =>{
		setSubToEdit(subIndex)
		setSubLayerToEdit(layerIndex)
		activeUpdate(layerIndex)
		setSideEditor(true)
	}

	const closeSideEditor = () => {
		setSideEditor(false)
		setActiveCensorPosition(-1)
	}

	const filterValue = (obj, key, value) => {
		return obj.find((v) => {
			return v[key] === value
		})
	}

	const handleSaveAnnotation = async () => {
		setIsLoading(true)
		const content = currentContent
		content.settings.annotationDocument = [...allEvents]
		await updateContent(content)
		await handleSaveSubtitles()
		deleteSubtitles(subLayersToDelete)
		setSubLayersToDelete([])
		setBlock(false)
		setIsLoading(false)
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
			// console.log(lastPossibleRight)
			// console.log(cLeft)
			const dis = direction/scrollBarContainer
			scrubber.scrollLeft = currentLayerWidth * dis
			timeIndicator.scrollLeft = currentLayerWidth * dis
			// console.log(scrollPercentage / scrollIndicatorWidth)
			alllayers.forEach((element, i) => {
				alllayers[i].scrollLeft = currentLayerWidth * dis
			})
		}
	}
	const updateSubs = (index, sub, subLayerIndex) => {
		let canAccessDom = false
		if(showSideEditor && eventListMinimized === false){
			canAccessDom = true
			document.getElementById(`sideTabMessage`).style.color=`red`
		}

		// check start event times
		if(sub.start < 0){
			sub.start = 0
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerText=`Changed start time to 0`

		} else if(sub.start >= 100) {
			sub.start = 95
			sub.end = 100
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerHTML=`Start time cannot be larger than ${videoLength} <br/> Changed values to match criteria`

		} else if(sub.start > sub.end){
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerHTML=`Start time cannot be larger than end time <br/> Change values to match criteria`

		}

		// check end event times
		if(sub.end <= sub.start){
			if(canAccessDom){
				document.getElementsByClassName(`sideTabInput`)[1].value=sub.end
				document.getElementById(`sideTabMessage`).innerHTML=`Please, enter a number bigger than star time`
			}
		} else if(sub.end > 100){
			// event.end = 100
			if(canAccessDom){
				document.getElementById(`sideTabMessage`).innerHTML=`Please, enter a number less than ${videoLength}`
				document.getElementById(`sideTabExplanation`).innerHTML=`End time cannot be larger than ${videoLength} <br/> Change value to ${videoLength} or less`
			}
		}

		if(sub.start >= 0 && sub.start < sub.end && sub.end <= 100){
			if(canAccessDom){
				document.getElementById(`sideTabMessage`).style.color=`green`
				document.getElementById(`sideTabMessage`).innerHTML=`Start and end times have been updated correctly`
				document.getElementById(`sideTabExplanation`).innerHTML=``
			}
		}
		const tempSubs = [...subtitles]
		const currentSubs = tempSubs[subLayerIndex]
		currentSubs[`content`][index] = sub
		tempSubs[subLayerIndex] = currentSubs
		setSubs(tempSubs)
		setAllSubs(tempSubs)
		setSubChanges(subChanges+1)
		setSubToEdit(index)
		setSubLayerToEdit(subLayerIndex)
		activeUpdate(subLayerIndex)
		setSubSelected(true)
		sortSubtitles()
		setBlock(true)
	}
	const addSubToLayer = (item,index) => {
		// TODO: Change this to use real JS event objects and insert based on time
		const currentSubs = [...subtitles]
		let subStart = 0
		try{
			if (currentSubs[index]){
				if(currentSubs[index][`content`][subToEdit])
					subStart = currentSubs[index][`content`][subToEdit].end + .01

			}
			const newSub = {
				start: subStart,
				end: subStart + 5,
				text: ``,
			}

			currentSubs[index][`content`].push(newSub)
			setSubLayerToEdit(index)
			activeUpdate(index)
			setSubs(currentSubs)
			setAllSubs(currentSubs)
			sortSubtitles()
			setBlock(true)
		}catch(error) {
			alert(`there was an error adding the subtitle`)
			console.error(error)
		}

	}
	const checkSideBarTitle = () => {
		try {
			const title = allEvents[eventToEdit].type
			return title
		} catch (error) {
			return ``
		}
	}
	const checkEventOrSub = () => {
		return subSelected ? subtitles[subLayerToEdit][`content`][subToEdit] : allEvents[eventToEdit]
	}
	const checkIndex = () => {
		return subSelected ? subToEdit : eventToEdit
	}
	const handleChangeSubIndex = (index,subLayer) =>{
		setSubToEdit(index)
	}
	const handleAddSubLayer = () => {
		if (subtitles === [] || !subtitles){
			const tempSubList = []
			const tempSub = {
				title : ``,
				language: ``,
				content: [],
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
				content: [],
				id: ``,
			}
			tempSubList.push(tempSub)
			setSubs(tempSubList)
			setAllSubs(tempSubList)

		}
		setSideEditor(false)
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
					removeArray = removeArray + 1
					return item.start < 100
				})
				const filtered1 = filtered.filter(item => {
					removeArray = removeArray + 1
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
					}
					tempSubList.push(tempSub)
					setSubs(tempSubList)
					setAllSubs(tempSubList)

				}
				setSideEditor(false)
				setSubModalVisible(false)
				setSubModalMode(``)
			}
			reader.readAsText(url)
		}catch(error){
			console.log(error)
			alert(`There was an error importing subtitles`)
		}
		setSubModalVisible(false)
		setSubModalMode(``)
	}
	const handleDeleteSubLayer = (index) =>{
		if (index === subLayerToEdit)
			closeSideEditor()

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
	const updateSubLayerTitle = (title) =>{
		const temp = [...subtitles]
		temp[subLayerToEdit][`title`] = title
		setSubs(temp)
		setAllSubs(temp)
		setBlock(true)
	}
	const updateSubLayerLanguage = (language) =>{
		const temp = [...subtitles]
		temp[subLayerToEdit][`language`] = language
		setSubs(temp)
		setAllSubs(temp)
		setBlock(true)
	}
	const sortSubtitles = () => {
		const tempSubs = [...subtitles]
		for(let i = 0; i< tempSubs.length; i++){
			const tempContent = tempSubs[i][`content`]
			tempContent.sort((a,b)=> a.start - b.start)
			tempSubs[i][`content`] = tempContent
		}
		setSubs(tempSubs)
		setAllSubs(tempSubs)
		setBlock(true)
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
				/>
				<span style={{ zIndex: 0 }}>
					<Controller ref = {controllerRef}
						className='video'
						url={props.viewstate.url}
						handlers={togglendTimeline}
						getDuration={getVideoDuration}
						getVideoTime={setCurrentTime}
						minimized={timelineMinimized}
						togglendTimeline={togglendTimeline}
						handleLastClick = {handleLastClick}
						events = {allEvents}
						updateEvents={updateEvents}
						eventToEdit={eventToEdit}
						activeCensorPosition = {activeCensorPosition}
						setActiveCensorPosition = {setActiveCensorPosition}
					>
					</Controller>
					<Timeline minimized={timelineMinimized} zoom={scrollBarWidth}>

						<section>
							{/* //TODO: Add delete logic */}
							<div className='event-layers'>

								{layers.map((layer, index) => (
									<div className={`layer`} key={index}>
										<div className={`handle`} onClick={() => setDisplayLayer(index)}>
											<p>Layer {index+1} <img className={`layer-delete`} src={trashIcon} width='20px' width='20px' onClick={ e => handleRemoveLayer(e, index)}/></p>
										</div>
										{/* <HandleIcon /> */}
										<TrackLayer
											videoLength={videoLength}
											minimized={eventListMinimized}
											width={layerWidth}
											events={allEvents}
											activeEvent={eventToEdit}
											index={index}
											onDrop={(item) => eventDropHandler(item,index)}
											sideEditor={openSideEditor}
											updateEvents={updateEvents}
											closeEditor={closeSideEditor}
											displayLayer={displayLayer}
										/>
									</div>
								))}
								<div className='new-layer' onClick={handleAddLayer}
									onMouseEnter={e => handleShowTip(`te-add-layer`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y + 11, width: e.currentTarget.offsetWidth})}
									onMouseLeave={e => toggleTip()} style={{color:`#ffffff`,backgroundColor:`#0582ca`,borderRadius:`0.6rem`,width:`130px`, margin:`10px`,textAlign:`center`,padding:`5px`,cursor:`pointer`}} className={`setSubModalVisible`}>
									<p style={{fontWeight:700}}>Add New Layer +</p>
								</div>

								{subtitles.map((sub, index) => (
									<div className={`layer`} key={index}>
										<div className={`handle`} onClick={()=>setSubLayerToEdit(index)}>
											<img alt={`cc`} src={captions}/>
											<p>{sub.title !== `` ? sub.title : `No Title`}<img alt={`delete subtitle track`} className={`layer-delete`} src={trashIcon} width='20px' onClick={()=>handleDeleteSubLayer(index)} /></p>
										</div>
										<SubtitlesLayer
											videoLength={videoLength}
											minimized={eventListMinimized}
											width={layerWidth}
											subs={sub[`content`]}
											activeEvent={subToEdit}
											layer={index}
											index={subToEdit}
											onDrop={(item)=>addSubToLayer(item,index)}
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
									<p style={{fontWeight:700}}>Add Subtitle Track +</p>
								</div>
								<br/><br/><br/><br/><br/><br/><br/>
							</div>

						</section>
						<div className='zoom-controls'>
							{/* ADD ZOOM ICON */}
							<div className='zoom-factor' id = 'zoom-factor'
								onClick={(e)=>{
									const rect = document.getElementById(`zoom-factor`).getBoundingClientRect()
									const xpos = e.clientX - rect.left
									// handleZoomChange(null,{x:xpos})
									// setZoomFactor(xpos)
									// setWidth(-(Math.abs(zoomFactor - xpos) * videoLength / 10))
								}}
								style={{ visibility: `${timelineMinimized ? ` hidden` : `initial`}`}}>
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
										{/* <div className={`zoom-scroll-indicator`}
											onMouseEnter={e => handleShowTip(`te-scroll`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y + 10, width: e.currentTarget.offsetWidth})}
											onMouseLeave={e => toggleTip()}></div> */}
										<Rnd
											className= 'zoom-scroll-indicator'
											size={{width:scrollBarWidth !== 0 ? `${scrollBarWidth}%` : `100%`, height: `100%`}}
											enableResizing={{top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}
											bounds = {`parent`}
											onDragStop = {(e,d)=>{
												handleScrollFactor(d.x)
											}}
										>
										</Rnd>
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
						<img src={helpIcon} onClick={handleShowHelp} style={{marginLeft:10,marginTop:15}}/>
						<div className={`save`}>
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
						</div>
					</header>

					{tab === `events` ?

						<>
							<div className='breadcrumbs'>
								<span>Events</span>
								{ showSideEditor &&
								<>
									<span className='carat'></span>
									{ subSelected ?
										<>
											<span className='current'>{subToEdit !== undefined ? `Subtitle ${subToEdit + 1}` : ``}</span>
											<button className='deleteEventButton' onClick={deleteSub}>Delete Event</button>
										</>
										:

										<>
											<span className='current'>{allEvents !== []? `${checkSideBarTitle()}` : ``}</span>
											<button className='deleteEventButton' onClick={deleteEvent}>Delete Event</button>
										</>
									}

								</>
								}
							</div>
							{ showSideEditor !== false && eventListMinimized !== true ? (
								<TrackEditorSideMenu
									updateLanguage = {updateSubLayerLanguage}
									updateTitle = {updateSubLayerTitle}
									singleEvent={checkEventOrSub()}
									index={checkIndex()}
									videoLength={videoLength}
									closeSideEditor={closeSideEditor}
									updateEvents={updateEvents}
									updateSubs={updateSubs}
									isSub={subSelected}
									subs={subtitles}
									subLayer={subLayerToEdit}
									changeSubIndex={handleChangeSubIndex}
									addSub={addSubToLayer}
									editCensor = {editCensor}
									handleEditCensor = {handleEditCensor}
									handleCensorRemove = {handleCensorRemove}
									handleAddCensor = {handleAddCensor}
									handleSaveCensor = {handleSaveCensor}
									activeCensorPosition = {activeCensorPosition}
									setActiveCensorPosition = {setActiveCensorPosition}
								></TrackEditorSideMenu>
							) : (
								<>
									<div className='eventsList'
										onMouseEnter={e => handleShowTip(`drag-and-drop`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y - 50, width: e.currentTarget.offsetWidth})}
										onMouseLeave={e => toggleTip()}>
										{events.map((event, i) => (
											<EventCard event={event} key={i}/>
										))}
									</div>
									<div className='subCard'>
										{subtitles !== [] && subtitles !== undefined ? (
											<SubtitlesCard/>
										):``}
									</div>

								</>
							)}
						</>

						:
						null
					}
				</EventList>
			</DndProvider>
			<>
				<AnnotationMessage style={{ visibility: `${annotationsSaved ? `visible` : `hidden`}`, opacity: `${annotationsSaved ? `1` : `0`}` }}>
					<img src={closeIcon} width='20' height='20' onClick={ e => setSaved(false)}/>
					{
						contentError !== `` || subtitleError !== `` ? (
							<h2 id='error'>
								<span>Content failed with: {contentError}</span><br/><br/><span>Subtitle failed with: {subtitleError}</span>
							</h2>
						) : (
							<h2 id='success'>Annotations saved successfully</h2>
						)
					}
				</AnnotationMessage>
				<Prompt
					when={blockLeave}
					message='Have you saved your changes already?'
				/>
			</>
		</Style>
	)
}

export default TrackEditor
