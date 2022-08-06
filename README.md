[![ClimateMind](https://circleci.com/gh/ClimateMind/climatemind-frontend.svg?style=shield)](https://app.circleci.com/pipelines/github/ClimateMind/climatemind-frontend)

[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

When the app is run in CI you can find the generated html and json test reports under the artifacts tab of the cypress/run job. You can see an example [here](https://app.circleci.com/pipelines/github/ClimateMind/climatemind-frontend/49/workflows/5e45de72-5568-400a-bd68-556d8690314a/jobs/141/artifacts).

For both PC and mac, install Node.js and Docker desktop. https://nodejs.org/en/

1. Create folder to hold the project and git clone this frontend repo into it. The frontend repo must be to in a path that doesn’t have any spaces in the name. If it does, then change the folder names to use “\_” (underscores) instead of “ “ (spaces). This is so the docker commands run without errors.

2. Start the Frontend in development mode with the following steps:

   a. start Docker application

   b. cd into the front end folder in terminal (for PC be sure to use Powershell with administrative privileges)

   c. run `npm run docker:dev:build` to build the development docker container (should only take about 2.5minutes and only needs to be done when new dependencies added for frontend). If have m1 mac use instead `npm run docker:dev:build:m1mac`

   d. run the appropriate command below based on your machine/OS to run the container in developer mode with your project filesystem mounted (so any edits to any file in app/src folder of your project directly instantaneously sync with the running docker container):

   i. mac: `npm run docker:dev:run:mac`

   ii. pc (must use powershell): `npm run docker:dev:run:pc`

   iii. linux: `npm run docker:dev:run:linux`

3. Wait for the terminal to message that the server is running and ready. Then verify everything is working by navigating to http://localhost:3000/ to view the locally running version of the app.

Watch this video walkthrough for PC. https://stanford.zoom.us/rec/share/0mkFmKG1w-aDXZ9emfaw-OaNYLq2KDxy4pnqdzQJvzPP-NvWh6im_7hz3UU7dKlA.D-ZYJY0HayWNWZ0B

For mac users, below is how to run the project locally without using Docker (note that below with only work for mac users, NOT PC).

## Available Scripts

In the project directory, you can run:

### `npm install` (also known as `npm i`)

Installs the dependancies. Run this the first time, and whenever new dependancies have been added to the package.json file to rebuild the app.<br />

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

### `npm run e2e`

Cleans the reports and runs Cypress tests.

### `npx cypress run`

Runs the Cypress tests

### `npx cypress open`

Opens the Cypress test runner for easier troubleshooting/debugging of tests

### `npm run storybook`

Runs the Storybook server locally, which helps to test a combination of components locally.

## Running the web app in a docker container

Below are old docker commands that aren't guarenteed to work on all platforms. It's recommended to use the development docker commands at the top of this README.
In to test some server based configs it may be necessary to run the app in a container in order to verify the chnage will have the desired effect when in production.

**NOTE: the container will need re-build each time you make a change **

Below are old docker commands that aren't guarenteed to work on all platforms.

### Starting the container

1. Build the container: `docker build -t cmfe .`
2. Start the container: `docker run -dp 3000:80 cmfe`

### Stopping the container

1. Get the container id: `docker container ls`
2. Kill the container: `docker kill CONTAINER_ID`
