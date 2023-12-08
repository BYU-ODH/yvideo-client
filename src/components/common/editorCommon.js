import debounce from './debounce/debounce.js'

let zoomParams
let lengthParam
let setWidthParam
let videoTimeParam
let setScrollBarParam
let eventsBoxParam

export const getParameters = (videoLength, setWidth, videoCurrentTime, setScrollBar, eventsBox) => {
	lengthParam = videoLength
	setWidthParam = setWidth
	videoTimeParam = videoCurrentTime
	setScrollBarParam = setScrollBar
	eventsBoxParam = eventsBox
}

export const handleZoomEandD = (e, d) => {
	zoomParams = {e, d}
}

const handleZoomChange = (_e, d, videoLength, setWidth, videoCurrentTime, setScrollBar, eventElements) => {
	let width = 0
	if(eventElements[0]){ // eventElements is any one of the Rnd containers
		const eventElemsVisWidth = eventElements[0].offsetWidth // width of the area that contains the subtitle Rnds
		width = d.x * videoLength / 10 /* when zoom controls are at 0 displacement, this is also 0 because this is telling the width of the portion of the layer that's not visible, or eventsBoxWidth - total width of the eventsbox
																			if the whole box (including what is not visible) is 3000px, and the visible portion is 500px, then width is 3000 - 500 = 2500px */
		setWidth(width) // this is setting layerWidth = total width of the eventsbox - width of the portion of the layer that's not visible
		handleScrollFactor(videoCurrentTime * .95 / videoLength, true)
		if(document.getElementsByClassName(`layer-container`)[0] && document.getElementsByClassName(`events`)[0])
			setScrollBar(document.getElementsByClassName(`layer-container`)[0].clientWidth * 100 / (eventElemsVisWidth + width))
	}
}

export const handleScrollFactor = (direction, zoom) => {
	if(document.getElementsByClassName(`layer-container`) && document.getElementById(`zoom-scroll-container`)){
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

		const scrollBarContainer = document.getElementById(`zoom-scroll-container`).getBoundingClientRect().width
		let scrollBarWidth = 0
		if (!zoom)
			scrollBarWidth = Math.ceil(Array.from(document.getElementsByClassName(`zoom-scroll-indicator react-draggable react-draggable-dragged`))[0].getBoundingClientRect().width)

		const dis = Math.floor(scrollBarContainer) > direction + scrollBarWidth || direction === 0 ? direction / scrollBarContainer : 1.0

		timeIndicator.scrollLeft = scrubber.getBoundingClientRect().width * dis
		scrubberContainer.scrollLeft = scrubber.getBoundingClientRect().width * dis

		allLayers.forEach((_element, i) => {
			allLayers[i].scrollLeft = layerScrollWidth * dis
		})
		if(skipLayer)
			skipLayer.scrollLeft = layerScrollWidth * dis
	}
}

export const handleElapsed = (time, setElapsed) => {
	setElapsed(time)
}

export const updateZoom = () => {
	handleZoomChange(zoomParams.e, zoomParams.d, lengthParam, setWidthParam, videoTimeParam, setScrollBarParam, eventsBoxParam)
}

export const debouncedOnDrag = debounce(updateZoom, 25)

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
