import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import services from 'services'

import { Feedback } from 'components'

import { interfaceService } from 'services'

const FeedbackContainer = props => {
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
			e.preventDefault();
			const emailObject = {
					"sender-name": name,
					"sender-email": email,
					"email-title": title,
					"email-body": body,
					"attachment": file
			}
			if(isPerson){
					console.log(emailObject)
					/*
							TODO: instead of printing the data, we need to send the data to the back end using redux. Implement this using the user interface, there is no need to create a new store.
							Create api proxy for email. Talk to matt
					*/
			}
			else {
					alert("Something went wrong try again")
			}
	}

	const handleCaptcha = (boolean) => {
			console.log(boolean)
			setIsPerson(boolean);
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
}

export default connect(mapStoreToProps, mapDispatchToProps)(FeedbackContainer)
