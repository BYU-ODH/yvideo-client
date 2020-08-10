import styled from 'styled-components'

import searchIcon from 'assets/search.svg'
import uploadIcon from 'assets/upload.svg'

export const Form = styled.form`
	display: grid;
	grid-gap: 4rem;

	min-width: 30rem;
	min-height: 35rem;


	& input, select {
		flex: 4;
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
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
	outline: none;
	cursor: pointer;
`

export const UploadButton = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	background: transparent;
	/* border: none;
	outline: none; */
	cursor: pointer;
`

export const SearchIcon = styled.span`
	position: absolute;
	z-index: 10;
	top: 1rem;
	left: 2rem;
	background: url(${searchIcon}) center no-repeat;
	background-size: contain;
	height: 2rem;
	width: 2rem;
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
	margin: 1.5rem 0;
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

export const TypeButton = styled.button`
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;

	font-weight: ${props => props.selected ? `500` : `300`};
	color: ${props => props.selected ? `#0057B8` : `black`};
`

export const FileUpload = styled.div`

	& .files-input {
		outline: 2px dashed #92b0b3;
    -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
    transition: outline-offset .15s ease-in-out, background-color .15s linear;
    padding: 1em;
    text-align: center !important;
    margin: 0;
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

export const CategorySelect = styled.select`
	background: white;
	font-size: 1.5rem;

	border: none;
	border-radius: 2rem;

	padding: 0 1.25rem 0 1.25rem;

	outline: none;
	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
	& option {
		margin: auto auto 6px auto;
	}
`