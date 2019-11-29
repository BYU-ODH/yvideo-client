import React from 'react'

const GetLocation = props => {
	return (
		<div></div>
	)
}

export default GetLocation

/*
//Set Save Location
var getLocation = (function(){
	var ractive, datalist, resolver,
			targets = EditorWidgets.Save.targets;
	ractive = new Dialog({
			el: document.getElementById('setLocModal'),
			data: {
					dialogTitle: "Set Save Location",
					saveLocations: Object.keys(targets).map(function(key){
							return {
									value: key,
									name: targets[key].label
							};
					}), saveLocation: "server",
					buttons: [{event:"save",label:"Set Location"}]
			},
			partials:{ dialogBody: document.getElementById('setLocTemplate').textContent },
			actions: {
					save: function(event){
							var that = this;
							$("#setLocModal").modal("hide");
							resolver(datalist.map(function(key){
									return key === 'location'?that.get("saveLocation"):void 0;
							}));
					}
			}
	});

	return function(dl){
			$('#setLocModal').modal('show');
			datalist = dl;
			return new Promise(function(resolve, reject){
					resolver = resolve;
			});
	};
}());
*/