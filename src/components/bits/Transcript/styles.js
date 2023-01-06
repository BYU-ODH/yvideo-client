import styled from 'styled-components'
import captionsLight from 'assets/captions_light.svg' // eslint-disable-line

export const Style = styled.div`
	position: ${props => props.isMobile ? `fixed` : `relative`};
	width: ${props => props.displayTranscript
		? props.isMobile
			? `calc(100vw)`
			: `40rem`
		: props.isMobile
			? `0rem`
			: `2rem`};
	height: 100%;
	padding: ${props => props.isMobile ? `0px` : `0px 0px 0px 7px`};
	border-top: 1px solid #c4c4c4;
	transition: visibility 1s ease, opacity .5s ease;
	display: flex;
	z-index: 20;
	outline: none;
	/* background-color: ${props => props.displayTranscript ? `white` : `var(--light-blue)`}; */

	& .side-bar {
		position: absolute;
		left: 0px;
		width: 40px;
		height: 100%;
		// /* background-color: rgba(5, 130, 202, 0.5); */
		background-color: ${props => props.sidebarisclip ? `var(--light-blue)` : props.toggletranscript ? `var(--navy-blue)` : `#444444`} !important;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 5px;

		& img {
			cursor: pointer;
		}
	}

	& .clip-container {
		display: flex;
		flex-direction: column;

		& .clip-header {
			display: inline-flex;
			margin: auto;
			margin-bottom: 3rem;
		}
		& .hr-style {
			width: 29.8rem;
			position absolute;
			text-align: center;
			margin-left: 3rem;
			top: 50px;
		}
	}
	& .clip-item-container {
		display: flex;
		flex-direction: column;
		align-items: center;

	& .clip-item {
		display: inline-flex;
		box-shadow: 0px 2px 5px 1px rgb(0 0 0 / 30%);
		font-size: 18px;
		align-items: center;
		margin-bottom: 1.5rem;
		padding: 1rem;
	}

	& .clip-item:active {
		transform: translateY(2px);
		box-shadow: 0px 0px 5px 1px rgb(0 0 0 / 30%);
	}

	& .clip-title {
		display:inline-flex;
	}
}

	& .toggle-transcript {
		position: relative;
		margin-bottom: 15px;
		width: 30px;
		height: 30px;
		transition: .5s ease;
		transform: ${props => props.displayTranscript ? `rotate(-180deg)` : `rotate(0deg)`};
	}

	& i {
		position: relative;
		margin-top: 5px;
		width: 30px;
		height: 30px;
		font-size: 2rem;
		color: white;
		margin-left: .1rem;
		margin-bottom: -.3rem;
		cursor: pointer;
	}

	.fa-film {
		margin-bottom: .5rem;
		text-align: center;
		margin-right: .2rem;
		padding: 7px 2px 2px 3px;
		border: ${props => props.sidebarisclip ? `2px inset #dddddd` : `2px outset #dddddd`};
		color: ${props => props.sidebarisclip ? `#999999` : `white`};
		border-radius: 5px;
	}

	.fa-film:active {
		border: 2px inset #dddddd;
		color: #999999;
		outline: 0;
	}

	.fa-file-text-o {
		margin-bottom: .5rem;
		text-align: center;
		margin-right: .2rem;
		padding: 7px 2px 2px 3px;
		border: ${props => props.sidebarisclip ? `2px outset #dddddd` : `2px inset #dddddd`};
		color: ${props => props.sidebarisclip ? `white` : `#999999`};
		border-radius: 5px;
	}
	.fa-file-text-o:active {
		border: 2px inset #dddddd;
		color: #999999;
		outline: 0;
	}

	& .hr-sidebar {
		width: 30px;
		position : absolute;
		top: 40px;
		border-style: solid;
		border-color: white;

	}
	& .main-bar {
		visibility: ${props => props.displayTranscript ? `visible` : `hidden`};
		opacity: ${props => props.displayTranscript ? 1 : 0};
		transition: opacity .5s ease;
		margin-left: 42px;;
		overflow-y: scroll !important;
		background-color: white;
		width: calc(100% - 45px);
		height: 70vh;
		::-webkit-scrollbar {
			display: block !important;
			width: 20px;
		}

		/* Track */
		::-webkit-scrollbar-track {
			background: #DDDDDD;
			border-radius: 10px;
		}

		/* Handle */
		::-webkit-scrollbar-thumb {
			background: ${props => props.scrolldisabled ? `#AAAAAA` : props.sidebarisclip ? `var(--light-blue)` : `var(--navy-blue)`};
			border-radius: 10px;
		}

		/* Handle on hover */
		::-webkit-scrollbar-thumb:hover {
			background: ${props => props.scrolldisabled ? `` : `var(--navy-blue)`};
		}

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

	& .main-mobile {
		position: relative;
		margin-left: 0px;
		height: 60vh;
		width: calc(100vw);
		& .transcript-content {
			padding: 0px 5px 0px 5px;
		}
	}

	& .close-transcript {
		position: absolute;
		right: 10px;
	}

	& .transcript-row {

		display: flex;
		justify-content: center;
		align-content: center;
		border-bottom: 1.5px solid rgba(5, 130, 202, 0.2); /* make ligther #0582ca or 5, 130, 202 */
		/* height: 50px; */

		& p {
			width: 90%;
			padding: 5px 5px 5px 0px;
			word-wrap: break-word;
			font-size: 1.4rem;

			span {
				cursor: pointer;

				:hover {
					text-decoration: underline;
				}
			}
		}

		& .arrow {
			width: 10%;
			height: inherit;
			text-align: center;
			cursor: pointer;
			display: flex;
			//border-left: 1.5px solid rgba(5, 130, 202, 0.2); /* make ligther #0582ca or 5, 130, 202 */
			visibility: hidden;

			& span {
				margin: auto;
			}
		}

		& .highlight {
			cursor: pointer;
			font-weight: 500;
			background-color: #fffa82;
		}

		:hover {
			background-color: rgba(210, 210, 210, 0.5);

			& .arrow {
				visibility: visible;
			}
		}
	}

	& .active-sub {
		background-color: rgba(5, 130, 202, 0.3);
	}

	& .hide-element {
		display: none;
	}

	& .transcript-translation {
		border-top: 1px solid rgba(0, 0, 0, 0.3);
		visibility: ${props => props.displayTranscript ? `visible` : `hidden`};
		opacity: ${props => props.displayTranscript ? 1 : 0};
		transition: opacity .5s ease;
		position: relative;
		background-color: white !important;
		/* border: 1px solid red; */
		margin-left: 45px;
		height: 15vh;

		& h4 {
			padding: 2px;
			margin: auto;
			font-weight: 500;
			text-align: center;
		}

		& #translation-box {
			height: 70%;
			padding: 5px;
			border: 1px solid black;
			border-radius: 3px;
			width: 95%;

			& #translation-list {
				height: 100%;
				overflow-y: scroll;
				font-size: 1.4rem;
				list-style: none;
				padding: 0px 0px 0px 10px;

				& li {
					padding: 2px 0px 4px 0px;
				}
			}
		}
	}

	& .translation-mobile {
		height: calc(100vh - 60vh - 84px);
		margin-left: 0px !important;
		width: calc(100vw);

		& #translation-box {
			height: calc(100vh - 72vh - 84px) !important;
		}
	}
`
export const Help = styled.img`
	width: 25px;
	height: 25px;
	margin-top: 5px;
	margin-right: 1px;
`

export const Spinner = styled.span`
	width: 13px;
	height: 13px;
	border: 3px solid black;
	border-radius: 50%;
	display: inline-block;
	border-top: 3px solid #FFF;
	border-right: 3px solid transparent;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;

	@keyframes rotation {
	0% {
	  transform: rotate(0deg);
	}
	100% {
	  transform: rotate(360deg);
	}
  }
`