import styled from 'styled-components'

export const Form = styled.form`
	display: grid;
	/* grid: repeat(3, 1fr) / 1fr; */
	grid-gap: 2rem;

	min-width: 30rem;
	min-height: 35rem;


	& > div {
		display: flex;
		justify-content: space-between;
	}

	& > label {
		display: flex;
		justify-content: space-between;

		& > textarea {
			width: 20rem;
		}

		& > input {
			width: 23rem;
		}

		& > h4 {
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center !important;
		}

		& > div {
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: end !important;
		}
	}
`

export const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	background: transparent;
	border: none;
	cursor: pointer;
`

export const Upload = styled.div`

	& .files-input {
		/* outline: 2px dashed #92b0b3; */
    -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
    transition: outline-offset .15s ease-in-out, background-color .15s linear;
    padding: 1rem;
    text-align: center !important;
		/* margin-right: 20px; */
		margin-left: 10px;
    width: 70% !important;
	}

	& .files{ position:relative }
`

export const CategorySelect = styled.select`
	background: white;
	font-size: 1.5rem;

	border: none;
	border-radius: 2rem;

	padding: 0 1.25rem;
	text-align-last:center;

	outline: none;
	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
`

export const ProgressBar = styled.progress`
	width: 200px;
  height: 20px;
`

export const Progress = styled.div`
	display: grid;
	grid-gap: 2rem;

`