import styled from 'styled-components'

export const darken = () => {

}
export const Form = styled.form`
	display: grid;
	grid-gap: 6rem;

	min-width: 30rem;
	min-height: 35rem;


	& input, select {

		flex: 4;
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
	}

	input:focus {
		border-bottom: 1px solid #242F36;
	}

	& > label{

		display: flex;
		justify-content: space-between;

		& > span {
			flex: 1;

		}
	}

	& > div {
		display: flex;
		justify-content: space-between;
	}
`

export const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	background: transparent;
	border: none;
	cursor: pointer;
`

export const TypeButton = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;

	font-weight: ${props => props.selected ? `500` : `300`};
	color: ${props => props.selected ? `#0057B8` : `black`};
`

export const WarningLabel = styled.h4`
	margin-top: 2rem;
	color: red;
`