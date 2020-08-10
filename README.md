[![ClimateMind](https://circleci.com/gh/ClimateMind/climatemind-frontend.svg?style=shield)](https://app.circleci.com/pipelines/github/ClimateMind/climatemind-frontend)

[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/c125eb66/Climate-Mind)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

## `service workers`
The service worker is only enabled in the production environment, e.g. the output of npm run build. 
It's recommended that you do not enable an offline-first service worker in a development environment, 
as it can lead to frustration when previously cached assets are used and do not include the latest changes you've made locally.

### `testing service worker`
If you need to test your offline-first service worker locally, build the application (using npm run build) and run a standard http server from your build directory. 
After running the build script, create-react-app will give instructions for one way to test your production build locally and the deployment instructions have instructions for using other methods. 
Be sure to always use an incognito window to avoid complications with your browser cache.

# climatemind-frontend
