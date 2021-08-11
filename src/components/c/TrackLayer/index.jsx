import React, { useState, useRef, useLayoutEffect } from 'react'

import { useDrop } from 'react-dnd'
import { Rnd } from 'react-rnd'

import {
	Icon, Style,
} from './styles'

// TODO: Copy styles from NewTrackEditor used by these components into this file

// This is inspired from the React DnD example found here: https://react-dnd.github.io/react-dnd/examples/dustbin/multiple-targets

const TrackLayer = props => {

	// console.log('%c Layer Component', 'color: blue; font-weight: bolder; font-size: 12px;')

	const { events, sideEditor, updateEvents, activeEvent, width, videoLength, displayLayer} = props // onDrop
	const layerIndex = parseInt(props.index)

	const layerRef = useRef(null)

	const [initialWidth, setInitialWidth] = useState(0)
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [layerWidth, setLayerWidth] = useState(0)
	const [layerHeight, setLayerHeight] = useState(0)
	// const [isEditorOpen, setEditorOpen] = useState(false)

	if(shouldUpdate)
		setShouldUpdate(false)

	useLayoutEffect(() => {

		setInitialWidth(layerRef.current.offsetWidth)
		if(layerWidth === 0)
			setLayerWidth(layerRef.current.offsetWidth + width)
		else if (width === 0)
			setLayerWidth(initialWidth)
		else
			setLayerWidth(layerWidth + width)

		setLayerHeight(layerRef.current.offsetHeight*layerIndex)
	}, [width])

	if(document.getElementsByClassName(`total`)[0] !== undefined && layerWidth !== 0){
		document.getElementById(`time-bar-container`).style.width = `${layerWidth - 2}px`
		document.getElementsByClassName(`total`)[0].style.width = `${layerWidth - 2}px`
		document.getElementById(`layer-time-indicator`).style.width = `${layerWidth}px`
	}
	// This object is to tell the onReziseStop nevent for the Rnd component that resizing can only be right and left
	const Enable = {top:false, right:true, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}

	// Drag and Drop event to the layer
	const [, dropRef] = useDrop({
		accept: [`timeline-event`],
		// drop: onDrop,
		hover: (item, monitor) => {
		},
	})
	// Drag within the layer
	const handleDrag = (d, event, index) => {
		const cEvents = events
		const beginTimePercentage = d.x / layerWidth * 100*videoLength/100
		const endPercentage = beginTimePercentage + event.end - event.start

		// LOGIC TO CHANGE THE TIME @params beginTime, end
		cEvents[index].start = beginTimePercentage
		cEvents[index].end = endPercentage

		if(cEvents[index].end > videoLength)
			cEvents[index].end = videoLength

		if(cEvents[index].start < 0)
			cEvents[index].start = 0

		// call handler from parent
		updateEvents(index, cEvents[index], layerIndex)
	}

	// const convertSecondsToMinute = (time) =>{
	// 	console.log(time)
	// 	if(Number(time) === 0) return `00:00:00`
	// 	return new Date(Number(time) * 1000).toISOString().substr(11, 8)
	// }

	const convertSecondsToMinute = (time) =>{
		try {
			if(Number(time) === 0) return `00:00:00`

			if(videoLength<3600)
				return new Date(Number(time) * 1000).toISOString().substr(14, 8)
			else
				return new Date(Number(time) * 1000).toISOString().substr(11, 11)

		} catch (e) {
			return time
		}
	}

	// Resize within the layer
	const handleResize = (direction, ref, delta, event, index, e, position ) => {
		const cEvents = events
		const difference = delta.width / layerWidth * 100*videoLength/100
		if(direction === `right`){
			cEvents[index].end += difference

			if(cEvents[index].end > videoLength)
				cEvents[index].end = videoLength

		} else {
			cEvents[index].start -= difference

			// console.log(cEvents[index])
			if(cEvents[index].start < 0)
				cEvents[index].start = 0
			else if(cEvents[index].start > videoLength){
				cEvents[index].start = videoLength-0.001
				cEvents[index].end = videoLength
			}
		}

		updateEvents(index, cEvents[index], layerIndex)
	}

	// This opens the side tab editor
	const toggleEditor = (layerIndex, eventIndex) => {
		// setEditorOpen(true)
		sideEditor(layerIndex, eventIndex)
	}

	const printEvents = (event, index) => {
		return (
			<Rnd
				className={`layer-event ${activeEvent === index ? `active-event` : ``}`}
				id={`event-${index}`}
				size={{width: `${(event.end - event.start)/videoLength*100/100 * layerWidth}px`, height: `46px`}}
				position={{ x: event.start/videoLength*100/100 * layerWidth, y: 0}}
				enableResizing={Enable}
				dragAxis='x'
				bounds={`.layer-${layerIndex}`}
				onDragStop={(e, d) => handleDrag(d, event, index)}
				onResizeStop={(e, direction, ref, delta, position) => handleResize(direction, ref, delta, event, index, e, position)}
				key={index}
				// onClick={() => toggleEditor(layerIndex, index)}
				style={{ left: `${event.start}% !important`, top: `-${layerHeight}px !important`}}
			>
				{/* //TODO: Change the p tag to be an svg icon */}
				<Icon src={event.icon}/>
				{ event.type !== `Pause` ? (
					<p>{convertSecondsToMinute(event.start)} - {convertSecondsToMinute(event.end)}</p>
				) : (
					<p>{convertSecondsToMinute(event.start)}</p>
				)
				}
			</Rnd>
		)
	}

	return (
		<>
			<Style layerWidth={layerWidth} className='layer-container'>
				{/* overflow-x should be like scroll or something */}
				<div ref={layerRef} className='eventsbox'>
					<div className={`layer-${layerIndex} events ${displayLayer === layerIndex ? `active-layer` : ``}`} ref={dropRef}>
						{
							events !== undefined && events.length > 0 ? (
								<>
									{ events.map((event, index) => (
										<div key={index}>
											{event.layer === layerIndex ? (
												<div>
													{printEvents(event, index)}
												</div>
											) : null}
										</div>
									))}
								</>
							) : null
						}
					</div>
				</div>
			</Style>
		</>
	)
}

export default TrackLayer

