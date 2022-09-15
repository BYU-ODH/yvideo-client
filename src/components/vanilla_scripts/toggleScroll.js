export const handleScrollFuncs = (elements, setDisableScroll, setEnableScroll) => {
	let supportsPassive = false

	const ifStatement = (ind) => {
		return ind !== `length` && ind !== `item` && ind !== `namedItem`
	}

	const keys = {37: 1, 38: 1, 39: 1, 40: 1}

	const preventDefault = (e) => {
		e.preventDefault()
	}

	const preventDefaultForScrollKeys = (e) => {
		if (keys[e.keyCode]) {
			preventDefault(e)
			return false
		}
	}

	if(elements.length !== undefined) {
		for(const i in elements) {
			if(ifStatement(i)) {
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

	if(elements.length !== undefined) {
		setDisableScroll({action: () => {
			for(const i in elements) {
				if(ifStatement(i)) {
					elements[i].addEventListener(`DOMMouseScroll`, preventDefault, false) // older FF
					elements[i].addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
					elements[i].addEventListener(`touchmove`, preventDefault, wheelOpt) // mobile
					elements[i].addEventListener(`keydown`, preventDefaultForScrollKeys, false)
				}
			}
		}})
		if(setEnableScroll) {
			setEnableScroll({action: () => {
				for(const i in elements) {
					if(ifStatement(i)) {
						elements[i].removeEventListener(`DOMMouseScroll`, preventDefault, false)
						elements[i].removeEventListener(wheelEvent, preventDefault, wheelOpt)
						elements[i].removeEventListener(`touchmove`, preventDefault, wheelOpt)
						elements[i].removeEventListener(`keydown`, preventDefaultForScrollKeys, false)
					}
				}
			}})
		}
	} else {
		setDisableScroll({action: () => {
			elements.addEventListener(`DOMMouseScroll`, preventDefault, false) // older FF
			elements.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
			elements.addEventListener(`touchmove`, preventDefault, wheelOpt) // mobile
			elements.addEventListener(`keydown`, preventDefaultForScrollKeys, false)
		}})
		if(setEnableScroll) {
			setEnableScroll({action: () => {
				elements.removeEventListener(`DOMMouseScroll`, preventDefault, false)
				elements.removeEventListener(wheelEvent, preventDefault, wheelOpt)
				elements.removeEventListener(`touchmove`, preventDefault, wheelOpt)
				elements.removeEventListener(`keydown`, preventDefaultForScrollKeys, false)
			}})
		}
	}
}
