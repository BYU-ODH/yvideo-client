import React from 'react'

const NewTrackData = () => {
	return (
		<div>

		</div>
	)
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