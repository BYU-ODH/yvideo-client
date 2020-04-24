import styled from 'styled-components'

const Style = styled.div`
/* //TODO: Fix improperly shaded areas of grid */
//TODO: Fix extra div space on status bar
//TODO: Try and make elements aligned with flex ie. status bar and toggleButton
	width: 100%;
	padding-top: .25rem;
	/* border: 1px solid blue; */
	/* display: inline-block; */

	display: grid;
	grid-template-areas:
	"controls timebar toggle-button";
	grid-template-columns: 17rem 6fr 4rem;
	background: rgb(241, 241, 241);

  /* TODO: Find better background color */

`

export default Style

export const ToggleButton = styled.div`
	/* float: right; */
margin-top: 1.1rem;
margin-left: 1.0rem;
height: 2.0rem;
width: 2.0rem;

cursor: pointer;

background: url(${props => props.src}) center no-repeat;
background-size: contain;

transform: ${props => props.minimized ? `rotate(-180deg)` : `rotate(0deg)`};

transition: transform .25s ease-in-out;
`
