import React, { useState, useRef, useLayoutEffect } from 'react'

import { Rnd } from 'react-rnd'
import skipIcon from 'assets/event_skip_gray.svg'

import { convertSecondsToMinute } from '../../common/timeConversion'

import { Icon, Style } from './styles'

const SkipLayer = props => {

	const { events, width, videoLength } = props
	const layerIndex = parseInt(props.index)

	const layerRef = useRef(null)
	const Enable = {top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}

	const [initialWidth, setInitialWidth] = useState(0)
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [layerOverlap, setLayerOverlap] = useState([]) // eslint-disable-line no-unused-vars
	const [layerWidth, setLayerWidth] = useState(0)
	const [layerHeight, setLayerHeight] = useState(0) // eslint-disable-line no-unused-vars
	const [tickArray, setTickArray] = useState(Array.from(Array(5).keys())) // eslint-disable-line no-unused-vars

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
				size={{width: `${(event.end - event.start) / videoLength * layerWidth}px`, height: `31px`}}
				position={{ x: event.start / videoLength * layerWidth, y: 0}}
				key={index}
				enableResizing={Enable}
				disableDragging={true}
			>
				<Icon src={skipIcon}/>
			</Rnd>
		)
	}
	const timeMarks = () => {
		if(!videoLength) return
		const ticks = []
		let tickInt = 0
		switch (true) {
		case videoLength < 300:
			tickInt = 30
			break
		case videoLength < 600:
			tickInt = 60
			break
		case videoLength < 1200:
			tickInt = 120
			break
		case videoLength < 3600:
			tickInt = 600
			break
		case videoLength < 7200:
			tickInt = 900
			break
		case videoLength < 10800:
			tickInt = 1800
			break
		default:
			console.log(`This video is too long!`) // eslint-disable-line no-console
			return
		}
		const tickNum = (videoLength - videoLength % tickInt) / tickInt
		for(let i = 0; i < tickNum + 1; i++){
			ticks.push(
				<div className='timemarker' key={i} style={{left:`${tickInt / videoLength * i * 100}%`}}>
					<div className='tickbar'>
					</div>
					<p className='time'>{convertSecondsToMinute(tickInt * i)}</p>
				</div>,
			)
		}
		return ticks
	}
	return (
		<Style layerWidth={layerWidth} className='layer-container'>
			<div ref={layerRef} className='eventsbox'>
				<div id={`layer-skip`} className={`layer-skip} events half-event`}>
					{
						events !== undefined && events.length > 0 && videoLength !== 0 ? (
							<>
								{ events.map((event, index) => printEvents(event, index))}
							</>
						) : null
					}
					{timeMarks()}
				</div>
			</div>
		</Style>
	)
}

export default SkipLayer

