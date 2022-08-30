import styled from 'styled-components'

const Style = styled.div`
  display: inline;
`
export default Style

export const Body = styled.div`
	height: ${props => props.isOpen ? `auto` : `0`};
	transition: height .25s ease-in-out;
	overflow: hidden;

	& > .link {
		background: #efefef;

		:hover {
			background: #d7d7d7;
			cursor: pointer;
		}
	}

`
export const Clip = styled.div`
		display: grid;
		grid-template-columns: 18rem auto;
		align-items: center;
		height: 3.5rem;
		padding: 1.5rem 2rem;
		margin: 0 12rem;

		color: black;
		text-decoration: none;

		& .name h4 {
			font-weight: 300;
		}
		& div h4 {
			font-weight: 300;
		}

		@media screen and (max-width: 425px){
			margin: 0 1rem;
			grid-template-columns: 8rem auto;
		}
`
