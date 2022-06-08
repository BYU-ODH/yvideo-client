import index from "../index";

describe('Renders the application', () => {

	it("Should render app without crashing", () => {
		expect(
			JSON.stringify(
				Object.assign({}, index, { _reactInternalInstance: 'censored' }),
			),
		).toMatchSnapshot();
	});
});