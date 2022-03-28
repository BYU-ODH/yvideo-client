import React, { PureComponent } from 'react'

import {
	// Form,
	Button,
	Banner,
	Style,
} from './styles'

export default class Error extends PureComponent {

	render() {

		const {
			toggleModal,
		} = this.props.handlers

		const {
			errorMessage,
		} = this.props.viewstate
		const exit = () => {
			toggleModal()
			window.location.href = `/`
		}
		let title = ``
		let message = ``

		if(errorMessage.includes(`403`)){
			title = `403 Forbidden`
			message = `You don't have access to this content. If you believe this to be a mistake, please contact your professor, lab assistant/TA, or Yvideo Support`
		}
		// case errorMessage.includes(`401`):
		// 	title = `401 Unauthenticated`
		// 	message = `If you have an account, please log in and try again`
		// 	break
		// case errorMessage.includes(`500`):
		// 	title = `500 Server Error`
		// 	message = `We are currently experiencing server issues, please try again soon.`
		// 	break
		// default : return
		// }
		return (
			<>
				<Style>
					<Banner>
						<Button type='button' onClick={exit}>Go Back</Button>
						<h1 style={{textAlign:`center`,justifySelf:`center`,margin:`auto`, width: `50%`, padding: `20px`}}>{title}</h1>
					</Banner>
					<h2 style ={{padding: `20px`, textAlign:`left`, lineHeight: 1.5}}>{message}</h2>
				</Style>
			</>
		)
	}
}
