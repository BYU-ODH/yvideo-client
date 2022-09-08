import styled from 'styled-components'
import searchIcon from 'assets/search.svg'
import plusIcon from 'assets/plus-white.svg'

const Style = styled.div`

& .add-resource-button{
	padding: 9rem 2rem 0 2rem;
	/* float: right; */
	margin: 0 auto;
}

& .resource-search{
	max-width: 100rem;
	position: relative;
	left: 50vw;
	transform: translateX(-45vw);
	padding: 2rem 2rem 0 2rem;
	margin: 0 auto;
}

& header {

	display: flex;
	/* justify-content: space-between;
	align-items: center; */
	padding-top: 2rem;
	padding-bottom: 2rem;

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
    box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.15);
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
		margin-right: .5rem;
	}
`

export const Table = styled.table`
	/*background: white;*/
	/*box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.15);*/
	width: 100%;

	& th {
		padding: 1rem;
		text-align: left;
	}

	& tr {
		background: white;
		box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.15);
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
	text-align: ${props => props.isMobile && `center`};
	margin-bottom: 3rem;

	& > input {
		z-index: 1;
		background: white;
		height: 4rem;
		width: 75%;
		font-size: 1.5rem;
		border: none;
		border-radius: 2rem;
		margin-left: 1rem;
		padding: 0 1.5rem 0 4.5rem;
		box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.15);
	}

	& > button {
		width: 8rem;
    height: 4rem;
    color: white;
    background-color: var(--light-blue);
    margin-left: 1rem;
    box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.15);
    font-size: 1.5rem;
    border: none;
    border-radius: 2rem;
    text-align: center;
		cursor: pointer;
		transition: .5s ease;
		font-weight: 500;
		white-space: nowrap;

		@media screen and (max-width: 1000px) {
			margin-top: 0.5rem;
		}

		:hover {
			background-color: var(--navy-blue);
		}

		@media screen and (max-width: 1000px) {
			text-align: center;
		}
	}
`

export const SearchIcon = styled.span`
	position: absolute;
	z-index: 10;
	top: 1rem;
	left: 3rem;
	background: url(${searchIcon}) center no-repeat;
	background-size: contain;
	height: 2rem;
	width: 2rem;
`

export const PlusIcon = styled.span`
	background: url(${plusIcon}) center no-repeat;
	color: white;
	height: 1.5rem;
	width: 1.5rem;
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

export const Help = styled.span`
	width: 20px;
	height: 20px;

	& img {
		width: 20px;
    height: 20px;
    position: absolute;
    right: -3px;
    bottom: 5px;
		cursor: pointer;
	}
`
