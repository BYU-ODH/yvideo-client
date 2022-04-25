import styled, {css} from 'styled-components'
import searchIcon from 'assets/search.svg'
import removeIcon from 'assets/trash.svg'

export const Search = styled.div`
	position: relative;

	& > input {
		z-index: 1;
		background: white;

		height: 4rem;
		width: 30rem;

		font-size: 1.5rem;

		border: none;
		border-radius: 2rem;

		margin-left: 1rem;

		padding: 0 1.25rem 0 3.25rem;

		outline: none;
		box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);

		@media (max-width: 800px){
			width: 20rem;
		}
	}

	& > button {
		width: 8rem;
    height: 4rem;
    color: white;
    background-color: var(--light-blue);
    margin-left: 1rem;
    outline: none;
    box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
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

export const InputForm = styled.div`
	position: absolute;
	top: 50px;
	margin-top: 31px;
	left: 50px;

	& > input {
		background: white;
		border-radius: 1.3rem;
		box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
		height: 2.6rem;
		margin-bottom: 1rem;
		margin-right: 2rem;
		padding-left: 1rem;
		padding-right: 1rem;
		width: 23rem;
		z-index: 1;
	}
`
export const AddButton = styled.button`
	background: ${props => props.disabled ? `#eee` : `#0582CA`};
	color: ${props => props.disabled ? `initial` : `white`};

	height: 2.8rem;
	width: 5rem;

	border: none;
	border-radius: 1.3rem;

	outline: none;

	${props => props.disabled ? `` : `cursor: pointer;`}

	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);

	padding-left: 1rem;
	padding-right: 1.2rem;
`

export const SearchIcon = styled.span`
	position: absolute;
	z-index: 9;
	top: 1rem;
	left: 2rem;
	background: url(${searchIcon}) center no-repeat;
	background-size: contain;
	height: 2rem;
	width: 2rem;
`

export const RemoveIcon = styled.span`
	background: url(${removeIcon}) center no-repeat;
	height: 2.5rem;
	width: 2rem;
`

const TextButton = css`
	font-weight: bold;
	line-height: 1.5rem;
	letter-spacing: .05rem;
	background: transparent;
	border: none;
	cursor: pointer;
	outline: none;
`

export const RemoveButton = styled.button`
	display: flex;
	align-items: center;
  justify-content: center;
	color: #ff4c4c;
	${TextButton}
	text-align: center !important;

	& > span {
		margin-left: .5rem;
	}
`

export const CategorySelect = styled.select`
	background: white;
	height: 4rem;
	width: 12rem;
	display: flex;
	font-size: 1.5rem;

	border: none;
	border-radius: 2rem;

	padding: 0 1.25rem;

	outline: none;
	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
	& option {
		margin: auto auto 6px auto;
	}
`

export const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
	position: absolute;
	top: 16px;
  right: 12px;
`

export const FeedbackMessage = styled.div`
	height: 100px;
	width: 200px;
	display: flex;

	& > p {
		font-weight: 500;
		font-size: 20px;
		margin: auto;
	}
`

export const Div = styled.div`
	padding-top: 88px;
`

export const Form = styled.form`
	display: grid;
	grid-gap: 2rem;

	min-width: 30rem;
	min-height: 20rem;
	max-height: 25rem;
	overflow: scroll;
	scroll-behavior: smooth;

	& input, select {
		flex: 5;
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

	& > h2 {
		position: absolute;
		top: 50px;
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

`

export const Hr = styled.hr`
	position: absolute;
	top: 50px;
	width: 29.8rem;
	margin-top: 76px;
	border: 1px solid lightgray;
`

export const Table = styled.table`
	background: white;
	width: 100%;

	& th {
		padding: 1.5rem;
		font-size: 1.5rem;
		text-align: center;
		border-bottom: 0.7px solid rgba(0,0,0,0.15)
	}

	& td {
		padding: 1.5rem;
		font-size: 1.4rem;
		text-align: center;
	}
`

export const RegisteredListTable = styled.table`
	background: white;
	border-radius: 10px;
	width: 100%;
	margin-top: 15px;


	& th {
		padding: 1.5rem;
		font-size: 1.5rem;
		text-align: center;
		border-bottom: 0.7px solid rgba(0,0,0,0.15)
	}

	& td {
		padding-top: .5rem;
		padding-bottom: .5rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		font-size: 1.4rem;
		text-align: center;

	& > tbody {
		position: relative:
		padding-bottom: 50px;
	}

	}
`