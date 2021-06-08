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
			attachment: {},
	})

	const handleCaptchaChange = () => {
		setIsPerson(!isPerson)
		setTimeout(() => {
			setIsPerson(false)
		}, 30000);
	}

	const handleSubmit = (e) => {
			e.preventDefault()
			if(isPerson){
				if(file.attachment.name === undefined) {
					let emailObject = {
						"sender-email": email,
						"subject": title,
						"message": body,
					}
					sendNoAttachment(emailObject)
				}
				else {
					const formData = new FormData()
					formData.append(`attachment`, file.attachment)
					formData.append(`sender-email`, email)
					formData.append(`subject`, title)
					formData.append(`message`, body)
					sendWithAttachment(formData)
				}
			}
			else {
				Swal.fire({
					title: 'Please verify with reCAPTCHA to continue',
					showConfirmButton: true,
					width: 500,
				})
			}
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
		handleSubmit,
		handleCaptchaChange
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
