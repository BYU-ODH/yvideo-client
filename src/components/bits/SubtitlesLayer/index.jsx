import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
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
	const [layerHeight, setLayerHeight] = useState(0) // eslint-disable-line no-unused-vars
	const [showError, setShowError] = useState(false)
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

	const tempOnload = window.onload
	window.onload = () => {
		if(document.getElementsByClassName(`total`)[0] !== undefined && layerWidth !== 0) {
			document.getElementById(`time-bar-container`).style.width = `${layerWidth - 163}px`
			document.getElementsByClassName(`total`)[0].style.width = `${layerWidth - 163}px`
			document.getElementById(`layer-time-indicator`).style.width = `${layerWidth}px`
		}
		window.onload = tempOnload
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
		const beginTimePercentage = d.x / layerWidth * 100 * videoLength / 100
		const endPercentage = beginTimePercentage + (event.end - event.start)

		if(index === 0 && index + 1 === cEvents.length)
			isError = false
		else if(index + 1 === cEvents.length) {
			if(cEvents[index].end > videoLength)
				cEvents[index].end = videoLength

			if(beginTimePercentage < cEvents[index - 1].end) {
				setShowError(true)
				isError = true
			}
		} else if(index === 0) {
			if(cEvents[index].start < 0)
				cEvents[index].start = 0

			if(endPercentage > cEvents[index + 1].start){
				setShowError(true)
				isError = true
			}
		} else if(endPercentage > cEvents[index + 1].start || beginTimePercentage < cEvents[index - 1].end) {
			setShowError(true)
			isError = true
		}

		if(!isError) {
			// LOGIC TO CHANGE THE TIME @params beginTime, end
			setShowError(false)
			cEvents[index].start = beginTimePercentage
			cEvents[index].end = endPercentage
			updateSubs(index, cEvents[index], layerIndex)
		}
	}
	// Resize within the layer
	const handleResize = (direction, ref, delta, event, index, e ) => {
		toggleEditor(layerIndex, index)
		let isError = false
		const cEvents = subs
		const difference = delta.width / layerWidth * 100 * videoLength / 100
		if(direction === `right`){
			if(cEvents[index].end > videoLength)
				cEvents[index].end = videoLength

			if(index === 0 && index + 1 === cEvents.length)
				cEvents[index].end += difference
			else {
				if(index + 1 === cEvents.length)
					cEvents[index].end += difference
				else if(cEvents[index].end + difference > cEvents[index + 1].start) {
					setShowError(true)
					isError = true
				} else
					cEvents[index].end += difference
			}
		} else {
			if(cEvents[index].start < 0)
				cEvents[index].start = 0
			else if(cEvents[index].start > videoLength){
				cEvents[index].start = videoLength - 0.01
				cEvents[index].end = videoLength
			}

			if(index === 0 && index + 1 === cEvents.length)
				cEvents[index].start -= difference
			else {
				if(index === 0)
					cEvents[index].start -= difference
				else if(cEvents[index].start - difference < cEvents[index - 1].end) {
					setShowError(true)
					isError = true
				} else
					cEvents[index].start -= difference
			}
		}
		if(!isError) {
			setShowError(false)
			updateSubs(index, cEvents[index], layerIndex)
		}
	}

	// This opens the side tab editor
	const toggleEditor = (layerIndex, subIndex) => {
		sideEditor(layerIndex, subIndex)
	}

	const printEvents = (event, index) => {
		return (
			<Rnd
				className={`layer-event ${activeEvent === index && layerIndex === displayLayer && `active-event`}`}

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
				<div ref={layerRef} className='eventsbox'>
					<div className={`layer-${layerIndex} events ${displayLayer === layerIndex && `active-layer`}`}>
						{
							subs !== undefined && videoLength !== 0 ? (
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

