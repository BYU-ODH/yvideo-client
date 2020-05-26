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
		setLayerWidth(layerRef.current.offsetWidth)
		setLayerHeight(((layerRef.current.offsetHeight) * (layerIndex+1)))
  });

	//This object is to tell the onReziseStop nevent for the Rnd component that resizing can only be right and left
	const Enable = {top:false, right:true, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}

	// Drag and Drop event to the layer
	const [collectedProps, dropRef] = useDrop({
		accept: `timeline-event`,
		drop: onDrop,
		hover: (item, monitor) => {},
	})
	//Drag within the layer
	const handleDrag = (e, d, event, index) => {
		let cEvents = events
		const beginTimePercentage = (d.x / layerWidth) * 100
		const endTimePercentage = ((d.x + eventRef.current.offsetParent.offsetWidth) / layerWidth) * 100

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
	const handleResize = (e, direction, ref, event, index, position) => {
		let cEvents = events
		const newWidthPercentage = (ref.offsetWidth / layerWidth) * 100
		if(direction === 'right'){
			cEvents[index].endTime = newWidthPercentage + event.beginningTime

			if(cEvents[index].endTime > 100){
				cEvents[index].endTime = 100
			}
		}
		else {
			cEvents[index].beginningTime = (position.x / layerWidth) * 100

			if(cEvents[index].beginningTime < 0){
				cEvents[index].beginningTime = 0
			}
		}

		//LOGIC TO CHANGE THE TIME @params beginTime, endTime
		// setEvents(cEvents)
		// setShouldUpdate(true)

		updateEvents(index, cEvents[index])
	}
	//This opens the side tab editor
	const toggleEditor = (layerIndex, eventIndex) => {
		setEditorOpen(true)
		sideEditor(layerIndex, eventIndex)
	}

	return (
		<>
		<Style className='layer' ref={dropRef}>
			<span className='handle'>
				<p>Layer {layerIndex}</p>
				{/* <HandleIcon /> */}
			</span>
			<div className='events' ref={layerRef}>
				{/* overflow-x should be like scroll or something */}
				{events.map((event, index) => (
					<>
					{index === layerIndex ? (
						<Rnd 	className={`layer-event`}
									size={{width: `${event.endTime - event.beginningTime}%`}}
									position={{ x: parseFloat((event.beginningTime / 100) * layerWidth), y: 0 }}
									enableResizing={Enable}
									dragAxis="x"
									bounds=".events"
									onDragStop={(e, d) => handleDrag(e, d, event, index)}
									onResizeStop={(e, direction, ref, delta, position) => handleResize(e, direction, ref, event, index, position)}
									key={index}
									onClick={() => toggleEditor(layerIndex, index)}
									style={{ left: `${event.beginningTime}% !important`}}
								>
							{/* //TODO: Change the p tag to be an svg icon */}
							<Icon src={event.icon} ref={eventRef}/>
							<p>{event.name} - From: {event.beginningTime.toFixed(1)}% - To: {event.endTime.toFixed(1)}%</p>
						</Rnd>
					) : null}
					</>
				))}
			</div>
		</Style>
		</>
	)
}

export default TrackLayer

