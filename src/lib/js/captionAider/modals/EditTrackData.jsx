import React from 'react'

const EditTrackData = () => {
	return (
		<div>

		</div>
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
			save(event){
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