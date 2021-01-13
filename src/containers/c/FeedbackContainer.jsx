import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import services from 'services'

import { Feedback } from 'components'

import { interfaceService } from 'services'

import Swal from 'sweetalert2'

const FeedbackContainer = props => {
	const { sendNoAttachment, sendWithAttachment } = props
	const [isPerson, setIsPerson] = useState(false)
	const [email, setEmail] = useState('')
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [name, setName] = useState('')
	const [file, setFile] = useState({
			type: '',
			attachment: null,
	})

	const handleSubmit = (e) => {
			e.preventDefault()
			if(file.attachment == null) {
				 var emailObject = {
						"sender-email": email,
						"subject": title,
						"message": body,
				}
			}
			else {
				 var emailObject = {
					"sender-email": email,
					"subject": title,
					"message": body,
					"attachment": file
				}
			}
			if(isPerson){
				if(file.attachment == null) {
					sendNoAttachment(emailObject)
				}
				else {
					sendWithAttachment(emailObject)
					console.log(emailObject)
				}
					/*
							TODO: instead of printing the data, we need to send the data to the back end using redux. Implement this using the user interface, there is no need to create a new store.
							Create api proxy for email. Talk to matt
					*/
			}
			else {
				Swal.fire({
					title: 'Please verify with reCAPTCHA to continue',
					showConfirmButton: true,
					width: 500,
				})
			}
	}

	const handleCaptcha = (boolean) => {
			setIsPerson(boolean)
	}

	const viewstate = {
		email,
		name,
		title,
		body,
		file,
	}

	const handlers = {
		setFile,
		setBody,
		setTitle,
		setEmail,
		setName,
		handleCaptcha,
		handleSubmit,
	}

	return <Feedback viewstate={viewstate} handlers={handlers}/>
}

const mapStoreToProps = store => ({
})

const mapDispatchToProps = {
	sendNoAttachment: interfaceService.sendNoAttachment,
	sendWithAttachment: interfaceService.sendWithAttachment,

}

export default connect(mapStoreToProps, mapDispatchToProps)(FeedbackContainer)
