import styled from 'styled-components'

export const Back = styled.div`
	position: fixed;
	display: flex;
	top: calc(100vh * 0.06);
	margin: auto;
	right: calc(100vw * 0.22);
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.2);

	& .helpModalHeader {
		margin: auto;
		width: 80vw;
		max-height: 70vh;
		height: auto;
		background-color: white;
		border-radius: 5px 5px 0 0;
		position: relative;
		border-bottom: 2px solid #0582ca;

		& h1 {
			padding-left: calc(100vw * 0.33);
			text-align: center;
		}
	}

	& .helpModalBody {
		margin: auto;
		width: 80vw;
		max-height: 70vh;
		height: auto;
		overflow-y: scroll !important;
		background-color: white;
		border-radius: 0 0 5px 5px;
		position: relative;


		::-webkit-scrollbar {
			display: block !important;
			width: 10px;
		}

		/* Track */
		::-webkit-scrollbar-track {
			background: #DDDDDD;
			border-radius: 10px;
		}

		/* Handle */
		::-webkit-scrollbar-thumb {
			background: var(--light-blue);
			border-radius: 10px;
		}

		/* Handle on hover */
		::-webkit-scrollbar-thumb:hover {
			background: var(--navy-blue);
		}
	}

	/* Content Section */

	& #content {
		width: 80%;
		margin: auto auto auto auto;
		text-align: left;
		position: relative;

		& .large-img{
			flex-direction: column;
			& img {
				width: 100%;
			}
		}

		& .section {
			font-size: 1.5rem !important;
			padding: 10px;
			display: flex;

			border: 2.5px solid rgba(200, 200, 200, .7);
			border-radius: 10px;
			padding: 10px;
			margin: 25px 0px;
			position: relative;

			& h3 {
				margin-left: -12px;
				margin-top: -12px;
				width: calc(100% + 22px);
				padding: 5px 10px;
				margin-bottom: 5px;
				background-color: rgba(5, 130, 202, 0.2);
				border-radius: 10px 10px 0px 0px;
			}

			& p {
				margin: auto;
				flex: 1;
				line-height: 20px;

				& img {
					float: right;
					margin: auto;
					padding: 5px;
					border: .1px solid transparent;
					border-radius: 10px;
				}
			}

			& kbd {
				background-color: #dddddd;
				margin-left: .5rem;
				padding-left: 8px;
				padding-right: 8px;
				border-radius: 5px;
				box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
				border 1px solid #666666;
			}

			& li {
				padding: 3px 0px 3px 0px;

				& .icon {
					position: relative;
					top: 5px;
					width: 20px;
					height: 20px;
				}
			}
		}
	}

	/* Video */

	& .video-section {
		width: 80%;
		margin: auto;
		text-align: center;
		position: relative;
		border: 2.5px solid #0582ca;
		border-radius: 10px;

		& h2 {
			background-color: #0582ca;
			height: 22px;
			font-size: 20px;
			margin-bottom: 5px;
			width: calc(100%);
			height: 30px;
			border-radius: 7px 7px 0px 0px;
			color: white;
		}

		& div {
			margin: auto;
			width: 100%;
			display: flex;

			& video {
				width: 100%;
				height: 100%;
				margin: auto;
				max-width: 800px;
				max-height: 600px;
			}
		}
	}
`
