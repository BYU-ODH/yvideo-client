import React, { useEffect, useState} from 'react'
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
				onMouseEnter={e => handleShowTip('name-of-tip', {x: e.clientX, y: e.clientY})} onMouseLeave={e => toggleTip()}
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

	const [name, setName] = useState('')
	const [position, setPosition] = useState(null)

	useEffect(() => {
		if(tip.active){
			document.getElementById("tip-box").style.visibility = "visible"
			document.getElementById("tip-box").style.opacity = 1
		}
		else {
			document.getElementById("tip-box").style.visibility = "hidden"
			document.getElementById("tip-box").style.opacity = 0
		}

		if(tip.props != undefined && tip.props.name){
			setName(tip.props.name)
			if(tip.props.position){
				setPosition(tip.props.position)
			}
		}
	}, [tip, name, position])

	const tips = {
		"help": 'Help documentation',
		"list-block": 'Change view',
		"manage-collections": 'Edit collections',
		"home": 'Home page',
		"menu": 'Menu',
		"collection-publish": "Show/Hide collection",
		"collection-permissions": "Edit who accesses this collection",
		"collection-edit-name": "Edit collection name",
		"collection-add-content": "Add content to collection",
		"content-edit": "Edit content",
	}

	// console.log("POSITION", position)

	return(
		<Style id="tip-box" position={position}><h3>{tips[`${name}`]}</h3></Style>
	)
}

const mapStoreToProps = store => ({
	tip: store.interfaceStore.tip,
})

export default connect(mapStoreToProps)(ToolTip)