import styled from 'styled-components'

import searchIcon from 'assets/search.svg'

export const Container = styled.div`
	display: flex;
	height: calc(100vh - 8.4rem);
	background-color: #fafafa;
	padding-top: 8.4rem;
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

export const CategorySelect = styled.select`
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