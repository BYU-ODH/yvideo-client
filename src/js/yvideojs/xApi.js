class xApi {
	constructor(course, user, ADL) {
		this.course = course
		this.user = user
		this.ADL = ADL
		this.page = course = user = {}
		this.record = false
		this.resourceName = ``
		this.baseUri = `${window.location.origin}/`
	}

	send = async args => {
		const { record, user, baseUri, page, resourceName, course } = this

		if (!record) return

		// create statement
		// Agent = User, Action = Verb, Activity = Content Object
		const stmt = new ADL.XAPIStatement(new ADL.XAPIStatement.Agent(`mailto:${user.email ? user.email : `placeholder@some.org`}`, user.name),
			new ADL.XAPIStatement.Verb(baseUri + args.verb, args.verb),
			new ADL.XAPIStatement.Activity(page.name, resourceName))

		stmt.timestamp = (new Date()).toISOString()

		if (args.type) stmt.object.definition.extensions = args.type

		// some universal xApi extensions that should be included in each request
		if (args.extensions) {
			args.extensions[`${baseUri}contextId`] = course.id || -1
			args.extensions[`${baseUri}authScheme`] = user.authScheme
			stmt.object.definition.extensions = args.extensions
		}

		// send statement and log response
		await ADL.XAPIWrapper.sendStatement(stmt, (resp, obj) => {
			console.log(`[${obj.id}]: ${resp.status} - ${resp.statusText}`)
		})
	}

	pageLoad = () => {
		send({ verb: `started`, extensions: {} })
	}

	ended = time => {
		send({
			verb: `ended`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time
			}
		})
	}

	playClick = time => {
		send({
			verb: `played`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time
			}
		})
	}

	pauseClick = time => {
		send({
			verb: `paused`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time
			}
		})
	}

	rateChange = (time, rate) => {
		send({
			verb: `changed_playrate`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time,
				[`${baseUri}playRate`]: rate
			}
		})
	}

	volumeChange = (time, volume) => {
		send({
			verb: `changed_volume`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time,
				[`${baseUri}volume`]: volume
			}
		})
	}

	timeJump = (oldTime, newTime) => {
		send({
			verb: `jumped`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}oldTime`]: oldTime,
				[`${baseUri}newTime`]: newTime
			}
		})
	}

	repeatCaption = time => {
		send({
			verb: `repeated_caption`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time
			}
		})
	}

	transcriptCueClick = (captionTrackId, cueNumber, time) => {
		send({
			verb: `clicked_transcript_cue`,
			type: `${baseUri}transcription`,
			extensions: {
				[`${baseUri}playerTime`]: time,
				[`${baseUri}cueNumber`]: cueNumber,
				[`${baseUri}captionTrackId`]: captionTrackId
			}
		})
	}

	captionTranslation = (captionTrackId, text, time) => {
		send({
			verb: `translated_word`,
			type: `${baseUri}caption`,
			extensions: {
				[`${baseUri}playerTime`]: time,
				[`${baseUri}captionTrackId`]: captionTrackId,
				[`${baseUri}text`]: `"${text}"`
			}
		})
	}

	transcriptionTranslation = (captionTrackId, cueNumber, text, time) => {
		send({
			verb: `translateda_word`,
			type: `${baseUri}caption`,
			extensions: {
				[`${baseUri}captionTrackId`]: captionTrackId,
				[`${baseUri}cueNumber`]: cueNumber,
				[`${baseUri}playerTime`]: time,
				[`${baseUri}text`]: `"${text}"`
			}
		})
	}

	viewTextAnnotation = (annotationDocId, text, time) => {
		send({
			verb: `viewed_annotation`,
			type: `${baseUri}annotation`,
			extensions: {
				[`${baseUri}playerTime`]: time,
				[`${baseUri}text`]: text,
				[`${baseUri}annotationDocId`]: annotationDocId
			}
		})
	}

	enterFullscreen = time => {
		send({
			verb: `enter_fullscreen`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time
			}
		})
	}

	exitFullscreen = time => {
		send({
			verb: `exit_fullscreen`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time
			}
		})
	}

	enableCaptionTrack = (captionTrack, time) => {
		send({
			verb: `enabled_closed_caption`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time,
				[`${baseUri}captionTrack`]: captionTrack.label
			}
		})
	}

	disableCaptionTrack = (captionTrack, time) => {
		send({
			verb: `disabled_closed_caption`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time,
				[`${baseUri}captionTrack`]: captionTrack.label
			}
		})
	}

	changeSpeed = (speedLevel, time) => {
		send({
			verb: `changed_speed`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time,
				[`${baseUri}speedLevel`]: speedLevel
			}
		})
	}

	mute = time => {
		send({
			verb: `muted`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time
			}
		})
	}

	unmute = time => {
		send({
			verb: `unmuted`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time
			}
		})
	}

	changedResolution = time => {
		send({
			verb: `changed_resolution`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time
			}
		})
	}

	watched = time => {
		send({
			verb: `watched`,
			type: `${baseUri}mediaPlayer`,
			extensions: {
				[`${baseUri}playerTime`]: time
			}
		})
	}

	addListeners = player => {

		throttle = (func, wait) => {
			let timeout
			return args => {
				if (!timeout) {
					timeout = setTimeout(() => {
						timeout = null
						func.apply(this, args)
					}, wait)
				}
			}
		}

		player.addEventListener(`play`, throttle(() => {
			this.playClick(`${player.currentTime}`)
		}, 500))

		player.addEventListener(`pause`, () => {
			this.pauseClick(`${player.currentTime}`)
		})

		player.addEventListener(`ended`, () => {
			this.ended(`${player.currentTime}`)
		})

		player.addEventListener(`timejump`, e => {
			this.timeJump(`${e.detail.oldtime}${e.detail.newtime}`)
		})

		player.addEventListener(`captionJump`, () => {
			this.repeatCaption(`${player.currentTime}`)
		})

		player.addEventListener(`ratechange`, throttle(() => {
			this.rateChange(`${player.currentTime}`, `${player.playbackRate}`)
		}, 1000))

		player.addEventListener(`volumechange`, throttle(() => {
			return player.muted && this.volumeChange(`${player.currentTime}`, `${player.volume}`)
		}, 1000))

		player.addEventListener(`mute`, () => {
			this.mute(`${player.currentTime}`, `0`)
		})

		player.addEventListener(`unmute`, () => {
			this.unmute(`${player.currentTime}`, player.volume)
		})

		player.addEventListener(`enterfullscreen`, () => {
			this.enterFullscreen(`${player.currentTime}`)
		})

		player.addEventListener(`exitfullscreen`, () => {
			this.exitFullscreen(`${player.currentTime}`)
		})

		player.addEventListener(`enabletrack`, e => {
			this.enableCaptionTrack(e.detail.track)
		})

		player.addEventListener(`disabletrack`, e => {
			this.disableCaptionTrack(e.detail.track)
		})

		player.addEventListener(`watched`, () => {
			this.watched(`${player.currentTime}`)
		})
	}

	registerPage = args => {
		this.page = args.page
		this.course = args.course ? args.course : course
		this.user = args.user
		this.resourceName =
			args.resource ?
				args.resource.label
				:
				args.content ?
					args.content.name
					:
					this.resourceName

		addListeners(args.player)
	}

	connect = () => { }

	record = b => {
		this.record = !!b
	}
}

export default xApi
