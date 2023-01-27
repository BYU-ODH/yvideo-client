import styled from 'styled-components'

import blockView from 'assets/block-view.svg'
import listView from 'assets/list-view.svg'
import searchIcon from 'assets/search.svg'
import menuIcon from 'assets/menu-black.svg'

const Style = styled.div`

.subheader {
	margin-top: var(--navbar-height);


	& h3 {
			margin: 0px;
			display: inline;
			font-weight: 300;
			font-size: 1.3rem;
	}

	.text-right {
		text-align: right;
		display: inline;
	}

	.text-left {
		margin-left: 2rem;
	}
}

h3 {
	margin: 0px;
	display: inline;
	font-size: 1.45rem;

}

.button {
	font-size: 13px;
	border-radius: 5px
}

`

export default Style

export const ViewToggle = styled.button`
	background: url(${props => props.displayBlocks ? listView : blockView}) center no-repeat;
	background-color: white;
	background-size: cover;
	border: none;
	height: 1.5rem;
	width: 1.5rem;
	margin-right: ${props => props.role <= 2 || props.hasCollectionPermissions ? `1rem` : `0rem`};
	outline: none;
	cursor: pointer;
`
export const PublicViewToggle = styled.button`
	background: url(${props => props.publicDisplayBlocks ? listView : blockView}) center no-repeat;
	background-size: cover;
	border: none;
	height: 1.5rem;
	width: 1.5rem;
	margin-right: ${props => props.role === 0 ? `1rem` : `0rem`};
	margin-left: 2rem;
	outline: none;
	cursor: pointer;
`
export const Help = styled.img`
	width: 20px;
	height: 20px;
	margin-left: -5px;
	bottom: -4px;
	cursor: pointer;
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
export const SearchIcon = styled.span`
	position: absolute;
	z-index: 10;
	top: 1rem;
	left: 1rem;
	background: url(${searchIcon}) center no-repeat;
	background-size: contain;
	height: 1.8rem;
	width: 1.8rem;
	@media screen and (max-width: 320px){
		top: 1.3rem;
		height: 1.5rem;
		width: 1.5rem;
	}
`

export const MenuIcon = styled.span`
	top: 1rem;
	left: 2rem;
	background: url(${menuIcon}) center no-repeat;
	background-size: contain;
	height: 2rem;
	width: 2rem;
	cursor: pointer;
`

export const Search = styled.form`

	position: relative;
	width: 80%;

	& > input {
		z-index: 1;
		background: white;

		height: 3.5rem;
		width: 97%;

		font-size: 1.2rem;

		border: none;
		border-radius: .5rem;

		// margin-left: 1rem;
		padding: 0 1.25rem 0 3.25rem;

		outline: none;
		box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.15);
	}

	& > button {
		width: 8rem;
    height: 3rem;
    color: white;
    background-color: var(--light-blue);
    margin-left: 1rem;
    outline: none;
    box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.15);
    font-size: 1.2rem;
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

export const SearchMobile = styled.form`

	position: relative;
	width: 100%;

	& > input {
		z-index: 1;
		background: white;

		height: 4rem;
		width: 100%;

		font-size: 1.2rem;

		border: none;
		border-radius: 2rem;

		margin-left: 1rem;
		padding: 0 1.25rem 0 3.25rem;

		outline: none;
		box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.15);
		@media screen and (max-width: 320px){
			font-size: 1rem;
		}
	}

`

export const FeedbackMessage = styled.div`
	height: 100px;
	display: flex;
  justify-content: center;
  align-items: center;

	& > p {
		font-weight: 200;
		font-size: 20px;
		margin: auto;
		@media screen and (max-width: 320px){
			font-size: 19px;
		}
	}
`
