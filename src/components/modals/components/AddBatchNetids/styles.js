import styled from 'styled-components'

export const AddManyForm = styled.form`
	display: grid;

	min-width: 22rem;
	min-height: 22rem;

	& .textarea {
		font-size: 1.5rem;
	}
`

export const CancelButton = styled.button`
	font-size: 1.5rem;
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`

export const AddManyButton = styled.button`
	font-size: 1.5rem;
	border: none;
	outline: none;
	background: transparent;
	${props => props.disabled ? `` : `cursor: pointer;`}
	color: ${props => props.disabled ? `#eee` : `#0582CA`};
`

export const Form = styled.form`

	& > div {
		display: flex;
		justify-content: space-between;
	}
`