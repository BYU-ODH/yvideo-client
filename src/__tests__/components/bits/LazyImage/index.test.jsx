import React from 'react'
import LazyImage from '../../../../components/bits/LazyImage/index'
import { render, screen, cleanup } from '@testing-library/react'

const src = `test@src`
const alt = `test`

const wrapper =
	<LazyImage src={src} alt={alt}/>

const noImageWrapper =
	<LazyImage />

describe(`LazyImage test`, () => {
	afterEach(() => {
		jest.resetAllMocks()
		cleanup()
	})
	it(`test render LazyImage with image given`, () => {
		render(wrapper)
		expect(wrapper).toBeDefined()

		const image = screen.getByRole(`img`)
		expect(screen.getByAltText(`test`)).toEqual(image)

		expect(image).toBeDefined()
	})

	it(`test render LazyImage with no image given`, () => {
		render(noImageWrapper)
		expect(noImageWrapper).toBeDefined()

		const image = screen.queryByRole(`img`)

		expect(image).toBeNull()
	})
})
