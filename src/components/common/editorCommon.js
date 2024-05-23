import debounce from './debounce/debounce.js'

let zoomParams
let lengthParam
let setWidthParam
let videoTimeParam
let setScrollBarWidthParam
let eventsBoxParam
let scrollThumbWidthInPixels
let scrollThumbPositionRatio
let scrollThumbWidthValue

export const getParameters = (videoLength, setLayerWidth, videoCurrentTime, setScrollBarWidth, eventsBox) => {
	lengthParam = videoLength
	setWidthParam = setLayerWidth
	videoTimeParam = videoCurrentTime
	setScrollBarWidthParam = setScrollBarWidth
	eventsBoxParam = eventsBox
}

export const handleZoomEandD = (e, d) => {
	zoomParams = {e, d}
}

const handleZoomChange = (_e, d, videoLength, setLayerWidth, videoCurrentTime, setScrollBarWidth, eventElements) => {
	let zoomThumbPosition = d.x
	let widthOfInvisiblePortionOfVideoInPixels = 0
	if(eventElements[0]){ // eventElements is any one of the Rnd containers
		const eventElemsVisWidth = eventElements[0].offsetWidth // width of the area that contains the events Rnds
		widthOfInvisiblePortionOfVideoInPixels = zoomThumbPosition * videoLength / 10 /* when zoom controls are at 0 displacement, this is also 0 because this is telling the width of the portion of the layer that's not visible, or eventsBoxWidth - total width of the eventsbox
																			if the whole box (including what is not visible) is 3000px, and the visible portion is 500px, then width is 3000 - 500 = 2500px */
		console.log("zoomThumbPosition: " + zoomThumbPosition)
		console.log("width: " + widthOfInvisiblePortionOfVideoInPixels)
		console.log("-----")
		setLayerWidth(widthOfInvisiblePortionOfVideoInPixels) // this is setting layerWidth = total width of the eventsbox - width of the portion of the layer that is visible
		handleScrollFactor(videoCurrentTime * .95 / videoLength, true) //**Suspect #1 - 0.95**
		// console.log("videoCurrentTime * .95: "+ videoCurrentTime * .95)
		// console.log("videoLength: "+ videoLength)
		// if(document.getElementsByClassName(`layer-container`)[0] && document.getElementsByClassName(`events`)[0])
		// 	setScrollBarWidth(document.getElementsByClassName(`layer-container`)[0].clientWidth * 100 / (eventElemsVisWidth + width))
		// console.log("XXXXX: "+scrollBarWidth)
		//8***********8
		if (document.getElementsByClassName(`layer-container`)[0] && document.getElementsByClassName(`events`)[0]) {
            scrollThumbWidthValue = document.getElementsByClassName(`layer-container`)[0].clientWidth * 100 / (eventElemsVisWidth + widthOfInvisiblePortionOfVideoInPixels)
			setScrollBarWidth(scrollThumbWidthValue)
}
}
}
  
export const handleScrollFactor = (scrollThumbPosition, zoom) => {
	if(document.getElementsByClassName(`layer-container`) && document.getElementById(`scroll-track`)){
		const scrubberContainer = document.getElementById(`time-bar`)
		const scrubber = document.getElementById(`time-bar-progress`)
		const timeIndicator = document.getElementById(`time-indicator-container`)
		const allLayers = Array.from(document.getElementsByClassName(`layer-container`))
		const skipLayer = document.getElementById(`layer-skip`)

		let layerScrollWidth

		if(document.getElementsByClassName(`events`).length >= 1)
			layerScrollWidth = document.getElementsByClassName(`events`)[0].getBoundingClientRect().width
		else
			layerScrollWidth = document.getElementsByClassName(`events`).getBoundingClientRect().width

		console.log("layerScrollWidth: "+ layerScrollWidth)
		const scrollTrackWidth = document.getElementById(`scroll-track`).getBoundingClientRect().width

		if (!zoom){
			scrollThumbWidthInPixels = Math.ceil(document.getElementById(`scroll-thumb`).getBoundingClientRect().width)
			scrollThumbPositionRatio = Math.floor(scrollTrackWidth) > scrollThumbPosition + scrollThumbWidthInPixels || scrollThumbPosition === 0 ? scrollThumbPosition / scrollTrackWidth : 1.0		
		}

		// console.log("scrollThumbWidthValue: "+ scrollThumbWidthValue)
		// console.log("scrollThumbWidthInPixels: "+ scrollThumbWidthInPixels)
		// console.log("scrollThumbPosition: "+ scrollThumbPosition)
		// console.log("scrollTrackWidth: "+ scrollTrackWidth)
		// console.log("scrollThumbPositionRatio: "+ scrollThumbPositionRatio)
		// console.log("=====")

				
		const availableSpaceRight = scrollTrackWidth - scrollThumbPosition - scrollThumbWidthInPixels;
		const spaceLeftRatio = availableSpaceRight >= 0 ? 1.0 : scrollThumbWidthValue / scrollTrackWidth;

		// console.log("availableSpaceRight:" + availableSpaceRight)
		// console.log("spaceLeftRatio:" + spaceLeftRatio)

		if (availableSpaceRight <= 0) {
            // If availableSpaceRight is negative, move the scrollbar to the left
			// left space = scrollthumbwidthvalue * scrollThumbPositionRatio
			const leftSpace = scrollThumbWidthValue * scrollThumbPositionRatio
			console.log("leftSpace: " + leftSpace)
        }

		timeIndicator.scrollLeft = scrubber.getBoundingClientRect().width * scrollThumbPositionRatio
		scrubberContainer.scrollLeft = scrubber.getBoundingClientRect().width * scrollThumbPositionRatio

		allLayers.forEach((_element, i) => {
			allLayers[i].scrollLeft = layerScrollWidth * scrollThumbPositionRatio
		})
		if(skipLayer)
			skipLayer.scrollLeft = layerScrollWidth * scrollThumbPositionRatio
	}
}

export const handleElapsed = (time, setElapsed) => {
	setElapsed(time)
}

export const updateZoom = () => {
	handleZoomChange(zoomParams.e, zoomParams.d, lengthParam, setWidthParam, videoTimeParam, setScrollBarWidthParam, eventsBoxParam);
  };

export const debounceUpdateZoom = debounce(updateZoom, 25)

export const calculateStartAndEndTimesForDrag = (d, layerWidth, videoLength, start, end) => {
	const beginTimePercentage = d.x / layerWidth * videoLength
	const endPercentage = beginTimePercentage + (end - start)

	start = beginTimePercentage
	end = endPercentage

	if(end > videoLength)
		end = videoLength

	if(start < 0)
		start = 0

	return {start, end}
}

export const calculateStartAndEndTimesForResize = (position, layerWidth, videoLength, ref, cEvents, index, direction) => {
	let isError = false
	let start = position.x / layerWidth * videoLength
	let end = (position.x + ref.offsetWidth) / layerWidth * videoLength

	if(direction === `right`){
		if(end > videoLength)
			end = videoLength
		if(index + 1 < cEvents.length){
			if(end > cEvents[index + 1].start)
				isError = true
		}
	} else {
		if(start < 0)
			start = 0
		else if(start > videoLength){
			start = videoLength - 0.01
			end = videoLength
		}
		if(index - 1 > -1){
			if(start < cEvents[index - 1].end)
				isError = true
		}
	}
	return {start, end, isError}
}

export const checkForErrors = (index, cEvents, videoLength, isError, clipTimes) => {
	if(index === 0 && index + 1 === cEvents.length)
		isError = false
	else if(index + 1 === cEvents.length) {
		if(cEvents[index].end > videoLength)
			cEvents[index].end = videoLength

		if(clipTimes.start < cEvents[index - 1].end)
			isError = true
	} else if(index === 0) {
		if(cEvents[index].start < 0)
			cEvents[index].start = 0

		if(clipTimes.end > cEvents[index + 1].start)
			isError = true
	} else if(clipTimes.end > cEvents[index + 1].start || clipTimes.start < cEvents[index - 1].end)
		isError = true
	return isError
}
