[![ClimateMind](https://circleci.com/gh/ClimateMind/climatemind-frontend.svg?style=shield)](https://app.circleci.com/pipelines/github/ClimateMind/climatemind-frontend)

[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/c125eb66/Climate-Mind)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

When the app is run in CI you can find the generated html and json test reports under the artifacts tab of the cypress/run job. You can see an example [here](https://app.circleci.com/pipelines/github/ClimateMind/climatemind-frontend/49/workflows/5e45de72-5568-400a-bd68-556d8690314a/jobs/141/artifacts).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run prettier`

Applies prettier (airbnb)

### `npx cypress run`

Runs the Cypress tests

### `npx cypress open`

Opens the Cypress test runner for easier troubleshooting/debugging of tests

### `npm run Percy`

Runs the Cypress tests, including the integration with Percy.io for visual regression testing.
Note that for this to work locally you need to have set the environment variable `PERCY_TOKEN` (this can be found in the Climate Mind Percy.io account - it is already set in CircleCI)

### `npm run storybook`

Runs the Storybook server locally, which helps to test a combination of components locally.
