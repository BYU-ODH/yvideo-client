import styled, { keyframes } from 'styled-components'

import logo from './../../assets/hexborder.svg'

const
	rotate = keyframes`
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(720deg);
		}
	`,

	Spin = styled.div`
		background: url(${logo}) center no-repeat;
		background-size: cover;
		width: 20rem;
		height: 20rem;

		animation: ${rotate} 4s ease-in-out infinite;
	`

export default Spin