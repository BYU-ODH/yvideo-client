import ReactDOM from 'react-dom'

jest.mock('react-dom')

require('../index')

test('Renders the application', () => {
  expect(ReactDOM.render).toBeCalled()
})