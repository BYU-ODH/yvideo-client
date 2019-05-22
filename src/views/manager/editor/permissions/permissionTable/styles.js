import styled from 'styled-components'

export const Container = styled.div`

	padding: 2rem;

	& > h4 {
		font-weight: normal;
		font-size: 1.4rem;
		margin-bottom: 1.6rem;
	}
`

export const Search = styled.div`

	position: relative;

	& > input {
		z-index: 1;

		background: white;

		height: 2.6rem;
		width: 28rem;

		border: none;
		border-radius: 1.3rem;

		margin-bottom: 1.6rem;

		outline: none;

		box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);

		padding-left: 2.6rem;
		padding-right: 1.2rem;
	}
`

export const SearchIcon = styled.span`
	position: absolute;
	z-index: 10;
	top: .6rem;
	left: .7rem;

	background: url(${props => props.src}) center no-repeat;
	background-size: contain;

	height: 1.4rem;
	width: 1.4rem;
`

export const Table = styled.table`
	background: white;
	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);

	border-collapse: collapse;

	& > thead {

		border-bottom: 2px solid #eee;

		& th {
			padding: 1rem;
			min-width: 20rem;
			text-align: left;
		}

		& th.small {
			min-width: 5rem;
		}
	}

	& > tbody {
		& td {
			padding: 1rem;
			min-width: 20rem;
		}
	}
`