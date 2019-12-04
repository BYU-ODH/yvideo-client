import React, { useState } from 'react'

import Dialog from './modalTools/Dialog'
import { EditTrackTemplate } from './modalTools/ModalTemplates'

const EditTrackData = ({ datalist, timeline, langList }) => {

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

	const [show, setShow] = useState(false)
	const [trackInfo, setTrackInfo] = useState({ trackName: ``, trackKind: `subtitles`, trackLang: [] })
	const [trackToEdit, setTrackToEdit] = useState(``)
	const [selectOpen, setSelectOpen] = useState(false)
	const languages = langList
	const modalId = `editTrackModal`

	const dialogBody = EditTrackTemplate({trackList, trackInfo, trackToEdit, changeTrackToEdit, languages, modalId, selectOpen})
	const buttons = [{ event: `save`, label: `Save`}]
	let trackList = []

	const handleShow = () => {
		setShow(true)
		trackList = timeline.trackNames.slice()
		setTrackToEdit(trackList.length ? trackList[0] : ``)
		setSelectOpen(true)
	}

	const handleClose = () => {
		setShow(false)
	}

	const changeTrackToEdit = (event) => {
		const newTrackName = event.target.value
		if(!newTrackName) return
		const track = timeline.getTrack(newTrackName)
		setTrackInfo({ trackName: newTrackName, trackKind: track.kind, trackLang: [track.language] })
		setTrackToEdit(trackToEdit)
	}

	const actions = {
		save: (event) => {
			if(trackToEdit === `` || trackInfo.trackName === ``){
				// failer(`cancel`)
				return
			}

			handleClose()
			setSelectOpen(false)

			/* resolver(datalist.map((key) => {
				switch(key){
				case `tid`: return that.get(`trackToEdit`)
				case `kind`: return that.get(`trackKind`)
				case `name`: return that.get(`trackName`) || `Untitled`
				case `lang`: return that.get(`trackLang`)[0]
				case `overwrite`: return true
				}
			}))*/
		},
	}

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