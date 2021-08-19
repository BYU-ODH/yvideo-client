import styled from 'styled-components'
import carrot from 'assets/carrot.svg'

export const Wrapper = styled.form`
	/* display: grid; */
	/* grid: repeat(3, 1fr) / 1fr; */
	/* grid-gap: 2rem; */

	min-width: 50rem;

	& > input {
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
	}

`

export const Title = styled.div`
	display: flex;

	& > h4 {
		margin-right: 1rem;
	}
`

export const CollectionRow = styled.div`

	& > button {
		margin: 1rem;
		float: right;
	}
`

export const Collection = styled.div`

	display: grid;
	/* grid-template-columns: 8rem 15rem auto 2rem; */
	grid-template-columns: 25rem auto 2rem;
	justify-items: start;
	align-items: center;

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
		font-weight: 500;
	}

	& > p {
		flex: 2;
		color: #a4a4a4;
	}

	:hover {
		cursor: pointer;
		text-decoration: underline;
		background: #efefef;
	}
`

export const Body = styled.div`
	height: ${props => props.isOpen ? `${(parseInt(props.count) * 7 + 6).toString()}rem` : `0`};
	transition: height .25s ease-in-out;
	overflow: hidden;
`

export const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`

export const PublicButton = styled.button`
  color: white;
  font-weight: bold;
  background-color: ${props => props.isPublic === 0 && props.isPublic === 1 ? `#FFBF00` : `#0582CA`};

  letter-spacing: 0.05rem;

  padding: 0.8rem 1.5rem;
  /* margin-right: 3rem; */

	margin: 1rem;

  border: none;
  border-radius: 0.3rem;

  cursor: pointer;
  outline: none;
`

export const PublicCollectionButton = styled.div`
	display: flex;
	justify-content: flex-end;
`

export const PublicCollectionsLable = styled.div`
	display: grid;
	grid-template-columns: auto 1rem;
	align-items: center;

		& .ownership{
			display:flex;
			margin-left: 2rem;
			flex: 2;
			font-weight: 500;

			& .owner-name{
				margin-left: 1rem;
				flex: 2;
				font-weight: 200;
			}
	}
`