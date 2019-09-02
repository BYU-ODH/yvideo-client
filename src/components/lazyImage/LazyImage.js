import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const LazyImage = props => {

	const [loaded, setLoaded] = useState(false)

	useEffect(() => {

		if (props.src === ``) setLoaded(false)
		else {
			const temp = new Image()
			temp.src = props.src
			temp.onload = () => {
				setLoaded(true)
			}
		}

		return () => {
			setLoaded(false)
		}

	}, [props.src])

	return loaded ? <Thumbnail src={props.src} /> : <Placeholder />
}

const shimmer = keyframes`
	0% {
	background-position: -30rem 0;
	}
	100% {
		background-position: 30rem 0;
	}
`

const Thumbnail = styled.div`
	width: 10rem;
	height: 6.1rem;

	background-color: gray;
	background-repeat: no-repeat;
	background-size: cover;

	background-image: url(${props => props.src});
`

const Placeholder = styled.div`
	width: 10rem;
	height: 6.1rem;

	background-color: #eee;
	background-repeat: no-repeat;
	background-size: cover;

	background-image: linear-gradient(to right, #eee 0%, #fff 50%, #eee 100%);
	animation: ${shimmer} 2s linear infinite;
	animation-fill-mode: forwards;
`

export default LazyImage
