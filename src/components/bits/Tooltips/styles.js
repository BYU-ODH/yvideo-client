import styled from 'styled-components'

const Style = styled.div`
	position: absolute;
	z-index: 20;

	border-radius: 3px;

	width: auto;
	max-width: 6vw;
	min-height: 3vh;
	max-height: auto;
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 10px;

	transition: visibility 1s ease, opacity .5s ease;

	top: ${props => props.position ? (`${ props.position.y < window.innerHeight / 2 ? (`${props.position.y + 30}px`) : (`calc(${props.position.y - 30 } - 3vh)`)}`) : (`-10px`)};
	/* if it is greater than 3/4 of width we display to the left of item */
	/* if it is less than 1/4 of width display to the riht */
	/* else display in to the middle  */
	left: ${props => props.position ? (`${ props.position.x > window.innerWidth * .8 ? (`calc(${props.position.x}px - 5vw)`) : (`${props.position.x < window.innerWidth * .2 ? (`calc(${props.position.x}px + 5vw)`) : (`calc(${props.position.x}px - 3.5vw)`)}`)}`) : (`-10px`)};

	background-color: white;
	border: 2px solid var(--light-blue);
	color: var(--light-blue);

	& h3 {
		text-align: center !important;
	}
`

export default Style