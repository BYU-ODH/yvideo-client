import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { subtitlesService } from 'services'

const SubtitlesContainer = props => {
	const {
		// subtitles, 
		currentTime, 
		handleShowSubtitle, 
		duration,
		mySubs 
	} = props
	
	//console.log(mySubs)
	let temp = mySubs

	for(let i = 0; i < temp.length; i++){
		let element = temp[i]
		//event start is a % not actuall time we are converting the percentage into time
		const start = element.start / 100 * duration
		const end = element.end / 100 * duration

		if(currentTime >= start && currentTime <= end){
			// console.log(element)
			//POP FROM NON VISITED AND SEND TO VISITED OR JUST DELETE WE DONT NEED IT ANYMORE?
			handleShowSubtitle(element.text)
			break;
		}
		else {
			handleShowSubtitle('')
		}

	}

	console.log('%c Subtitle Container', 'color: orange; font-weight: bolder; font-size: 12px;')

	return <div></div>
}

const mapStateToProps = ({ subtitlesStore }) => ({
	subtitles: subtitlesStore.cache,
	active: subtitlesStore.active,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SubtitlesContainer)
