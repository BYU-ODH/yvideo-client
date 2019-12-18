import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import { contentService } from 'services'
import styled from 'styled-components'

import { roles } from 'models/User'

import { Player } from 'components'
// import CaptionAiderContainer from './CaptionAiderContainer'

// import { objectIsEmpty } from 'lib/util'

const Container = styled.div`
	overflow-y: scroll;
`

const PlayerContainer = props => {

	const {
		// isProf,
		// isAdmin,
		userId,
		content,
		getContent,
	} = props

	const params = useParams()

	useEffect(() => {
		console.log(`Running effect`)
		getContent([params.id])
	}, [getContent, params.id])

	return (
		<Container id='some-id'>
			<Player videoId={params.id} content={content[params.id]} userId={userId} />
			{/* {
				(isProf || isAdmin) &&
				<CaptionAiderContainer content={content[params.id]} />
			} */}
		</Container>
	)
}

const mapStateToProps = ({ authStore, contentStore }) => ({
	isProf: authStore.user.roles.includes(roles.teacher),
	isAdmin: authStore.user.roles.includes(roles.admin),
	userId: authStore.user.id,
	content: contentStore.cache,
})

const mapDispatchToProps = {
	getContent: contentService.getContent,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
