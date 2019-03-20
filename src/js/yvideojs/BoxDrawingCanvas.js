const BoxDrawingCanvas = (() => {
	"use strict"

	computeRenderedMetrics = (image, imgHolder) => {

		// Figure out the scale factor
		const xScale = imgHolder.clientWidth / image.width
		const yScale = imgHolder.clientHeight / image.height
		let scale = Math.min(xScale, yScale)

		// If the image is smaller than the holder then the scale factor is 1
		if (image.width <= imgHolder.clientWidth && image.height <= imgHolder.clientHeight)
			scale = 1

		// Compute the metrics and return them
		const width = image.width * scale
		const height = image.height * scale
		const top = (imgHolder.clientHeight - height) / 2
		const left = (imgHolder.clientWidth - width) / 2
		return {
			width,
			height,
			top,
			left
		}
	}

	class BoxDrawingCanvas {

		constructor(image, imgHolder) {
			const metrics = computeRenderedMetrics(image, imgHolder)
			let drawable = false
			let drawing = false

			const element = Ayamel.utils.parseHTML(`<div class="boxDrawingCanvas" style="` +
				`position:absolute;` +
				`width:${metrics.width}px;` +
				`height:${metrics.height}px;` +
				`top:${metrics.top}px;` +
				`left:${metrics.left}px;"></div>`)

			this.element = element
			imgHolder.appendChild(element)
			element.addEventListener(`mousedown`, event => {

				if (!drawable || drawing)
					return

				const x = event.pageX - element.offsetLeft
				const y = event.pageY - element.offsetTop
				drawing = true

				// Create and dispatch an event
				const newEvent = document.createEvent(`HTMLEvents`)
				newEvent.initEvent(`drawstart`, true, true)
				newEvent.drawX = x / element.clientWidth
				newEvent.drawY = y / element.clientHeight
				this.dispatchEvent(newEvent)
			}, false)
			document.body.addEventListener(`mousemove`, event => {
				if (!drawing)
					return
				const x = event.pageX - element.offsetLeft
				const y = event.pageY - element.offsetTop

				// Create and dispatch an event
				const newEvent = document.createEvent(`HTMLEvents`)
				newEvent.initEvent(`drawupdate`, true, true)
				newEvent.drawX = x / element.clientWidth
				newEvent.drawY = y / element.clientHeight
				element.dispatchEvent(newEvent)
			}, false)
			document.body.addEventListener(`mouseup`, event => {
				if (!drawing)
					return
				const x = event.pageX - element.offsetLeft
				const y = event.pageY - element.offsetTop
				drawing = false

				// Create and dispatch an event
				const newEvent = document.createEvent(`HTMLEvents`)
				newEvent.initEvent(`drawend`, true, true)
				newEvent.drawX = x / element.clientWidth
				newEvent.drawY = y / element.clientHeight
				element.dispatchEvent(newEvent)
			}, false)
			Object.defineProperties(this, {
				drawable: {
					get() {
						return drawable
					},
					set(val) {
						drawable = val
						element.classList[drawable ? `add` : `remove`](`drawable`)
					}
				}
			})
		}

		addEventListener(eventName, handler, capture) {
			this.element.addEventListener(eventName, handler, capture)
		}

		drawBox(x1, y1, x2, y2, classes, content) {
			const box = new Box(x1, y1, x2, y2, classes, content)
			this.element.appendChild(box.element)
			return box
		}
	}

	placeElement = (element, x1, y1, x2, y2) => {
		element.style.left = `${x1 * 100}%`
		element.style.top = `${y1 * 100}%`
		element.style.right = `${(1 - x2) * 100}%`
		element.style.bottom = `${(1 - y2) * 100}%`
	}

	getParentPosition = (event, parent) => {
		return [(event.pageX - parent.offsetLeft) / parent.clientWidth, (event.pageY - parent.offsetTop) / parent.clientHeight]
	}

	class Box {
		constructor(x1, y1, x2, y2, classes, content) {
			let resizable = false
			let resizeDir = 0
			let resizing = false
			let resizeStart = [0, 0]
			let resizeStartState = [0, 0, 1, 1]
			let selectable = false
			const _this = this
			const element = document.createElement(`div`)
			element.style.position = `absolute`
			element.style.zIndex = `50`
			this.element = element

			placeElement(element, x1, y1, x2, y2)

			if (classes && classes.length)
				element.className = classes.join(` `)

			if (content)
				element.innerHTML = content

			// Set up the mouse functionality
			element.addEventListener(`mousemove`, event => {
				if (resizing && !resizable)
					return

				const x = event.offsetX
				const y = event.offsetY
				const width = element.offsetWidth
				const height = element.offsetHeight
				const buffer = 10

				if (x <= buffer) {
					resizeDir = 1
					element.style.cursor = `w-resize`
				} else if (x >= width - buffer) {
					resizeDir = 3
					element.style.cursor = `e-resize`
				} else if (y <= buffer) {
					resizeDir = 2
					element.style.cursor = `n-resize`
				} else if (y >= height - buffer) {
					resizeDir = 4
					element.style.cursor = `s-resize`
					return
				} else {
					resizeDir = 0
					element.style.cursor = `inherit`
				}

				event.stopPropagation()

				// Create and dispatch an event
				const newEvent = document.createEvent(`HTMLEvents`)
				newEvent.initEvent(`resizestart`, true, true)
				newEvent.box = _this

				this.dispatchEvent(newEvent)

			}, false)

			element.addEventListener(`mousedown`, event => {
				if (resizeDir) {
					event.stopPropagation()

					// Figure out at what percentage we are starting to resize
					resizeStart = getParentPosition(event, element.parentNode)
					resizeStartState = [x1, y1, x2, y2]
					resizing = true
				}
			}, false)

			element.addEventListener(`click`, event => {
				if (!selectable || resizing)
					return

				event.stopPropagation()

				// Create and dispatch an event
				const newEvent = document.createEvent(`HTMLEvents`)
				newEvent.initEvent(`select`, true, true)
				newEvent.box = _this
				this.dispatchEvent(newEvent)
			}, false)

			document.body.addEventListener(`mousemove`, event => {
				if (!resizing)
					return

				const pos = getParentPosition(event, element.parentNode)

				if (resizeDir === 1)
					x1 = Math.min(Math.max(pos[0] - (resizeStart[0] - resizeStartState[0]), 0), x2)
				if (resizeDir === 2)
					y1 = Math.min(Math.max(pos[1] - (resizeStart[1] - resizeStartState[1]), 0), y2)
				if (resizeDir === 3)
					x2 = Math.max(Math.min(pos[0] + (resizeStartState[2] - resizeStart[0]), 1), x1)
				if (resizeDir === 4)
					y2 = Math.max(Math.min(pos[1] + (resizeStartState[3] - resizeStart[1]), 1), y1)

				placeElement(element, x1, y1, x2, y2)

				// Create and dispatch an event
				const newEvent = document.createEvent(`HTMLEvents`)

				newEvent.initEvent(`resizeupdate`, true, true)
				newEvent.size = {
					x1,
					y1,
					x2,
					y2
				}

				element.dispatchEvent(newEvent)

			}, false)

			document.body.addEventListener(`mouseup`, event => {
				if (!resizing)
					return

				resizing = false
				resizeDir = 0

				// Create and dispatch an event
				const newEvent = document.createEvent(`HTMLEvents`)
				newEvent.initEvent(`resizeend`, true, true)

				newEvent.size = {
					x1,
					y1,
					x2,
					y2
				}

				element.dispatchEvent(newEvent)

			}, false)

			Object.defineProperties(this, {
				resizable: {
					get() {
						return resizable
					},
					set(val) {
						resizable = val
					}
				},
				selectable: {
					get() {
						return selectable
					},
					set(val) {
						selectable = val
					}
				},
				position: {
					get() {
						return {
							x1,
							y1,
							x2,
							y2
						}
					},
					set(val) {
						x1 = val.x1
						y1 = val.y1
						x2 = val.x2
						y2 = val.y2
						placeElement(element, x1, y1, x2, y2)
					}
				}
			})
		}

		addEventListener(eventName, handler, capture) {
			this.element.addEventListener(eventName, handler, capture)
		}
	}

	return BoxDrawingCanvas
})()

export default BoxDrawingCanvas

