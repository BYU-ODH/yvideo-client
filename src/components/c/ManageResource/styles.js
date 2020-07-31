import styled from 'styled-components'
import searchIcon from 'assets/search.svg'

const Style = styled.div`
max-width: 100rem;

padding: 8.4rem 2.4rem 0 2.4rem;
margin: 0 auto;

& header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem;

	& > div {
		display: flex;
		align-items: center;

		& > h3 {
			font-weight: bold;
			font-size: 1.2rem;
		}

		& a {
			font-weight: 300;
			font-size: 1.2rem;
			text-decoration: none;
			color: #000;
		}

		& > button {
		}
	}
}
`

export default Style

export const Title = styled.div`
  display: flex;
  align-items: center;
`

export const Button = styled.button`
	background-size: contain;
	border: none;
	cursor: pointer;
	height: 3rem;
	outline: none;
	width: 10rem;
	border-radius: .5rem;

	&:hover {
		box-shadow: 0 3px 6px -2px #A0A0A0;
	}
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

export const TableContainer = styled.div`
	height: 25rem;
	overflow-y: scroll;
`

export const Search = styled.form`
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
	}
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