import React from 'react'

// TODO: Where is SuperSelect from?
import { SuperSelect } from 'yvideo-editorwidgets' // or 'editor-widgets'

const TrackKindSelect = ({ trackKind }) => {
	return (
		<div class='form-group'>
			<label class='control-label'>Kind</label>
			<div class='controls'>
				<select value={trackKind}>
					<option value='subtitles' selected>Subtitles</option>
					<option value='captions'>Captions</option>
					<option value='descriptions'>Descriptions</option>
					<option value='chapters'>Chapters</option>
					<option value='metadata'>Metadata</option>
				</select>
			</div>
		</div>
	)
}

const TrackLangSelect = ({ track }) => {
	return (
		<div class='form-group'>
			<label class='control-label'>Language</label>
			<div class='controls'>
				<SuperSelect icon='icon-globe' text='Select Language' value={track.trackLang} button='left' open={track.selectOpen} multiple='false' options={track.languages} modal={track.modalId} defaultOption={track.defaultOption}/>
			</div>
		</div>
	)
}

export default {
	TrackKindSelect,
	TrackLangSelect,
}

/*
Ractive.partials.trackKindSelect = '<div class="form-group">\
    <label class="control-label">Kind</label>\
    <div class="controls">\
        <select value="{{trackKind}}">\
            <option value="subtitles" selected>Subtitles</option>\
            <option value="captions">Captions</option>\
            <option value="descriptions">Descriptions</option>\
            <option value="chapters">Chapters</option>\
            <option value="metadata">Metadata</option>\
        </select>\
    </div>\
</div>';
Ractive.partials.trackLangSelect = '<div class="form-group">\
    <label class="control-label">Language</label>\
    <div class="controls">\
        <SuperSelect icon="icon-globe" text="Select Language" value="{{trackLang}}" button="left" open="{{selectOpen}}" multiple="false" options="{{languages}}" modal="{{modalId}}" defaultOption={{defaultOption}}>\
    </div>\
</div>';
*/