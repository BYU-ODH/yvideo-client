# YVideo Unit Test

> Note: This is unit test for the y-video client

**Please do not merge without running the test and fixing all errors and warnings.**

## Development Environment
 - enzyme-adapter-react-16
 - jest-redux-thunk
 - jest-enzyme
 - redux-mock-store

	### enzyme-adapter-react-16

    It is officially provided adapter by enzyme and makes enzyme get along with React version 16. (https://enzymejs.github.io/enzyme/#installation)

    Adapter is defined in `./src/setupTests.js` and added `setupTests.js` as scripts in `package.json`. Every time before running the unit tests, it will be set up.

	### jest-enzyme

		Jest is the test runner for this project's unit test and this will make enzyme compatible with jest.

	### redux-mock-store

		It helps to mock redux store for unit testing for connected componenets.

## Command

 ### `npm run test`

	Launches the test runner in the interactive watch mode.

 ### `npm run test -- --coverage`

	Launches the test runner with test coverage report.

	Make sure set the watch usage as all(a) in order to generate the report for all of the unit test files.

## basic rules

	Do not write unit test for the inbuilt method from libraries.

	Libraries already have unit test of their methods, we do not need to make duplicated tests.

	Write unit test for only what we wrote. (based on the input and expected output)

## tips to write unit test

 ### when to use shallow vs mount

  - `shallow` (https://enzymejs.github.io/enzyme/docs/api/shallow.html)

		No need to render child component.
		Less APIs to test.

	- `mount` (https://enzymejs.github.io/enzyme/docs/api/mount.html)

		need to render wrapped child component.
		useful to make behavioral testing through multiple componenets (ex. `ContentOverviewContainer.test.jsx`).

 ### how to render connected component

 - Connected components requires mock stores set up before testing.

 - Most of the common stores and props this project is using are mocked in `testutil.jsx` and exported.

 - Before rendering, import mock data and wrap the component with the `Provider` including the `testutil.store` for shallow or mount.

 ### event handler

 - In this project, updating data is controlled through the event handlers which are defined in mapped container.

 - In order to test event handlers, use `mount` to render `container` including child `componenet`.

 - And `simulate` what's in child `componenet` and compare value or check if the method is called in the `container`. (ex. `ContentOverviewContainer.test.jsx`).

 - (https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/simulate.html)

 ### instance of component

 - only class componenet will return the `instance`, functional componenet like `container` will return `null` for the instance.