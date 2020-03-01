import styled from 'styled-components'

const Style = styled.div`
/* //TODO: Fix improperly shaded areas of grid */

//TODO: Fix extra div space on status bar
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

export const ToggleButton = styled.button`
	border: 1px solid purple;
`