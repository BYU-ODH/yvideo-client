import styled from 'styled-components'
// TODO: Figure out how to adjust the height on minimize/maximise

const Style = styled.div`
	/*height: calc(100vh - 8.4rem);*/
	padding-top: 8.4rem;
	display: grid;
	grid-template-columns: calc(100% - 350px) 350px;
	/* grid-area: "video sidebar"
						  "timeline sidebar";

	/* grid-template-columns: calc(100% - 350px) 350px; */
	/* grid-gap: .5rem; */
`

export default Style

export const LeftStyle = styled.div`
	display: grid;
	grid-template-rows: 1fr auto;
	/* grid-template-rows: auto; */
	/* grid-template-rows: calc(100% - 230px) 300px; */

	grid-gap: .5rem;
`
