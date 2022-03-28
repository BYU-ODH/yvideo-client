import styled from 'styled-components'

import searchIcon from 'assets/search.svg'

const Style = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: calc(100vh - 8.4rem);
	background-color: #fafafa;
	padding-top: 8.4rem;

	& > div {
		display: flex;
	}

	& > h1 {
		margin: 5rem 0 4rem 0;
		font-weight: normal;
	}
`

export default Style

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
`

export const Table = styled.table`
	background: white;
	box-shadow: 0 2px 5px -1px rgba(0,0,0,0.15);
	border-radius: 10px;
	width: 100%;

	& th {
		padding: 1.5rem;
		font-size: 1.5rem;
		text-align: left;
		border-bottom: 0.7px solid rgba(0,0,0,0.15)
	}

	& td {
		padding: 1.5rem;
		font-size: 1.4rem;
		text-align: left;
	}
`