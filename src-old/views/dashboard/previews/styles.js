import styled from 'styled-components'

export const Preview = styled.div`

	position: relative;

	display: flex;
	flex-direction: column;

	margin-bottom: 2rem;

	& p {
		margin-top: 1rem;
		margin-bottom: 0;
	}

	& p.gray {
		color: #a4a4a4;
	}

	:hover {
		cursor: pointer;
	}
`

export const IconBox = styled.div`

	position: absolute;
	top: 0;
	right: 0;

	height: 10rem;
	width: 8rem;
	background-color: rgba(0,0,0,.60);
	display: flex;
	justify-content: center;
	align-items: center;

	& svg {
		cursor: pointer;
	}

	@media screen and (max-width: 455px) {
		height: 50.5vw;
		width: 40.4vw;
	}
`