import styled from 'styled-components'

export const Wrapper = styled.div`
	padding-top: 8.4rem;
	padding-bottom: 15rem;

	overflow-y: scroll;
	height: calc(100vh - 23.4rem);
`

export const Content = styled.div`
	max-width: 91.2rem;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: start;

	& > a,
	& > div {
		margin-right: 6.6rem;
	}

	& > a:last-child,
	& > div:last-child {
		margin-right: 0;
	}

	& > p {
		margin-bottom: 1.8rem;
		margin-top: 5rem;
	}

	@media screen and (max-width: 960px) {
		max-width: 40.6rem;
		justify-content: space-between;

		& > a,
		& > div {
			margin-right: 0;
		}
	}

	@media screen and (max-width: 455px) {
		max-width: unset;
		width: 90vw;
	}
`

export const PreviewEmpty = styled.div`
	width: 100%;
	height: 10rem;

	display: flex;
	justify-content: center;
	align-items: center;

	color: #e4e4e4;
	font-weight: bold;
	font-size: 2rem;
`