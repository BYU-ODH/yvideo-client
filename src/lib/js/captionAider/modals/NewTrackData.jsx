import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Dialog from './modalTools/Dialog'
import { CreateTrackTemplate } from './modalTools/ModalTemplates'

const NewTrackData = (datalist) => {
	const [show, setShow] = useState(true)
	const [trackInfo, setTrackInfo] = useState({ trackName: ``, trackKind: `subtitles`, trackLang: [] })
	const [trackMime, setTrackMime] = useState(`text/vtt`)
	const [selectOpen, setSelectOpen] = useState(false)
	const modalId = `newTrackModal`
	let failer = null
	let resolver = null

	const buttons = [{event: `create`, label: `Create`}]

	const actions = {
		create: (event) => {
			handleClose()

			resolver(datalist.map((key) => {
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
		},
	}

	const handleShow = () => {
		// setShow(true) - show is initialized to true
		setSelectOpen(true)
	}

	const handleClose = () => {
		setShow(false)
	}

	const changeTrackKind = (event) => {
		setTrackInfo({ trackName: trackInfo.trackName, trackKind: event.target.value, trackLang: trackInfo.trackLang })
	}

	const changeTrackMime = (event) => {
		setTrackMime(event.target.value)
	}

	const dialogBody = CreateTrackTemplate({trackInfo, trackMime, changeTrackMime, changeTrackKind, modalId, selectOpen})
	const modal = <Dialog show={show} handleShow={handleShow} handleClose={handleClose} actions={actions} dialogTitle='Create a new track' dialogBody={dialogBody} buttons={buttons} />

	ReactDOM.createPortal(modal, document.querySelector(`#modal`))

	return new Promise((resolve, reject) => {
		resolver = resolve
		failer = reject
	})
}

export default NewTrackData

/*
// Create New Track From Scratch
let newTrackData = (function(){
	let ractive, datalist, resolver, failer, types
	types = TimedText.getRegisteredTypes().map((mime) => {
			return {name: TimedText.getTypeInfo(mime).name, mime: mime};
	})
	ractive = new Dialog({
		el: document.getElementById(`newTrackModal`),
		data: {
			dialogTitle: `Create a new track`,
			languages: langList,
			trackLang: [],
			trackKind: `subtitles`,
			trackName: ``,
			trackMime: `text/vtt`,
			types,
			modalId: `newTrackModal`,
			buttons: [{event:`create`,label:`Create`}],
			defaultOption: {value:`zxx`,text:`No Linguistic Content`},
		},
		partials:{ dialogBody: document.getElementById(`createTrackTemplate`).textContent },
		actions: {
			create(event){
							var that = this;
							$('#newTrackModal').modal('hide');
							resolver(datalist.map(function(key){
									switch(key){
									case 'kind': return that.get("trackKind");
									case 'name': return that.get("trackName") || "Untitled";
									case 'lang': return that.get("trackLang")[0];
									case 'mime': return that.get("trackMime");
									case 'overwrite': return true;
									case 'handler':
											return function(tp){
													tp.then(function(track){ track.mode = "showing"; });
											};
									}
							}));
					},
		},
	})

	return function(dl){
		// Clear the form
		ractive.set({trackName: ``, selectOpen: false })
			$(`#newTrackModal`).modal(`show`)
			datalist = dl
			return new Promise(((resolve, reject) => {
					resolver = resolve;
					failer = reject;
			}))
	};
}())

*/