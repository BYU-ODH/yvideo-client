import React, { useState } from 'react'

import { useDrop } from 'react-dnd'

import {
	Icon,
} from './styles'

// TODO: Copy styles from NewTrackEditor used by these components into this file

// This is inspired from the React DnD example found here: https://react-dnd.github.io/react-dnd/examples/dustbin/multiple-targets

const TrackLayer = props => {

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

	return (
		<div className='layer' ref={dropRef} >
			<span className='handle'>
				<p>{layer.name}</p>
				{/* <HandleIcon /> */}
			</span>
			<span className='events'>
				{/* overflow-x should be like scroll or something */}
				{layer.events.map((event, index) => (
					<span className='layer-event' key={index}>
						{/* //TODO: Change the p tag to be an svg icon */}
						<Icon src={event.icon}/>
						<p>{event.name}</p>
					</span>
				))}
			</span>
		</div>
	)
}

export default TrackLayer

