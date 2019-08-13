import styled from 'styled-components'

import radioChecked from 'assets/radio-checked.svg'
import radioUnchecked from 'assets/radio-unchecked.svg'

export const Wrapper = styled.div`
	height: ${props => props.active ? `30rem` : `0`};
	transition: all .5s ease-in-out;
	overflow: hidden;
`

export const InnerContainer = styled.div`
	padding: 2rem 0;

	display: grid;
	grid-template-columns: 1fr 1fr 2fr;
	grid-gap: 2rem;

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
		border-bottom: 1px solid #c4c4c4;
		line-height: 2rem;
		margin-bottom: 1rem;

		display: grid;
		grid-template-columns: 1fr 1.8rem;
		grid-gap: 1rem;
		align-items: center;
	}

	& textarea {
		width: 100%;
	}
`

export const Setting = styled.div`
	display: grid;
	grid-template-columns: 1fr 1.8rem;
	grid-gap: 1rem;
	justify-content: space-between;
	margin-bottom: .5rem;

	& > p {
		text-overflow: ellipsis;
		white-space: nowrap;
		width: inherit;
		display: block;
	}
`

export const RatioList = styled.div`
	display: flex;

	& > div {
		flex: 1;
		display: flex;
		flex-direction: column;

		& > label {
			margin: .5rem 0;
			display: flex;
			cursor: pointer;
		}
	}
`

export const RadioButton = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	background: url(${props => props.checked ? radioChecked : radioUnchecked }) center no-repeat;
	background-size: contain;
	margin-right: 1rem;
	position: relative;
	top: -.2rem;
`