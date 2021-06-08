This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Installation

## Development Environment

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
    - Package Manager: npm
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

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Environment Variables and .env Files
- `REACT_APP_YVIDEO_SERVER` - Set to needed server domain
- `REACT_APP_STALE_TIME` - Timeout in milliseconds for network requests
- `REACT_APP_RECAPTCHA_SITEKEY` - reCAPTCHA secret key for site

If needed, set these variables as outlined in the .env.example file
For development, a .env.development file is needed.
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).