import styled from 'styled-components'

const Style = styled.div`
	/*height: calc(100vh - 8.4rem);*/
	padding-top: 8.4rem;
	display: grid;
	grid-template-columns: calc(100% - 350px) 350px;
	grid-gap: .5rem;
`

export default Style

export const LeftStyle = styled.div`
	display: grid;
	grid-template-rows: calc(100% - 230px) 220px;
	grid-gap: .5rem;
`
