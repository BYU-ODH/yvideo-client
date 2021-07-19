import React, { useState, useRef, useLayoutEffect } from 'react'

import { useDrop } from 'react-dnd'
import { Rnd } from 'react-rnd'

import {
	Icon, Style,
} from './styles'

// TODO: Copy styles from NewTrackEditor used by these components into this file

// This is inspired from the React DnD example found here: https://react-dnd.github.io/react-dnd/examples/dustbin/multiple-targets

const SubtitlesLayer = props => {

	// console.log('%c Layer Component', 'color: blue; font-weight: bolder; font-size: 12px;')

	const { subs, sideEditor, updateSubs, activeEvent, width, videoLength, displayLayer} = props
	const layerIndex = props.layer
	const subIndex = parseInt(props.index)
	const layerRef = useRef(null)

	const [initialWidth, setInitialWidth] = useState(0)
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [layerWidth, setLayerWidth] = useState(0)
	const [layerHeight, setLayerHeight] = useState(0)
	const [isEditorOpen, setEditorOpen] = useState(false)
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
		accept: `subtitle-event`,
		// drop: onDrop,
		hover: (item, monitor) => {},
	})
	// Drag within the layer
	const handleDrag = (d, event, index) => {
		const cEvents = subs
		const beginTimePercentage = d.x / layerWidth * 100
		const endPercentage = beginTimePercentage + (event.end - event.start)

		// LOGIC TO CHANGE THE TIME @params beginTime, end
		cEvents[index].start = beginTimePercentage
		cEvents[index].end = endPercentage

		if(cEvents[index].end > 100)
			cEvents[index].end = 100

		if(cEvents[index].start < 0)
			cEvents[index].start = 0
		// call handler from parent
		updateSubs(index, cEvents[index],layerIndex)
	}
	// Resize within the layer
	const handleResize = (direction, ref, delta, event, index, e ) => {
		const cEvents = subs
		const difference = delta.width / layerWidth * 100
		if(direction === `right`){
			cEvents[index].end += difference

			if(cEvents[index].end > 100)
				cEvents[index].end = 100

		} else {
			cEvents[index].start -= difference

			// console.log(cEvents[index])
			if(cEvents[index].start < 0)
				cEvents[index].start = 0
			else if(cEvents[index].start > 100){
				cEvents[index].start = 99
				cEvents[index].end = 100
			}
		}
		updateSubs(index, cEvents[index],layerIndex)
	}

	// This opens the side tab editor
	const toggleEditor = (layerIndex, subIndex) => {
		// setEditorOpen(true)
		sideEditor(layerIndex, subIndex)
	}

	const printEvents = (event, index) => {
		return (
			<Rnd
				className={`layer-event ${activeEvent === index && layerIndex === displayLayer ? `active-event` : ``}`}
				id={`event-${index}`}
				size={{width: `${(event.end - event.start)/100 * layerWidth}px`, height: `46px`}}
				position={{ x: parseFloat(event.start / 100 * layerWidth), y: 0}}
				enableResizing={Enable}
				dragAxis='x'
				bounds={`.layer-${layerIndex}`}
				onDragStop={(e, d) => handleDrag(d, event, index)}
				onResizeStop={(e, direction, ref, delta, position) => handleResize(direction, ref, delta, event, index, e, position)}
				key={index}
				onClick={() => toggleEditor(layerIndex, index)}
				style={{ left: `${event.start}% !important`, top: `-${layerHeight}px !important`}}
			>
				{/* //TODO: Change the p tag to be an svg icon */}
				{ event.type !== `Pause` ? (
					// <p>{event.text} - From: {(event.start / 100 * videoLength).toFixed(1)}s - To: {(event.end / 100 * videoLength).toFixed(1)}s</p>
					<p>{event.text}</p>
				) : (
					// <p>{event.type} - At: {(event.start / 100 * videoLength).toFixed(1)}s</p>
					<p>{event.type}</p>
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
							subs !== undefined ? (
								<>
									{subs.map((event, index) => (
										<div key={index}>
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

