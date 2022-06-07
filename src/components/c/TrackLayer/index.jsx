import React, { useState, useRef, useLayoutEffect } from 'react'

import { Rnd } from 'react-rnd'
import { convertSecondsToMinute } from '../../common/timeConversion'

import {
	Icon, Style,
} from './styles'

// TODO: Copy styles from NewTrackEditor used by these components into this file

// This is inspired from the React DnD example found here: https://react-dnd.github.io/react-dnd/examples/dustbin/multiple-targets

const TrackLayer = props => {

	const {
		events,
		updateEvents,
		activeEvent,
		width,
		videoLength,
		displayLayer,
		handleEventPosition,
		setEventSeek,
	} = props
	const layerIndex = parseInt(props.index)

	const layerRef = useRef(null)

	const [initialWidth, setInitialWidth] = useState(0)
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [layerOverlap, setLayerOverlap] = useState([])
	const [layerWidth, setLayerWidth] = useState(0)
	// eslint-disable-next-line no-unused-vars
	const [layerHeight, setLayerHeight] = useState(0)
	if(shouldUpdate)
		setShouldUpdate(false)

	useLayoutEffect(() => {

		setLayerHeight(layerRef.current.offsetHeight*layerIndex)

		if(events && layerIndex === 3){
			// we are in censor, calculate overlapping
			// overlap count tells us how many half layers we need
			const overlapCount = calculateOverlaps()

			if(overlapCount.length !== layerOverlap.length) setLayerOverlap(overlapCount)

			document.getElementById(`layer-${layerIndex}`).style.height =
			`${overlapCount.length !== 0 ?
				26 * (overlapCount.length + 1)
				: 46}px`
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width, events, layerOverlap])
	useLayoutEffect(()=>{

		setInitialWidth(layerRef.current.offsetWidth)
		if(layerWidth === 0)
			setLayerWidth(layerRef.current.offsetWidth + width)
		else if (width === 0)
			setLayerWidth(initialWidth)
		else
			setLayerWidth(layerWidth + width)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[width])
	if(document.getElementById(`timeBarProgress`) !== undefined && layerWidth !== 0){
		document.getElementById(`time-bar-container`).style.width = `${layerWidth - 2}px`
		document.getElementById(`timeBarProgress`).style.width = `${layerWidth - 2}px`
		document.getElementById(`layer-time-indicator`).style.width = `${layerWidth}px`
	}
	// This object is to tell the onReziseStop nevent for the Rnd component that resizing can only be right and left
	const Enable = {top:false, right:true, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}
	// This object is to overwrite the css properties of the right and left side of the Rnd
	const resizeSpace = {right: {borderRight: `1.5px solid var(--light-blue)`, width: `2px`, height: `100%`, right: `0px`, padding: `1px`}, left: {borderLeft: `1.5px solid var(--light-blue)`, width: `2px`, height: `100%`, left: `0px`, padding: `1px`} }

	const calculateOverlaps = () => {
		const sortedEvents = JSON.parse(JSON.stringify(events))
		sortedEvents.sort((a, b) => {
			return a.start - b.start
		})
		let lastCensorEvent = null
		const overlapCount = []
		let halfLayer = 0

		for(let i = 0; i < sortedEvents.length; i++){
			const currentEvent = sortedEvents[i]

			if(currentEvent.type === `Censor`){
				const eventIndex = events.findIndex((event) => currentEvent.start === event.start && currentEvent.type === event.type)
				if(lastCensorEvent === null){

					events[eventIndex].halfLayer = halfLayer
					lastCensorEvent = currentEvent
					continue
				} else {
					// compare previous and current
					// if current overlaps with previous
					if((currentEvent.start >= lastCensorEvent.start && currentEvent.start <= lastCensorEvent.end) || (currentEvent.end >= lastCensorEvent.start && currentEvent.end <= lastCensorEvent.end)){ // eslint-disable-line no-extra-parens
						// find index in the main events object
						// we find the first overlap so pass anything from beginning to now
						halfLayer++
						overlapCount.push(halfLayer)
					}
				}

				events[eventIndex].halfLayer = halfLayer

				lastCensorEvent = currentEvent
			}
		}

		// if there is one overlap we need 2 half layers. for every overlap one half layer more is added
		return overlapCount
	}

	const handleDrag = (d, event, index) => {
		const cEvents = events
		const beginTimePercentage = d.x/layerWidth*100*videoLength/100
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
		// calculateOverlaps(events)
	}

	// Resize within the layer
	const handleResize = (direction, ref, delta, event, index, e, position) => {

		const cEvents = events
		const difference = delta.width / layerWidth * 100*videoLength/100
		if(direction === `right`){
			cEvents[index].end += difference

			if(cEvents[index].end > videoLength)
				cEvents[index].end = videoLength

		} else {
			cEvents[index].start -= difference

			if(cEvents[index].start < 0)
				cEvents[index].start = 0
			else if(cEvents[index].start > videoLength){
				cEvents[index].start = videoLength-0.001
				cEvents[index].end = videoLength
			}
		}

		updateEvents(index, cEvents[index], layerIndex)
	}

	const printEvents = (event, index, isMultiEvent) => {
		if(event[`layer`] !== layerIndex)
			return

		return (
			<Rnd
				className={
					`layer-event
					${isMultiEvent ? `half-event`:``}
					${activeEvent === index ? `active-event` : ``}`}
				id={`event-${index}`}
				bounds={`.layer-${layerIndex}`}
				size={
					{
						width: `${(event.end - event.start) / videoLength * layerWidth}px`,
						height: `${isMultiEvent ? 23 : 46}px`,
					}
				}
				position={{ x: event.start / videoLength * layerWidth, y: 0}}
				resizeHandleStyles={resizeSpace}
				enableResizing={Enable}
				dragAxis='x'
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
				key={index}
			>
				{/* //TODO: Change the p tag to be an svg icon */}
				<Icon src={event.icon} className={isMultiEvent ? `half-icon` : ``}/>
				{ event.type !== `Pause` ? (
					<p>{convertSecondsToMinute(event.start, videoLength)} - {convertSecondsToMinute(event.end, videoLength)}</p>
				) : (
					<p>{convertSecondsToMinute(event.start, videoLength)}</p>
				)
				}
			</Rnd>
		)
	}

	return (
		<>
			<Style layerWidth={layerWidth} className='layer-container'>
				{/* overflow-x should be like scroll or something */}
				{layerIndex !== 3 &&
					<div ref={layerRef} className='eventsbox'>
						<div className={`layer-${layerIndex} events ${displayLayer === layerIndex ? `active-layer` : ``}`}>
							{
								events !== undefined && events.length > 0 && videoLength !== 0? (
									<>
										{ events.map((event, index) => printEvents(event, index, false))}
									</>
								) : null
							}
						</div>
					</div>
				} {/* new layer function that will provide maximum layer overlap */ }
				{layerIndex === 3 && layerOverlap !== null &&
					<div ref={layerRef} className='eventsbox'>
						<div
							className={`layer-${layerIndex} ${layerOverlap.length > 0 ? `half-layer` : ``} events ${displayLayer === layerIndex ? `active-layer` : ``}`}
							style={
								{
									marginTop: layerOverlap.length > 0 ?
										`${26 * layerOverlap.length}px`
										: `0px`,
									backgroundColor: `rgba(5, 130, 202, 0.1)`,
								}
							}
						>
							{
								events !== undefined && events.length > 0 && videoLength !== 0 ? (
									<>
										{events.map((event, index) =>
											event.halfLayer === 0 || event.halfLayer === undefined ?
												printEvents(event, index, layerOverlap.length > 0)
												:
												null,
										)}
									</>
								) : null
							}
						</div>
						{ layerOverlap.map((halfLayer, overlapIndex) => (
							<div key={overlapIndex} className={`layer-${layerIndex} half-layer events ${displayLayer === layerIndex ? `active-layer` : ``}`}
								style={
									{
										marginTop: overlapIndex > 0 ?
											`${26 * overlapIndex}px`
											: `0px`,
										backgroundColor: overlapIndex % 2 !== 0 ?
											`rgba(5, 130, 202, 0.1)`
											: ``,
									}}
							>
								{
									events !== undefined && events.length > 0 && videoLength !== 0 && halfLayer !== 0 ? (
										<>
											{events.map((event, index) =>
												event.halfLayer === halfLayer ? printEvents(event, index, true) : null,
											)}
										</>
									) : null
								}
							</div>
						))
						}
					</div>
				}
			</Style>
		</>
	)
}

export default TrackLayer
