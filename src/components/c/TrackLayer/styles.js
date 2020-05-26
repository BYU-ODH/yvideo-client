import styled from 'styled-components'

export const Icon = styled.div`
	/* transform: rotate(45deg); */
  background: url(${props => props.src}) center no-repeat;
  background-size: contain;

  height: 2rem;
  width: 2rem;
`

export const Style = styled.div`

	--leftPosition: ${props => props.leftPosition};

	& .events {
		width: 100%;
		border-bottom: 1px solid var(--light-blue);
		display: flex;
	}

	& .layer-event {
		border: 1px solid var(--light-blue) !important;
		border-radius: 3px;
		height: rem !important;
		padding: 1px;
		min-width: 1%;
		overflow: hidden !important;
		display: flex !important;
		background-color: white;
		z-index: 10;
		position: relative !important;

		&	p {
			font-size: 1.3rem;
			text-align: left;
			margin: auto auto auto 0px;
			padding: 1px 3px 1px 3px;

		}
		&	div{
			text-align: right;
			margin: auto 0px auto auto;
			padding: 0px 3px 0px 3px;
		}
	}

	& .event-active {
		background-color: rgba(5, 130, 202, 0.2);
		border-top: 3px solid var(--light-blue) !important;
		border-bottom: 3px solid var(--light-blue) !important;
		border-right: 4px solid var(--light-blue) !important;
		border-left: 4px solid var(--light-blue) !important;
	}
`