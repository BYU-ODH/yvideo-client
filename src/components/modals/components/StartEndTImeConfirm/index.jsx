import React from 'react';
import Style from './styles.js'

function StartEndTimeConfirm({ message, onConfirm, onCancel }) {

  return (
		<Style>
			<div className="confirmation-box">
				<p>{message}</p>
				<button className='content-cancel' onClick={onConfirm}>Confirm</button>
				<button className='content-delete' onClick={onCancel}>Cancel</button>
			</div>
		</Style>
  )
}

export default StartEndTimeConfirm;