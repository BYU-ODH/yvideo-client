import styled from 'styled-components'

export const Wrapper = styled.form`
	display: flex;
	min-width: 40rem;

	& > input {
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
	}

	& > div {
		display: flex;
		justify-content: space-between;
	}
`

export const Input = styled.form`
	& > input {
		width: 100%;
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
	}
`

export const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	background: transparent;
	border: none;
	cursor: pointer;
	padding-left: 0;

	& input {
		text-align: right;
	}

`
export const secondInput = {
	borderBottom: `1px solid #242F36`,
}
