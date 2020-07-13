import styled from 'styled-components'

const Style = styled.div`
	border: 5px solid red;
`

export default Style

export const StatusContainer = styled.div`
height: 5.3rem;
`

export const TimelineContainer = styled.div`
width: 100%;
/* Adjust height based on being minimized or not */
height: ${props => props.minimized ? `0` : `30vh`};
transition: height 0.2s ease-in-out;

`