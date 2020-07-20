import styled, { keyframes, css} from 'styled-components'
import { Link } from 'react-router-dom'

import translation from 'assets/translation.svg'
import captions from 'assets/captions.svg'
import annotations from 'assets/annotations.svg'

const Style = styled.div`
	padding: 2rem;
`

export default Style

const shimmer = keyframes`
	0% {
		background-position: -30rem 0;
	}
	100% {
		background-position: 30rem 0;
	}
`

export const Preview = styled.div`

	display: flex;

	& > div:nth-child(1) {
		min-width: 14rem;
	}

	& > div:nth-child(2) {

		flex: 1;

		display: flex;
		flex-direction: column;
		justify-content: space-between;

		& > h4 {
			font-weight: normal;
			text-overflow: ellipsis;
		}

		& ul {
			margin: 0;
			padding: 0;

			display: grid;
			grid-template-columns: repeat(3, 2rem);
			grid-gap: .5rem;
		}

		& em {
			font-weight: lighter;
		}
	}

	& > div:nth-child(3) {
		display: flex;
		justify-content: flex-end;
	}
`

const TextButton = css`
	background: transparent;
	border: none;
	color: #0582CA;
	outline: none;
	height: fit-content;
	cursor: pointer;
`
export const EditButton = styled.button`
	${TextButton}
`

export const Icon = styled.li`
	width: 2rem;
	height: 2rem;
	background-size: contain;
	list-style: none;

	&.translation {
		background: url(${translation}) center no-repeat;
		display: ${props => props.checked ? `block` : `none`};
	}

	&.captions {
		background: url(${captions}) center no-repeat;
		display: ${props => props.checked ? `block` : `none`};
	}

	&.annotations {
		background: url(${annotations}) center no-repeat;
		display: ${props => props.checked ? `block` : `none`};
	}
`

export const Placeholder = styled.div`
	width: 10rem;
	height: 6.1rem;
	background-color: #eee;
	background-image: linear-gradient(to right, #eee 0%, #fff 50%, #eee 100%);
	background-repeat: no-repeat;

	animation: ${shimmer} 2s linear infinite;
	animation-fill-mode: forwards;
`

export const Thumbnail = styled.div`
	width: 10rem;
	height: 6.1rem;
	background-color: #eee;
	background-size: no-repeat;
	background-size: cover;
	background-image: url(${props => props.src});
`

export const TitleEdit = styled.input`
	position: relative;
	display: inline-block;
	top: -.3rem;
	left: -.2rem;
	margin-bottom: -.6rem;
`

export const PublishButton = styled.button`
	color: ${props => props.published ? `#FFBF00` : `#0582CA`};
	font-weight: bold;
	line-height: 1.5rem;
	letter-spacing: .05rem;

	background: transparent;
	width: fit-content;

	border: none;
	padding: 0;

	cursor: pointer;
	outline: none;
`

export const RemoveButton = styled.button`
	color: #ff4c4c;
	font-weight: bold;
	line-height: 1.5rem;
	letter-spacing: .05rem;

	background: transparent;
	width: fit-content;

	border: none;
	padding-left: 20px;

	cursor: pointer;
	outline: none;
`

export const StyledLink = styled(Link)`
${TextButton} //reuses TextButton css
`

export const InnerContainer = styled.div`
	display: grid;
	grid-gap: 2rem;
	grid-template-columns: 1fr 1fr 2fr;
	padding: 2rem 0;
	& .tags {
		display: flex;
		flex-wrap: wrap;
	}
	& .tag-input {
		width: calc(100% - 4px);
	}
`

export const Column = styled.div`
	margin-right: 1rem;
	& > h4 {
		align-items: center;
		border-bottom: 1px solid #c4c4c4;
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 1fr 1.8rem;
		line-height: 2rem;
		margin-bottom: 1rem;
	}
	& textarea {
		width: 100%;
	}
`

export const Setting = styled.div`
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: 1fr 1.8rem;
	justify-content: space-between;
	margin-bottom: .5rem;
	& > p {
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: inherit;
	}
`
