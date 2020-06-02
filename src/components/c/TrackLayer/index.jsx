import React, { useState, useRef, useEffect } from 'react'

import { useDrop } from 'react-dnd'
import { Rnd } from "react-rnd";

import {
	Icon, Style
} from './styles'

// TODO: Copy styles from NewTrackEditor used by these components into this file

// This is inspired from the React DnD example found here: https://react-dnd.github.io/react-dnd/examples/dustbin/multiple-targets

const TrackLayer = props => {

	const { events, onDrop, sideEditor, updateEvents, closeEditor} = props
	const layerIndex = parseInt(props.index)

	const layerRef =  useRef(null)
	const eventRef =  useRef(null)

	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [layerWidth, setLayerWidth] = useState(0)
	const [layerHeight, setLayerHeight] = useState(0)
	// const [events, setEvents] = useState(layer)
	const [isEditorOpen, setEditorOpen] = useState(false)

	if(shouldUpdate){
		setShouldUpdate(false)
	}

	useEffect(() => {
		// checkEvents()
		setLayerWidth(layerRef.current.offsetWidth)
		setLayerHeight(layerRef.current.offsetHeight*layerIndex)
		
  });
parseInt(layerRef.offsetHeight)
	//This object is to tell the onReziseStop nevent for the Rnd component that resizing can only be right and left
	const Enable = {top:false, right:true, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}

	// Drag and Drop event to the layer
	const [collectedProps, dropRef] = useDrop({
		accept: `timeline-event`,
		drop: onDrop,
		hover: (item, monitor) => {},
	})
	//Drag within the layer
	const handleDrag = (d, event, index) => {
		let cEvents = events
		const beginTimePercentage = (d.x / layerWidth) * 100
		const endTimePercentage = beginTimePercentage + (event.endTime - event.beginningTime)

		//LOGIC TO CHANGE THE TIME @params beginTime, endTime
		cEvents[index].beginningTime = beginTimePercentage
		cEvents[index].endTime = endTimePercentage

		if(cEvents[index].endTime > 100){
			cEvents[index].endTime = 100
		}
		if(cEvents[index].beginningTime < 0){
			cEvents[index].beginningTime = 0
		}

		//call handler from parent
		updateEvents(index, cEvents[index])
	}
	//Resize within the layer
	const handleResize = (direction, ref, delta, event, index, e ) => {
		let cEvents = events
		const difference = (delta.width / layerWidth) * 100
		if(direction === 'right'){
			cEvents[index].endTime += difference

			if(cEvents[index].endTime > 100){
				cEvents[index].endTime = 100
			}
		}
		else {
			cEvents[index].beginningTime -= difference

			console.log(cEvents[index])
			if(cEvents[index].beginningTime < 0){
				cEvents[index].beginningTime = 0
			}
			else if(cEvents[index].beginningTime > 100){
				cEvents[index].beginningTime = 99
				cEvents[index].endTime = 100
			}
		}

		// document.getElementById(`event-${index}`)

		updateEvents(index, cEvents[index])
	}

	const handleResizeAction = (delta, position, index, e) => {
		console.log(position)
		console.log(e)
	}

	//This opens the side tab editor
	const toggleEditor = (layerIndex, eventIndex) => {
		setEditorOpen(true)
		sideEditor(layerIndex, eventIndex)
	}

	const printEvents = (event, index) => {
		return (
			<Rnd
				className={`layer-event`}
				id={`event-${index}`}
				size={{width: `${((event.endTime - event.beginningTime)/100) * layerWidth}px`, height: '46px'}}
				position={{ x: parseFloat((event.beginningTime / 100) * layerWidth), y: 0}}
				enableResizing={Enable}
				dragAxis="x"
				bounds={`.layer-${layerIndex}`}
				onDragStop={(e, d) => handleDrag(d, event, index)}
				// onResizeStart={(e, direction, ref, delta, position) => handleResizeAction(delta, position, index, e)}
				onResizeStop={(e, direction, ref, delta, position) => handleResize(direction, ref, delta, event, index, e, position)}
				key={index}
				onClick={() => toggleEditor(layerIndex, index)}
				style={{ left: `${event.beginningTime}% !important`, top: `-${layerHeight}px !important`}}
			>
				{/* //TODO: Change the p tag to be an svg icon */}
				<Icon src={event.icon}/>
				<p>{event.name} - From: {event.beginningTime.toFixed(1)}% - To: {event.endTime.toFixed(1)}%</p>
			</Rnd>
		)
	}

	// const checkEvents = () => {
	// 	if(document.getElementById('eventsBox').innerHTML === ''){
	// 		document.getElementById('layer-message').innerHTML = '<p>There are no events in this layer. Drop an event here to add it to this layer</p>'
	// 	}
	// 	else {
	// 		document.getElementById('layer-message').innerHTML = '<p>Drop an event here to add an event</p>'
	// 	}
	// }

	console.log('TRACK LAYER')

	return (
		<>
		<Style >
				{/* overflow-x should be like scroll or something */}
				<div ref={layerRef} id='eventsbox'>
					<div className={`layer-${layerIndex} events`} ref={dropRef}>
						{events.map((event, index) => (
							<>
							{event.layer === layerIndex ? (
								<>
									{printEvents(event, index)}		
								</>
							) : (null)}
							</>
						))}
					</div>
				</div>
			{/* <div id='layer-message' ></div> */}
		</Style>
		</>
	)
}

export default TrackLayer

