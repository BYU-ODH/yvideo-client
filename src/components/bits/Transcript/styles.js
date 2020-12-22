import styled from 'styled-components'

export const Style = styled.div`
	position: ${props => props.isMobile ? (`fixed`) : (`relative`)};
	/* position: relative; */
	right: ${props => props.isMobile ? (`0px`) : (``)};
	width: ${props => props.displayTranscript ? ( props.isMobile ? ('calc(100vw)') : ('50rem') ) : ('2rem')};
	height: 100%;
	padding: ${props => props.isMobile ? (`0px`) : (`padding: 0px 10px 0px 10px;`)}
	border-top: 1px solid black;
	transition: .5s ease;
	display: flex;
	z-index: 20;
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
		height: calc(100vh - 84px);
		overflow-y: scroll !important;
		background-color: white;

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

	& .side-mobile {
		left ${props => props.displayTranscript ? (`0px`) : (`-20px !important`)};
		background-color: transparent;
	}

	& .main-mobile {
		width: calc(100vw - 40px);

		& .transcript-content {
				padding: 10px;
				width: 90%;
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