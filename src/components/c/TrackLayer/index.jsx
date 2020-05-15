import React, { useState, useRef, useEffect } from 'react'

import { useDrop } from 'react-dnd'
import { Rnd } from "react-rnd";

import {
	Icon, Style
} from './styles'

// TODO: Copy styles from NewTrackEditor used by these components into this file

// This is inspired from the React DnD example found here: https://react-dnd.github.io/react-dnd/examples/dustbin/multiple-targets

const TrackLayer = props => {

	const { layer, onDrop} = props
	const layerIndex = parseInt(props.index)

	const layerRef =  useRef(null)
	const eventRef =  useRef(null)

	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [layerWidth, setLayerWidth] = useState(0)
	const [layerHeight, setLayerHeight] = useState(0)
	const [events, setEvents] = useState(layer.events)

	if(shouldUpdate){
		setShouldUpdate(false)
	}

	useEffect(() => {
		setLayerWidth(layerRef.current.offsetWidth)
		setLayerHeight(((layerRef.current.offsetHeight+2) * (layerIndex+1)) + 8)
  });

	//This object is to tell the onReziseStop nevent for the Rnd component that resizing can only be right and left
	const Enable = {top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}


	// Drag and Drop event to the layer
	const [collectedProps, dropRef] = useDrop({
		accept: `timeline-event`,
		drop: onDrop,
		// drop: item => {

		// 	// TODO: handle the drop action, add an event to the timeline
		// 	// HINT: The `item` parameter of this method is the event, you can find it in the Draggable component in components/bits

		// 	console.log(`you just dropped:`, item)
		// 	return { name: `Timeline` }
		// },
		hover: (item, monitor) => {

			// const {
			// 	clientOffset, // current mouse position relative to viewport
			// 	initialClientOffset, // where the mouse was when you grabbed the original element relative to the viewport
			// 	initialSourceClientOffset, // where the original drag element is on the page relative to viewport
			// } = monitor.internalMonitor.store.getState().dragOffset

		},

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

		setEvents(cEvents)
		setShouldUpdate(true)
	}
	//Resize within the layer
	const handleResize = (e, direction, ref, event, index, position) => {
		console.log(position)
		let cEvents = events
		const newWidthPercentage = (ref.offsetWidth / layerWidth) * 100

		cEvents[index].endTime = newWidthPercentage + event.beginningTime

		if(cEvents[index].endTime > 100){
			cEvents[index].endTime = 100
		}

		const beginPixel = (cEvents[index].beginningTime * layerWidth) /100
		const d = {x: beginPixel}

		//LOGIC TO CHANGE THE TIME @params beginTime, endTime
		setEvents(cEvents)
		setShouldUpdate(true)
	}

	return (
		<>
		<Style className='layer' ref={dropRef} >
			<span className='handle'>
				<p>{layer.name}</p>
				{/* <HandleIcon /> */}
			</span>
			<div className='events' ref={layerRef}>
				{/* overflow-x should be like scroll or something */}
				{layer.events.map((event, index) => (
					<Rnd 	className='layer-event'
								default={{x: 0, y: layerHeight, width: `${events[index].endTime - events[index].beginningTime}% !important`}}
								enableResizing={Enable}
								dragAxis="x"
								bounds="parent"
								onDragStop={(e, d) => handleDrag(e, d, event, index)}
								onResizeStop={(e, direction, ref, delta, position) => {handleResize(e, direction, ref, event, index, position)}}
								key={index}
							>
						{/* //TODO: Change the p tag to be an svg icon */}
						<Icon src={event.icon} ref={eventRef}/>
						<p>{event.name} (Start: {events[index].beginningTime.toFixed(2)}% - End: {events[index].endTime.toFixed(2)}%)</p>
					</Rnd>
				))}
			</div>
		</Style>
		</>
	)
}

export default TrackLayer

