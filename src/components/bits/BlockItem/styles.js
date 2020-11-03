import styled, { keyframes, css } from 'styled-components'

import defaultThumbnail from 'assets/default-thumb.svg'

export const ItemContainer = styled.div`
	& h4 {
		font-weight: 500;
	}
`

export const Thumbnail = styled.div`
	width: 17.8rem;
	height: 10rem;

	margin-bottom: 1rem;

	background-image: url(${props => props.src !== "empty" ? (props.src) : (defaultThumbnail)});
	background-size: cover;
`
