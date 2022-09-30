import React, { useState, useRef, useLayoutEffect } from 'react'

import { Rnd } from 'react-rnd'
import { handleScrollFuncs } from '../../vanilla_scripts/toggleScroll'

import {
	Style,
} from './styles'

const ClipLayer = props => {

	const {clipName, clipList, width, setStart, setEnd, videoLength, active, index, handleEditClip} = props
	const layerRef = useRef(null)
	const dragRef = useRef(null)

	const [initialWidth, setInitialWidth] = useState(0)
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [layerWidth, setLayerWidth] = useState(0)
	const [disableScroll, setDisableScroll] = useState({action: null})

	const start = clipList[clipName][`start`]
	const end = clipList[clipName][`end`]

	const style = active !== clipName ?
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
			handleScrollFuncs(document.getElementsByClassName(`events`), setDisableScroll, null)
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
	const handleDrag = (d) => {

		const beginTimePercentage = d.x / layerWidth * videoLength
		const endPercentage = beginTimePercentage + (end - start)
		// LOGIC TO CHANGE THE TIME @params beginTime, end
		let s = beginTimePercentage
		let e = endPercentage
		if(e > videoLength)
			e = videoLength

		if(s < 0)
			s = 0
		// call handler from parent
		setStart(s, null, clipName)
		setEnd(e, null, clipName)
	}
	// Resize within the layer
	const handleResize = (direction, ref, delta, event, index, e ) => {
		let s = start
		let en = end
		const difference = delta.width / layerWidth * videoLength
		if(direction === `right`){
			en += difference

			if(en > videoLength)
				en = videoLength

		} else {
			s -= difference
			if(s < 0)
				s = 0
			else if(s > videoLength){
				s = videoLength - 30
				en = videoLength
			}
		}
		setStart(s, null, clipName)
		setEnd(en, null, clipName)
	}
	// eslint-disable-next-line no-unused-vars
	const curr = {...dragRef.current}
	return (
		<>
			<Style layerWidth={layerWidth} className='layer-container'>
				{/* overflow-x should be like scroll or something */}
				<div ref={layerRef} className='clip-box'>
					<div className={`clip-layer-${clipName} events`}>
						<Rnd
							ref={dragRef}
							className={`Rnd`}
							data-testid='Rnd'
							size={{width: `${(end - start) / videoLength * layerWidth}px`, height: `46px`}}
							position={
								{
									x: start / videoLength * layerWidth === Infinity || isNaN(start / videoLength * layerWidth) ? 0 : start / videoLength * layerWidth ,
									y: 0,
								}}
							enableResizing={Enable}
							dragAxis='x'
							bounds={`.clip-layer-${clipName}`}
							onDragStop={(e, d) => {

								handleDrag(d)
							}}
							onClick = {() => handleEditClip(clipName, index)}
							onResizeStop={(e, direction, ref, delta, position) => handleResize(direction, ref, delta, e, position)}
							key={`clip-${clipName}`}
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

