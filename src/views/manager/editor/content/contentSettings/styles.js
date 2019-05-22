import styled from 'styled-components'

export const Wrapper = styled.div`
	height: ${props => props.active ? `20rem` : `0`};
	transition: all .5s ease-in-out;
	overflow: hidden;
`

export const Container = styled.div`
	padding: 2rem 0;

	display: grid;
	grid-template-columns: 1fr 1fr 2fr;
	grid-gap: 2rem;
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
`

export const Setting = styled.div`
	display: grid;
	grid-template-columns: 1fr 1.8rem;
	grid-gap: 1rem;
	justify-content: space-between;

	& > p {
		text-overflow: ellipsis;
		white-space: nowrap;
		width: inherit;
		display: block;
	}
`