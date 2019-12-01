import React, { useState } from 'react'

import Dialog from './modalTools/Dialog'
import { EditTrackTemplate } from './modalTools/ModalTemplates'

const EditTrackData = ({ datalist, timeline }) => {

	const [show, setShow] = useState(false)

	/*
	dialogTitle: `Edit tracks`,
	languages: langList,

	trackLang: [],
	trackKind: `subtitles`,
	trackName: ``,

	modalId: `editTrackModal`,
	buttons: [{event:`save`,label:`Save`}],
	defaultOption: {value:`zxx`,text:`No Linguistic Content`},
	*/

	const [trackInfo, setTrackInfo] = useState({ trackName: ``, trackKind: `subtitles`, trackLang: [] })
	const [trackToEdit, setTrackToEdit] = useState(``)

	const handleClose = () => setShow(false)

	let trackList = []
	const handleShow = () => {
		setShow(true)
		trackList = timeline.trackNames.slice()
		setTrackToEdit(trackList.length ? trackList[0] : ``)
	}

	const changeTrackToEdit = (event) => {
		const newTrackName = event.target.value
		if(!newTrackName) return
		const track = timeline.getTrack(newTrackName)
		setTrackInfo({ trackName: newTrackName, trackKind: track.kind, trackLang: [track.language] })
		setTrackToEdit(trackToEdit)
	}
	/*
	ractive.observe(`trackToEdit`,(trackName) => {
		let track
		if(!trackName) return;
		track = timeline.getTrack(trackName)
		ractive.set({
			trackName,
			trackKind: track.kind,
			trackLang: [track.language],
		})
	})
	*/

	const actions = {
		/* save: (event) => {
			const that = this
			if(this.get(`trackToEdit`) === `` || this.get(`trackName`) === ``){
				failer(`cancel`)
				return
			}

			$(`#editTrackModal`).modal(`hide`)
			this.set({selectOpen: false})

			resolver(datalist.map((key) => {
				switch(key){
				case `tid`: return that.get(`trackToEdit`)
				case `kind`: return that.get(`trackKind`)
				case `name`: return that.get(`trackName`) || `Untitled`
					case `lang`: return that.get(`trackLang`)[0]
				case `overwrite`: return true
				}
			}))
		},*/
	}

	const dialogBody = EditTrackTemplate({trackList, trackToEdit})

	const buttons = [{ event: `save`, label: `Save`}]

	return (
		<Dialog show={show} handleShow={handleShow} handleClose={handleClose} actions={actions} dialogTitle='Edit Tracks' dialogBody={dialogBody} buttons={buttons} />
	)
}

export default EditTrackData

/*
// Edit Track
const editTrackData = (function(){
	let ractive, datalist, resolver, failer
	ractive = new Dialog({
		el: document.getElementById(`editTrackModal`),
		data: {
			dialogTitle: `Edit tracks`,
			languages: langList,
			trackLang: [],
			trackKind: `subtitles`,
			trackName: ``,
			modalId: `editTrackModal`,
			buttons: [{event:`save`,label:`Save`}],
			defaultOption: {value:`zxx`,text:`No Linguistic Content`},
		},
		partials:{ dialogBody: document.getElementById(`editTrackTemplate`).textContent },
		actions: {
			save(event) {
				let that = this
				if(this.get(`trackToEdit`) === `` || this.get(`trackName`) === ``){
					failer(`cancel`)
					return;
				}

				$(`#editTrackModal`).modal(`hide`)
				this.set({selectOpen: false})

				resolver(datalist.map((key) => {
					switch(key){
						case 'tid': return that.get("trackToEdit");
						case 'kind': return that.get("trackKind");
						case 'name': return that.get("trackName") || "Untitled";
						case 'lang': return that.get("trackLang")[0];
						case 'overwrite': return true;
					}
				}))
			},
		},
	})

	$(`#editTrackModal`).on(`shown.bs.modal`, () => {
		let trackList = timeline.trackNames.slice()
			ractive.set({
			trackList,
			trackToEdit: trackList.length ? trackList[0] : ``,
		})
	})

	ractive.observe(`trackToEdit`,(trackName) => {
		let track
			if(!trackName) return;
		track = timeline.getTrack(trackName)
			ractive.set({
			trackName,
			trackKind: track.kind,
			trackLang: [track.language],
		})
	})

	return function(dl){
		$(`#editTrackModal`).modal(`show`)
		datalist = dl
		return new Promise((resolve, reject) => {
					resolver = resolve;
					failer = reject;
			})
	}
}())

*/