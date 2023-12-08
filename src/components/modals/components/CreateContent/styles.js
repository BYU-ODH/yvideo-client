import styled from 'styled-components'

import searchIcon from 'assets/search.svg'

export const FormResource = styled.form`
	display: grid;
	/* grid: repeat(3, 1fr) / 1fr; */

	min-width: 30rem; 
	min-height: 35rem;

	& > label {
		font-size: 1.4rem;
		height: 25px;


		& input {
			width: 100%;
			border: none;
			border-bottom: 1px solid rgba(0, 0, 0, 0.3);
			/* background-color: rgba(0, 0, 0, 0.03); */
			outline: none;
			margin: 10px 0px 2px 0px;
		}

			input:focus {
				border-bottom: 1px solid #242F36;
			}

		& select {
			margin-left: 20px;
			width: 200px;
		}

		& > .resource-content-remove {
			display: flex;
			align-items: baseline;
		}

		& #no-files-message {
			color: var(--red);
			width: 300px;
		}
	}

	& > div {
		display: flex;
		justify-content: space-between;
	}

	& .box {
		inline-size: 300px;
	}

	& .unauthorized-message {
		color: var(--red);
		word-break: break-word;
		width: 300px;
	}
`

export const Form = styled.form`
	display: grid;
	/* grid: repeat(3, 1fr) / 1fr; */
	grid-gap: 2rem;

	min-width: 30rem;
	min-height: 35rem;


	& input, select {
		flex: 5;
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
	}

		input:focus {
			border-bottom: 1px solid #242F36;
		}

	& select {
		margin-left: 20px;
		width: 150px !important;
		background-color: transparent;
	}

	& > label{

		display: flex;
		justify-content: space-between;
		margin-top: 1rem;

		& > span {
			flex: 1;
		}
	}

	& > div {
		display: flex;
		justify-content: space-between;
	}

	.keywords-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		max-width: 30rem;

		& > span {
			color: white;
			background-color: #0582CA;
			padding: .5rem .75rem;
			border-radius: 1.2rem;
			margin: 0 .5rem 0 0;
			display: flex;
			align-items: center;
		}
	}

	& #create-content-keywords {

		& option {
			font-size: 12px;
		}
	}
`

export const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	cursor: pointer;
	place-self: start;
	background: transparent;
	border-radius: 3px;
	border: none;
	// :hover {
	// 	box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.6);
	// 	transition: 0.5s;
	/* } */
`
export const DecideButton = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	cursor: pointer;
	place-self: start;
	background: transparent;
	border-radius: 5px;
	border: 3px solid #0582ca;
	padding:0.5rem;
	align-self:center;
	:hover {
			background-color: #0582ca;
			color: #ffffff;
		}
	// :hover {
	// 	box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.6);
	// 	transition: 0.5s;
	/* } */
`

export const SearchIcon = styled.span`
	position: absolute;
	z-index: 10;
	top: 1rem;
	left: 1rem;
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

	> .resource-content-remove-button {
		height: 2.5rem;
		width: 2.5rem;
	}
`

export const TableContainer = styled.div`
	position: absolute;
	height: 250px;
	width: 75%;
	margin-top: 10%;
	background-color: white;
	overflow-y: scroll;
	z-index: 1;

	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3), 0px 0px 5px rgba(0, 0, 0, 0.3);

	& li {
		height: 25px;
		list-style-type: none;
		font-size: 1.4rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
		padding: 5px;
		display: flex;

		:hover {
			background-color: #0582ca;
			cursor: pointer;
		}

		& input, label {
			margin: auto 0px auto 5%;
		}
	}
`

export const Table = styled.table`
	/*background: white;*/
	/*box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.15);*/

	height: ${props => props.height ? `${props.height * 15}px`: `0px`};
	width: 80%;
	position: absolute;
	z-index: 10;
	background-color: white;

	& th {
		padding: 1rem;
		text-align: left;
	}

	& tr {
		background: white;
		box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.15);
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

export const TypeButton = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;

	font-weight: ${props => props.selected ? `500` : `300`};
	color: ${props => props.selected ? `#0057B8` : `black`};
	box-shadow: 2px 2px 1px -1px rgba(0, 0, 0, 0.15);
	border-radius: 3px;

	& > i {
		margin-right: 3px;
	}
	& > i:firstchild {
		margin-right: none;
	}


	:hover{
		transition: .2s;
		background-color: #f3f3f3;
	}
`
export const Search = styled.div`
	position: relative;
	margin-bottom: -2rem;

	& > input {
		z-index: 1;
		background: white;

		height: 4rem;
		width: 100%;
		font-size: 1.5rem;
		border: none;
		border-radius: 1.5rem;
		outline: none;
		box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.15);
		padding: 0 1.25rem 0 3.25rem;
	}

	& > button {
		width: 8rem;
    height: 4rem;
    color: white;
    background-color: var(--light-blue);
    margin-left: 1rem;
    outline: none;
    box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.15);
    font-size: 1.5rem;
    border: none;
    border-radius: 2rem;
    text-align: center;
		cursor: pointer;
		transition: .5s ease;
		font-weight: 500;

		:hover {
			background-color: var(--navy-blue);
		}
	}
`
