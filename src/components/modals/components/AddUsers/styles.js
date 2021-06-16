import styled from 'styled-components'
import ArrowRightIcon from 'assets/arrow-right.svg'

export const AddManyForm = styled.div`
	display: grid;

	min-width: 22rem;
	min-height: 22rem;

	& .textarea {
		width: 100%;
		font-size: 1.5rem;
	}

	& .submit-result{
		width: 100%;
		font-size: 1.5rem;
		margin-left: 3rem;

		& > textarea {
			width: 100%;
			font-size: 1.5rem;
		}
	}
`

export const CloseButton = styled.button`
	font-size: 1.5rem;
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`

export const SubmitButton = styled.button`
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

	& > h4{
		font-size: 1.2rem;
	}
`

export const ArrowRight = styled.span`
	background: url(${ArrowRightIcon}) center no-repeat;
	color: white;
	height: 1.5rem;
	width: 1.5rem;
`