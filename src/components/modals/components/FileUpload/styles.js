import styled from 'styled-components'
import uploadIcon from 'assets/upload.svg'

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
`

export const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`

export const RemoveKeyword = styled.button`
	height: 1.5rem;
	width: 1.5rem;
	background: url(${props => props.src}) center no-repeat;
	background-size: contain;
	transform: rotate(45deg);
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
	margin: 0 -.25rem 0 .25rem;
`

export const TableContainer = styled.div`
	height: 25rem;
	overflow-y: scroll;
`

export const Table = styled.table`
	/*background: white;*/
	/*box-shadow: 0 2px 5px -1px rgba(0,0,0,0.15);*/
	width: 100%;

	& th {
		padding: 1rem;
		text-align: left;
	}

	& tr {
		background: white;
		box-shadow: 0 2px 5px -1px rgba(0,0,0,0.15);
	}

	& td {
		padding: 1rem;
		text-align: left;
		& label {
			padding: 1rem;
		}
	}
`

export const Tabs = styled.div`
	margin: 2rem 0;
	padding: 0;
`

export const Tab = styled.button`
	font-weight: ${props => props.selected ? `500` : `300`};
	color: ${props => props.selected ? `#0057B8` : `black`};

	border-radius: .3rem;

	padding: .75rem 1.25rem;
	background: ${props => props.selected ? `#D2E8FF` : `transparent`};
	border: none;
	outline: none;
	cursor: pointer;
`

export const UploadButton = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	background: transparent;
	cursor: pointer;
`

export const TypeButton = styled.button`
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;

	font-weight: ${props => props.selected ? `500` : `300`};
	color: ${props => props.selected ? `#0057B8` : `black`};
`

export const Upload = styled.div`

	& .files-input {
		outline: 2px dashed #92b0b3;
    -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
    transition: outline-offset .15s ease-in-out, background-color .15s linear;
    padding: 1em;
    text-align: center !important;
    margin: 0;
		margin-right: 20px;
    width: 100% !important;
	}

	& .files{ position:relative }

	& .files:after {
		pointer-events: none;
    position: absolute;
    top: 10px;
    left: 230px;
    right: 0;
		width: 50px;
    height: 56px;
    content: "";
		background-image: url(${uploadIcon});
    display: block;
    margin: 0 auto;
    background-size: 50%;
    background-repeat: no-repeat;
	}
`