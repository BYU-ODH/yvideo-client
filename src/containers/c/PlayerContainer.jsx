import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import { contentService } from 'services'
import styled from 'styled-components'

import { roles } from 'models/User'
import { objectIsEmpty } from 'lib/util'

import { Player } from 'components'
const Container = styled.div`
	overflow-y: scroll;
`

const PlayerContainer = props => {

	const {
		userId,
		content,
		getContent,
		addView,
	} = props

	const params = useParams()

	useEffect(() => {
		console.log(`Running effect`)
		getContent([params.id])
	}, [getContent, params.id])

	if(!objectIsEmpty(content))
		addView(params.id)

	return (
		<Container id='some-id'>
			<Player videoId={params.id} content={content[params.id]} userId={userId} />
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
	addView: contentService.addView,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)