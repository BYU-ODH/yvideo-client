import styled from 'styled-components'

import carrot from 'assets/carrot.svg'

const Style = styled.div`
  display: inline;
`
export default Style

export const Header = styled.div`
	display: grid;
	/* grid-template-columns: 8rem 15rem auto 2rem; */
	grid-template-columns: 20rem auto 1.5rem;
	justify-items: start;
	align-items: center;
	// background: #d7d7d7;
	background: ${props => props.isOpen ? ` #d7d7d7` : ``};


	padding: 2rem;
	border-top: 1px solid #ccc;

	& > div {
		flex: 1;

		background: url(${carrot}) center no-repeat;
		background-size: contain;
		height: 1.5rem;
		width: 1.5rem;

		transform: ${props => props.isOpen ? `rotate(-180deg)` : `rotate(0deg)`};
		transition: transform .25s ease-in-out;
	}

	& > h3 {
		flex: 2;
		padding-right: 2.5rem;
		font-weight: 400;
	}

	& > p {
		flex: 2;
		text-align: center;
		color: #a4a4a4;
	}

	:hover {
		cursor: pointer;
		text-decoration: underline;
		background: #bfbfbf;
	}
`

export const Body = styled.div`
	/* height: ${props => props.isOpen ? `${(parseInt(props.count) * 6.5 + 2).toString()}rem` : `0`}; */
	height: ${props => props.isOpen ? `auto` : `0`};
	transition: height .25s ease-in-out;
	overflow: hidden;
`

export const PublicButton = styled.button`
  color: white;
  font-weight: bold;
  background-color: ${props => props.published ? `#FFBF00` : `#0582CA`};

  letter-spacing: 0.05rem;

  padding: 0.8rem 1.5rem;
  margin-right: 3rem;

  border: none;
  border-radius: 0.3rem;

  cursor: pointer;
  outline: none;
`
