# YVideo

> Note: Project is currently in Development. When it's time to deploy, make sure to switch everything to Production mode.

## Development Environment

### Global Packages

Ensure you have Node.js installed, then run:

```sh
npm install -g yarn
```

Once installed, restart your terminal and run:

```sh
yarn global add eslint
```

### ESLint

This project includes an `.eslintrc` file which contains the linting rules that the project must abide by.

[Rules in use for this project](ESlint-Rules.md)

**Do not submit a pull request without running the linter, and fixing all errors and warnings.**

It's recommended to use VSCode to work on YVideo. The project includes a `.vscode` folder containing workspace settings that should take priority over the user settings when working on this code.

### VSCode Settings

### `keybindings.json`
- This will unset <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>F</kbd> from the default VSCode formatting task, and re-bind it to the ESLint linting task for `.js`, `.jsx`, `.ts`, and `.tsx` files only

### `settings.json`
- Selected Settings:
    - Auto-fix on save
    - Package Manager: Yarn
    - Lint Task Enabled
    - Render all whitespace ([We use tabs, not spaces](https://pics.me.me/tabs-spaces-may-6-2016-37939459.png))
    - and more..

### VSCode Extensions

#### Install/Enable:
- `CSS Formatter` - by Martin Aeschlimann
- `DotENV` - by mikestead
- `ES7 React/Redux/GraphQL/React-Native snippets` - by dsznajder
- `ESLint` - by Dirk Baeumer
- `Redux DevTools` - by Jingkai
- `styled-components-snippets` - by Jon Wheeler
- `vscode-styled-components` - by Julien Poissonnier

#### Recommended:
- `Github Pull Requests` - by GitHub
- `GitLens -- Git supercharged` - by Eric Amodio
- `Markdown Preview Github Styling` - by Matt Bierner
- `vscode-icons` - by VSCode Icons Team

#### Disable:
- `@builtin TypeScript and JavaScript Language Features`
    - See next section

## TypeScript Errors

VSCode comes with TypeScript validation built-in. Since TypeScript is a super-set of JavaScript, it also validates JavaScript. Sometimes, this results in clashing when using a linter like ESLint, as we do in this project. In order to get VSCode to cooperate, you may have to disable a built in JS/TS validation tool.

1. Type the following into the search bar in the extensions tab:

    `@builtin TypeScript and JavaScript Language Features`

2. Disable the extension

    > Note: It's recommended only to disable the extension in the workspace only, so it doesn't affect your other projects.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Other Links:
- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [`npm run build` fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

<!--
caption-aider
track-editor
-->
