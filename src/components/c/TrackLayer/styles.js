import styled from 'styled-components'

export const Icon = styled.div`
	/* transform: rotate(45deg); */
  background: url(${props => props.src}) center no-repeat;
  background-size: contain;

  height: 2rem;
  width: 2rem;
`

export const Style = styled.div`
	& .events {
		width: 100%;
		border: 1px solid red;
	}

	& .layer-event {
		border: 1px solid var(--light-blue) !important;
		border-radius: 3px;
		height: 14% !important;
		padding: 1px;
		min-width: 1%;
		overflow: hidden;
		display: flex !important;
		background-color: white;

		&	p {
			text-align: left;
			margin: auto auto auto 0px;
			padding: 0px 3px 0px 3px;
		}
		&	div{
			text-align: right;
			margin: auto 0px auto auto;
			padding: 0px 3px 0px 3px;
		}
	}
`