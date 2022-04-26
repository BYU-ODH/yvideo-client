import styled from 'styled-components'

import searchIcon from 'assets/search.svg'
import plusIcon from 'assets/plus-white.svg'

const Style = styled.div`
background-color: #fafafa;

	& .add-users-button{
		padding: 9rem 2rem 0 2rem;
		margin: 0 auto;
	}

	& .admin-dashboard{
		display: flex;
		flex-direction: column;
		align-items: center;
		height: calc(100vh - 8.4rem);

		& > div {
			display: flex;
		}

		& > h1 {
			margin: 5rem 0 4rem 0;
			font-weight: normal;
		}
	}
`

export default Style

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

		box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
		outline-color: var(--light-blue);

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

		@media screen and (max-width: 1000px) {
      margin: 0.5rem;
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

	@media screen and (max-width: 1000px) {
		top: 1.5rem;
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

	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);

	& option {
		margin: auto auto 6px auto;
	}

	@media screen and (max-width: 1000px) {
		margin: 0.5rem;
	}
`

export const Mobile = styled.div`
	@media screen and (max-width: 1000px) {
		display: flex;
		flex-direction: column;
		align-items: center
	}
`

export const FeedbackMessage = styled.div`
	height: 100px;
	display: flex;

	& > p {
		font-weight: 200;
		font-size: 20px;
		margin: auto;
	}
`
export const Button = styled.button`
		display: flex;
		align-items: center;
		justify-content: center;
		width: 12rem;
    height: 5rem;
    color: white;
    background-color: var(--light-blue);
    margin-left: 1rem;
		margin-bottom: 2rem;
		margin-top: 2rem;
		padding-right: 1rem;
    box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
    font-size: 1.5rem;
    border: none;
    border-radius: 6rem;
    text-align: center;
		cursor: pointer;
		transition: .5s ease;
		font-weight: 500;

		:hover {
			background-color: var(--navy-blue);
		}

		& > span {
		margin-right: 1rem;
	}
`

export const PlusIcon = styled.span`
	background: url(${plusIcon}) center no-repeat;
	color: white;
	height: 1.5rem;
	width: 1.5rem;
`