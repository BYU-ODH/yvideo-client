import styled from 'styled-components'

import blockView from 'assets/block-view.svg'
import listView from 'assets/list-view.svg'
import searchIcon from 'assets/search.svg'
import menuIcon from 'assets/menu-black.svg'

const Style = styled.div`

max-width: 100rem;
padding: 8.4rem 2.4rem 0 2.4rem;
margin: 0 auto;

& .list{
	margin-bottom: 5rem;
}

& .collections-header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem;

		& > div {
			display: flex;
			align-items: center;

			& > h3 {
				font-weight: lighter;
				font-size: 1.3rem;
			}

			& a {
				font-size: 1.1rem;
				color: white;
				outline: none;
				background-color: var(--light-blue);
				/* background-color: #A9A9A9; */
				box-shadow: 0px 3px 6px -2px rgba(0,0,0,0.15);
				border: none;
				border-radius: 6px;
				text-align: center;
				cursor: pointer;
				font-weight:5000;
				padding: 8px 5px;

				:hover {
					box-shadow: 0px 3px 6px -2px rgba(0,0,0,0.5);
				}
			}
		}
}

& .collections-header-mobile{
		margin: 2rem;

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
		}
}
`

export default Style

export const ViewToggle = styled.button`
	background: url(${props => props.displayBlocks ? listView : blockView}) center no-repeat;
	background-size: cover;
	border: none;
	height: 1.5rem;
	width: 1.5rem;
	margin-right: 1rem;
	outline: none;
	cursor: pointer;
`
export const Help = styled.img`
	width: 20px;
	height: 20px;
	margin-left: 20px;
	position: relative;
	bottom: -4px;
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
	left: 2rem;
	background: url(${searchIcon}) center no-repeat;
	background-size: contain;
	height: 1.8rem;
	width: 1.8rem;
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
	width: 62%;

	& > input {
		z-index: 1;
		background: white;

		height: 3.5rem;
		width: 97%;

		font-size: 1.2rem;

		border: none;
		border-radius: .5rem;

		margin-left: 1rem;
		padding: 0 1.25rem 0 3.25rem;

		outline: none;
		box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
	}

	& > button {
		width: 8rem;
    height: 3rem;
    color: white;
    background-color: var(--light-blue);
    margin-left: 1rem;
    outline: none;
    box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
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
		box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
	}
`