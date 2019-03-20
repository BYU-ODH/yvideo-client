const xApi = ((course, user, ADL) => {

	let page = course = user = {}
	const record = false
	const resourceName = ``
	const baseUri = window.location.origin + `/`

	// args: verb, type, extensions
	send = args => {
		if (!record) return
		// create statement
		// Agent = User, Action = Verb, Activity = Content Object
		const stmt = new ADL.XAPIStatement(new ADL.XAPIStatement.Agent(`mailto:` + (user.email ? user.email : `placeholder@some.org`), user.name),
			new ADL.XAPIStatement.Verb(baseUri + args.verb, args.verb),
			new ADL.XAPIStatement.Activity(page.name, resourceName))
		stmt.timestamp = (new Date()).toISOString()
		if (args.type) stmt.object.definition.extensions = args.type
		if (args.extensions) {
			// some universal xApi extensions that should be included in each request
			args.extensions[baseUri + `contextId`] = course.id || -1
			args.extensions[baseUri + `authScheme`] = user.authScheme
			stmt.object.definition.extensions = args.extensions
		}
		// send statement and log response
		// callback makes the send asynchronous
		ADL.XAPIWrapper.sendStatement(stmt, () => {
			// The callback makes the xApi call asynchronous
			// console.log("[" + obj.id + "]: " + resp.status + " - " + resp.statusText);
		})
	}

	addListeners = player => {

		throttle = (func, wait) => {
			let timeout
			return function () {
				const context = this, args = arguments
				if (!timeout) {
					timeout = setTimeout(() => {
						timeout = null
						func.apply(context, args)
					}, wait)
				}
			}
		}
		player.addEventListener(`play`, throttle(() => {
			xApi.predefined.playClick(`` + player.currentTime)
		}, 500))
		player.addEventListener(`pause`, () => {
			xApi.predefined.pauseClick(`` + player.currentTime)
		})
		player.addEventListener(`ended`, () => {
			xApi.predefined.ended(`` + player.currentTime)
		})
		player.addEventListener(`timejump`, (e) => {
			xApi.predefined.timeJump(`` + e.detail.oldtime, `` + e.detail.newtime)
		})
		player.addEventListener(`captionJump`, () => {
			xApi.predefined.repeatCaption(`` + player.currentTime)
		})
		player.addEventListener(`ratechange`, throttle(() => {
			xApi.predefined.rateChange(`` + player.currentTime, `` + player.playbackRate)
		}, 1000))
		player.addEventListener(`volumechange`, throttle(() => {
			if (player.muted) return
			xApi.predefined.volumeChange(`` + player.currentTime, `` + player.volume)
		}, 1000))
		player.addEventListener(`mute`, () => {
			xApi.predefined.mute(`` + player.currentTime, `0`)
		})
		player.addEventListener(`unmute`, () => {
			xApi.predefined.unmute(`` + player.currentTime, player.volume)
		})
		player.addEventListener(`enterfullscreen`, () => {
			xApi.predefined.enterFullscreen(`` + player.currentTime)
		})
		player.addEventListener(`exitfullscreen`, () => {
			xApi.predefined.exitFullscreen(`` + player.currentTime)
		})
		player.addEventListener(`enabletrack`, (e) => {
			xApi.predefined.enableCaptionTrack(e.detail.track)
		})
		player.addEventListener(`disabletrack`, (e) => {
			xApi.predefined.disableCaptionTrack(e.detail.track)
		})
		player.addEventListener(`watched`, () => {
			xApi.predefined.watched(`` + player.currentTime)
		})
	}

	return {
		predefined: {
			pageLoad() {
				const extensions = {}
				send({ verb: `started`, extensions })
			},
			ended(time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				send({
					verb: `ended`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			playClick(time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				send({
					verb: `played`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			pauseClick(time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				send({
					verb: `paused`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			rateChange(time, rate) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				extensions[baseUri + `playRate`] = rate
				send({
					verb: `changed_playrate`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			volumeChange(time, volume) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				extensions[baseUri + `volume`] = volume
				send({
					verb: `changed_volume`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			timeJump(oldTime, newTime) {
				const extensions = {}
				extensions[baseUri + `oldTime`] = oldTime
				extensions[baseUri + `newTime`] = newTime
				send({
					verb: `jumped`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			repeatCaption(time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				send({
					verb: `repeated_caption`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			transcriptCueClick(captionTrackId, cueNumber, time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				extensions[baseUri + `cueNumber`] = cueNumber
				extensions[baseUri + `captionTrackId`] = captionTrackId
				send({
					verb: `clicked_transcript_cue`,
					type: baseUri + `transcription`,
					extensions
				})
			},
			captionTranslation(captionTrackId, text, time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				extensions[baseUri + `captionTrackId`] = captionTrackId
				extensions[baseUri + `text`] = `"` + text + `"`
				send({
					verb: `translated_word`,
					type: baseUri + `caption`,
					extensions
				})
			},
			transcriptionTranslation(captionTrackId, cueNumber, text, time) {
				const extensions = {}
				extensions[baseUri + `captionTrackId`] = captionTrackId
				extensions[baseUri + `cueNumber`] = cueNumber
				extensions[baseUri + `playerTime`] = time
				extensions[baseUri + `text`] = `"` + text + `"`
				send({
					verb: `translateda_word`,
					type: baseUri + `caption`,
					extensions
				})
			},
			viewTextAnnotation(annotationDocId, text, time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				extensions[baseUri + `text`] = text
				extensions[baseUri + `annotationDocId`] = annotationDocId
				send({
					verb: `viewed_annotation`,
					type: baseUri + `annotation`,
					extensions
				})
			},
			enterFullscreen(time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				send({
					verb: `enter_fullscreen`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			exitFullscreen(time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				send({
					verb: `exit_fullscreen`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			enableCaptionTrack(captionTrack, time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				extensions[baseUri + `captionTrack`] = captionTrack.label
				send({
					verb: `enabled_closed_caption`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			disableCaptionTrack(captionTrack, time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				extensions[baseUri + `captionTrack`] = captionTrack.label
				send({
					verb: `disabled_closed_caption`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			changeSpeed(speedLevel, time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				extensions[baseUri + `speedLevel`] = speedLevel
				send({
					verb: `changed_speed`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			mute(time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				send({
					verb: `muted`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			unmute(time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				send({
					verb: `unmuted`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			changedResolution(time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				send({
					verb: `changed_resolution`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			},
			watched(time) {
				const extensions = {}
				extensions[baseUri + `playerTime`] = time
				send({
					verb: `watched`,
					type: baseUri + `mediaPlayer`,
					extensions
				})
			}
		},

		registerPage(args) {
			page = args.page
			course = args.course ? args.course : course
			user = args.user
			resourceName = args.resource ? args.resource.label :
				args.content ? args.content.name :
					resourceName
			addListeners(args.player)
		},

		connect() { },

		record(b) {
			record = !!b
		}
	}
})()

export default xApi

