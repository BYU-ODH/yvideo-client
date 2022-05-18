import styled from 'styled-components'

export const Wrapper = styled.form`
	/* display: grid; */
	/* grid: repeat(3, 1fr) / 1fr; */
	/* grid-gap: 2rem; */
	min-width: 50rem;

	& > input {
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
	}
`
export const Title = styled.div`
	display: flex;

	& > h4 {
		margin-right: 1rem;
	}
`
export const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`