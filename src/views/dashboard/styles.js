import styled from 'styled-components'

export const Container = styled.div`
	padding-top: 8.4rem;
`

export const Content = styled.div`
	max-width: 91.2rem;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	& > p {
		margin-bottom: 1.8rem;
		margin-top: 5rem;
	}

	@media screen and (max-width: 960px) {
		max-width: 40.6rem;
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