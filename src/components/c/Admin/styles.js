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

export const Search = styled.form`
	position: relative;
	display: ${props => props.isMobile ? `flex` : ``};
	flex-direction: ${props => props.isMobile ? `column` : ``};
	align-items: ${props => props.isMobile ? `center` : ``};

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
		margin: ${props => props.isMobile ? `0.5rem` : ``};

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
	margin: ${props => props.isMobile ? `0.5rem` : ``};

	border: none;
	border-radius: 2rem;

	padding: 0 1.25rem;

	outline: none;
	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
	& option {
		margin: auto auto 6px auto;
	}
`

export const Mobile = styled.div`
	display: ${props => props.isMobile ? `flex` : ``};
	flex-direction: ${props => props.isMobile ? `column` : ``};
	align-items: ${props => props.isMobile ? `center` : ``};
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