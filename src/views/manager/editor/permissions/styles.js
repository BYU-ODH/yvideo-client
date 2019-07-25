import styled from 'styled-components'

import searchIcon from 'assets/search.svg'

export const Container = styled.div`
	padding: 2rem;

	& h4 {
		font-weight: normal;
		font-size: 1.4rem;
		margin-bottom: 1.6rem;
	}
`

export const Search = styled.form`

	position: relative;

	& > input {
		z-index: 1;

		background: white;

		height: 2.6rem;
		width: 18rem;

		border: none;
		border-radius: 1.3rem;

		margin-bottom: 1.6rem;
		margin-right: 2rem;

		outline: none;

		box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);

		padding-left: 1rem;
		padding-right: 1rem;
	}
`

export const SearchIcon = styled.span`
	position: absolute;
	z-index: 10;
	top: .6rem;
	left: .7rem;

	background: url(${searchIcon}) center no-repeat;
	background-size: contain;

	height: 1.4rem;
	width: 1.4rem;
`

export const DepartmentSelect = styled.select`
	background: white;

	height: 2.6rem;
	width: 18rem;

	border: none;
	border-radius: 1.3rem;

	margin-bottom: 1.6rem;
	margin-right: 2rem;

	outline: none;

	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);

	padding-left: .6rem;
	padding-right: 1.2rem;
`

export const CatalogInput = styled.input`
	background: ${props => props.disabled ? `#eee` : `white`};

	height: 2.6rem;
	width: 18rem;

	border: none;
	border-radius: 1.3rem;

	margin-bottom: 1.6rem;
	margin-right: 2rem;

	outline: none;

	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);

	padding-left: 1rem;
	padding-right: 1.2rem;
`

export const SectionInput = styled.input`
background: ${props => props.disabled ? `#eee` : `white`};

	height: 2.6rem;
	width: 18rem;

	border: none;
	border-radius: 1.3rem;

	margin-bottom: 1.6rem;
	margin-right: 2rem;

	outline: none;

	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);

	padding-left: 1rem;
	padding-right: 1.2rem;
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