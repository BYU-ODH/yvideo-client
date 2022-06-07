import Enzyme from 'enzyme'
import Adapter from '@cfaester/enzyme-adapter-react-18'
import { configure } from '@testing-library/dom'
import '@testing-library/jest-dom'

Enzyme.configure({
	adapter: new Adapter(),
	disableLifecycleMethods: true,
})

configure ({
	asyncUtilTimeout: 2500,
})