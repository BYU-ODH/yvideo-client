import React from 'react'

import {
	Button,
	Banner,
	Style,
	h1Style,
	h2Style,
} from './styles'

const ErrorModal = props => {

	const {
		toggleModal,
	} = props.handlers

	const {
		errorMessage,
	} = props.viewstate

	const exit = () => {
		toggleModal()
		window.location.href = `/`
	}
	let title = ``
	let message = ``

	if (errorMessage.includes(`401`)){
		title = `401 Unauthenticated`
		message = `If you have an account, please log in and try again`
	}

	if(errorMessage.includes(`403`)){
		title = `403 Forbidden`
		message = `You don't have access to this content. If you believe this to be a mistake, please contact your professor, lab assistant/TA, or Y-video Support`
	}

	if (errorMessage.includes(`500`)){
		title = `500 Server Error`
		message = `We are currently experiencing server issues, please try again soon.`
	}

	return (
		<>
			<Style>
				<Banner>
					<Button className='std-outline-color' type='button' onClick={exit}>Go Back</Button>
					<h1 style={h1Style}>{title}</h1>
				</Banner>
				<h2 style ={h2Style}>{message}</h2>
			</Style>
		</>
	)
}

export default ErrorModal
