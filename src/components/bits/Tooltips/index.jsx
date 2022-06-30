import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Style, {} from './styles.js'

/**
	Tooltip is a reusable component. The only line that changes from one tip to the other is the name of the desired tip

	Usage:
	@param name is the name of the tip to display. Example
	@param position is the position of the mouse event that triggered the tip

	Instructions:
		1. import toggleTip from interface service
		2. import component Tooltip from components/bits
			=> import { Tooltip } from 'components/bits'
		3. Paste the following function in the container:
			const handleShowTip = (@param tipName, @param position) => {
				toggleTip({
					component: Tooltip,
					props: {
						name: tipName,
						position: position,
					},
				})
			}
		4. Function on point 3 is to show the Tooltip component
		5. Paste the following mouse events in your element:
			<Element
				onMouseEnter={e => handleShowTip('name-of-tip', {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
				onMouseLeave={() => toggleTip()}
				></Element
		6. Make sure that all the necesary methods are available to your component.
		7. Make sure to close the tip once the actual click event happens.

	Adding a new tip:
		To add a new tip just go to the tips object and add a new tip with @string key and @string value
		Example: "help": 'Click to display help documentation',

	TODO: less padding. opacity. alpha alignment
*/

export const ToolTip = (props) => {

	const {
		tip,
	} = props

	const [name, setName] = useState(``)
	const [position, setPosition] = useState(null)

	useEffect(() => {
		if(window.innerWidth < 600){
			document.getElementById(`tip-box`).style.visibility = `hidden`
			return
		}
		if(tip.active){
			document.getElementById(`tip-box`).style.visibility = `visible`
			document.getElementById(`tip-box`).style.opacity = 1
		} else {
			document.getElementById(`tip-box`).style.visibility = `hidden`
			document.getElementById(`tip-box`).style.opacity = 0
		}

		if(tip.props && tip.props.name){
			setName(tip.props.name)
			if(tip.props.position)
				setPosition(tip.props.position)

		}
	}, [tip, name, position])

	const tips = {
		"actions": `Actions`,
		"closed-captions": `On/Off Captions`,
		"closed-captioning-on": `Captions on`,
		"closed-captioning-off": `Captions off`,
		"collection-add-content": `Add content to collection`,
		"collection-edit-name": `Edit collection name`,
		"fullscr": `Full-screen`,
		"help": `Help`,
		"list-block": `Change view`,
		"public-list-block": `Change view`,
		"menu": `Menu`,
		"next-sub": `Next Subtitle`,
		"MMSSMS": `MM:SS`,
		"HMMSSMS": `H:MM:SS`,
		"play": `Play`,
		"playback-rate": `Change video speed`,
		"prev-sub": `Previous Subtitle`,
		"published": `Published`,
		"unpublished": `Not published`,
		"restart": `Start Over`,
		"settings": `Settings`,
		"te-zoom": `Drag to zoom in/out`,
		"transcript-hide": `Show/Hide`,
		"translation": `Translations on`,
		"translation-off": `Translations off`,
		"transcript-seek": `Click to seek`,
		"definitions-disabled": `Definitions are not supported for this language`,
	}

	// console.log("POSITION", position)

	return(
		<Style id='tip-box' position={position}><h3>{tips[`${name}`]}</h3></Style>
	)
}

const mapStoreToProps = store => ({
	tip: store.interfaceStore.tip,
})

export default connect(mapStoreToProps)(ToolTip)
