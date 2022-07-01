export const convertSecondsToMinute = (time, videoLength) => {
	try {
		// here is meant to use two equal
		if(typeof time == `number`) { // eslint-disable-line eqeqeq
			if(videoLength<3600)
				return new Date(Number(time) * 1000).toISOString().substr(14, 8)
			else
				return new Date(Number(time) * 1000).toISOString().substr(12, 10)
		} else
			return time
	} catch (e) {
		return time
	}
}

export const convertToSeconds = (time, videoLength) => {
	let hour = 0
	let minute = 0
	let second = 0
	let milliseconds =0
	const t = time.split(`:`)
	// HH:MM:SS.MS || HH:MM:SS|| MM:SS.MS || MM:SS || H || SS.MS
	if(t.length > 2) {
		hour = Number(+t[0])
		minute = Number(+t[1])
		const s = t[2].split(`.`)
		second = Number(+s[0])

		if (s.length > 1)
			milliseconds = millisecondCalculation(s)
		else
			milliseconds = 0
	} else if(t.length > 1) {
		hour = 0
		minute = Number(+t[0])
		const s = t[1].split(`.`)
		second = Number(+s[0])
		if (s.length > 1)
			milliseconds = millisecondCalculation(s)
		else
			milliseconds = 0
	} else {
		if(videoLength >= 3600) {
			const s = t[0].split(`.`)
			if (s.length > 1) {
				hour = 0
				minute = 0
				second = Number(+s[0])
				milliseconds = millisecondCalculation(s)
			} else {
				hour = Number(+t[0])
				minute = 0
				second = 0
				milliseconds = 0
			}
		} else {
			const s = t[0].split(`.`)
			if (s.length > 1) {
				hour = 0
				minute = 0
				second = Number(+s[0])
				milliseconds = millisecondCalculation(s)
			} else {
				hour = 0
				minute = Number(+t[0])
				second = 0
				milliseconds = 0
			}
		}

	}
	return hour * 3600 + minute * 60 + second + milliseconds * 0.01
}

const millisecondCalculation = (s) => {
	if(s[1]!== ``) {
		if(Number(s[1]) > 99) {
			const hundreds = s[1].substr(0, 3)
			return Math.round(hundreds/10)
		} else
			return Number(+s[1])
	} else
		return 0
}