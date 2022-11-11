const handleScrollFuncs = (elements, setDisableScroll, setEnableScroll) => {
	let supportsPassive = false

	const keys = [`Space`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`]

	const preventDefault = e => {
		e.preventDefault()
	}

	const preventDefaultForScrollKeys = e => {
		keys.forEach((key) => {
			if (e.code === key) {
				preventDefault(e)
				return false
			}
		})
	}

	const preventDefaultTrackPad = e => {
		if (Math.abs(e.deltaY) < 5)
			preventDefault(e)
	}

	const preventDefaultShift = e => {
		if(e.shiftKey === true)
			preventDefault(e)
	}

	if(elements?.length !== undefined) {
		for(const i in elements) {
			try {
				elements[i].addEventListener(`test`, null, Object.defineProperty({}, `passive`, {
					get: () => { // eslint-disable-line
						supportsPassive = true
					},
				}))
			} catch (e) {
				return
			}
		}
	} else {
		try {
			elements.addEventListener(`test`, null, Object.defineProperty({}, `passive`, {
				get: () => { // eslint-disable-line
					supportsPassive = true
				},
			}))
		} catch (e) {
			return
		}
	}

	const wheelEvent = `onwheel` in document.createElement(`div`) ? `wheel` : `mousewheel`
	const wheelOpt = supportsPassive ? { passive: false } : false
	if(elements?.length !== undefined) {
		setDisableScroll({action: () => {
			for(const i in elements) {
				// these elements are the ones in the editors and the collections page
				elements[i].addEventListener(`DOMMouseScroll`, preventDefault, false) // older FF
				elements[i].addEventListener(wheelEvent, preventDefaultShift, wheelOpt) // modern desktop
				elements[i].addEventListener(wheelEvent, preventDefaultTrackPad, wheelOpt) // mobile/trackpad
				elements[i].addEventListener(`keydown`, preventDefaultForScrollKeys, wheelOpt) // arrow keys
				elements[i].onmousedown = e => { // disables middle mouse button
					if (e.button === 1) return false
				}
			}
		}})
		if(setEnableScroll) {
			setEnableScroll({action: () => {
				for(const i in elements) {
					elements[i].removeEventListener(`DOMMouseScroll`, preventDefault, false)
					elements[i].removeEventListener(wheelEvent, preventDefaultShift, wheelOpt)
					elements[i].removeEventListener(wheelEvent, preventDefaultTrackPad, wheelOpt)
					elements[i].removeEventListener(`keydown`, preventDefaultForScrollKeys, false)
					elements[i].onmousedown = null
				}
			}})
		}
	} else {
		setDisableScroll({action: () => {
			elements.addEventListener(`DOMMouseScroll`, preventDefault, false) // older FF
			elements.addEventListener(wheelEvent, preventDefaultShift, wheelOpt) // modern desktop
			elements.addEventListener(wheelEvent, preventDefaultTrackPad, wheelOpt) // mobile/trackpad
			elements.addEventListener(`keydown`, preventDefaultForScrollKeys, false) // arrow keys
			elements.onmousedown = e => { // disables middle mouse button
				if (e.button === 1) return false
			}
		}})
		if(setEnableScroll) {
			setEnableScroll({action: () => {
				elements.removeEventListener(`DOMMouseScroll`, preventDefault, false)
				elements.removeEventListener(wheelEvent, preventDefaultShift, wheelOpt)
				elements.removeEventListener(wheelEvent, preventDefaultTrackPad, wheelOpt)
				elements.removeEventListener(`keydown`, preventDefaultForScrollKeys, false)
				elements.onmousedown = null
			}})
		}
	}
}

export default handleScrollFuncs
