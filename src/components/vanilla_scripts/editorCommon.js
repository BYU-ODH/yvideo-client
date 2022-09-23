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
			layerScrollWidth = document.getElementsByClassName(`events`)[0].scrollWidth
		else
			layerScrollWidth = document.getElementsByClassName(`events`).scrollWidth

		const scrollBarContainer = document.getElementById(`zoom-scroll-container`).getBoundingClientRect().width
		const dis = direction / scrollBarContainer

		scrubber.scrollLeft = scrubber.scrollWidth * dis
		timeIndicator.scrollLeft = scrubber.scrollWidth * dis
		scrubberContainer.scrollLeft = scrubber.scrollWidth * dis

		allLayers.forEach((_element, i) => {
			allLayers[i].scrollLeft = layerScrollWidth * dis
		})
		if(skipLayer)
			skipLayer.scrollLeft = layerScrollWidth * dis
	}
}

const updateZoom = () => {
	handleZoomChange(zoomParams.e, zoomParams.d, lengthParam, setWidthParam, videoTimeParam, setScrollBarParam, eventsBoxParam)
}

export const debouncedOnDrag = debounce(updateZoom, 25)
