import styled from 'styled-components'

export const Style = styled.div`
	position: relative;
	width: ${props => props.displayTranscript ? ('50rem') : ('2rem')};
	height: 100%;
	padding: 0px 10px 0px 10px;
	border: 1px solid black;
	transition: 1s ease;
	display: flex;
	/* background-color: ${props => props.displayTranscript ? ('white') : ('var(--light-blue)')}; */

	& .side-bar {
		position: absolute;
		left: 0px;
		width: 40px;
		height: 100%;
		/* background-color: rgba(5, 130, 202, 0.5); */
		background-color: var(--light-blue);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 5px;

		& img {
			cursor: pointer;
		}
	}

	& .toggle-transcript {
		position: relative;
		margin-top: 5px;
		width: 30px;
		height: 30px;
		transition: .5s ease;
		transform: ${props => props.displayTranscript ? ('rotate(-180deg)') : ('rotate(0deg)')};
	}

	& .main-bar {
		visibility: ${props => props.displayTranscript ? ('visible') : ('hidden')};
		margin-left: 45px;
		max-height: 50rem;
		overflow-y: scroll !important;


		& .transcript-title {
			display: flex;
			width: 100%;
			height: 50px;
			flex-direction: column;
			text-align: center;

			& h2 {
				padding: 5px;
				margin: auto;
				font-weight: 500;
				text-align: center;
			}
		}

		& .transcript-content {
			margin-top: 15px;
		}
	}


	& .transcript-row {

		cursor: pointer;

		& p {
			border-bottom: 1.5px solid rgba(5, 130, 202, 0.1); /* make ligther #0582ca or 5, 130, 202 */
			padding: 5px 0px 5px 0px;
			word-wrap: break-word;
			font-size: 1.4rem;
		}
	}

	& .active-sub {
		background-color: rgba(5, 130, 202, 0.3);
	}
`
export const Help = styled.img`
	margin-top: 5px;
	width: 25px;
	height: 25px;
`