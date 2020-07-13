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

 - Do not write unit test for the inbuilt method from libraries. Libraries already have unit test of their methods, we do not need to make duplicated tests.

 - Write unit test for only what we wrote. (test only based on the input and expected output).

 - Do not use real data as a mock data, always make fake data if you need an input.

## tips to write unit test

 ### when to use shallow vs mount

  `shallow` (https://enzymejs.github.io/enzyme/docs/api/shallow.html)

   - No need to render child component. (ex. Simply checks `viewstate` of the `Contianer`)
   - Less APIs to test.
   - Incorrectly passed in `store` or `props` (missing or incorrect mock data) will NOT render componenet or container correctly.

  `mount` (https://enzymejs.github.io/enzyme/docs/api/mount.html)

   - Need to render wrapped child component.
   - useful to make behavioral testing through multiple componenets (ex. `ContentOverviewContainer.test.jsx`).
   - if there are many child components to render, then it will be tricky to mount the component.

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

 - Only class componenet will return the `instance`, functional componenet like `container` will return `null` for the instance.

 - If child componenet is class componenet, `Parent.find(`Child`).instance()` will return instance of child.

 ### UnhandledPromiseRejectionWarning

 - When `mount` multiple layers of componenets and one of the child component is using `service api`, it will trigger `UnhandledPromiseRejectionWarning` by `apiProxy`.

 ### React Router and useParam

 - When testing container using useParam(usually it is child of root componenet), it requries to have or mock `path` and `param`. In this case, we can use
 `jest.mock` to mock values needed to pass. (ex. `src/__tests__/containers/c/PlayerContainer.test.jsx`)

