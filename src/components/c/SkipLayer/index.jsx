import React, { useState, useRef, useLayoutEffect } from 'react'

import { Rnd } from 'react-rnd'
import { convertSecondsToMinute } from '../../common/timeConversion'

import {
	Icon, Style,
} from './styles'

const SkipLayer = props => {

	const { events, width, videoLength} = props
	const layerIndex = parseInt(props.index)

	const layerRef = useRef(null)

	const [initialWidth, setInitialWidth] = useState(0)
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [layerOverlap, setLayerOverlap] = useState([])
	const [layerWidth, setLayerWidth] = useState(0)
	const [layerHeight, setLayerHeight] = useState(0)

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

	}, [width, events, layerOverlap])

	if(document.getElementsByClassName(`total`)[0] !== undefined && layerWidth !== 0){
		document.getElementById(`time-bar-container`).style.width = `${layerWidth - 2}px`
		document.getElementsByClassName(`total`)[0].style.width = `${layerWidth - 2}px`
		document.getElementById(`layer-time-indicator`).style.width = `${layerWidth}px`
	}
	const printEvents = (event, index) => {
		if(event.type !== `Skip`)
			return

		return (
			<Rnd
				className={`layer-event half-event`}
				id={`event-${index}`}
				bounds={`.layer-${layerIndex}`}
				size={{width: `${(event.end - event.start)/videoLength*layerWidth}px`, height: `31px`}}
				position={{ x: event.start/videoLength * layerWidth, y: 0}}
				key={index}
			>
				<Icon src={event.icon}/>
			</Rnd>
		)
	}

	return (
		<>
			<Style layerWidth={layerWidth} className='layer-container'>
				<div ref={layerRef} className='eventsbox'>
					<div className={`layer-${layerIndex} events half-event`}>
						{
							events !== undefined && events.length > 0 && videoLength !== 0? (
								<>
									{ events.map((event, index) => printEvents(event, index))}
								</>
							) : null
						}
					</div>
				</div>
			</Style>
		</>
	)
}

export default SkipLayer

