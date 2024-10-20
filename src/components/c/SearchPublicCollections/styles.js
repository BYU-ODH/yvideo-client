import styled from 'styled-components'

import searchIcon from 'assets/search.svg'

const Style = styled.div`
max-width: 100rem;

padding: 8.4rem 2.4rem 0 2.4rem;
margin: 0 auto;

	& > header {
    height: 12rem;
    padding: 0 3.8rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    & h6 {
      font-size: 1.8rem;
      font-weight: bold;
    }

    & p {
      color: #a4a4a4;
      margin-top: 1.7rem;
    }
  }
`

export default Style

export const Search = styled.form`
	position: relative;
	margin-bottom: 5rem;
	display: flex;

	& > input {
		z-index: 1;
		background: white;

		height: 4rem;
		width: 90%;

		font-size: 1.5rem;

		border: none;
		border-radius: 2rem;

		margin-left: 1rem;

		padding: 0 1.25rem 0 3.25rem;

		outline: none;
		box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.15);
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

export const ListLable = styled.h4`
	margin-top: 2rem;
	margin-bottom: 2rem;
	font-weight: lighter;
	font-size: 1.3rem;
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
