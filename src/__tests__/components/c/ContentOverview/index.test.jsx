import React from 'react'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import Collections from '../../../../components/c/Collections/index'
import BlockCollection from '../../../../components/bits/BlockCollection'
import { interfaceService } from 'services'
import { Link, BrowserRouter} from 'react-router-dom'

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	disableLifecycleMethods: true,
})

describe(`collections test`, () => {
	it(`Link pair with manage collections`, ()=> {

	})
})