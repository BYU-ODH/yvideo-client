import React, { useState } from 'react'

// import Ayamel from 'yvideojs'
// import TimedText from 'yvideo-timedtext'

const NewTrackData = props => {

	const {
		datalist,
	} = props.viewstate

	const {
		onCreate,
		toggleModal,
	} = props.handlers

	// const langList = Object.keys(Ayamel.utils.p1map)
	// 	.map((p1) => {
	// 		const code = Ayamel.utils.p1map[p1]
	// 		const engname = Ayamel.utils.getLangName(code, `eng`)
	// 		const localname = Ayamel.utils.getLangName(code, code)

	// 		return {
	// 			value: code,
	// 			text: engname,
	// 			desc: localname !== engname
	// 				? localname
	// 				: void 0}
	// 	})

	const [trackInfo, setTrackInfo] = useState({
		trackName: ``,
		trackKind: `subtitles`,
		trackLang: [],
	})

	const [trackMime, setTrackMime] = useState(`text/vtt`)

	// const types = TimedText.getRegisteredTypes().map((mime) => ({
	// 	name: TimedText.getTypeInfo(mime).name,
	// 	mime,
	// }))

	// const defaultOption = {
	// 	value:`zxx`,
	// 	text:`No Linguistic Content`,
	// }

	const createTrack = () => {
		toggleModal()
		onCreate(datalist.map((key) => {
			switch(key){
			case `kind`: return trackInfo.get(`trackKind`)
			case `name`: return trackInfo.get(`trackName`) || `Untitled`
			case `lang`: return trackInfo.get(`trackLang`)[0]
			case `mime`: return trackMime
			case `overwrite`: return true
			case `handler`:
				return function(tp){
					tp.then((track) => {
						track.mode = `showing`
					})
				}
			default : return ``
			}
		}))
	}

	const changeTrackKind = (event) => {
		setTrackInfo({ trackName: trackInfo.trackName, trackKind: event.target.value, trackLang: trackInfo.trackLang })
	}

	const changeTrackMime = (event) => {
		setTrackMime(event.target.value)
	}

	return (
		<div id='newTrackModal'>
			<h1>Create a new track</h1>

			<div class='container-fluid'>
				<span class='form-horizontal'>
					<div class='control-group'>
						<label class='control-label'>Name</label>
						<div class='controls'>
							<input type='text' value={trackInfo.trackName} placeholder='Name' id='createTrackAutofocus' />
						</div>
					</div>
					<div class='form-group'>
						<label class='control-label'>Kind</label>
						<div class='controls'>
							<select value={trackInfo.trackKind} onChange={changeTrackKind}>
								<option value='subtitles' selected>Subtitles</option>
								<option value='captions'>Captions</option>
								<option value='descriptions'>Descriptions</option>
								<option value='chapters'>Chapters</option>
								<option value='metadata'>Metadata</option>
							</select>
						</div>
					</div>
					<div class='control-group'>
						<label class='control-label'>Format</label>
						<div class='controls'>
							<select onChange={changeTrackMime} value={trackMime}>
								{props.types.map( type => <option value={type.mime}>{type.name}</option> )}
							</select>
						</div>
					</div>
				</span>
			</div>

			<button class='btn btn-blue' onClick={createTrack}>Create</button>
			<button class='btn btn-gray' onClick={toggleModal}>Close</button>

		</div>
	)
}

export default NewTrackData

// Create New Track From Scratch
// export const newTrackData = (function(){
// 	let types // , datalist, resolver, ractive, failer

// 	// eslint-disable-next-line prefer-const
// 	types = TimedText.getRegisteredTypes().map((mime) => {
// 		return {name: TimedText.getTypeInfo(mime).name, mime}
// 	})

// 	// const test = <Dialog />

// 	// eslint-disable-next-line prefer-const
// 	let ractive = new Dialog({
// 		el: document.getElementById(`newTrackModal`),
// 		data: {
// 			dialogTitle: `Create a new track`,
// 			// languages: langList,
// 			trackLang: [],
// 			trackKind: `subtitles`,
// 			trackName: ``,
// 			trackMime: `text/vtt`,
// 			types,
// 			modalId: `newTrackModal`,
// 			buttons: [{event:`create`,label:`Create`}],
// 			defaultOption: {value:`zxx`,text:`No Linguistic Content`},
// 		},
// 		partials:{ dialogBody: document.getElementById(`createTrackTemplate`).textContent },
// 		actions: {
// 			// create: (event) => {

// 			// 	// this is what should be called instead of the jQuery .modal thing
// 			// 	// toggleModal()

// 			// 	// this needs to die
// 			// 	$(`#newTrackModal`).modal(`hide`)

// 			// 	// eslint-disable-next-line array-callback-return
// 			// 	resolver(datalist.map((key) => {
// 			// 		// eslint-disable-next-line default-case
// 			// 		switch(key) {
// 			// 		case `kind`:
// 			// 			return this.get(`trackKind`)
// 			// 		case `name`:
// 			// 			return this.get(`trackName`) || `Untitled`
// 			// 		case `lang`:
// 			// 			return this.get(`trackLang`)[0]
// 			// 		case `mime`:
// 			// 			return this.get(`trackMime`)
// 			// 		case `overwrite`:
// 			// 			return true
// 			// 		case `handler`:
// 			// 			return function(tp){
// 			// 				tp.then((track) => {
// 			// 					track.mode = `showing`
// 			// 				})
// 			// 			}
// 			// 		}
// 			// 	}))
// 			// },
// 		},
// 	})

// 	console.log(ractive)

// 	return function(dl){
// 		// Clear the form
// 		// ractive.set({trackName: ``, selectOpen: false })
// 		$(`#newTrackModal`).modal(`show`)
// 		datalist = dl

// 		return new Promise((resolve, reject) => {
// 			resolver = resolve
// 		})
// 	}
// }())
