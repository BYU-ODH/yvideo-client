import React, { useState, useRef, useEffect } from 'react'

import { useDrop } from 'react-dnd'
import { Rnd } from "react-rnd";

import {
	Icon, Style
} from './styles'

// TODO: Copy styles from NewTrackEditor used by these components into this file

// This is inspired from the React DnD example found here: https://react-dnd.github.io/react-dnd/examples/dustbin/multiple-targets

const TrackLayer = props => {

	const layerRef =  useRef(null)
	const eventRef =  useRef(null)

	const [layerWidth, setLayerWidth] = useState(0)

	 useEffect(() => {
		 setLayerWidth(layerRef.current.offsetWidth)
  });

	const Enable = {top:false, right:true, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}

	const { layer, onDrop } = props

	// Drag and Drop

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
	// collect: monitor => {
	// 	return {
	// 		isOver: monitor.isOver(),
	// 		canDrop: monitor.canDrop(),
	// 	}
	// },
	})

	const handleDrag = (e, d, event) => {
		const beginTimePercentage = (d.x / layerWidth) * 100
		const endTimePercentage = ((d.x + eventRef.current.offsetParent.offsetWidth) / layerWidth) * 100
		console.log('BEGINNING TIME:', beginTimePercentage)
		console.log('END TIME:', endTimePercentage)
		//LOGIC TO CHANGE THE TIME @params beginTime, endTime
	}

	const handleResize = (e, ref, event) => {
		console.log(e)
		console.log(ref.offsetWidth)

		//LOGIC TO CHANGE THE TIME @params beginTime, endTime
	}

	return (
		<Style className='layer' ref={dropRef} >
			<span className='handle'>
				<p>{layer.name}</p>
				{/* <HandleIcon /> */}
			</span>
			<div className='events' ref={layerRef}>
				{/* overflow-x should be like scroll or something */}
				{layer.events.map((event, index) => (
					<Rnd 	className='layer-event'
								default={{ x: 0, y: 50}}
								enableResizing={Enable}
								dragAxis="x"
								bounds="parent"
								onDragStop={(e, d) => handleDrag(e, d, event)}
								onResizeStop={(e, direction, ref, delta, position) => {handleResize(e, ref, event)}}
							>
						{/* //TODO: Change the p tag to be an svg icon */}
						<Icon src={event.icon} ref={eventRef}/>
						<p>{event.name}</p>
					</Rnd>
				))}
			</div>
		</Style>
	)
}

export default TrackLayer

