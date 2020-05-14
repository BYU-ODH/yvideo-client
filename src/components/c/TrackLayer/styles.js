import styled from 'styled-components'

export const Icon = styled.div`
	/* transform: rotate(45deg); */
  background: url(${props => props.src}) center no-repeat;
  background-size: contain;

  height: 2rem;
  width: 2rem;
`