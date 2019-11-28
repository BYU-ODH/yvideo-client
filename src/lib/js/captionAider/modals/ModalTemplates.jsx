import React from 'react'
import { TrackKindSelect, TrackLangSelect } from './ModalHelpers'
// TODO: Where is SuperSelect from?
import { SuperSelect } from 'yvideo-editorwidgets' // or 'editor-widgets'

const EditTrackDataTemplate = (props) => {

	let trackSelect = ``
	if(props.trackList === 0) trackSelect = `There are no tracks loaded for editing`
	else if (props.trackList > 1) {
		trackSelect = (
			<div class='control-group'>
				<label class='control-label'>Which Track</label>
				<div class='controls'>
					<select value={props.trackToEdit}>
						{props.trackList.map( track => <option value={track}>track</option> )}
					</select>
				</div>
			</div>
		)
	}

	return (
		<span class='form-horizontal'>
			{trackSelect}
			{props.trackList.map( track => {
				return (
					<div style={{display: track.trackToEdit === `` ? `none` : `block`}}>
						<div class='control-group'>
							<label class='control-label'>Name</label>
							<div class='controls'>
								<input type='text' value={track.trackName} placeholder='Name' id='editTrackAutoFocus'/>
							</div>
						</div>
						<TrackKindSelect trackKind={track.trackKind}/>
						<TrackLangSelect track={track}/>
					</div>
				)
			})}
		</span>
	)
}

/*
 <script id='editTrackTemplate' type='text/ractive'>
        <span class="form-horizontal">
            {{#(trackList.length === 0)}}
            There are no tracks loaded for editing.
            {{/(trackList)}}
            {{#(trackList.length > 0)}}
            {{#(trackList.length > 1)}}
            <div class="control-group">
                <label class="control-label">Which Track</label>
                <div class="controls">
                    <select value="{{trackToEdit}}">
                    {{#trackList}}<option value="{{.}}">{{.}}</option>{{/trackList}}
                    </select>
                </div>
            </div>
            {{/(trackList)}}
            <div style="display:{{(trackToEdit === "" ? "none" : "block")}}">
                <div class="control-group">
                    <label class="control-label">Name</label>
                    <div class="controls">
                        <input type="text" value="{{trackName}}" placeholder="Name" id="editTrackAutofocus">
                    </div>
                </div>
                {{>trackKindSelect}}
                {{>trackLangSelect}}
            </div>
            {{/(trackList)}}
        </span>
</script>
*/

const LoadTrackDataTemplate = (props) => {
	return (
		<span class='form-horizontal'>
			<TrackKindSelect trackKind={props.track.trackKind}/>
			<TrackLangSelect track={props.track}/>
			<div class='control-group'>
				<label class='control-label'>Source</label>
				<div class='controls'>
					{props.sources.map( source => {
						return (
							<label class='radio'>
								<input type='radio' name={props.loadSource} value={source.name}>{source.label}</input>
							</label>
						)
					})}
				</div>
			</div>
		</span>
	)
}

/*
<script id='loadTrackTemplate' type='text/ractive'>
        <span class="form-horizontal">
            {{>trackKindSelect}}
            {{>trackLangSelect}}
            <div class="control-group">
                <label class="control-label">Source</label>
                <div class="controls">
                    {{#sources}}
                    <label class="radio"><input type="radio" name="{{loadSource}}" value="{{.name}}">{{.label}}</label>
                    {{/sources}}
                </div>
            </div>
        </span>
		</script>
*/

const CreateTrackTemplate = props => {
	return (
		<span class='form-horizontal'>
			<div class='control-group'>
				<label class='control-label'>Name</label>
				<div class='controls'>
					<input type='text' value={props.trackName} placeholder='Name' id='createTrackAutofocus' />
				</div>
			</div>
			<TrackKindSelect />
			<div class='control-group'>
				<label class='control-label'>Format</label>
				<div class='controls'>
					<select value={props.trackMime}>
						{props.types.map( type => <option value={type.mime}>{type.name}</option> )}
					</select>
				</div>
			</div>
		</span>
	)
}

/*
<script id='createTrackTemplate' type='text/ractive'>
    <span class="form-horizontal">
        <div class="control-group">
            <label class="control-label">Name</label>
            <div class="controls">
                <input type="text" value="{{trackName}}" placeholder="Name" id="createTrackAutofocus">
            </div>
        </div>
        {{>trackKindSelect}}
        <div class="control-group">
            <label class="control-label">Format</label>
            <div class="controls">
                <select value="{{trackMime}}">
                    {{#types}}<option value="{{.mime}}">{{.name}}</option>{{/types}}
                </select>
            </div>
        </div>
        {{>trackLangSelect}}
    </span>
</script>
*/

const SaveTrackTemplate = props => {
	return (
		<div class='form-horizontal'>
			<SuperSelect icon='icon-laptop' text='Select Track' value={props.selectedTracks} button='left' open={props.selectOpen} multiple='true' options={props.tracks} modal={props.modalId}/>
		</div>
	)
}

/*
<script id='saveTrackTemplate' type='text/ractive'>
        <div class="form-horizontal">
            <SuperSelect icon="icon-laptop" text="Select Track" value="{{selectedTracks}}" button="left" open="{{selectOpen}}" multiple="true" options="{{tracks}}" modal="{{modalId}}">
        </div>
    </script>
*/

const ShowTrackTemplate = props => {
	return (
		<span class='form-horizontal'>
			<SuperSelect icon='icon-laptop' text='Select Track' value={props.selectedTracks} button='left' open={props.selectOpen} multiple='true' options={props.tracks} modal={props.modalId}/>
		</span>
	)
}

/*
<script id='showTrackTemplate' type='text/ractive'>
    <span class="form-horizontal">
        <SuperSelect icon="icon-laptop" text="Select Track" value="{{selectedTracks}}" button="left" open="{{selectOpen}}" multiple="true" options="{{tracks}}" modal="{{modalId}}">
    </span>
</script>
*/

export default {
	EditTrackDataTemplate,
	LoadTrackDataTemplate,
	CreateTrackTemplate,
	SaveTrackTemplate,
	ShowTrackTemplate,
}

