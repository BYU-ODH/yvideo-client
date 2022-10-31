import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { interfaceService } from 'services'

import { SError, SLink } from './styles'

const Error = props => {

	const {
		error,
		message,
		setLost,
		setHeaderBorder,
	} = props

	useEffect(() => {
		setLost(true)
		setHeaderBorder(false)

		return () => {
			setLost(false)
			setHeaderBorder(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<SError>
			<h1>{error}</h1>
			<h2>{message}</h2>
			<SLink to={`/`}>Go back home</SLink>
		</SError >
	)
}

const mapDispatchToProps = {
	setLost: interfaceService.setLost,
	setHeaderBorder: interfaceService.setHeaderBorder,
}

export default connect(null, mapDispatchToProps)(Error)
