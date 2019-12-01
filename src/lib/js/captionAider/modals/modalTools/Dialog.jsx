import React from 'react'

import { Modal, Button } from 'react-bootstrap'

const Dialog = (props) => {

	const actions = props.actions

	const buttonpress = (event, eventType) => {
		if(typeof actions[eventType] !== `function`) return
		actions[eventType].call(this, event)
	}

	return (
		<Modal show={props.show} onShow={props.handleShow} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{props.dialogTitle}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div class='container-fluid'>
					{props.dialogBody}
				</div>
			</Modal.Body>
			<Modal.Footer>
				{props.buttons.map( button => {
					return <Button variant='secondary' class='btn btn-gray' on-tap={buttonpress(button.event)}>{button.label}</Button>
				})}
				<Button variant='primary' onClick={props.handleClose}>
            Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default Dialog

/*  Without Bootstrap
return (
		<div class='modal-dialog'>
			<div class='modal-content'>
				<div class='modal-header'>
					<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>X</button>
					<h3>{props.dialogTitle}</h3>
				</div>
				<div class='modal-body'>
					<div class='container-fluid'>{props.dialogBody}</div>
				</div>
				<div class='modal-footer'>
					{props.buttons.map((button) => {
						return <button class='btn btn-blue' on-tap={buttonpress(button.event)}>{button.label}</button>
					})}
					<button class='btn btn-gray' data-dismiss='modal' aria-hidden='true'>Close</button>
				</div>
			</div>
		</div>
	)*/

/* Dialog = Ractive.extend({
	template: '<div class="modal-dialog">\
	<div class="modal-content">\
	<div class="modal-header">\
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>\
			<h3>{{dialogTitle}}</h3>\
	</div>\
	\
	<div class="modal-body">\
			<div class="container-fluid">{{>dialogBody}}</div>\
	</div>\
	<div class="modal-footer">\
			{{#buttons}}\
			<button class="btn btn-blue" on-tap="buttonpress:{{.event}}">{{.label}}</button>\
			{{/buttons}}\
			<button class="btn btn-gray" data-dismiss="modal" aria-hidden="true">Close</button>\
	</div></div></div>',
	onrender: function(){
			var actions = this.actions;
			this.on('buttonpress',function(event,which){
					if(typeof actions[which] !== 'function'){ return; }
					actions[which].call(this,event);
			});
	}
});*/