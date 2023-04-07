import React, { useState, useRef, useLayoutEffect } from 'react'

import { Rnd } from 'react-rnd'
import handleScrollFuncs from '../../common/toggleScroll'
import { calculateStartAndEndTimesForDrag, calculateStartAndEndTimesForResize, checkForErrors} from '../../common/editorCommon'

import {
	Style,
} from './styles'

const ClipLayer = props => {

	const {clipList, width, setStart, setEnd, videoLength, activeIndex, index, handleEditClip, handleEventPosition, setEventSeek} = props
	const layerRef = useRef(null)
	const dragRef = useRef(null)

	const [initialWidth, setInitialWidth] = useState(0)
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [layerWidth, setLayerWidth] = useState(0)
	const [disableScroll, setDisableScroll] = useState({action: null})
	const [showError, setShowError] = useState(false)

	const start = clipList[index][`start`]
	const end = clipList[index][`end`]

	const style = activeIndex !== index ?
		{
			top: `0px`,
			backgroundColor:`#fff`,
			border:`1.5px solid #0582ca`,
			color:`#000`,
			fontSize:`1.3rem`,
			justifyContent:`center`,
			alignItems:`center`,
		}
		:
		{
			left: `${start}% !important`,
			top: `0px`,
			backgroundColor:`var(--navy-blue)`,
			border:`1.5px solid #0582ca`,
			color:`#fff`,
			fontSize:`1.3rem`,
			justifyContent:`center`,
			alignItems:`center`,
		}

	if(shouldUpdate)
		setShouldUpdate(false)

	useLayoutEffect(() => {
		setInitialWidth(layerRef.current.offsetWidth)
		if(layerWidth === 0)
			setLayerWidth(layerRef.current.offsetWidth + width)
		else if (width === 0)
			setLayerWidth(initialWidth)
		else
			setLayerWidth(initialWidth + width)
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width])

	useLayoutEffect(() => {
		if(document.getElementsByClassName(`events`))
			handleScrollFuncs(Array.from(document.getElementsByClassName(`events`)), setDisableScroll, null)
		if(disableScroll.action !== null)
			disableScroll.action()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoLength])

	if(document.getElementsByClassName(`total`)[0] !== undefined && layerWidth !== 0) {
		document.getElementById(`time-bar-container`).style.width = `${layerWidth - 2}px`
		document.getElementsByClassName(`total`)[0].style.width = `${layerWidth - 2}px`
		document.getElementById(`layer-time-indicator`).style.width = `${layerWidth}px`
	}

	// This object is to tell the onReziseStop nevent for the Rnd component that resizing can only be right and left
	const Enable = {
		top: false,
		right: true,
		bottom: false,
		left: true,
		topRight: false,
		bottomRight: false,
		bottomLeft: false,
		topLeft: false,
	}
	// Drag within the layer
	const handleDrag = (d, index) => {
		let isError = false

		const clipTimes = calculateStartAndEndTimesForDrag(d, layerWidth, videoLength, start, end)

		isError = checkForErrors(index, clipList, videoLength, isError, clipTimes)

		clipList[index].start = clipTimes.start
		clipList[index].end = clipTimes.end

		setShowError(isError)
		setStart(clipTimes.start, null, index)
		setEnd(clipTimes.end, null, index)
	}
	// Resize within the layer
	const handleResize = (direction, ref, delta, e, position) => {
		const clipTimes = calculateStartAndEndTimesForResize(position, layerWidth, videoLength, ref, clipList, index, direction)

		setShowError(clipTimes.isError)

		direction === `right` ? setEnd(clipTimes.end, null, index) : setStart(clipTimes.start, null, index)
	}

	return (
		<>
			<Style layerWidth={layerWidth} showError={showError} className='layer-container'>
				{/* overflow-x should be like scroll or something */}
				<div ref={layerRef} className='clip-box'>
					<div className={`clip-layer-${index} events`}>
						<Rnd
							ref={dragRef}
							id='Rnd'
							data-testid='Rnd'
							size={{width: `${(end - start) / videoLength * layerWidth}px`, height: `46px`}}
							position={
								{
									x: start / videoLength * layerWidth === Infinity || isNaN(start / videoLength * layerWidth) ? 0 : start / videoLength * layerWidth ,
									y: 0,
								}}
							enableResizing={Enable}
							dragAxis='x'
							bounds={`.clip-layer-${index}`}
							onDrag={(e, d) => {
								handleDrag(d, index)
								setEventSeek(true)
								handleEventPosition(start)
							}}
							onDragStop={(e, d) => {
								handleDrag(d, index)
								setEventSeek(true)
								handleEventPosition(start)
							}}
							onClick = {() => {
								handleEditClip(index, index)
								// het
							}}
							onResize={(e, direction, ref, delta, position) => {
								handleResize(direction, ref, delta, e, position)
								setEventSeek(true)
								direction === `left` ? handleEventPosition(start) : handleEventPosition(end)
							}}
							key={`clip-${index}`}
							style={style}
						>
						</Rnd>
					</div>
				</div>
			</Style>
		</>
	)
}

export default ClipLayer

