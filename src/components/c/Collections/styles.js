import styled from 'styled-components'

import blockView from 'assets/block-view.svg'
import listView from 'assets/list-view.svg'
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
	margin-left: 1rem;
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

export const TabHeader = styled.div`

  height: 2.5rem;

  & > button {
    padding: 0;
    width: 10rem;
    background: transparent;
    height: 2.5rem;

    border: none;
    outline: none;
    cursor: pointer;
  }
`

export const Selector = styled.div`
  position: relative;

  bottom: 0;
  left: ${props => props.isContentTap ? `0rem` : `10rem`};

  transition: left 0.3s ease-in-out;

  height: 0.25rem;
  width: 10rem;

  background-color: #0582ca;
`

export const Tab = styled.div`
  background-color: white;
  overflow-y: scroll;

  border-top: 1px solid #c4c4c4;

  padding: 2rem;
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

export const Search = styled.form`
	position: relative;
	width: 40%;

	& > input {
		z-index: 1;
		background: white;

		height: 4rem;
		width: 79%;

		font-size: 1.2rem;

		border: none;
		border-radius: 2rem;

		margin-left: 1rem;
		padding: 0 1.25rem 0 3.25rem;

		outline: none;
		box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
	}

	& > button {
		width: 6rem;
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