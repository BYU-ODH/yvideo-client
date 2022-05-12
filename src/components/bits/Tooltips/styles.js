import styled from 'styled-components'

const Style = styled.div`
	position: absolute;
	z-index: 20;

	border-radius: 5px;

	width: 70px;
	min-height: 3vh;
	max-height: auto;
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 5px;

	transition: visibility 1s ease, opacity .5s ease;

	top: ${props => props.position
		? `${props.position.y < window.innerHeight / 2
			? `calc(${props.position.y}px + 3%)`
			: `calc(${props.position.y}px - 3% - 5vh)`}`
		: `-10px`};
	/* if it is greater than 3/4 of width we display to the left of item */
	/* if it is less than 1/4 of width display to the riht */
	/* else display in to the middle  */

	left: ${props => props.position
		? `${props.position.x > window.innerWidth * .9
			? `calc(${props.position.x + props.position.width / 2 - 10}px - 80px)`
			: `${props.position.x < window.innerWidth * .1
				? `calc(${props.position.x + props.position.width / 2 - 10}px)`
				: `calc(${props.position.x + props.position.width / 2 - 10}px - 35px)`}`}`
		: `-10px`};

	background-color: rgba(0, 46, 93, 0.8);
	border: rgba(0, 46, 93, 0.8);
	color: white;

	& h3 {
		text-align: center !important;
	}
`

export default Style