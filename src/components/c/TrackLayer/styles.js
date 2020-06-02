import styled from 'styled-components'

export const Icon = styled.div`
	/* transform: rotate(45deg); */
  background: url(${props => props.src}) center no-repeat;
  background-size: contain;

  height: 2rem;
  width: 2rem;
`

export const Style = styled.div`

	width: 100% !important;
	height: auto;

	& #layer-message {
		width: 60%;
		height: 40px;
		margin: 20px auto 10px auto;
		display: flex;
		border: 1px solid var(--royal-blue);
		& p {
			margin: auto;
			justify-content: center;
			text-align: center;
			font-size: 1.5rem;
			width: 600px;
		}
	}

	& .events {
		width: 100% !important;
		border-bottom: 1px solid var(--light-blue);
		border-right: 2px solid red !important;
		display: flex;
		height: 45px;

	}

	& .layer-event {
		border: 1px solid var(--light-blue) !important;
		border-radius: 3px;
		height: 46px !important;
		padding: 1px;
		min-width: 1%;
		overflow: hidden !important;
		display: flex !important;
		background-color: white;

		&	p {
			font-size: 1.3rem;
			text-align: left;
			margin: 0px;
			padding: 1px 3px 1px 3px;

		}
		&	div{
			text-align: right;
			margin: 0px;
			padding: 0px 3px 0px 3px;
		}
		& span {
			background-color: red;
			:hover{
				background-color: green;
			}
		}
	}
`