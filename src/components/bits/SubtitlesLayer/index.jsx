import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import handleScrollFuncs from '../../../components/common/toggleScroll'
import { calculateStartAndEndTimesForDrag, calculateStartAndEndTimesForResize, checkForErrors} from '../../common/editorCommon'

import { Rnd } from 'react-rnd'
import { Style } from './styles'

// TODO: Copy styles from NewTrackEditor used by these components into this file
// This is inspired from the React DnD example found here: https://react-dnd.github.io/react-dnd/examples/dustbin/multiple-targets

const SubtitlesLayer = props => {
	const {
		subs,
		sideEditor,
		updateSubs,
		activeEvent,
		width,
		displayLayer,
		videoLength,
		handleEventPosition,
		setEventSeek,
		setIsReady,
	} = props

	const layerIndex = props.layer
	const layerRef = useRef(null)

	const [initialWidth, setInitialWidth] = useState(0)
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [layerWidth, setLayerWidth] = useState(0)

	const layerHeight = 0

	const [showError, setShowError] = useState(false)
	const [disableScroll, setDisableScroll] = useState({action: null})

	if(shouldUpdate)
		setShouldUpdate(false)

	useEffect(() => {
		setIsReady(true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useLayoutEffect(() => {
		setInitialWidth(layerRef.current.offsetWidth)
		if(layerWidth === 0)
			setLayerWidth(layerRef.current.offsetWidth + width)
		else if (width === 0)
			setLayerWidth(initialWidth)
		else
			setLayerWidth(initialWidth + width)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width])

	useLayoutEffect(() => {
		if(document.getElementsByClassName(`layer-container`))
			handleScrollFuncs(Array.from(document.getElementsByClassName(`layer-container`)), setDisableScroll, null)
		if(disableScroll.action !== null)
			disableScroll.action()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateSubs])

	if(document.getElementsByClassName(`total`)?.[0] && layerWidth !== 0) {
		document.getElementById(`time-bar-container`).style.width = `${layerWidth - 2}px`
		document.getElementsByClassName(`total`)[0].style.width = `${layerWidth - 2}px`
		document.getElementById(`layer-time-indicator`).style.width = `${layerWidth}px`
	}
	// This object is to tell the onReziseStop nevent for the Rnd component that resizing can only be right and left
	const Enable = {
		top: false,
		right: true,
		bottom: false,
		left: true,
		topRight: false,
		bottomRight: false,
		bottomLeft: false,
		topLeft: false,
	}
	// This object is to overwrite the css properties of the right and left side of the Rnd, specifically the resize handles
	const handleStyles = {
		right: {
			borderRight: `1.5px solid var(--light-blue)`,
			width: `2px`,
			height: `100%`,
			right: `0px`,
			padding: `1px`,
		},
		left: {
			borderLeft: `1.5px solid var(--light-blue)`,
			width: `2px`,
			height: `100%`,
			left: `0px`,
			padding: `1px`,
		},
	}
	// Drag within the layer
	const handleDrag = (d, event, index) => {
		toggleEditor(layerIndex, index)
		let isError = false
		const cEvents = subs
		const clipTimes = calculateStartAndEndTimesForDrag(d, layerWidth, videoLength, cEvents[index].start, cEvents[index].end)

		isError = checkForErrors(index, cEvents, videoLength, isError, clipTimes)
		setShowError(isError)

		if(!isError) {
			// LOGIC TO CHANGE THE TIME @params beginTime, end
			cEvents[index].start = clipTimes.start
			cEvents[index].end = clipTimes.end
			updateSubs(index, cEvents[index], layerIndex)
		}
	}
	// Resize within the layer
	const handleResize = (direction, ref, delta, event, index, e, position) => {
		toggleEditor(layerIndex, index)
		let isError = false
		const cEvents = subs
		const clipTimes = calculateStartAndEndTimesForResize(position, layerWidth, videoLength, ref, subs, index, direction)
		isError = clipTimes.isError

		setShowError(isError)

		if(!isError)
			updateSubs(index, cEvents[index], layerIndex)
	}

	// This opens the side tab editor
	const toggleEditor = (layerIndex, subIndex) => {
		sideEditor(layerIndex, subIndex)
	}

	const printEvents = (event, index) => {
		return (
			<Rnd
				className={`layer-event ${activeEvent === index && layerIndex === displayLayer ? `active-event` : ``}`}

				id={`event-${index}`}
				size={{width: `${(event.end - event.start) / videoLength * layerWidth}px`, height: `46px`}}
				position={{ x: event.start / videoLength * layerWidth, y: 0 }}
				enableResizing={Enable}
				dragAxis='x'
				bounds={`.layer-${layerIndex}`}
				onDragStop={(e, d) => {
					handleDrag(d, event, index)
					setEventSeek(true)
					handleEventPosition(event.start)
				}
				}
				onResizeStop={(e, direction, ref, delta, position) => {
					handleResize(direction, ref, delta, event, index, e, position)
					setEventSeek(true)
					handleEventPosition(event.start)
				}
				}
				resizeHandleStyles={handleStyles}
				key={index}
				onClick={() => toggleEditor(layerIndex, index)}
				style={{ left: `${event.start}% !important`, top: `-${layerHeight}px !important` }}
			>
				{ event.type !== `Pause` ? (
					<p>{event.text}</p>
				) : (
					<p>{event.type}</p>
				)
				}
			</Rnd>
		)
	}

	return (
		<>
			<Style layerWidth={layerWidth} showError={showError} className='layer-container'>
				{/* overflow-x should be like scroll or something */}
				<div ref={layerRef} className='events-box'>
					<div className={`layer-${layerIndex} events ${displayLayer === layerIndex && `active-layer`}`}>
						{
							subs && videoLength !== 0 ? (
								<>
									{subs.map((event, index) => (
										<div key={index}
										>
											{printEvents(event, index)}
										</div>
									))}
								</>
							) : null
						}
					</div>
				</div>
				{/* <div id='layer-message' ></div> */}
			</Style>
		</>
	)
}

export default SubtitlesLayer

