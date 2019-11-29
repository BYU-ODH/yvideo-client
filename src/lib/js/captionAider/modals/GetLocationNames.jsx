import React from 'react'

const GetLocationNames = props => {
	return (
		<div></div>
	)
}

export default GetLocationNames

/*
function getLocationNames(datalist){
	var names = {server:"Server"},
		targets = EditorWidgets.Save.targets;
	Object.keys(targets).forEach(function(key){
		names[key] = targets[key].label;
	});
	return new Promise(function(resolve,reject){
		resolve(datalist.map(function(key){
			return key === 'names'?names:void 0;
		}));
	});
}
*/